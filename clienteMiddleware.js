const pool = require("../db");

const validaDadosClientes = (req, res, next) => {
  const { id, nome, email } = req.body;
  if (!id || !nome || !email)  {
    return res.render("novo-cliente", {
      error: "Todos os campos são obrigatórios!",
    });
  }
  if (isNaN(id) || String(nome) || String(email) <= 0) {
    return res.render("novo-cliente", {
      error: "O cliente deve ser um cliente válido.",
    });
  }
  next();
};

const buscaTodosClientes = async (req, res, next) => {
  try {
    const [rows] = await pool.query("SELECT * FROM clientes");
    res.locals.clientes = rows;
    next();
  } catch (error) {
    console.error(error);
    res.status(500).send("Erro ao buscar clientes.");
  }
};

const buscaClientePorId = async (req, res, next) => {
  const { id } = req.params;
  try {
    const [rows] = await pool.query("SELECT * FROM cliente WHERE id = ?", [
      id,
    ]);
    if (rows.length === 0) {
      return res.status(404).send("Cliente não encontrado");
    }
    res.locals.cliente = rows[0];
    next();
  } catch (error) {
    console.error(error);
    res.status(500).send("Erro ao buscar o cliente]");
  }
};

module.exports = {
  validaDadosClientes,
  buscaTodosClientes,
  buscaClientePorId,
};
