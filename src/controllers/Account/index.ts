import { type Request, type Response } from 'express';
import { v4 as uuidv4 } from 'uuid';

import {
  CreateAccountModel,
  GetAccountByField,
} from '../../models/account.model';

import { regAccountValidation } from '../../utils/validation/account.validation';
import { capitalizeFirstLetter } from '../../utils/common';
import { hashPassword } from '../../utils/hashing';

import { AccountParamsType } from '../../types/schema/account.type';
import { UserParamsType } from '../../types/schema/user.type';
import { regUserValidation } from '../../utils/validation/user.validation';
import { CreateUserModel, GetUserByField } from '../../models/user.model';

const checkFieldExistence = async (
  type: 'account' | 'user',
  field:
    | keyof Pick<AccountParamsType, 'email' | 'username' | 'nickname'>
    | keyof Pick<UserParamsType, 'phone'>,
  value: string,
): Promise<{ error: string; message: string } | null> => {
  const message = {
    error: `${capitalizeFirstLetter(field)}AlreadyExists`,
    message: `${capitalizeFirstLetter(field)} address already registered.`,
  };

  if (type === 'account') {
    const [result] = await GetAccountByField(
      field as 'email' | 'username' | 'nickname',
      value,
    );
    if (result.length) {
      return message;
    }
  }
  if (type === 'user') {
    const [result] = await GetUserByField(field as 'phone', value);
    if (result.length) {
      return message;
    }
  }

  return null;
};

export const CreateAccount = async (req: Request, res: Response) => {
  const {
    username,
    nickname,
    email,
    password,
    confirm_password,
    first_name,
    last_name,
    phone,
    avatar,
  }: AccountParamsType & UserParamsType = req.body;

  try {
    const { error: errorAccountValidation, value: valAccount } =
      regAccountValidation({
        id_account: uuidv4(),
        email: req.body.email.toLowerCase(),
        username,
        nickname,
        password,
        confirm_password,
      });

    if (errorAccountValidation) {
      res.status(422).json({
        error: errorAccountValidation?.details.map((item) => ({
          msg: item.message,
          type: item.type,
          ...(process.env.PREFIX_MODE === 'dev' && { loc: item.path }),
        })),
        message: 'Failed to register account',
      });
      return;
    }

    const validations = await Promise.all([
      checkFieldExistence('account', 'email', email),
      checkFieldExistence('account', 'username', username),
      checkFieldExistence('account', 'nickname', nickname),
    ]);

    const errorMessage = validations.find((message) => message !== null);
    if (errorMessage) {
      res.status(409).json({
        error: errorMessage.error,
        message: errorMessage.message,
      });
      return;
    }

    valAccount.password = await hashPassword(valAccount.password);
    delete valAccount.confirm_password;

    const [resultCreateAccount] = await CreateAccountModel(valAccount);

    if (resultCreateAccount.affectedRows > 0) {
      const { error: errorUserValidation, value: valUser } = regUserValidation({
        id_user: uuidv4(),
        first_name,
        last_name,
        phone,
        avatar,
        account_id: resultCreateAccount.insertId,
      });

      if (errorUserValidation) {
        res.status(422).json({
          error: errorUserValidation?.details.map((item) => ({
            msg: item.message,
            type: item.type,
            ...(process.env.PREFIX_MODE === 'dev' && { loc: item.path }),
          })),
          message: 'Failed to register account',
        });
        return;
      }

      const validations = await Promise.all([
        checkFieldExistence('user', 'phone', phone),
      ]);

      const errorMessage = validations.find((message) => message !== null);
      if (errorMessage) {
        res.status(409).json({
          error: errorMessage.error,
          message: errorMessage.message,
        });
        return;
      }

      const [resultCreateUser] = await CreateUserModel(valUser);

      if (resultCreateUser.affectedRows > 0) {
        const mergedData = {
          ...valAccount,
          ...valUser,
        };

        const { password, account_id, ...sanitizedData } = mergedData;
        res.status(201).json({
          message: 'Account created successfully',
          data: sanitizedData,
        });
        return;
      }
    }
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({
        message: error.message,
      });
    } else {
      res.status(500).json({
        error: 'Unknown error',
        message: 'An unexpected error occurred',
      });
    }
  }
};
