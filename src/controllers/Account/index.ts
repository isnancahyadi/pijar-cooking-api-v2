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

const checkFieldExistence = async (
  field: keyof Pick<AccountParamsType, 'email' | 'username' | 'nickname'>,
  value: string,
): Promise<{ error: string; message: string } | null> => {
  const [result] = await GetAccountByField(field, value);

  if (result.length) {
    return {
      error: `${capitalizeFirstLetter(field)}AlreadyExists`,
      message: `${capitalizeFirstLetter(field)} address already registered.`,
    };
  }
  return null;
};

export const CreateAccount = async (req: Request, res: Response) => {
  const { username, nickname, email }: AccountParamsType = req.body;

  const { error, value } = regAccountValidation({
    ...req.body,
    id_account: uuidv4(),
    email: req.body.email.toLowerCase(),
  });

  if (error) {
    res.status(422).json({
      error: error?.details.map((item) => ({
        msg: item.message,
        type: item.type,
        ...(process.env.PREFIX_MODE === 'dev' && { loc: item.path }),
      })),
      message: 'Failed to register account',
    });
    return;
  }

  try {
    const validations = await Promise.all([
      checkFieldExistence('email', email),
      checkFieldExistence('username', username),
      checkFieldExistence('nickname', nickname),
    ]);

    const errorMessage = validations.find((message) => message !== null);
    if (errorMessage) {
      res.status(409).json({
        error: errorMessage.error,
        message: errorMessage.message,
      });
      return;
    }

    value.password = await hashPassword(value.password);
    delete value.confirm_password;

    const [result] = await CreateAccountModel(value);
    if (result.affectedRows > 0) {
      const { password, ...sanitizedData } = value;
      res.status(201).json({
        message: 'Account created successfully',
        data: sanitizedData,
      });
      return;
    }
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({
        message: error.message,
      });
    } else {
      res.status(500).json({
        message: 'An unexpected error occurred',
        error: 'Unknown error',
      });
    }
  }
};
