const express = require("express");
const router = express.Router();
const pool = require("../db");

const {
  validaDadosClientes,
  buscaTodosClientes,
  buscaClientePorId,
} = require("../middlewares/produtoMiddleware");

router.get("/", buscaTodosClientes, (req, res) => {
  res.render("clientes");
});

router.get("/novo", (req, res) => {
  res.render("novo-cliente");
});

router.post("/add", validaDadosClientes, async (req, res) => {
  const { id, nome, email} = req.body;
  try {
    await pool.query("INSERT INTO produtos (id, nome, email) VALUES (?, ?)", [
      id,
      nome,
      email,
    ]);
    res.redirect("/clientes");
  } catch (error) {
    console.error(error);
    res.status(500).send("Erro ao adicionar cliente.");
  }
});

router.get("/detalhe/:id", buscaClientePorId, (req, res) => {
  res.render("detalhe-cliente");
});

module.exports = router;