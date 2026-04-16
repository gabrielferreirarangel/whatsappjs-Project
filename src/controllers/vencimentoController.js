import { processarVencimentos } from '../services/vencimentoService.js';

const importarVencimentos = async (req, res) => {
  try {
    const resultado = await processarVencimentos();

    res.json({
      message: 'Processamento concluído',
      resultado
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export default { importarVencimentos };