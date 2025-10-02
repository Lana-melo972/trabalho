const mysql = require('mysql2/promise');

const conexao = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'agrocitro'
});

// -- PLANTIO

async function obterPlantas() {
    const [linhas] = await conexao.query('SELECT * FROM plantio');
    return linhas;
}

async function incluirPlantio(Data_Plantio, Variedade, Quantidade_Plantada, Localizacao) {
    const sql = 'INSERT INTO plantio (Data_Plantio, Variedade, Quantidade_Plantada, Localizacao) VALUES (?, ?, ?, ?)'
    const [resultado] = await conexao.execute( sql, [Data_Plantio, Variedade, Quantidade_Plantada, Localizacao]
    );
    return resultado;
}

// -- IRRIGAÇÃO

async function obterIrrigacoes() {
    const [linhas] = await conexao.query('SELECT * FROM irrigacao');
    return linhas;
}

async function incluirIrrigacao(horario_inicial, horario_final, plantio_id) {
    const [resultado] = await conexao.query(
        'INSERT INTO irrigacao (horario_inicial, horario_final, id_plantio) VALUES (?, ?, ?)',
        [horario_inicial, horario_final, plantio_id]
    );
    return resultado;
}

// -- COLETA

async function obterColheitas() {
    const [linhas] = await conexao.query('SELECT * FROM colheita');
    return linhas;
}

async function incluirColheita(plantio_id, data_colheita, quantidade, qualidade) {
    const [resultado] = await conexao.query(
        'INSERT INTO colheita (ID_Plantio, data_colheita, Quantidade_Colhida, qualidade) VALUES (?, ?, ?, ?)',
        [plantio_id, data_colheita, quantidade, qualidade]
    );
    return resultado;
}

// -- Exportar funções
module.exports = {
    obterPlantas,
    incluirPlantio,
    obterIrrigacoes,
    incluirIrrigacao,
    obterColheitas,
    incluirColheita
};