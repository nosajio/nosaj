import fastify from "fastify";

const PORT = process.env?.PORT ?? 8080;
const server = fastify({ logger: true });

start();

server.get("/", async (req, res) => {
  return {
    one: 3,
  };
});

async function start() {
  console.log("start server");
  try {
    await server.listen(PORT);
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
}