import 'dotenv/config';
import connectDB from '../config/db.js';
import xlsx from 'xlsx';
import Cliente from '../models/Cliente.js';

const run = async () => {
  try {
    await connectDB();

    const workbook = xlsx.readFile('../data/seed/planilhaPrincipal.xlsx');

    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];

    const dados = xlsx.utils.sheet_to_json(sheet);

    console.log(`Total: ${dados.length}`);

    const clientes = dados.map(item => ({
      nomeRazaoSocial: item.nomeRazaoSocial,
      cpfCnpj: Number(item.cpfCnpj),
      numeroCorreto: Number(item.numeroCorreto)
    }));

    await Cliente.insertMany(clientes, { ordered: false });

    console.log('Importação finalizada');
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

run();