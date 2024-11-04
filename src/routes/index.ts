import { Router } from 'express';
import RecipeRouter from './recipe';
const router = Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.send('Hello, API is running well. ^_^');
});

router.use('/recipe', RecipeRouter);

export default router;
