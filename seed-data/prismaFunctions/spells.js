import { prisma } from "../../generated/prisma-client";

import createAttributes from "./createAttributes";
import createElements from "./createElements";
import createSchools from "./createSchools";
import createSpells from "./createSpells";

// A `main` function so that we can use async/await
async function main() {
  await createSpells();
}

main().catch(e => console.error(e));
