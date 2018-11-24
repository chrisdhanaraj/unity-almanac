import { Tier, TierConstants, VampirismSet } from "./constants/constants";
import { elements, schools } from "./constants/elements";
import processSpellTier from "./utils/processFunctions";

const processSchool = data => {
  let abilityCategory = "";
  let currentTier = "";
  let spellsStart = false;

  const noviceSpells = [];
  const adeptSpells = [];
  const expertSpells = [];
  const masterSpells = [];

  const filterLines = data.filter(line => {
    return line !== "________________";
  });

  filterLines.forEach((lineContent, index) => {
    if (index === 0) {
      abilityCategory = lineContent.trim();
    }

    if (lineContent.includes("Novice Incantations")) {
      spellsStart = true;
    }

    if (spellsStart) {
      if (lineContent !== "________________") {
        if (TierConstants.includes(lineContent)) {
          currentTier = Tier[lineContent];
        } else {
          switch (currentTier) {
            case "NOVICE": {
              noviceSpells.push(lineContent);
              break;
            }
            case "ADEPT": {
              adeptSpells.push(lineContent);
              break;
            }
            case "EXPERT": {
              expertSpells.push(lineContent);
              break;
            }
            case "MASTER": {
              masterSpells.push(lineContent);
              break;
            }
            default: {
              // console.log("Not in a defined tier");
            }
          }
        }
      }
    }
  });

  const element = VampirismSet.includes(abilityCategory)
    ? null
    : schools[abilityCategory].element;

  const school = VampirismSet.includes(abilityCategory)
    ? null
    : schools[abilityCategory].name;

  const novice = processSpellTier(noviceSpells, "NOVICE", element, school);
  const adept = processSpellTier(adeptSpells, "ADEPT", element, school);
  const expert = processSpellTier(expertSpells, "EXPERT", element, school);
  const master = processSpellTier(masterSpells, "MASTER", element, school);

  const category = [...novice, ...adept, ...expert, ...master];

  return category;
};

export default processSchool;
