import vencimentoService from '../services/vencimentoService.js';
import Vencimento from '../models/vencimento.js';

const importarVencimentos = async (req, res) => {
  try {
    const resultado = await vencimentoService.processarVencimentos();

    res.json({
      message: 'Processamento concluído',
      resultado
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getVencimentos = async (req, res) => {
  try {
    const vencimentos = await Vencimento.find().populate('clienteId');
    res.json(vencimentos);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const notificarVencimento = async (req, res) => {
  try {
    const { id } = req.params;

    const vencimento = await Vencimento.findById(id)
      .populate('clienteId');

    if (!vencimento) {
      return res.status(404).json({ message: 'Vencimento não encontrado' });
    }

    if (!vencimento.clienteId) {
      return res.status(400).json({ message: 'Cliente não vinculado' });
    }

    const cliente = vencimento.clienteId;

    const numero = `55${cliente.numeroCorreto}`; // padrão WhatsApp

    const mensagem = `Olá ${cliente.nomeRazaoSocial}, seu certificado (${vencimento.modelo}) vence em ${vencimento.dataVencimento}.`;

    await enviarMensagem(numero, mensagem);

    res.json({ message: 'Notificação enviada (ou simulada)' });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export default { importarVencimentos, getVencimentos, notificarVencimento };
