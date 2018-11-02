const { prisma } = require("./generated/prisma-client");

// A `main` function so that we can use async/await
async function main() {
  // Create a new user called `Alice`
  const newElement = await prisma.createElement({
    name: "Air",
    description:
      "Air represents the sky, the heavens, and the intangible. It is ceaseless in its change, but such change is too often unnoticed until the storm descends. It is an element of uncertainty.",
    schools: {
      create: [
        {
          name: "Aeromancy",
          description: "School of Aeromancy",
          spells: {
            create: [
              {
                name: "Call Lightning",
                description:
                  "This spell calls down a bolt from the blue on a single target. That creature is attacked for 6 electric damage; if hit, they are shocked for (1 + net hits) rounds, reducing their AP by 1."
              }
            ]
          }
        }
      ]
    }
  });
}

main().catch(e => console.error(e));
