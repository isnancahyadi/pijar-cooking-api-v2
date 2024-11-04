import { Request, Response } from 'express';
import { getAllRecipesModel } from '../../models/recipe.model';

export const getAllRecipes = async (req: Request, res: Response) => {
  const [data] = await getAllRecipesModel();

  res.json({
    message: 'Get all recipes success',
    data: data,
  });
};
