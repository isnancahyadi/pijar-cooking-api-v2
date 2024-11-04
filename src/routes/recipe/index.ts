import { Router } from 'express';
import { getAllRecipes } from '../../controllers/Recipe';

const router = Router();

router.get('/', getAllRecipes);

export default router;
