import { RowDataPacket } from 'mysql2';

export interface AccountParamsType {
  id_account: string;
  username: string;
  nickname: string;
  email: string;
  password: string;
  confirm_password?: string;
}

export interface AccountType extends RowDataPacket {
  id_account: string;
  username: string;
  nickname: string;
  email: string;
}
