import DBConnect from '../config/db';

import { ResultSetHeader } from 'mysql2';

import { AccountParamsType, AccountType } from '../types/schema/account.type';

export const CreateAccountModel = async (payload: AccountParamsType) => {
  const { id_account, username, nickname, email, password } = payload;

  const query = ` INSERT INTO account (id_account, username, nickname, email, password)
                  VALUES (?, ?, ?, ?, ?)`;

  return await DBConnect.execute<ResultSetHeader>(query, [
    id_account,
    username,
    nickname,
    email,
    password,
  ]);
};

export const GetAccountByField = async <
  T extends keyof Pick<
    AccountParamsType,
    'id_account' | 'email' | 'username' | 'nickname'
  >,
>(
  field: T,
  value: AccountParamsType[T],
) => {
  const query = ` SELECT id_account, username, nickname, email
                  FROM account
                  WHERE ${field}=?`;

  return await DBConnect.execute<AccountType[]>(query, [value]);
};
