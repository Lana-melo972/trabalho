const express = require('express');
const cors = require('cors');
const path = require('path');
const {
    incluirPlantio, 
    incluirColheita, 
    incluirIrrigacao, 
    obterColheitas, 
    obterIrrigacoes,
    obterPlantas
} = require('./bancoDados');

const server = express();
server.use(express.json());
server.use(cors());
server.use(express.static(path.join(__dirname, '../Font')));

// Rotas de plantio
server.get('/plantios', async (req, res) => {
    const plantios = await obterPlantas();
    res.json(plantios);
});


    server.post('/plantio', async (req, res) => {
        const { Data_Plantio, Variedade, Quantidade_Plantada, Localizacao } = req.body;
        const resposta = await incluirPlantio(Data_Plantio, Variedade, Quantidade_Plantada, Localizacao);

    if (resposta.affectedRows > 0) {
        res.json({ msg: 'Plantio cadastrado com sucesso' });
    } else {
        res.json({ msg: 'Falha no cadastro do plantio!' });
    }
});


// Rotas de irrigação
server.get('/irrigacoes', async (req, res) => {
    const irrigacoes = await obterIrrigacoes();
    res.json(irrigacoes);
});

server.post('/irrigacoes', async (req, res) => {
    const { Horario_Inicial, Horario_Final, Plantio_idPlantio } = req.body;
    const resposta = await incluirIrrigacao(Horario_Inicial, Horario_Final, Plantio_idPlantio);

    if (resposta.affectedRows > 0) {
        res.json({ msg: 'Irrigação cadastrada com sucesso' });
    } else {
        res.json({ msg: 'Falha no cadastro da irrigação!' });
    }
});

// Rotas de colheita
server.get('/colheitas', async (req, res) => {
    const colheitas = await obterColheitas();
    res.json(colheitas);
});

server.post('/colheitas', async (req, res) => {
    const { Plantio_idPlantio, Data_colheita, Quantidade_c, Qualidade } = req.body;
    const resposta = await incluirColheita(Plantio_idPlantio, Data_colheita, Quantidade_c, Qualidade);

    if (resposta.affectedRows > 0) {
        res.json({ msg: 'Colheita cadastrada com sucesso' });
    } else {
        res.json({ msg: 'Falha no cadastro da colheita!' });
    }
});

server.listen(3000, () => {
    console.log('Servidor Online');
});
