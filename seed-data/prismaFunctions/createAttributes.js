const { prisma } = require("../generated/prisma-client");
import { AttributesSet } from "../constants/constants";

const createAttributes = async () => {
  const promiseArray = [];
  AttributesSet.forEach(attr => {
    promiseArray.push(prisma.createAttribute(attr));
  });

  await Promise.all(promiseArray);
};

export default createAttributes;
