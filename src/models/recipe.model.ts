import DBConnect from '../config/db';

export const getAllRecipesModel = () => {
  const query = 'SELECT * FROM recipes';

  return DBConnect.execute(query);
};
