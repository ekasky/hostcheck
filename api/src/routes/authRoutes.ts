import { Router } from 'express';
import { register } from '../controllers/authControllers';
import { sendEmail } from '../emails/emailService';

const router: Router = Router();

router.post('/register', register);

router.post('/send-mail', (req, res) => {

    sendEmail('ekasky25@gmail.com', 'TEST 321', '<h1>Test 321</h1>', 'Test 321');

    res.status(200).json({ message: 'success' });

});

export default router;