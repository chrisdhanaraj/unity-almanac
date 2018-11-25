import { prisma } from "../../generated/prisma-client";

import createAttributes from "./createAttributes";
import createElements from "./createElements";
import createSchools from "./createSchools";
import createSpells from "./createSpells";

// A `main` function so that we can use async/await
async function main() {
  await createAttributes();
  console.log("Attribs done");
  await createElements();
  console.log("Elements done");
  createSchools();
  console.log("Schools done");
  setTimeout(() => {
    createSpells();
  }, 500);
}

main().catch(e => console.error(e));
