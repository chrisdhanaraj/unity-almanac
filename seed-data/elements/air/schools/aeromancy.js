const aeromancy = {
  name: "Aeromancy",
  description: "School of Aeromancy",
  spells: {
    create: [
      {
        name: "Call Lightning",
        description:
          "This spell calls down a bolt from the blue on a single target. That creature is attacked for 6 electric damage; if hit, they are shocked for (1 + net hits) rounds, reducing their AP by 1.",
        tier: NOVICE,
        attributes: 
      }
    ]
  }
};

module.exports = aeromancy;
