import express from 'express';
import Cliente from '../models/Cliente.js';
import importarClientes from '../scripts/addPlanilha.js';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const clientes = await Cliente.find();
    res.json(clientes);
    } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get(`/:id`, async(req, res) =>{
  try{
    const {id} = req.params;

    const cliente = await Cliente.findById(id);
    if(!cliente){
      return res.status(404).json({ message: 'Cliente não encontrado' });
    }
    res.json(cliente);

  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
})

router.post('/importar', async(req, res) =>{
  try{
    await importarClientes();
    res.json({ message: 'Clientes importados com sucesso' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
})

export default router;