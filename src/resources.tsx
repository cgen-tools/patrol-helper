const SKILL_TYPES = [
  "TEACHER",
  "HUNTER",
  "FIGHTER",
  "RUNNER",
  "CLIMBER",
  "SWIMMER",
  "SPEAKER",
  "MEDIATOR",
  "CLEVER",
  "INSIGHTFUL",
  "SENSE",
  "KIT",
  "STORY",
  "LORE",
  "CAMP",
  "HEALER",
  "STAR",
  "DARK",
  "OMEN",
  "DREAM",
  "CLAIRVOYANT",
  "PROPHET",
  "GHOST",
];

const SKILLS = ["1", "2", "3", "4"].flatMap((n) => {
  return SKILL_TYPES.map((value) => `${value},${n}`);
});

const TRAITS = [
  "troublesome",
  "lonesome",
  "fierce",
  "bloodthirsty",
  "cold",
  "childish",
  "playful",
  "charismatic",
  "bold",
  "daring",
  "nervous",
  "righteous",
  "insecure",
  "strict",
  "compassionate",
  "thoughtful",
  "ambitious",
  "confident",
  "adventurous",
  "calm",
  "careful",
  "faithful",
  "loving",
  "loyal",
  "responsible",
  "shameless",
  "sneaky",
  "strange",
  "vengeful",
  "wise",
  "arrogant",
  "competitive",
  "grumpy",
  "cunning",
  "oblivious",
  "gloomy",
  "sincere",
  "flamboyant",
  "rebellious",
];

const INJURIES = [
  "claw-wound",
  "bite-wound",
  "cat bite",
  "beak bite",
  "snake bite",
  "rat bite",
  "tick bites",
  "blood loss",
  "broken jaw",
  "broken bone",
  "mangled leg",
  "dislocated joint",
  "joint pain",
  "sprain",
  "mangled tail",
  "bruises",
  "cracked pads",
  "sore",
  "phantom pain",
  "scrapes",
  "small cut",
  "torn pelt",
  "torn ear",
  "frostbite",
  "recovering from birth",
  "water in their lungs",
  "burn",
  "severe burn",
  "shock",
  "lingering shock",
  "shivering",
  "dehydrated",
  "head damage",
  "damaged eyes",
  "quilled by a porcupine",
  "broken back",
  "poisoned",
  "bee sting",
  "headache",
  "severe headache",
  "pregnant",
  "battle_injury",
  "minor_injury",
  "blunt_force_injury",
  "hot_injury",
  "cold_injury",
  "big_bite_injury",
  "small_bite_injury",
  "beak_bite",
  "rat_bite",
  "sickness",
];

export { SKILLS, TRAITS, INJURIES };
