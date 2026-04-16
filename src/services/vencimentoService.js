import xlsx from 'xlsx';
import Cliente from '../models/cliente.js';
import Vencimento from '../models/vencimento.js';

const limparNumero = (valor) => {
  if (!valor) return null;
  return Number(valor.toString().replace(/\D/g, ''));
};

export const processarVencimentos = async () => {
  const workbook = xlsx.readFile('./src/uploads/resumoCertificadosExpirando.xlsx');

  const sheetName = workbook.SheetNames[0];
  const sheet = workbook.Sheets[sheetName];

  const dados = xlsx.utils.sheet_to_json(sheet);

  let inseridos = 0;
  let naoEncontrados = 0;

  for (const item of dados) {
    const cpf = limparNumero(item["CPF/CNPJ"]);

    if (!cpf) continue;

    const cliente = await Cliente.findOne({ cpfCnpj: cpf });

    if (!cliente) {
      naoEncontrados++;
      continue;
    }

    await Vencimento.create({
      clienteId: cliente._id,
      modelo: item["Modelo"],
      indicador: item["Indicador"],
      dataVenciemento: new Date(item["Data Vencimento"])
    });

    inseridos++;
  }

  return {
    inseridos,
    naoEncontrados,
    total: dados.length
  };
};