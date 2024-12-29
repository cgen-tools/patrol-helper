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

function App() {
  const [numCatType, setNumCatType] = useState<[number, number] | undefined>(undefined);
  return (
    <Box maw="40em" p="lg">
      <Checkbox.Group required label="Biome">
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

      <Checkbox.Group required mt="sm" label="Season">
        <Group>
          <Checkbox value="any" label="Any" />
          <Checkbox value="newleaf" label="Newleaf" />
          <Checkbox value="greenleaf" label="Greenleaf" />
          <Checkbox value="leaf-fall" label="Leaf-fall" />
          <Checkbox value="leaf-bare" label="Leaf-bare" />
        </Group>
      </Checkbox.Group>

      <Radio.Group mt="sm" required label="Patrol Type">
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

      <CatTypeSelector label="Warriors" value={numCatType} onChange={setNumCatType}/>

      <Text mt="sm" fw={500} size="sm">
        p_l Minimum Skill Level Requirements (only one needs to be true)
      </Text>
      <Text size="xs">
        Higher levels of SKILL will also fulfill the requirement
      </Text>
      <MultiSelect placeholder="Select skills" data={SKILLS} searchable />

      <Checkbox.Group mt="sm" label="Required Relationships">
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
      <Text size="sm">Romantic Like</Text>
      <Slider size="md" min={0} max={100} step={1} defaultValue={0} />
      <Space />
      <Text size="sm">Platonic Like</Text>
      <Slider size="md" min={0} max={100} step={1} defaultValue={0} />
      <Space />
      <Text size="sm">Dislike</Text>
      <Slider size="md" min={0} max={100} step={1} defaultValue={0} />
      <Space />
      <Text size="sm">Comfort</Text>
      <Slider size="md" min={0} max={100} step={1} defaultValue={0} />
      <Space />
      <Text size="sm">Jealousy</Text>
      <Slider size="md" min={0} max={100} step={1} defaultValue={0} />
      <Space />
      <Text size="sm">Trust</Text>
      <Slider size="md" min={0} max={100} step={1} defaultValue={0} />
      <Space />
      <Text size="sm">Admiration</Text>
      <Slider size="md" min={0} max={100} step={1} defaultValue={0} />

      <Radio.Group mt="sm" defaultValue="standard" label="Rarity">
        <Group>
          <Radio value="prevalent" label="Prevalent" />
          <Radio value="common" label="Common" />
          <Radio value="standard" label="Standard" />
          <Radio value="rare" label="Uncommon" />
          <Radio value="very rare" label="Rare" />
        </Group>
      </Radio.Group>

      <Radio.Group mt="sm" defaultValue="standard" label="Difficulty">
        <Group>
          <Radio value="very_easy" label="Very Easy" />
          <Radio value="easy" label="Easy" />
          <Radio value="standard" label="Standard" />
          <Radio value="hard" label="Hard" />
          <Radio value="very_hard" label="Very Hard" />
        </Group>
      </Radio.Group>

      <Checkbox.Group mt="sm" label="Misc.">
        <Stack gap="xs">
          <Checkbox value="new_years" label="Can only occur on Halloween" />
          <Checkbox
            value="disaster"
            label="Only allowed when disasters are enabled"
          />
        </Stack>
      </Checkbox.Group>

      <Divider my="md" />
      <Button variant="light">Add Outcome</Button>
      <OutcomeForm />
    </Box>
  );
}

export default App;
