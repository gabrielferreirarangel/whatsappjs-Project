import mongoose from 'mongoose'

const ClienteSchema = new mongoose.Schema({
    nomeRazaoSocial: {
        type: String,
        require: true,
        trim: true
    },cpfCnpj: {
        type: Number,
        require: true,
        unique: true,
        index: true
    },
    numeroCorreto: {
        type: Number,
        require: true
    }
})

export default mongoose.model('Cliente', ClienteSchema);