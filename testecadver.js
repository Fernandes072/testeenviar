const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const port = process.env.PORT || 3000; // obter a porta do Vercel ou usar a porta 3000

const app = express();

// Configura o middleware body-parser
app.use(bodyParser.urlencoded({ extended: true }));

// criar uma conexão com o banco de dados
const connection = mysql.createConnection({
  host: 'containers-us-west-190.railway.app',
  user: 'root',
  password: 'uF1YkyevPV5usJbw8iYn',
  database: 'railway',
  port: '6178'
});

// Cria uma rota para receber os dados do formulário
app.post('/enviar-dados', function(req, res) {
  const nome = req.body.nome;
  const matricula = req.body.matricula;
  const cpf = req.body.cpf;
  const email = req.body.email;
  const telefone = req.body.telefone;
  const curso = req.body.curso;
  const turma = req.body.turma;
  const msg = req.body.msg;

  // Insere os dados no banco de dados
  const sql = "INSERT INTO dados (nome, matricula, cpf, email, telefone, curso, turma, informacoes) VALUES (?,?,?,?,?,?,?,?)";
  connection.query(sql, [nome, matricula, cpf, email, telefone, curso, turma, msg], function(err, result) {
    if (err) throw err;
    console.log('Dados inseridos com sucesso!');
    res.send('Dados inseridos com sucesso!');
  });
});

// iniciar o servidor
server.listen(port, () => {
    console.log(`Servidor iniciado na porta ${port}`);
  });