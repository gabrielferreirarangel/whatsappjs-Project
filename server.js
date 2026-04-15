import 'dotenv/config';
import connectDB from './src/config/db.js'
import express from 'express'
const app = express()
import importarClientes from './src/scripts/addPlanilha.js';
import Cliente from './src/models/Cliente.js';
import clienteRouters from './src/routes/clienteRouters.js';

app.use(express.json());
app.use('/clientes', clienteRouters);

const startServer = async () => {
  await connectDB();
  await importarClientes();
}

app.get('/', async (req, res) =>{
  try{
    res.end('ta rodando eu acho')
    const clientes = await Cliente.find();
    res.json(clientes);
  }catch(err){
    res.status(500).json({ error: 'Erro ao buscar clientes' });
  }
})




app.listen(3000, () => {
  console.log(`Servidor rodando em http://localhost:${3000}`);
});

startServer();