import Joi from 'joi';

import { UserParamsType } from '../../types/schema/user.type';
import { ModelValidationReturnType } from '../../types/common';

import { REQUIRED_STRING, STRING } from './_constant';

export const regUserValidation = (
  payload: UserParamsType,
  callbacks?: ModelValidationReturnType<UserParamsType>,
): Joi.ValidationResult<UserParamsType> => {
  const schema = Joi.object<UserParamsType>({
    id_user: REQUIRED_STRING.uuid().messages({
      'any.required': 'User must have an ID',
      'string.base': 'ID must be a string',
      'string.empty': 'User must have an ID',
    }),
    first_name: REQUIRED_STRING.messages({
      'any.required': 'First name is required',
      'string.base': 'First name must be string',
      'string.empty': 'First name is required',
    }),
    last_name: STRING.empty(''),
    phone: STRING.min(11).max(13).empty('').messages({
      'string.min': 'Phone number must be at least 11 number long',
      'string.max': 'Phone number must not exceed 13 number',
    }),
    avatar: STRING.empty(''),
    account_id: Joi.number(),
  });

  const validationResult = schema.validate(payload, {
    abortEarly: false,
    errors: {
      wrap: {
        label: '',
      },
    },
  });

  if (callbacks) {
    if (!validationResult.error) {
      callbacks.onValid?.(validationResult.value);
    } else {
      callbacks.invalid?.(validationResult);
    }
  }

  return validationResult;
};
