import mongoose from 'mongoose'

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
    dataVencimento:{
        type: Date
    },
    status:{
        type: String,
        enum: ['pendente', 'enviado', 'falha'],
        default: 'pendente'
    }
})

export default mongoose.model('Vencimento', VencimentoSchema)