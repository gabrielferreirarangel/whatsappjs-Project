import 'dotenv/config';
import connectDB from './src/config/db.js'
import express from 'express'
const app = express()


connectDB()

app.get('/', (req, res) =>{
    res.end('hello word')
})




app.listen(3000, () => {
  console.log(`Servidor rodando em http://localhost:${3000}`);
});