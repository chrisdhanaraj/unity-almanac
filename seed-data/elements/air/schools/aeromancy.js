import {
  connectAttributes,
  standardSpellAttributes
} from '../../../utils/connectAttributes';
import {
  AbilityType,
  TierFormat,
  RangeType,
  AreaOfEffectType,
  DurationType,
  CostType
} from '../../../constants/constants';

const spells = [
  {
    name: 'Gust',
    description:
      'The caster creates a localized breeze. She can create Winds of up to Strength 4 in any location within 30’ of her, which persist for as long as she maintains the spell.',
    costType: CostType.AP,
    costAmount: 1,
    maintainAmount: 1,
    rangeType: RangeType.RANGE,
    rangeAmount: 30,
    areaOfEffectType: AreaOfEffectType.SPECIAL,
    durationType: DurationType.INSTANT,
    attributes: connectAttributes(['Cantrip', 'Area Spell'])
  },
  {
    name: 'Static Shock',
    description:
      'The caster jolts a target with electricity. This spell has a range increment of 30’, deals 1 electric damage, and, on-hit, shocks the target for 1 round, reducing their AP by 1. This spell can only inflict light wounds.',
    costType: CostType.AP,
    costAmount: 1,

    rangeType: RangeType.RANGE_INCREMENT,
    rangeIncrement: 30,
    areaOfEffectType: AreaOfEffectType.SINGLE_TARGET,
    durationType: DurationType.INSTANT,
    attributes: connectAttributes(['Cantrip', 'Ranged Spell Attack'])
  },
  {
    ...standardSpellAttributes(TierFormat.NOVICE),
    name: 'Call Lightning',
    description:
      'This spell calls down a bolt from the blue on a single target. That creature is attacked for 6 electric damage; if hit, they are shocked for (1 + net hits) rounds, reducing their AP by 1.',
    rangeType: RangeType.RANGE_INCREMENT,
    rangeIncrement: 30,
    areaOfEffectType: AreaOfEffectType.SINGLE_TARGET,
    durationType: DurationType.INSTANT,
    attributes: connectAttributes(['Ranged Spell Attack'])
  },
  {
    ...standardSpellAttributes(TierFormat.NOVICE),
    name: 'Fog Cloud',
    description:
      'This spell creates a cloud of fog thick as pea soup at the targeted location. Creatures within the cloud suffer visibility penalties from Fog as long as they remain within it.',
    rangeType: RangeType.RANGE_INCREMENT,
    rangeIncrement: 30,
    areaOfEffectType: AreaOfEffectType.RADIUS,
    areaOfEffectRadius: 20,
    durationType: DurationType.ROUNDS,
    durationAmount: '(10 - Wind Strength) rounds',
    attributes: connectAttributes(['Cloud Spell'])
  },
  {
    ...standardSpellAttributes(TierFormat.NOVICE),
    name: 'Gale',
    description:
      'This spell creates a localized windstorm at a targeted location. These Winds have a Strength of 9 and blow in a direction chosen by the caster when the spell is cast.',
    rangeType: RangeType.RANGE_INCREMENT,
    rangeIncrement: 30,
    areaOfEffectType: AreaOfEffectType.RADIUS,
    areaOfEffectRadius: 15,
    durationType: DurationType.MINUTES,
    durationAmount: '(Casting check) minutes',
    attributes: connectAttributes(['Enchantment Spell'])
  },
  {
    ...standardSpellAttributes(TierFormat.NOVICE),
    name: 'Stormwind Cloak',
    description:
      'This spell protects a touched creature with a whirl of wind and lightning in the shape of armor. This suit of magical Light Armor has the following statistics: Resistance: 0/4/0/0, Encumbrance: 1. The armor also grants Resistance: 10 to electric damage, allows the wearer to ignore Winds, regardless of Strength, and grants them +10’ Speed. By spending 2 AP, the target can either dismiss or resummon the armor for the duration of the spell. Any target already wearing armor cannot be affected by this spell.',
    rangeType: RangeType.MELEE,
    areaOfEffectType: AreaOfEffectType.SINGLE_TARGET,
    durationType: DurationType.MINUTES,
    durationAmount: '(Casting check) minutes',
    attributes: connectAttributes(['Summoning Spell'])
  },
  {
    name: 'Updraft',
    description:
      'This spell creates a lifting column of wind adjacent to the caster; the column has a radius of 10’ and is 120’ tall. Any creature within the updraft gains a Hover speed of 15’; however, if they leave the affected area for any reason, they immediately lose this movement mode and fall normally.',
    tier: TierFormat.NOVICE,
    costType: CostType.TIME,
    costAmount: 1,
    rangeType: RangeType.MELEE,
    areaOfEffectType: AreaOfEffectType.SPECIAL,
    durationType: DurationType.MINUTES,
    durationAmount: '(Casting check) minutes',
    attributes: connectAttributes(['Enchantment Spell'])
  },
  {
    ...standardSpellAttributes(TierFormat.ADEPT),
    name: 'Chain Lightning',
    description:
      'This spell shoots an arc of lightning at an enemy that then chains to nearby other creatures. This spell attacks the initial target, and then up to 3 other creatures all of whom must be within 15’ of the last creature targeted; no individual can be attacked more than once by a single cast of this spell. All targets are attacked for 5 electric damage and, if hit, shocked for (1 + attack net hits) rounds, reducing their AP by 1.',
    rangeType: RangeType.RANGE_INCREMENT,
    rangeIncrement: 30,
    areaOfEffectType: AreaOfEffectType.SPECIAL,
    durationType: DurationType.INSTANT,
    attributes: connectAttributes(['Ranged Spell Attack'])
  },
  {
    ...standardSpellAttributes(TierFormat.ADEPT),
    name: 'Eye of the Storm',
    description:
      'Within the eye of the hurricane, all is calm, even as the storm rages all around. This spell removes all cloud effects in the area around the caster, prevents new cloud effects from forming there, and reduces all winds in the area to Strength 0. Effects existing only partially within the affected area are only suppressed where the two overlap',
    rangeType: RangeType.CASTER,
    areaOfEffectType: AreaOfEffectType.RADIUS,
    areaOfEffectRadius: 15,
    durationType: DurationType.MINUTES,
    durationAmount: '(Casting check) minutes',
    attributes: connectAttributes(['Enchantment Spell'])
  },
  {
    ...standardSpellAttributes(TierFormat.ADEPT),
    name: 'Slipstream',
    description:
      'This spell imbues a touched target with the grace of the Four Winds. While enchanted, they do not provoke any opportunity attacks from movement (including from moving between Melee Spacing), all attacks that would glance them instead miss, and they gain a +5 bonus to Acrobatics checks',
    rangeType: RangeType.MELEE,
    areaOfEffectType: AreaOfEffectType.SINGLE_TARGET,
    durationType: DurationType.MINUTES,
    durationAmount: '(Casting check) minutes',
    attributes: connectAttributes(['Enchantment Spell'])
  },
  {
    name: 'Whispering Wind',
    description:
      'This spell carries a spoken message on the wind to a faraway location. When this spell is completed, the caster can speak for up to 1 minute; the wind then carries that message (and other ambient noise near her) to an intended location or recipient within (50 * casting check) miles and repeats the message in a normal speaking voice. The caster must be familiar with the target/location in order to have a message successfully delivered there. The Whispering Wind travels at 30 miles per hour and is indistinguishable from normal wind until it reaches its destination. This ritual requires a quill pen made from the feather of a migratory bird (worth 25s).',
    costType: CostType.TIME,
    costAmount: 60,
    rangeType: RangeType.SPECIAL,
    areaOfEffectType: AreaOfEffectType.SINGLE_TARGET,
    durationType: DurationType.VARIABLE,
    attributes: connectAttributes(['Ritual Spell'])
  },
  {
    ...standardSpellAttributes(TierFormat.ADEPT),
    name: 'Wind Wall',
    description:
      'This spell creates a curtain of swirling winds that is 5’ wide, 10’ high, and up to 100’ long; at least some part of the wall must be within the base range of the spell, but it can extend beyond this range. The wind wall is considered to have winds of Strength 12 pushing outward from its center for the purposes of any creature attempting to move, fly, or attack through it; cloud effects within the wall’s area are affected as well.',
    rangeType: RangeType.RANGE,
    rangeAmount: 15,
    areaOfEffectType: AreaOfEffectType.SPECIAL,
    durationType: DurationType.MINUTES,
    durationAmount: '(Casting check) minutes',
    attributes: connectAttributes(['Wall Spell'])
  },
  {
    ...standardSpellAttributes(TierFormat.EXPERT),
    name: 'Aerial Step',
    description:
      'This spell enchants a touched creature, giving them a Fly speed of 45’ for the duration of the spell.',
    rangeType: RangeType.MELEE,
    areaOfEffectType: AreaOfEffectType.SINGLE_TARGET,
    durationType: DurationType.HOURS,
    durationAmount: '(Casting check) hours',
    attributes: connectAttributes(['Enchantment Spell'])
  },
  {
    ...standardSpellAttributes(TierFormat.EXPERT),
    name: 'Hammer of Jer',
    description:
      'This spell creates a magical Mace crackling with electrical potential in the hands of a touched creature. The hammer has the following statistics and persists for the full duration of the spell: Attack: 6/1/0, Defense: 1, Damage: 12 (electric), Reach: 5’, Size: M. The target can use her Melee Weapons skill, or whatever skill was used to cast the spell, when attacking with the hammer; its attack checks are modified by Strength as normal for a 2-handed weapon. Any creature hit by the Hammer of Jer is pushed backwards 5’ and deafened, preventing them from hearing anything. The wielder can sheathe and draw the hammer normally; while “sheathed,” it disappears back into the aether and cannot be seen or interacted with.',
    rangeType: RangeType.MELEE,
    areaOfEffectType: AreaOfEffectType.SINGLE_TARGET,
    durationType: DurationType.MINUTES,
    durationAmount: '(Casting check) minutes',
    attributes: connectAttributes(['Summoning Spell'])
  },
  {
    ...standardSpellAttributes(TierFormat.EXPERT),
    name: 'Lightning Bolt',
    description:
      'This spell causes a bolt of lightning to erupt from the caster’s fingers, attacking all creatures in a 120’ long and 15’ wide line for 7 electric damage. Any creature hit is shocked for (1 + AP) rounds, reducing their AP by 1.',
    rangeType: RangeType.CASTER,
    areaOfEffectType: AreaOfEffectType.LINE,
    areaOfEffectLine: "120' x 15'",
    durationType: DurationType.INSTANT,
    attributes: connectAttributes(['Enchantment Spell'])
  },
  {
    ...standardSpellAttributes(TierFormat.EXPERT),
    name: 'Living Wind',
    description:
      'The caster becomes a creature of pure air. Her creature type changes to Primordial for the duration and she becomes immune to all metabolic and physical ailments. In addition, she gains Concealment at all times, a Hover speed of 120’, becomes immune to cloud effects, and becomes immune to Winds, regardless of Strength. She cannot pass through solid objects, but she can fit through any gap through which air could pass.',
    rangeType: RangeType.CASTER,
    areaOfEffectType: AreaOfEffectType.CASTER,
    durationType: DurationType.MINUTE,
    durationAmount: '(Casting check) minutes',
    attributes: connectAttributes(['Enchantment Spell'])
  },
  {
    ...standardSpellAttributes(TierFormat.EXPERT),
    name: 'Solid Fog',
    description:
      'This spell creates a cloud of unnaturally thick fog; creatures within suffer visibility penalties from Fog as long as they remain within the cloud. In addition, the fog is almost impossible to move through; creatures attempting to move while within the cloud must make an (Athletics + Strength) check against the casting check. If they succeed, they treat the solid fog as difficult terrain; if they fail, they cannot move farther than 5’ with any single movement action or ability.',
    rangeType: RangeType.RANGE_INCREMENT,
    rangeIncrement: 30,
    areaOfEffectType: AreaOfEffectType.RADIUS,
    areaOfEffectRadius: 20,
    durationType: DurationType.ROUNDS,
    durationAmount: '(20 - Wind Strength) rounds',
    attributes: connectAttributes(['Cloud Spell'])
  },
  {
    name: 'Aeolian Boon',
    description:
      'This spell enchants the caster and all creatures within 15’ of her; all affected creatures gain a Fly speed of 60’ for the duration of the enchantment. However, while enchanted, they suffer a -4 penalty to all skill checks modified by Strength, Agility, Intuition, or Magic, as the unnatural buoyancy provided by the spell makes normal physical movements difficult',
    tier: TierFormat.MASTER,
    costType: CostType.TIME,
    costAmount: 1,
    rangeType: RangeType.CASTER,
    areaOfEffectType: AreaOfEffectType.RADIUS,
    areaOfEffectRadius: 15,
    durationType: DurationType.HOURS,
    durationAmount: '(Casting check) hours',
    attributes: connectAttributes(['Enchantment Spell'])
  },
  {
    name: 'Control Weather',
    description:
      'This spell changes the weather. When the ritual is complete, the weather changes to any specific weather event of the caster’s choice and applicable to the current biome (see the Environment section for details). This weather event will persist for its full duration or 1 day, whichever is shorter, at which point natural weather patterns prevail. The affected area of the spell is variable depending on the weather event, but typically will include a several mile radius around where the spell was cast. This ritual requires wind-blown incense burned as part of the spell’s casting (worth 1g).',
    tier: TierFormat.MASTER,
    costType: CostType.TIME,
    costAmount: 60,
    rangeType: RangeType.CASTER,
    areaOfEffectType: AreaOfEffectType.SPECIAL,
    durationType: DurationType.DAYS,
    durationAmount: '1 day',
    attributes: connectAttributes(['Ritual Spell'])
  },
  {
    name: 'Tornado',
    description:
      'This spell summons a tornado with a 10’ radius and a Wind Strength of 17. The caster can mentally control the twister, moving it in a straight line up to 30’ with each AP devoted to this spell. If the caster does not pay the maintenance cost for this spell, the tornado spins in place that round.',
    tier: TierFormat.MASTER,
    costType: CostType.AP,
    costAmount: 2,
    maintainAmount: 1,
    rangeType: RangeType.RANGE,
    rangeAmount: 30,
    areaOfEffectType: AreaOfEffectType.RADIUS,
    areaOfEffectRadius: 10,
    durationType: DurationType.MINUTES,
    durationAmount: '(Casting check) minutes',
    attributes: connectAttributes(['Area Spell'])
  }
];

const connectedSpells = spells.map(spell => {
  return {
    ...spell,
    type: 'SPELL'
  };
});

const aeromancy = {
  name: 'Aeromancy',
  description: 'School of Aeromancy',
  type: 'SPELL',
  spells: {
    create: connectedSpells
  }
};

export default aeromancy;
