import { prisma } from "../../generated/prisma-client";
import { spells } from "../spells";
import { connectAttributes } from "../utils/connectAttributes";

const createSpells = async () => {
  const promiseArray = [];

  spells.forEach(spell => {
    const { attributes, element, school, ...rest } = spell;
    const optional = {};

    if (element !== null) {
      optional.element = {
        connect: {
          name: element
        }
      };
    }

    if (school !== null) {
      optional.school = {
        connect: {
          name: school
        }
      };
    }

    optional.attributes = connectAttributes(attributes);

    promiseArray.push(
      prisma.createAbility({
        ...rest,
        ...optional
      })
    );
  });

  return Promise.all(promiseArray);
};

export default createSpells;
