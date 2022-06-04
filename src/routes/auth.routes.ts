import { Router, Response } from 'express';
import { login } from '../controllers/auth.controller';
import { requireAuth } from '../middlewares/auth.middleware';

const router = Router();

router.get('/islogged', (req, res, next) => { requireAuth(req, res, next); }, (req, res: Response) => { res.status(200).json({ message: 'logged' }); });
router.post('/login', (req, res) => { login(req, res); });

export default router;
