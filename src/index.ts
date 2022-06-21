import express from "express";
import path from "path";
import { view } from "./render";
import "./styles/globals.scss";
import { home, _document } from "./views";

const PORT = process.env?.PORT ?? 8080;
const server = express();

start();

async function start() {
  console.log("Start server on port %s", PORT);
  try {
    server.listen(PORT);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

// Fallthrough middleware to serve files like css from the public dir
server.use(express.static(path.join(__dirname, "public")));

server.get("/", (_req, res) => {
  const page = _document({ children: home() });
  res.end(page.outerHTML);
});

server.get("/r/:slug", (req, res) => {
  const slug = req.params.slug;
  console.log(slug);
  res.end(_document({ children: slug }).outerHTML);
});
