const mongoose = require('mongoose')

const VencimentoSchema = new mongoose.Schema({
    clienteId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Cliente',
    },
    modelo: {
        type: String
    },
    indicador: {
        type: String
    },
    dataVenciemento:{
        type: Date
    },
})