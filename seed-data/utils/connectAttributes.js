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
