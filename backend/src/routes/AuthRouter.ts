import { Router } from 'express';
import AuthController from '../controllers/AuthController';
import AuthValidation from '../middleware/AuthValidation';

const router: Router = Router();

router.post('/register', AuthValidation.validateSignup, AuthController.signup);

export default router;
