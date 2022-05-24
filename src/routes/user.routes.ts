import { Router } from 'express';
import { getAll, getOne, create, deleteUser } from '../controllers/user.controller';
import { requireAuth } from '../middlewares/auth.middleware'

const router = Router();

router.get('/users', (req, res, next) => { requireAuth(req, res, next) } , getAll);
router.get('/user/:id', (req, res, next) => { requireAuth(req, res, next) } , getOne);
router.post('/user', (req, res, next) => { requireAuth(req, res, next) }, create);
router.delete('/user/:id', (req, res, next) => { requireAuth(req, res, next) }, deleteUser);

export default router;