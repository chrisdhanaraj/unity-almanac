const { prisma } = require('../generated/prisma-client');

const attributes = [
  {
    name: 'Cantrip'
  },
  {
    name: 'Enchantment Spell'
  },
  {
    name: 'Ranged Spell Attack'
  },
  {
    name: 'Cloud Spell'
  },
  {
    name: 'Spell Attack'
  },
  {
    name: 'Summoning Spell'
  },
  {
    name: 'Area Spell Attack'
  },
  {
    name: 'Spell'
  },
  {
    name: 'Ritual Spell'
  },
  {
    name: 'Wall Spell'
  }
];

const createAttributes = async () => {
  const promiseArray = [];
  attributes.forEach(attr => {
    promiseArray.push(prisma.createAttribute(attr));
  });

  await Promise.all(promiseArray);
};

module.exports = createAttributes;
