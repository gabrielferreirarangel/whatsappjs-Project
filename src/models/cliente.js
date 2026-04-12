const mongoose = require('mongoose');
const { type } = require('node:os');

ClienteSchema = new mongoose.Schema({
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
        
    }
})