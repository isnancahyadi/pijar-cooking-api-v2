import { Response } from 'express';
import Joi from 'joi';
import { FieldPacket, QueryResult } from 'mysql2';

export type ModelValidationReturnType<T> = {
  onValid: (value: T) => Promise<[QueryResult, FieldPacket[]]>;
  invalid: (
    value: Joi.ValidationResult<T>,
  ) => Response<any, Record<string, any>>;
};
