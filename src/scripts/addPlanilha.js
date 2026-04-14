import xlsx from 'xlsx';
import Cliente from '../models/Cliente.js';

const limparNumero = (valor) => {
  if (!valor) return null;
  return Number(valor.toString().replace(/\D/g, ''));
};

const importarClientes = async () => {
  try {
    const workbook = xlsx.readFile('./src/data/seed/vencimentoGeral.xlsx');
    //Vencimento de Certificados

    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];

    const dados = xlsx.utils.sheet_to_json(sheet);

    const clientes = dados.map(item => ({
      nomeRazaoSocial: item["Nome Razão Social"] || item.nomeRazaoSocial,
      cpfCnpj: limparNumero(item["CPF/CNPJ"] || item.cpfCnpj),
      numeroCorreto: limparNumero(item["Número Correto"] || item.numeroCorreto)
    }));

    const unico = new Map();

    clientes.forEach(c => {
      if (c.cpfCnpj) {
        unico.set(c.cpfCnpj, c);
      }
    });

    const clientesUnicos = Array.from(unico.values());

    const cpfs = clientesUnicos.map(c => c.cpfCnpj);

    const existentes = await Cliente.find({
      cpfCnpj: { $in: cpfs }
    }).select('cpfCnpj');

    const existentesSet = new Set(existentes.map(c => c.cpfCnpj));

    const novosClientes = clientesUnicos.filter(c => !existentesSet.has(c.cpfCnpj));

    await Cliente.insertMany(novosClientes);
    
    console.log('Clientes importados');
    console.table(novosClientes);
    console.table(clientes);
  } catch (err) {
    console.error('Erro ao importar:', err.message);
  }
};

export default importarClientes;