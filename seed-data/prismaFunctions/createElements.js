import { prisma } from "../../generated/prisma-client";
import { elements } from "../constants/elements";

const createElements = async () => {
  const promiseArray = [];

  Object.keys(elements).forEach(key => {
    const element = elements[key];

    promiseArray.push(prisma.createElement(element));
  });

  return Promise.all(promiseArray);
};

export default createElements;
