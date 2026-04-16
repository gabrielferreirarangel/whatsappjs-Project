import 'dotenv/config';
import express from 'express';
import connectDB from './src/config/db.js';

import clienteRouters from './src/routes/clienteRouters.js';
import vencimentoRouters from './src/routes/vencimentoRouters.js';

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
  res.send('API rodando');
});

app.use('/clientes', clienteRouters);
app.use('/vencimentos', vencimentoRouters);

const startServer = async () => {
  await connectDB();

  app.listen(3000, () => {
    console.log('Servidor rodando em http://localhost:3000');
  });
};

startServer();