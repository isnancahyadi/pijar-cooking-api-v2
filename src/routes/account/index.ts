import { Router } from 'express';

import { CreateAccount } from '../../controllers/Account';

const AccountRouter = Router();

AccountRouter.post('/', CreateAccount);

export default AccountRouter;
