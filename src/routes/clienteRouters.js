import express from 'express';
import controller from '../controllers/clienteController.js';

const router = express.Router();

router.get('/', controller.getClientes);
router.get('/:id', controller.getClienteById);
router.post('/importar', controller.importarClientesController);


export default router;