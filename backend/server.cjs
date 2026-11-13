const express = require("express");
const app = express();

app.get("/api/health", (req, res) => {
  res.json({ status: "ok" });
});

app.use(express.json());

app.post("/api/prompts", (req, res) => {
  const dados = req.body ?? {};
  const campos = ["context", "objective", "code", "error", "directive"];

  const faltando = campos.filter(
    (campo) => typeof dados[campo] !== "string" || dados[campo].trim() === ""
  );

  if (faltando.length > 0) {
    return res.status(400).json({
      error: "Preencha os cinco campos do prompt.",
      fields: faltando
    });
  }

  if (!["gemini", "openai"].includes(dados.provider)) {
    return res.status(400).json({ error: "Selecione Gemini ou OpenAI." });
  }

  res.json({
    provider: dados.provider,
    content: "Resposta de teste. Os cinco campos chegaram ao backend.",
    simulated: true
  });
});

app.listen(3001, "127.0.0.1", () => {
  console.log("Backend rodando em http://127.0.0.1:3001");
});