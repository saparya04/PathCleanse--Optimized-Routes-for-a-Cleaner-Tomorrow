import express from 'express';
import { getCoordinates } from '../controllers/getCoordinates.js';

const router = express.Router();

router.get('/geocode/:id', getCoordinates);

export default router;
