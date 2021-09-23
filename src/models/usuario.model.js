const mongoose = require('mongoose');
const bcrypt = require('bcrypt')

const DataSchema = new mongoose.Schema({
    //definindo os campos da tabela
    nome_user: String,
    email_user: String,
    tipo_user: {type:Number, default:1},
    senha_user: String,
}, {
    timestamps:true
});

//criptografar a senha antes de salvar
DataSchema.pre('save', function(next){
    if(!this.isModified("senha_user")){
        return next();
    }
    this.senha_user = bcrypt.hashSync(this.senha_user, 10);
    next();
});

DataSchema.pre('findOneAndUpdate', function(next){
    var password = this.getUpdate().senha_user+'';
    if(password.length < 55){
        this.getUpdate().senha_user = bcrypt.hashSync(password, 10);
    }
    next();
});

const Usuario = mongoose.model('Usuario', DataSchema);
module.exports = Usuario;