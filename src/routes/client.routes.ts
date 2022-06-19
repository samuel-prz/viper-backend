import { Router } from 'express';
import { fetch, create, update, deleteClient } from '../controllers/client.controller';
import { requireAuth } from '../middlewares/auth.middleware';

const router = Router();

router.get('/clients', (req, res, next) => { requireAuth(req, res, next); }, fetch);
router.put('/client/:id', (req, res, next) => { requireAuth(req, res, next); }, update);
router.post('/client', (req, res, next) => { requireAuth(req, res, next); }, create);
router.delete('/client/:id', (req, res, next) => { requireAuth(req, res, next); }, deleteClient);

export default router;
