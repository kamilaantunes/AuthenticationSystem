// const { update } = require('../models/produtos.model');
const Produto = require('../models/produtos.model');
const mongoose = require('mongoose')

module.exports = {
    async index(req, res){
        const produto = await Produto.find();

        res.json(produto);

        res.json({message: "Hello from controller usuário"});
    },
    async create(req, res){
        const {nome_produto, descricao_produto, preco_produto, qtd_produto} = req.body //informações q chegam do front

        let data = {};

        let produto = Produto.findOne({nome_produto}); //verificar se o e-mail ja existe cadastrado
        if(!produto){
            data = {nome_produto, descricao_produto, preco_produto, qtd_produto};
            produto = await Produto.create(data);
            return res.status(200).json(produto)
        } else {
            return res.status(500).json(produto);
        }
    },
    async details(req, res){
        const {_id} = req.params;
        const produto = await Produto.findOne({_id});
        res.json(produto);
    },
    async delete(req, res){
        const {_id} = req.params;

        const produto = await Produto.findByIdAndDelete({_id});

        return res.json(produto);
    },
    async update(req, res){
        const {_id, nome_produto, descricao_produto, preco_produto, qtd_produto} = req.body;

        const data = {nome_produto, descricao_produto, preco_produto, qtd_produto};

        const produto = await Produto.findOneAndUpdate({_id}, data, {new:true});

        res.json(produto);
    }
}

