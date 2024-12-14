import { RowDataPacket } from 'mysql2';

export interface UserParamsType {
  id_user: string;
  first_name: string;
  last_name: string;
  phone: string;
  avatar: string;
  account_id: number;
}

export interface UserType extends RowDataPacket {
  id_user: string;
  first_name: string;
  last_name: string;
  phone: string;
  avatar: string;
}
