import express from 'express';
import controller from '../controllers/vencimentoController.js';

const router = express.Router();

router.post('/importar', controller.importarVencimentos);
router.get('/', controller.getVencimentos);
router.post('/:id/notificar', controller.notificarVencimento);

export default router;