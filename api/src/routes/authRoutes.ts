import { Router } from 'express';
import { register } from '../controllers/authControllers';

const router: Router = Router();

router.post('/register', register);

export default router;