require("dotenv").config();
const express = require("express");
const app = express();
const port = 3000;
const mysql = require('myql2/promise');

// Importa as rotas
const produtosRoutes = require("./rotas/produtosRoutes");

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'sua_senha',
  database: 'nome_do_banco'
});

// Configura o EJS como view engine
app.set("view engine", "ejs");
app.set("views", "./views");

// Middlewares
app.use(express.static("public")); // Serve arquivos da pasta 'public'
app.use(express.urlencoded({ extended: true })); // Para ler dados de formulários

// Monta as rotas
app.use("/produtos", produtosRoutes);

// Rota principal (já servida automaticamente pelo express.static se houver um index.html)

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});

module.exports = pool;