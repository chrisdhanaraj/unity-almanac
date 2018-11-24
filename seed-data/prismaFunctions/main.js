import { prisma } from "../../generated/prisma-client";

import createAttributes from "./createAttributes";
import createElements from "./createElements";
import createSchools from "./createSchools";

// A `main` function so that we can use async/await
async function main() {
  createAttributes();
  createElements();
  createSchools();
}

main().catch(e => console.error(e));
