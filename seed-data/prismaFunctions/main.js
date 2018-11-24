import { prisma } from "../../generated/prisma-client";

import createAttributes from "./createAttributes";
import createElements from "./createElements";

// A `main` function so that we can use async/await
async function main() {
  createAttributes();
  createElements();
}

main().catch(e => console.error(e));
