import globby from "globby";
import fs from "fs";
import processSchool from "./processSchool";
import { prisma } from "../generated/prisma-client";
import path from "path";
import lodash from "lodash";

let allSpells = [];

(async () => {
  const paths = await globby(["../seed-docs/abilities/*.txt"]);
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

  const attributeData = allSpells.reduce((attributeData, spell) => {
    attributeData = [...attributeData, ...spell.attributes];

    return attributeData;
  }, []);

  const uniqueAttributes = lodash.uniq(attributeData);

  fs.writeFileSync(path.resolve("./spells.js"), jsonData);
  fs.writeFileSync(
    path.resolve("./attributes.js"),
    JSON.stringify(uniqueAttributes, null, 2)
  );
})();
