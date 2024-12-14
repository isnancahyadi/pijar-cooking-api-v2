import DBConnect from '../config/db';

import { ResultSetHeader } from 'mysql2';

import { UserParamsType, UserType } from '../types/schema/user.type';

export const CreateUserModel = async (payload: UserParamsType) => {
  const { id_user, first_name, last_name, phone, avatar, account_id } = payload;

  const query = ` INSERT INTO user (id_user, first_name, last_name, phone, avatar, account_id)
                  VALUES (?, ?, ?, ?, ?, ?)`;

  return await DBConnect.execute<ResultSetHeader>(query, [
    id_user,
    first_name,
    last_name,
    phone,
    avatar,
    account_id,
  ]);
};

export const GetUserByField = async <
  T extends keyof Pick<
    UserParamsType,
    'id_user' | 'first_name' | 'last_name' | 'phone'
  >,
>(
  field: T,
  value: UserParamsType[T],
) => {
  const query = ` SELECT id_user, first_name, last_name, phone, avatar
                  FROM user
                  WHERE ${field}=?`;

  return await DBConnect.execute<UserType[]>(query, [value]);
};
