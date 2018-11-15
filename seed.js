const { prisma } = require("./generated/prisma-client");
const createAttributes = require("./seed-data/attributes");
const createAir = require("./seed-data/elements/air");

// A `main` function so that we can use async/await
async function main() {
  createAttributes();
  createAir();
}

main().catch(e => console.error(e));
