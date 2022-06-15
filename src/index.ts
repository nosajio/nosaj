import express from "express";
import path from "path";
import * as render from "./render";
import "./styles/globals.css";

const PORT = process.env?.PORT ?? 8080;
const server = express();

start();

// Fallthrough middleware to serve files like css from the public dir
server.use(express.static(path.join(__dirname, "public")));

server.get("/", async (_req, res) => {
  const html = await render.jsx("home", { name: "JJJ" });
  console.log(html);
  res.end(html);
});

async function start() {
  console.log("Start server on port %s", PORT);
  try {
    server.listen(PORT);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}
