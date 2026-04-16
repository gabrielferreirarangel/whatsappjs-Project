import express from 'express';
import controller from '../controllers/vencimentoController.js';

const router = express.Router();

router.post('/importar', controller.importarVencimentos);

export default router;