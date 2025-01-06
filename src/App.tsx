import {
  Box,
  Button,
  Checkbox,
  Divider,
  Group,
  Modal,
  MultiSelect,
  Radio,
  Slider,
  Space,
  Stack,
  Text,
  Textarea,
  TextInput,
} from "@mantine/core";
import { SKILLS } from "./resources";
import { getDefaultSuccessChance } from "./lib/utils";
import { Outcome } from "./types";
import OutcomeForm from "./components/OutcomeForm";
import CatTypeSelector from "./components/CatTypeSelector";
import { useState } from "react";
import { useDisclosure } from "@mantine/hooks";
import { CodeHighlight } from "@mantine/code-highlight";
import NumCatsSlider from "./components/NumCatsSlider";

type CatTypeCount = {
  name: string;
  label: string;
  value: undefined | [number, number];
};

const defaultCatTypeCount: CatTypeCount[] = [
  {
    name: "warrior",
    label: "Warriors",
    value: undefined,
  },
  {
    name: "normal_adult",
    label: "Warriors, Leaders, or Deputies",
    value: undefined,
  },
  {
    name: "medicine cat",
    label: "Medicine Cats",
    value: undefined,
  },
  {
    name: "leader",
    label: "Leaders",
    value: undefined,
  },
  {
    name: "deputy",
    label: "Deputies",
    value: undefined,
  },
  {
    name: "apprentice",
    label: "Warrior Apprentices",
    value: undefined,
  },
  {
    name: "medicine cat apprentice",
    label: "Medicine Cat Apprentices",
    value: undefined,
  },
  {
    name: "healer cats",
    label: "Medicine Cats or Medicine Cat Apprentices",
    value: undefined,
  },
  {
    name: "all apprentices",
    label: "Any Kind of Apprentices",
    value: undefined,
  },
];

const defaultMinRelationships = [
  {
    name: "romantic",
    label: "Romantic Like",
    value: 0,
  },
  {
    name: "platonic",
    label: "Platonic Like",
    value: 0,
  },
  {
    name: "dislike",
    label: "Dislike",
    value: 0,
  },
  {
    name: "comfort",
    label: "Comfort",
    value: 0,
  },
  {
    name: "jealousy",
    label: "Jealousy",
    value: 0,
  },
  {
    name: "trust",
    label: "Trust",
    value: 0,
  },
  {
    name: "admiration",
    label: "Admiration",
    value: 0,
  },
];

const biomeToAbbrev: Record<string, string> = {
  mountainous: "mtn",
  plains: "pln",
  forest: "fst",
  beach: "bch",
  wetlands: "wtlnd",
  desert: "dst",
};

const typeToAbbrev: Record<string, string> = {
  hunting: "hunt",
  border: "bord",
  training: "train",
  herb_gathering: "med",
};

function App() {
  // patrol variables
  const [patrolId, setPatrolId] = useState("");
  const [biome, setBiome] = useState<string[]>(["any"]);
  const [season, setSeason] = useState<string[]>(["any"]);
  const [patrolType, setPatrolType] = useState("hunting");
  const [numCats, setNumCats] = useState<[number, number]>([1, 6]);
  const [catTypeCounts, setCatTypeCounts] = useState(defaultCatTypeCount);
  const [plSkillReqs, setPlSkillReqs] = useState<string[]>([]);
  const [relationshipReqs, setRelationshipReqs] = useState<string[]>([]);
  const [minRelationships, setMinRelationships] = useState(
    defaultMinRelationships,
  );
  const [rarity, setRarity] = useState("standard");
  const [difficulty, setDifficulty] = useState("standard");
  const [misc, setMisc] = useState<string[]>([]);

  const [introText, setIntroText] = useState("");
  const [declineText, setDeclineText] = useState("");

  const [outcomes, setOutcomes] = useState<Outcome[]>([]);

  // display variables
  const [opened, { open, close }] = useDisclosure(false);
  const [code, setCode] = useState("");

  var id = "";
  if (biome.length !== 1 || biome.includes("any")) {
    id += "gen_";
  } else {
    id += `${biomeToAbbrev[biome[0]]}_`;
  }
  id += `${typeToAbbrev[patrolType]}_`;

  function handleCatTypeCountsChange(
    index: number,
    value: [number, number] | undefined,
  ) {
    const newCatTypeCounts = catTypeCounts.map((v, i) => {
      if (i === index) {
        return {
          ...v,
          value: value,
        };
      } else {
        return v;
      }
    });
    setCatTypeCounts(newCatTypeCounts);
  }

  function handleMinRelationshipsChange(index: number, value: number) {
    const newMinRelationships = minRelationships.map((v, i) => {
      if (i === index) {
        return {
          ...v,
          value: value,
        };
      } else {
        return v;
      }
    });
    setMinRelationships(newMinRelationships);
  }

  function addOutcome() {
    const newOutcome: Outcome = {
      outcomeType: "success",
      exp: 20,
      text: "",
    };
    setOutcomes([...outcomes, newOutcome]);
  }

  function deleteOutcome(index: number) {
    const newOutcomes = outcomes.filter((v, i) => {
      if (i !== index) {
        return v;
      }
    });
    setOutcomes(newOutcomes);
  }

  function editOutcome(index: number, newOutcome: Outcome) {
    const newOutcomes = outcomes.map((v, i) => {
      if (i === index) {
        return newOutcome;
      } else {
        return v;
      }
    });
    setOutcomes(newOutcomes);
  }

  function exportOutcome(outcome: Outcome) {
    const outcomeObject: Record<string, any> = {
      text: outcome.text,
      exp: outcome.exp,
    };
    return outcomeObject;
  }

  function exportPatrol() {
    const patrolObject: Record<string, any> = {
      patrol_id: id + patrolId,
      biome: biome,
      season: season,
      types: [patrolType],
      min_cats: numCats[0],
      max_cats: numCats[1],
      patrol_art: null,
      intro_text: introText,
      decline_text: declineText,
    };

    const tags: string[] = [];

    // set min_max_status
    const min_max_status: Record<string, [number, number]> = {};
    for (const catTypeCount of catTypeCounts) {
      if (catTypeCount.value !== undefined) {
        min_max_status[catTypeCount.name] = catTypeCount.value;
      }
    }
    if (Object.keys(min_max_status).length !== 0) {
      patrolObject["min_max_status"] = min_max_status;
    }

    // set relationship_constraints + tags
    const relationship_constraints: string[] = [];
    for (const constraint of relationshipReqs) {
      if (constraint == "rom_two_apps") {
        if (!tags.includes("romantic")) {
          tags.push("romantic");
        }
        tags.push("rom_two_apps");
      } else if (constraint === "romantic") {
        tags.push("romantic");
      } else {
        relationship_constraints.push(constraint);
      }
    }
    for (const minRelationship of minRelationships) {
      if (minRelationship.value > 0) {
        relationship_constraints.push(
          `${minRelationship.name}_${minRelationship.value}`,
        );
      }
    }
    if (relationship_constraints.length !== 0) {
      patrolObject["relationship_constraints"] = relationship_constraints;
    }

    // set pl_skill_constraint
    if (plSkillReqs !== null && plSkillReqs.length !== 0) {
      patrolObject["pl_skill_constraint"] = plSkillReqs;
    }

    // set weight
    var weight = 20;
    if (rarity === "prevalent") {
      weight = 40;
    } else if (rarity === "common") {
      weight = 30;
    } else if (rarity === "rare") {
      weight = 10;
    } else if (rarity === "very rare") {
      weight = 5;
    }
    patrolObject["weight"] = weight;

    // set chance_of_success
    patrolObject["chance_of_success"] = getDefaultSuccessChance(
      biome,
      patrolType,
      season,
    );

    // set misc tags
    for (const tag of misc) {
      tags.push(tag);
    }
    // tags is required so even if it's empty it's OK
    patrolObject["tags"] = tags;

    const antag_failures = [];
    const antag_successes = [];
    const successes = [];
    const failures = [];
    for (const outcome of outcomes) {
      const outcomeObject = exportOutcome(outcome);
      if (outcome.outcomeType === "antag_success") {
        antag_successes.push(outcomeObject);
      } else if (outcome.outcomeType === "antag_failure") {
        antag_failures.push(outcomeObject);
      } else if (outcome.outcomeType === "success") {
        successes.push(outcomeObject);
      } else if (outcome.outcomeType === "failure") {
        failures.push(outcomeObject);
      }
    }
    if (antag_failures.length !== 0) {
      patrolObject["antag_fail_outcomes"] = antag_failures;
    }
    if (antag_successes.length !== 0) {
      patrolObject["antag_success_outcomes"] = antag_successes;
    }
    if (successes.length !== 0) {
      patrolObject["success_outcomes"] = successes;
    }
    if (failures.length !== 0) {
      patrolObject["fail_outcomes"] = failures;
    }

    return JSON.stringify(patrolObject, undefined, 2);
  }

  return (
    <Box maw="40em" p="lg">
      <Text mt="sm" fw={500} size="sm">
        Patrol ID
      </Text>
      <Group>
        <Text>{id}</Text>
        <TextInput
          value={patrolId}
          onChange={(value) => setPatrolId(value.currentTarget.value)}
        />
      </Group>

      <Checkbox.Group
        value={biome}
        onChange={setBiome}
        mt="sm"
        required
        label="Biome"
      >
        <Group>
          <Checkbox value="any" label="Any" />
          <Checkbox value="mountainous" label="Mountainous" />
          <Checkbox value="plains" label="Plains" />
          <Checkbox value="forest" label="Forest" />
          <Checkbox value="beach" label="Beach" />
          <Checkbox value="wetlands" label="Wetlands" />
          <Checkbox value="desert" label="Desert" />
        </Group>
      </Checkbox.Group>

      <Checkbox.Group
        value={season}
        onChange={setSeason}
        required
        mt="sm"
        label="Season"
      >
        <Group>
          <Checkbox value="any" label="Any" />
          <Checkbox value="newleaf" label="Newleaf" />
          <Checkbox value="greenleaf" label="Greenleaf" />
          <Checkbox value="leaf-fall" label="Leaf-fall" />
          <Checkbox value="leaf-bare" label="Leaf-bare" />
        </Group>
      </Checkbox.Group>

      <Radio.Group
        value={patrolType}
        onChange={setPatrolType}
        mt="sm"
        required
        label="Patrol Type"
      >
        <Group>
          <Radio value="hunting" label="Hunting" />
          <Radio value="herb_gathering" label="Herb Gathering" />
          <Radio value="border" label="Border" />
          <Radio value="training" label="Training" />
        </Group>
      </Radio.Group>

      <NumCatsSlider
        value={numCats}
        onChange={setNumCats}
        label="Number of Cats"
      />

      <Text mt="sm" fw={500} size="sm">
        Cats of Specific Type
      </Text>

      {catTypeCounts.map((value, index) => (
        <CatTypeSelector
          label={value.label}
          value={catTypeCounts[index].value}
          onChange={(newValue) => {
            handleCatTypeCountsChange(index, newValue);
          }}
        />
      ))}

      <MultiSelect
        label="p_l Minimum Skill Level Requirements (only one needs to be true)"
        description="Higher levels of SKILL will also fulfill the requirement"
        value={plSkillReqs}
        onChange={setPlSkillReqs}
        placeholder="Select skills"
        data={SKILLS}
        searchable
      />

      <Checkbox.Group
        value={relationshipReqs}
        onChange={setRelationshipReqs}
        mt="sm"
        label="Required Relationships"
      >
        <Stack gap="xs">
          <Checkbox value="siblings" label="Everyone is siblings" />
          <Checkbox value="parent/child" label="p_l is parent of r_c" />
          <Checkbox value="child/parent" label="r_c is parent of p_l" />
          <Space />

          <Checkbox
            value="romance"
            label="p_l and r_c are potential mates or current mates"
          />
          <Checkbox
            value="rom_two_apps"
            label="app1 and app2 are potential mates or current mates"
          />
          <Checkbox value="mates_with_pl" label="Everyone is mates with p_l" />
          <Checkbox value="mates" label="Everyone is mates with each other" />
          <Checkbox value="not_mates" label="No one is mates with each other" />
          <Space />

          <Checkbox value="mentor/app" label="p_l is mentor of r_c" />
          <Checkbox value="app/mentor" label="r_c is mentor of p_l" />
        </Stack>
      </Checkbox.Group>

      <Text fw={500} mt="lg" size="sm">
        Required Minimum Relationships (between every cat on patrol)
      </Text>
      {minRelationships.map((value, index) => {
        return (
          <>
            <Text size="sm">{value.label}</Text>
            <Slider
              onChange={(newValue) =>
                handleMinRelationshipsChange(index, newValue)
              }
              value={value.value}
              size="md"
              min={0}
              max={100}
              step={1}
            />
          </>
        );
      })}

      <Radio.Group
        value={rarity}
        onChange={setRarity}
        mt="sm"
        defaultValue="standard"
        label="Rarity"
      >
        <Group>
          <Radio value="prevalent" label="Prevalent" />
          <Radio value="common" label="Common" />
          <Radio value="standard" label="Standard" />
          <Radio value="rare" label="Uncommon" />
          <Radio value="very rare" label="Rare" />
        </Group>
      </Radio.Group>

      <Radio.Group
        value={difficulty}
        onChange={setDifficulty}
        mt="sm"
        defaultValue="standard"
        label="Difficulty"
      >
        <Group>
          <Radio value="very_easy" label="Very Easy" />
          <Radio value="easy" label="Easy" />
          <Radio value="standard" label="Standard" />
          <Radio value="hard" label="Hard" />
          <Radio value="very_hard" label="Very Hard" />
        </Group>
      </Radio.Group>

      <Checkbox.Group value={misc} onChange={setMisc} mt="sm" label="Misc.">
        <Stack gap="xs">
          <Checkbox value="halloween" label="Can only occur on Halloween" />
          <Checkbox
            value="disaster"
            label="Only allowed when disasters are enabled"
          />
        </Stack>
      </Checkbox.Group>

      <Divider my="md" />
      <Textarea
        value={introText}
        onChange={(e) => setIntroText(e.currentTarget.value)}
        label="Intro text"
        placeholder="Enter text"
        required
      />
      <Textarea
        value={declineText}
        onChange={(e) => setDeclineText(e.currentTarget.value)}
        mt="sm"
        label="Decline text"
        placeholder="Enter text"
        required
      />

      <Divider my="md" />
      {outcomes.map((outcome, index) => (
        <OutcomeForm
          outcome={outcome}
          deleteOutcome={() => deleteOutcome(index)}
          setOutcome={(newValue) => editOutcome(index, newValue)}
        />
      ))}
      <Button variant="light" onClick={addOutcome}>
        Add Outcome
      </Button>

      <Button
        onClick={() => {
          setCode(exportPatrol());
          open();
        }}
      >
        To JSON Object
      </Button>

      <Modal opened={opened} onClose={close}>
        <CodeHighlight code={code} language="json" />
      </Modal>
    </Box>
  );
}

export default App;
