const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const path = require('path');
const mongoose = require('mongoose');
const routes = require('./src/routes');

const app = express();
const port = process.env.PORT || 5000;

mongoose.connect('mongodb+srv://kamila:123321@cluster1.pcfof.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', {
    // useUnifiedTopology:true,
    useNewUrlParser:true,
    // useFindAndModify:false
}, function(err){
    if(err){
        console.log(err)
    } else {
        console.log('MongoDB conectado com sucesso!')
    }
})

app.use(cors()); //informa quais domínios podem estar consumindo a api

app.use(cookieParser());

app.use(express.json()); //para quando formos receber e/ou enviar json do front para o back

app.get('/', function(req, res){
    res.json({message:'Hello Kami'});
});

app.use(routes);

app.listen(port, function(){
    console.log(`Server runing on port ${port}`)
});