import DBConnect from '../config/db';

export const getAllRecipesModel = () => {
  const query = 'SELECT * FROM recipe';

  return DBConnect.execute(query);
};
