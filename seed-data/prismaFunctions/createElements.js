import { prisma } from "../../generated/prisma-client";
import { elements } from "../constants/elements";

const createElements = async () => {
  const promiseArray = [];

  Object.map(elements).forEach(key => {
    const element = elements[key];

    promiseArray.push(prisma.createElement(element));
  });

  await Promise.all(promiseArray);
};

export default createElements;
