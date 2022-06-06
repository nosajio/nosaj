import express from "express";

const PORT = process.env?.PORT ?? 8080;
const server = express();

start();

const views = {
  async _document(props: Record<any, any>) {
    const file = (await import("./views/_document")).default;
    return file(props);
  },

  async home(props: Record<any, any>) {
    const file = (await import("./views/home")).default;
    return file(props);
  },
};

async function jsx(view: keyof typeof views, options?: Record<string, any>) {
  const renderFile = async () => {
    const body = await views[view](options ?? {});
    const doc = await views._document({ children: body });
    return doc.outerHTML;
  };

  try {
    return await renderFile();
  } catch (err) {
    console.error(err);
  }
}

server.get("/", async (_req, res) => {
  const html = await jsx("home", { name: "JJJ" });
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
