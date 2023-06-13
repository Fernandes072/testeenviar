const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const app = express();

app.use(express.static('public'));

// Configura o middleware body-parser
app.use(bodyParser.urlencoded({ extended: true }));

// Cria a conexão com o banco de dados
const connection = mysql.createConnection({
    host: 'containers-us-west-190.railway.app',
    user: 'root',
    password: 'uF1YkyevPV5usJbw8iYn',
    database: 'railway',
    port: '6178'
});

// Verifica a conexão
connection.connect(function(err) {
  if (err) throw err;
  console.log('Conectado ao banco de dados MySQL!');
});

// Cria uma rota para receber os dados do formulário
app.post('/enviar-dados', function(req, res) {
  const nome = req.body.nome;
  const matricula = req.body.matricula;
  const cpf = req.body.cpf;

  // Insere os dados no banco de dados
  const sql = `INSERT INTO alunos (nome, matricula, cpf) VALUES (?, ?, ?)`;
  connection.query(sql, [nome, matricula, cpf], function(err, result) {
    if (err) throw err;
    console.log('Dados inseridos com sucesso!');
    res.send('Dados inseridos com sucesso!');
  });
});

// Inicia o servidor
const server = app.listen(process.env.PORT || 3000, function() {
  const port = server.address().port;
  console.log(`Servidor iniciado na porta ${port}`);
});