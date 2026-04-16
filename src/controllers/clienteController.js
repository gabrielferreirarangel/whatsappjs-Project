import Cliente from '../models/cliente.js';
import importarClientes from '../scripts/addPlanilha.js';

const getClientes = async (req, res) => {
  try {
    const clientes = await Cliente.find();
    res.json(clientes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getClienteById = async (req, res) => {
  try {
    const { id } = req.params;

    const cliente = await Cliente.findById(id);

    if (!cliente) {
      return res.status(404).json({ message: 'Cliente não encontrado' });
    }

    res.json(cliente);
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
};

const importarClientesController = async (req, res) => {
  try {
    await importarClientes();
    res.json({ message: 'Clientes importados com sucesso' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export default { getClientes, getClienteById, importarClientesController };