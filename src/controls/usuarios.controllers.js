const { update } = require('../models/usuario.model');
const Usuario = require('../models/usuario.model')

module.exports = {
    async index(req, res){
        const user = await Usuario.find();
        res.json(user);

        res.json({message: "Hello from controller usuário"});
    },
    async create(req, res){
        const {nome_user, email_user, tipo_user, senha_user} = req.body //informações q chegam do front

        let data = {};

        let user = Usuario.findOne({email_user}); //verificar se o e-mail ja existe cadastrado
        if(!user){
            data = {nome_user, email_user, tipo_user, senha_user};
            user = await Usuario.create(data);
            return res.status(200).json(user)
        } else {
            return res.status(500).json(user);
        }
    },
    async details(req, res){
        const {_id} = req.params;
        const user = await Usuario.findOne({_id});
        res.json(user);
    },
    async delete(req, res){
        const {_id} = req.params;

        const user = await Usuario.findByIdAndDelete({_id});

        return res.json(user);
    },
    async update(req, res){
        const {_id, nome_user, email_user, senha_user, tipo_user} = req.body;

        const data = {nome_user, email_user, senha_user, tipo_user};

        const user = await Usuario.findOneAndUpdate({_id}, data, {new:true});

        res.json(user);
    }
}