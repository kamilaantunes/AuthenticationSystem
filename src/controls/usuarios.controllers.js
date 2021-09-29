const { update } = require('../models/usuario.model');
const Usuario = require('../models/usuario.model')
const jwt = require("jsonwebtoken")
const secret = "mysecret"

module.exports = {
    async index(req, res){
        const user = await Usuario.find()
        res.json(user)

        res.json({message: "Hello from controller usuário"});
    },
    async create(req, res){
        const {nome_user, email_user, tipo_user, senha_user} = req.body //informações q chegam do front

        let data = {}

        let user = Usuario.findOne({email_user}) //verificar se o e-mail ja existe cadastrado
        if(!user){
            data = {nome_user, email_user, tipo_user, senha_user}
            user = await Usuario.create(data)
            return res.status(200).json(user)
        } else {
            return res.status(500).json(user)
        }
    },
    async details(req, res){
        const {_id} = req.params
        const user = await Usuario.findOne({_id})
        res.json(user);
    },
    async delete(req, res){
        const {_id} = req.params

        const user = await Usuario.findByIdAndDelete({_id})

        return res.json(user)
    },
    async update(req, res){
        const {_id, nome_user, email_user, senha_user, tipo_user} = req.body

        const data = {nome_user, email_user, senha_user, tipo_user}

        const user = await Usuario.findOneAndUpdate({_id}, data, {new:true})

        res.json(user);
    },
    async login(req, res){
        const {email, senha} = req.body
        Usuario.findOne({email_usuario: email, tipo_usuario: 1}, function(err, user){
            if(err){
                console.log(err)
                res.status(200).json({error: "Erro no serivor. Por favor, tente novamente!"})
            } else if(!user){
                res.status(200).json({status:2, error:"E-mail não encontrado"})
            } else{
                user.isCorrectPassword(senha, async function (err, same){
                    if(err){
                        response.status(200).json({error: "Erro no servidor. Por favor, tente novamente!"})
                    } else if (!same){
                        res.status(200).json({status: 2, error: "A senha nãoo confere."})
                    } else {
                        const payload = {email};
                        const token = jwt.sign(payload, secret, {
                            expiresIn: '24h'
                        })
                        res.cookie('token', token, {httpOnly: true}),
                        res.status(200).json({status:1, auth:true, token:token, id_client: user._id, user_name:user.nome_user, user_type:user.tipo_user})
                    }
                })
            }
        })
    },
    async checkToken(req, res){
        const token = req.body.token || req.query.token || req.cookie.token || req.headers['x-acess-token']

        req.token = token;
        if(!token){
            res.json({status:401, msg:'Não autorizado. Token inexistente!'})
        }else{
            jwt.verify(token, secret, function(err, decoded){
                if(err){
                    res.json({status:401, msg:'Não autorizado. Token inválido!'})
                }else{
                    req.email = decoded.email;
                    res.json({status:200})
                }
            })
        }
    },
    async destroyToken (req, res){
        const token = req.headers.token
        if(token){
            res.cookie('token', null, {httpOnly:true})
        }else{
            res.status(401).send("Logout não autorizado")
        }
        res.send("Sessão finalizada com sucesso!")
    }
}