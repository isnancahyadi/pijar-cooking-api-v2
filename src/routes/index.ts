import { Router } from 'express';
const router = Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.send('Hello, API is running well. ^_^');
});

export default router;
