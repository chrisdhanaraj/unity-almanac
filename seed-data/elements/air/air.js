const aeromancy = require("./schools/aeromancy");

const elementAir = {
  name: "Air",
  description:
    "Air represents the sky, the heavens, and the intangible. It is ceaseless in its change, but such change is too often unnoticed until the storm descends. It is an element of uncertainty.",
  schools: {
    create: [aeromancy]
  }
};

module.exports = elementAir;
