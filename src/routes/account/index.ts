import { Router } from 'express';

import { CreateAccount } from '../../controllers/Account';

const AccountRouter = Router();

AccountRouter.post('/register', CreateAccount);

export default AccountRouter;
