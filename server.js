import 'dotenv/config';
import connectDB from './src/config/db.js'
import express from 'express'
const app = express()
import importarClientes from './src/scripts/addPlanilha.js';
import Cliente from './src/models/Cliente.js';
import clienteRouters from './src/routes/clienteRouters.js';

app.use(express.json());

const startServer = async () => {
  await connectDB();
  await importarClientes();
}

app.get('/', (req, res) => {
  res.send('API rodando');
});

app.use('/clientes', clienteRouters);


app.listen(3000, () => {
  console.log(`Servidor rodando em http://localhost:${3000}`);
});

startServer();