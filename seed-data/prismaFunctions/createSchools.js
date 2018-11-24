import { prisma } from "../../generated/prisma-client";
import { schools } from "../constants/elements";

const createSchools = async () => {
  const promiseArray = [];

  Object.keys(schools).forEach(key => {
    const school = schools[key];

    promiseArray.push(
      prisma.createSchool({
        name: school.name,
        element: {
          connect: {
            name: school.element
          }
        }
      })
    );
  });

  await Promise.all(promiseArray);
};

export default createSchools;
