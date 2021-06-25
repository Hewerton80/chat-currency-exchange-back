import { Router } from 'express'
import { UsersController } from '../app/http/controllers/users.controller';
import { AuthController } from '../app/http/controllers/auth.controller';
import { AuthMiddleaware } from '../app/http/middlawares/auth.middlaware';

const routes = Router();

const usersController = new UsersController();
const authController = new AuthController();
const authMiddleaware = new AuthMiddleaware();

routes.post('/auth/email', authController.verifyEmail);
routes.post('/auth/signIn', authController.signIn);
routes.post('/auth/signUp', authController.signUp);

routes.get('/user/balance', authMiddleaware.authenticate, usersController.getBalance);
routes.post('/user/deposit', authMiddleaware.authenticate, usersController.deposit);
routes.put('/user/defaultCurrency', authMiddleaware.authenticate, usersController.updateDefaultCurrencyUser);

export { routes };