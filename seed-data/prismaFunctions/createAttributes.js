import { prisma } from "../../generated/prisma-client";
import { AttributesSet } from "../constants/constants";

const createAttributes = async () => {
  const promiseArray = [];
  AttributesSet.forEach(attr => {
    promiseArray.push(
      prisma.createAttribute({
        name: attr
      })
    );
  });

  return Promise.all(promiseArray);
};

export default createAttributes;
