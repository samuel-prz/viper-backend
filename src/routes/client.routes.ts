import { Router } from 'express';
import { getAll, getOne, create, deleteClient } from '../controllers/client.controller';
import { requireAuth } from '../middlewares/auth.middleware';

const router = Router();

router.get('/clients', (req, res, next) => { requireAuth(req, res, next); }, getAll);
router.get('/client/:id', (req, res, next) => { requireAuth(req, res, next); }, getOne);
router.post('/client', (req, res, next) => { requireAuth(req, res, next); }, create);
router.delete('/client/:id', (req, res, next) => { requireAuth(req, res, next); }, deleteClient);

export default router;
