import { startCase } from "lodash";
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
    content.areaOfEffectType = startCase(areaValue);
  } else if (areaValue.includes("radius")) {
    content.areaOfEffectType = startCase("radius");
    content.areaOfEffectRadius = +areaValue.slice(
      0,
      areaValue.indexOf("radius") - 2
    );
  } else if (areaValue.includes("line")) {
    content.areaOfEffectType = startCase("line");
    content.areaOfEffectLine = areaValue.slice(
      0,
      areaValue.indexOf("line") - 2
    );
  } else if (areaValue.includes("’")) {
    content.areaOfEffectType = startCase("radius");
    content.areaOfEffectRadius = +areaValue.slice(0, areaValue.indexOf("’"));
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

function processAP({ lineContent, maintain = false }) {
  const apArr = lineContent.split(" ");
  const costObject = {};

  if (maintain) {
    return {
      maintainCostType: "AP",
      maintainCostAmount: +apArr[0]
    };
  }

  return {
    costType: "AP",
    costAmount: +apArr[0]
  };
}

function processTime({ lineContent, maintain = false, name }) {
  const properties = {};

  properties[maintain ? "maintainCostType" : "costType"] = "Time";

  if (lineContent.includes("/")) {
    const multipleTimes = lineContent.split("/");

    const [primaryAmount, primaryUnit] = multipleTimes[0].split(" ");
    const [secondaryAmount, secondaryUnit] = multipleTimes[1].split(" ");

    properties[maintain ? "maintainCostAmount" : "costAmount"] = +primaryAmount;
    properties[maintain ? "maintainCostUnit" : "costUnit"] = primaryUnit;
    properties[
      maintain ? "maintainSecondaryCostAmount" : "secondaryCostAmount"
    ] = +secondaryAmount;
    properties[
      maintain ? "maintainSecondaryCostUnit" : "secondaryCostUnit"
    ] = secondaryUnit;
  } else {
    const timeArr = lineContent.split(" ");
    const [amount, unit] = timeArr;

    if (TimeConstants.some(time => unit.toLowerCase().includes(time))) {
      properties[maintain ? "maintainCostAmount" : "costAmount"] = +amount;
      properties[maintain ? "maintainCostUnit" : "costUnit"] = unit;
    } else {
      console.log("No time unit", amount, unit, name);
    }
  }

  return properties;
}

function processAttributesAndCost(lineContent, name) {
  let formattedContent = lineContent.replace("(", "");
  formattedContent = formattedContent.replace(")", "");

  const content = formattedContent.split(", ");

  const properties = content.reduce(
    (properties, prop) => {
      if (prop.includes("maintain")) {
        let [initial, maintain] = prop.split("/");
        maintain = maintain.replace("maintain", "").trim();
        const initialCost = initial.includes("AP")
          ? processAP({
              lineContent: initial
            })
          : processTime({
              lineContent: initial
            });

        const maintainCost = maintain.includes("AP")
          ? processAP({
              lineContent: maintain,
              maintain: true
            })
          : processTime({
              lineContent: maintain,
              maintain: true
            });

        properties = {
          ...properties,
          ...initialCost,
          ...maintainCost
        };
      } else if (
        TimeConstants.some(time => prop.toLowerCase().includes(time))
      ) {
        properties = {
          ...properties,
          ...processTime({
            lineContent: prop,
            name
          })
        };
      } else if (prop.includes("AP")) {
        properties = {
          ...properties,
          ...processAP({
            lineContent: prop
          })
        };
      } else {
        // attribute
        properties.attributes.push(startCase(prop));
      }

      return properties;
    },
    {
      attributes: []
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
