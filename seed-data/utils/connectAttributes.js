import { CostType } from "../constants/constants";

export const connectAttributes = attributes => {
  const formattedAttributes = attributes.map(attr => {
    return {
      name: attr
    };
  });

  return {
    connect: formattedAttributes
  };
};

export const standardSpellAttributes = tier => ({
  tier,
  costType: CostType.AP,
  costAmount: 2
});
