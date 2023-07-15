const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const multer = require('multer');
const path = require('path');
const nodemailer = require('nodemailer');
const port =  3001; // obter a porta do Vercel ou usar a porta 3000

const transport = nodemailer.createTransport({
  host: 'smtp.office365.com',
  port: 587,
  secure: false,
  auth: {
      user: 'jfernandesbot@hotmail.com',
      pass: '28092004bot',
  }
});

const app = express();

// Configura o middleware body-parser
app.use(bodyParser.urlencoded({ extended: true }));

// Cria a conexão com o banco de dados
const connection = mysql.createConnection({
  host: 'containers-us-west-57.railway.app',
  user: 'root',
  password: '4FBWQChE2RZHEClQNdjS',
  database: 'railway',
  port: '8053'
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
  const email = req.body.email;
  const telefone = req.body.telefone;
  const curso = req.body.curso;
  const turma = req.body.turma;
  const msg = req.body.msg;
  const receberEmail = req.body.receberEmail;

  if(receberEmail == 'sim'){
    transport.sendMail({
      from: 'Sistema de Atestados <jfernandesbot@hotmail.com>',
      to: `${email}`,
      subject: 'Confirmação de recebimento de atestado',
      text: `Seu atestado foi recebido com sucesso!
      Nome: ${nome}
      Matrícula: ${matricula}
      CPF: ${cpf}
      Telefone: ${telefone}
      Curso: ${curso}
      Turma: ${turma}
      Informações: ${msg}`
    })
    .then(() => console.log('Email enviado com sucesso'))
    .catch((err) => console.log(err));
  }

  // Insere os dados no banco de dados
  const sql = "INSERT INTO dados (nome, matricula, cpf, email, telefone, curso, turma, informacoes) VALUES (?,?,?,?,?,?,?,?)";
  connection.query(sql, [nome, matricula, cpf, email, telefone, curso, turma, msg], function(err, result) {
    if (err) throw err;
    console.log('Dados inseridos com sucesso!');
    res.writeHead(302, {
      'Location': 'https://atestados.vercel.app/'
    });
    res.end();
  });
});

// Inicia o servidor
app.listen(port, () => {
  console.log(`Servidor iniciado na porta ${port}`);
});