import Joi from 'joi';

import { AccountParamsType } from '../../types/schema/account.type';
import { ModelValidationReturnType } from '../../types/common';

import { REQUIRED_STRING } from './_constant';

export const regAccountValidation = (
  payload: AccountParamsType,
  callbacks?: ModelValidationReturnType<AccountParamsType>,
): Joi.ValidationResult<AccountParamsType> => {
  const schema = Joi.object<AccountParamsType>({
    id_account: REQUIRED_STRING.uuid().messages({
      'any.required': 'Account must have an ID',
      'string.base': 'ID must be a string',
      'string.empty': 'Account must have an ID',
    }),
    username: REQUIRED_STRING.pattern(/^[a-zA-Z0-9@_]+$/).messages({
      'any.required': 'Username is required',
      'string.base': 'Username must be string',
      'string.empty': 'Username is required',
      'string.pattern.base':
        "Username can only contain letters (a-z, A-Z), numbers (0-9), and the special characters '@' and '_'",
    }),
    nickname: REQUIRED_STRING.pattern(/^[a-zA-Z0-9@_]+$/).messages({
      'any.required': 'Nickname is required',
      'string.base': 'Nickname must be string',
      'string.empty': 'Nickname is required',
      'string.pattern.base':
        "Nickname can only contain letters (a-z, A-Z), numbers (0-9), and the special characters '@' and '_'",
    }),
    email: REQUIRED_STRING.email().messages({
      'any.required': 'Email is required',
      'string.base': 'Email must be string',
      'string.empty': 'Email is required',
      'string.email': 'Invalid email',
    }),
    password: REQUIRED_STRING.min(8)
      .max(16)
      .pattern(
        /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,16}$/,
      )
      .messages({
        'any.required': 'Password is required',
        'string.base': 'Password must be string',
        'string.empty': 'Password is required',
        'string.min': 'Password must be at least 8 characters long',
        'string.max': 'Password must not exceed 16 characters',
        'string.pattern.base':
          'Password must be 8-16 characters long, and include at least one uppercase letter, one lowercase letter, one digit, and one special character (e.g., @$!%*?&)',
      }),
    confirm_password: Joi.any()
      .equal(Joi.ref('password'))
      .required()
      .label('Confirm Password')
      .messages({
        'any.only': "{#label} doesn't match",
        'any.required': '{#label} is required',
      }),
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
