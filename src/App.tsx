import {
  Box,
  Button,
  Checkbox,
  Divider,
  Group,
  MultiSelect,
  Radio,
  RangeSlider,
  Slider,
  Space,
  Stack,
  Text,
} from "@mantine/core";
import { SKILLS } from "./resources";
import OutcomeForm from "./components/OutcomeForm";
import CatTypeSelector from "./components/CatTypeSelector";
import { useState } from "react";

const marks = [
  { value: 1, label: 1 },
  { value: 2 },
  { value: 3 },
  { value: 4 },
  { value: 5 },
  { value: 6, label: 6 },
];

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

function App() {
  const [catTypeCounts, setCatTypeCounts] = useState(defaultCatTypeCount);
  const [biome, setBiome] = useState<string[]>(["any"]);
  const [season, setSeason] = useState<string[]>(["any"]);
  const [patrolType, setPatrolType] = useState("hunting");
  const [numCats, setNumCats] = useState<[number, number]>([1, 6]);
  const [plSkillReqs, setPlSkillReqs] = useState<string[]>([]);
  const [relationshipReqs, setRelationshipReqs] = useState<string[]>([]);
  const [minRelationships, setMinRelationships] = useState(
    defaultMinRelationships,
  );
  const [rarity, setRarity] = useState("standard");
  const [difficulty, setDifficulty] = useState("standard");
  const [misc, setMisc] = useState<string[]>([]);

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

  return (
    <Box maw="40em" p="lg">
      <Checkbox.Group value={biome} onChange={setBiome} required label="Biome">
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

      <Text fw={500} mt="sm" size="sm">
        Number of Cats
      </Text>
      <RangeSlider
        value={numCats}
        onChange={setNumCats}
        size="md"
        marks={marks}
        minRange={0}
        min={1}
        max={6}
        step={1}
      />
      <Space h="md" />

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

      <Text mt="sm" fw={500} size="sm">
        p_l Minimum Skill Level Requirements (only one needs to be true)
      </Text>
      <Text size="xs">
        Higher levels of SKILL will also fulfill the requirement
      </Text>
      <MultiSelect
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
          <Checkbox value="new_years" label="Can only occur on Halloween" />
          <Checkbox
            value="disaster"
            label="Only allowed when disasters are enabled"
          />
        </Stack>
      </Checkbox.Group>

      <Divider my="md" />
      <OutcomeForm />
      <Button variant="light">Add Outcome</Button>
    </Box>
  );
}

export default App;
