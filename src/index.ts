import express from "express";
import * as render from "./render";

const PORT = process.env?.PORT ?? 8080;
const server = express();

start();

server.get("/", async (_req, res) => {
  const html = await render.jsx("home", { name: "JJJ" });
  res.send(html);
});

async function start() {
  console.log("Start server on port %s", PORT);
  try {
    await server.listen(PORT);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}
