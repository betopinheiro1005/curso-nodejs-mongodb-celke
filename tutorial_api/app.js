const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

require('./models/Artigo');
const Artigo = mongoose.model('artigo');

// Configuração

const app = express();

// https://celke.com.br/artigo/consumir-dados-da-api-propria-com-react

app.use((req, res, next) => {
    // console.log("Acessou o Middleware!");
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", 'GET,PUT,POST,DELETE');
    app.use(cors());
    next();
});

app.use(express.json());

mongoose.connect('mongodb://localhost/celke', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
    console.log("Conexão com mongoDB realizada com sucesso!");
}).catch((erro) => {
    console.log("Erro: Conexão com mongoDB não foi realizada com sucesso! " + erro);
});

// Criando rotas

app.get('/artigo', (req, res) => {
    // return res.json({titulo: "Como criar API"});

    Artigo.find({}).then((artigo) =>{
        return res.json(artigo);        
    }).catch((erro) => {
        return res.status(400).json({
            error: true,
            message: "Nenhum artigo encontrado!"
        });
    });
});

app.get("/artigo/:id", (req, res) => {
    Artigo.findOne({
        _id: req.params.id
    }).then((artigo) => {
        return res.json(artigo);
    }).catch((erro) => {
        return res.status(400).json({
            error: true,
            message: "Nenhum artigo encontrado!"
        })
    });
});

app.post('/artigo', (req, res) => {
    const artigo = Artigo.create(req.body, (err) => {
        if(err) return res.status(400).json({
            error: true,
            message: "Error: Artigo não foi cadastrado com sucesso!"
        })

        return res.status(200).json({
            error: false,
            message: "Artigo cadastrado com sucesso!"
        })
    })    
});

app.put("/artigo/:id", (req, res) => {
    Artigo.updateOne({ _id: req.params.id}, req.body, (err) => {
        if(err) return res.status(400).json({
            error: true,
            message: "Error: Artigo não foi editado com sucesso!"
        });

        return res.json({
            error: false,
            message: "Artigo editado com sucesso!"
        });
    });
});

app.delete("/artigo/:id", (req, res) => {
    const artigo = Artigo.deleteOne({ _id: req.params.id}, req.body, (err) => {
        if(err) return res.status(400).json({
            error: true,
            message: "Error: Artigo não foi apagado com sucesso!"
        });

        return res.json({
            error: false,
            message: "Artigo apagado com sucesso!"
        });
    });
});

const PORT = 8080;

app.listen(PORT, ()=>{
    console.log("Servidor iniciado na porta " + PORT);
})