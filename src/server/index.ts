import njk from "nunjucks";
import express from "express";
import path from 'path';

const PORT = process.env?.PORT ?? 8080;
const server = express({ logger: true });
const viewsDir = path.join('src', 'server', 'views');

njk.configure(viewsDir, {
  autoescape: true,
  express: server,
});

start();

server.get("/", async (req, res) => {
  res.render("home.njk");
});

async function start() {
  console.log("Start server on port %s", PORT);
  try {
    await server.listen(PORT);
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
}
