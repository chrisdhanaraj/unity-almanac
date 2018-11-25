import { prisma } from "../../generated/prisma-client";
import { schools } from "../constants/elements";

const createSchools = async () => {
  const promiseArray = [];

  Object.keys(schools).forEach(key => {
    const school = schools[key];

    const newSchool = {
      name: school.name
    };

    if (school.element !== null) {
      newSchool.element = {
        connect: {
          name: school.element
        }
      };
    }

    promiseArray.push(
      prisma.createSchool({
        ...newSchool
      })
    );
  });

  return Promise.all(promiseArray);
};

export default createSchools;
