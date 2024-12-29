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

export { SKILLS };
