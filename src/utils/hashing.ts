import * as argon2 from 'argon2';

export const hashPassword = async (password: string) => {
  return await argon2.hash(password, {
    type: argon2.argon2id,
    memoryCost: 2 ** 16,
    timeCost: 3,
    parallelism: 1,
  });
};

export const verifyPassword = async (
  password: string,
  hashedPassword: string,
) => {
  return await argon2.verify(hashedPassword, password);
};
