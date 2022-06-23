const path = require("path");
const rimraf = require("rimraf");
const fs = require("fs/promises");

const publicDir = path.join(__dirname, "..", "src", "public");
const publicDirDist = path.resolve(__dirname, "..", "dist", "public");

module.exports = copyPublicDir;

async function copyPublicDir() {
  const createAndCopy = async () => {
    // Create the new empty dir in dist, then copy contents over
    await fs.mkdir(publicDirDist, { recursive: true });
    await copyAll(publicDir, publicDirDist);
  };

  // Nuke the current public dir
  try {
    if (await (await fs.stat(publicDirDist)).isDirectory()) {
      rimraf(publicDirDist, createAndCopy);
    } else {
      await createAndCopy();
    }
  } catch (err) {
    await createAndCopy();
  }
}

async function copyAll(src_dir, dst_dir, excludes = []) {
  const dirs = [];
  const srcs = [];
  const ctx = await readdirAll(src_dir, excludes);
  for (const item of ctx) {
    const stats = await fs.stat(item);
    if (!stats.isDirectory()) {
      srcs.push(item);
    } else {
      dirs.push(item);
    }
  }
  for (const dir of dirs) {
    const target = path.join(dst_dir, dir.slice(src_dir.length));
    await fs.mkdir(target, { recursive: true });
  }
  for (const src of srcs) {
    const target = path.join(dst_dir, src.slice(src_dir.length));
    await fs.copyFile(src, target);
  }
}

async function readdirAll(entry, excludes = []) {
  const ctx = [];
  async function recurse(current) {
    let ls = await fs.readdir(current);
    ls = ls.map((item) => path.join(current, item)); // Add entry
    for (const li of ls) {
      if (excludes.includes(li)) continue;
      const stats = await fs.stat(li);
      if (stats.isDirectory()) {
        ctx.push(li);
        await recurse(li);
        continue;
      }
      ctx.push(li);
    }
  }
  await recurse(entry);
  return ctx;
}
