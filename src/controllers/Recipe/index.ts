import { Request, Response } from 'express';
import { getAllRecipesModel } from '../../models/recipe.model';

export const getAllRecipes = async (req: Request, res: Response) => {
  try {
    const [data] = await getAllRecipesModel();

    res.json({
      message: 'Get all recipes success',
      data: data,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Something when wrong',
    });
  }
};
