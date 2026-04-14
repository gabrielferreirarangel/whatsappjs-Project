import xlsx from 'xlsx';
import Cliente from '../models/Cliente.js';

const limparNumero = (valor) => {
  if (!valor) return null;
  return Number(valor.toString().replace(/\D/g, ''));
};

const importarClientes = async () => {
  try {
    const workbook = xlsx.readFile('./src/data/seed/Vencimento de Certificados.xlsx'); 
    //Vencimento de Certificados

    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];

    const dados = xlsx.utils.sheet_to_json(sheet);

    const clientes = dados.map(item => ({
      nomeRazaoSocial: item["Nome Razão Social"] || item.nomeRazaoSocial,
      cpfCnpj: limparNumero(item["CPF/CNPJ"] || item.cpfCnpj),
      numeroCorreto: limparNumero(item["Número Correto"] || item.numeroCorreto)
    }));
    await Cliente.deleteMany({});
    await Cliente.insertMany(clientes, { ordered: false });

    console.log('Clientes importados');
    console.table(clientes);
  } catch (err) {
    console.error('Erro ao importar:', err.message);
  }
};

export default importarClientes;