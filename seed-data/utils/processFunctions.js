import { startCase, snakeCase, upperCase } from "lodash";
import {
  TimeConstants,
  RangeType,
  AreaType,
  StandardAreaValues,
  AttributesSet
} from "../constants/constants";

function lineIncludesAttribute(line) {
  return AttributesSet.some(attrib => {
    return line.toLowerCase().includes(`(${attrib.toLowerCase()},`);
  });
}

function processTime(timeLine, name) {
  const properties = {};

  properties.costType = "Time";

  if (timeLine.includes("maintain")) {
    const maintainValue = timeLine.slice(0, timeLine.indexOf("/"));
    const [amount, unit] = maintainValue.split(" ");

    properties.maintainCostAmount = +amount;
    properties.costUnit = unit;
  } else if (timeLine.includes("/")) {
    const multipleTimes = timeLine.split("/");

    const [primaryAmount, primaryUnit] = multipleTimes[0];
    const [secondaryAmount, secondaryUnit] = multipleTimes[1];

    properties.costAmount = primaryAmount;
    properties.costUnit = primaryUnit;
    properties.secondaryCostAmount = secondaryAmount;
    properties.secondaryCostUnit = secondaryUnit;
  } else {
    const timeArr = timeLine.split(" ");
    const [amount, unit] = timeArr;

    if (
      unit === "minute" ||
      unit === "minutes" ||
      unit === "hour" ||
      unit === "hours" ||
      unit === "day"
    ) {
      properties.costAmount = +amount;
      properties.costUnit = unit;
    } else {
      // console.log("No time unit", amount, unit, name);
    }
  }

  return properties;
}

function processRange(rangeValue) {
  const content = {};

  if (rangeValue === "melee" || rangeValue === "special") {
    content.rangeType = RangeType[rangeValue];
  } else if (rangeValue.includes("increment")) {
    content.rangeType = RangeType["increment"];
    content.rangeIncrement = +rangeValue
      .slice(0, rangeValue.indexOf("increment") - 2)
      .trim();
  } else if (rangeValue.includes("caster")) {
    content.rangeType = RangeType["caster"];
  } else if (rangeValue.includes("’")) {
    content.rangeType = RangeType["range"];
    content.rangeAmount = +rangeValue.slice(0, rangeValue.indexOf("’")).trim();
  } else {
    // console.log("unknown range value", rangeValue);
  }

  return content;
}

function processArea(areaValue, name) {
  const content = {};

  if (StandardAreaValues.includes(areaValue)) {
    content.areaOfEffectType = upperCase(snakeCase(areaValue));
  } else if (areaValue.includes("radius")) {
    content.areaOfEffectType = upperCase("radius");
    content.areaOfEffectRadius = +areaValue.slice(
      0,
      areaValue.indexOf("radius") - 2
    );
  } else if (areaValue.includes("line")) {
    content.areaOfEffectType = upperCase("line");
    content.areaOfEffectLine = areaValue.slice(
      0,
      areaValue.indexOf("line") - 2
    );
  } else if (areaValue.includes("’")) {
    content.areaOfEffectType = upperCase("radius");
    content.areaOfEffectLine = +areaValue.slice(0, areaValue.indexOf("’"));
  } else {
    // console.log("unknown area value", areaValue, name);
  }

  return content;
}

function processDuration(durationValue) {
  const content = {};

  if (durationValue.includes("casting check")) {
    content.durationAmount = durationValue.replace(
      "casting check",
      "Casting check"
    );
  } else {
    content.durationAmount = startCase(durationValue);
  }

  return content;
}

function processRangeAoEDuration(lineContent, name) {
  const areaIndex = lineContent.indexOf("Area of Effect");
  const durationIndex = lineContent.indexOf("Duration");

  const range = lineContent.slice(0, areaIndex).trim();
  const area = lineContent.slice(areaIndex, durationIndex).trim();
  const duration = lineContent.slice(durationIndex).trim();

  const rangeValue = range.slice(range.indexOf(":") + 2);
  const areaValue = area.slice(area.indexOf(":") + 2);
  const durationValue = duration.slice(duration.indexOf(":") + 2);

  return {
    ...processRange(rangeValue),
    ...processArea(areaValue, name),
    ...processDuration(durationValue)
  };
}

function processAttributesAndCost(lineContent, name) {
  let formattedContent = lineContent.replace("(", "");
  formattedContent = formattedContent.replace(")", "");

  const content = formattedContent.split(", ");

  const properties = content.reduce(
    (properties, prop) => {
      if (TimeConstants.some(time => prop.toLowerCase().includes(time))) {
        properties = {
          ...properties,
          ...processTime(prop, name)
        };
      } else if (prop.includes("AP")) {
        const apArr = prop.split(" ");
        properties.costType = "AP";
        properties.costAmount = +apArr[0];
      } else {
        // attribute
        properties.attributes.push(startCase(prop));
      }

      return properties;
    },
    {
      attributes: [],
      costType: "",
      costAmount: ""
    }
  );

  return properties;
}

export default function processSpellTier(
  spellTier,
  TIER_LEVEL,
  ELEMENT,
  SCHOOL
) {
  const spells = [];
  let currentSpell = {};

  spellTier.forEach((line, index) => {
    const nextLine = spellTier[index + 1];

    if (nextLine && lineIncludesAttribute(nextLine)) {
      if (currentSpell.name !== undefined) {
        spells.push(currentSpell);
        currentSpell = {};
      }

      const name = spellTier[index];

      currentSpell = {
        name,
        tier: TIER_LEVEL,
        element: ELEMENT,
        school: SCHOOL,
        ...processAttributesAndCost(spellTier[index + 1], name),
        ...processRangeAoEDuration(spellTier[index + 2], name)
      };

      const restOfTier = spellTier.slice(index + 3);

      const indexOfNextAttribute = restOfTier.findIndex(line =>
        lineIncludesAttribute(line)
      );

      const description =
        indexOfNextAttribute === -1
          ? restOfTier
          : restOfTier.slice(0, indexOfNextAttribute - 1);

      currentSpell.description = description.join("\n");
    }
  });

  if (currentSpell.name !== undefined) {
    spells.push(currentSpell);
  }

  return spells;
}
