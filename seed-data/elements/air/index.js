const prisma = require('../../../generated/prisma-client');
import aeromancy from './schools/aeromancy';

console.log(aeromancy);

async function createAir() {
  await prisma.prisma.createElement({
    name: 'Air',
    description:
      'Air represents the sky, the heavens, and the intangible. It is ceaseless in its change, but such change is too often unnoticed until the storm descends. It is an element of uncertainty.',
    schools: {
      create: [aeromancy]
    }
  });
}

module.exports = createAir;
