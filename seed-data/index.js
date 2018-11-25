import globby from "globby";
import fs from "fs";
import processSchool from "./processSchool";
import { prisma } from "../generated/prisma-client";
import path from "path";
import lodash from "lodash";

let allSpells = [];

(async () => {
  const paths = await globby([`${__dirname}/../seed-docs/abilities/*.txt`]);
  const readPromiseArr = [];

  paths.forEach(rawPath => {
    const filePath = rawPath;

    const data = fs.readFileSync(filePath, "utf8");
    let content = data.toString().split("\n");

    const filterContent = content
      .filter(line => {
        return line.length > 1 && line !== "\r";
      })
      .map(line => {
        const strip = line.replace("\r", "");

        return strip;
      });

    const school = processSchool(filterContent);
    allSpells = [...allSpells, ...school];
  });

  var jsonData = JSON.stringify(allSpells, null, 2);

  const {
    tierData,
    costTypeData,
    attributeData,
    areaOfEffectTypeData,
    rangeTypeData
  } = allSpells.reduce(
    (allContent, spell) => {
      const {
        tierData,
        costTypeData,
        attributeData,
        areaOfEffectTypeData,
        rangeTypeData
      } = allContent;

      tierData.push(spell.tier);
      costTypeData.push(spell.costType);
      attributeData.push(...spell.attributes);
      areaOfEffectTypeData.push(spell.areaOfEffectType);
      rangeTypeData.push(spell.rangeType);

      return allContent;
    },
    {
      tierData: [],
      costTypeData: [],
      attributeData: [],
      areaOfEffectTypeData: [],
      rangeTypeData: []
    }
  );

  const uniqueTiers = lodash.uniq(tierData);
  const uniqueCostTypes = lodash.uniq(costTypeData);
  const uniqueAttributes = lodash.uniq(attributeData);
  const uniqueAreaOfEffectType = lodash.uniq(areaOfEffectTypeData);
  const uniqueRangeType = lodash.uniq(rangeTypeData);

  fs.writeFileSync(
    path.resolve(`${__dirname}/spells.js`),
    `export const spells = ${jsonData}`
  );

  fs.writeFileSync(
    path.resolve(`${__dirname}/tiers.js`),
    JSON.stringify(uniqueTiers, null, 2)
  );

  fs.writeFileSync(
    path.resolve(`${__dirname}/costTypes.js`),
    JSON.stringify(uniqueCostTypes, null, 2)
  );

  fs.writeFileSync(
    path.resolve(`${__dirname}/attributes.js`),
    JSON.stringify(uniqueAttributes, null, 2)
  );

  fs.writeFileSync(
    path.resolve(`${__dirname}/areaOfEffects.js`),
    JSON.stringify(uniqueAreaOfEffectType, null, 2)
  );

  fs.writeFileSync(
    path.resolve(`${__dirname}/range.js`),
    JSON.stringify(uniqueRangeType, null, 2)
  );
})();
