const http = require('http');
const mysql = require('mysql2');
const port = process.env.PORT || 3000; // obter a porta do Vercel ou usar a porta 3000

// criar uma conexão com o banco de dados
const connection = mysql.createConnection({
  host: 'containers-us-west-190.railway.app',
  user: 'root',
  password: 'uF1YkyevPV5usJbw8iYn',
  database: 'railway',
  port: '6178'
});

// criar o servidor HTTP
const server = http.createServer((req, res) => {
  // habilitar o CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // executar uma consulta
  connection.query(
    'SELECT * FROM dados',
    function(err, results, fields) {
      if (err) {
        console.error(err);
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/plain');
        res.end('Hello, World!');
        return;
      }
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify(results));
    }
  );
});

// iniciar o servidor
server.listen(port, () => {
    console.log(`Servidor iniciado na porta ${port}`);
  });