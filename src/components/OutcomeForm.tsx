import { Box, Checkbox, Fieldset, Group, MultiSelect, Radio, Space, Text, Textarea } from "@mantine/core";
import { SKILLS, TRAITS } from "../resources";
import InjuryOutcomeForm from "./InjuryOutcomeForm";
import RelationshipsForm from "./RelationshipsForm";

function OutcomeForm() {
  return (
    <Fieldset>
      <Radio.Group defaultValue="standard" label="Outcome Type">
        <Group>
          <Radio value="success" label="Success" />
          <Radio value="failure" label="Failure" />
          <Radio value="antag_success" label="Antagonize Success" />
          <Radio value="antag_failure" label="Antagonize Failure" />
        </Group>
      </Radio.Group>
      <Space h="xs" />

      <Text mt="sm" fw={500} size="sm">
        s_c Minimum Skill Level Requirements (any can be true)
      </Text>
      <MultiSelect placeholder="Select skills" data={SKILLS} searchable />

      <Text mt="sm" fw={500} size="sm">
        s_c Required Traits (any can be true)
      </Text>
      <MultiSelect placeholder="Select trait" data={TRAITS} searchable />

      <Checkbox.Group mt="sm" label="Cats allowed to be s_c">
        <Group>
          <Checkbox value="p_l" label="p_l" />
          <Checkbox value="r_c" label="r_c" />
          <Checkbox value="app1" label="app1" />
          <Checkbox value="app2" label="app2" />
          <Checkbox value="not_pl_rc" label="Any cat except p_l and r_c" />
          <Checkbox value="any" label="Any cat" />
        </Group>
      </Checkbox.Group>

      <Checkbox.Group mt="sm" label="s_c Additional Requirements">
        <Group>
          <Checkbox value="adult" label="s_c is not an apprentice" />
          <Checkbox value="app" label="s_c is an apprentice" />
          <Checkbox value="healer" label="s_c is a medicine cat or medicine cat apprentice" />
        </Group>
      </Checkbox.Group>
      <Space h="xs" />

      <Checkbox.Group mt="sm" label="Lost Cats">
      <Group>
          <Checkbox value="p_l" label="p_l" />
          <Checkbox value="r_c" label="r_c" />
          <Checkbox value="s_c" label="s_c" />
          <Checkbox value="app1" label="app1" />
          <Checkbox value="app2" label="app2" />
          <Checkbox value="patrol" label="The entire patrol" />
          <Checkbox value="multi" label="Multiple cats, but not the whole patrol" />
        </Group>
      </Checkbox.Group>

      <Checkbox.Group mt="sm" label="Dead Cats">
      <Group>
          <Checkbox value="p_l" label="p_l" />
          <Checkbox value="r_c" label="r_c" />
          <Checkbox value="s_c" label="s_c" />
          <Checkbox value="app1" label="app1" />
          <Checkbox value="app2" label="app2" />
          <Checkbox value="patrol" label="The entire patrol" />
          <Checkbox value="multi" label="Multiple cats, but not the whole patrol" />
        </Group>
      </Checkbox.Group>

      <Text mt="sm" fw={500} size="sm">
        Injuries
      </Text>
      <InjuryOutcomeForm />

      <Text mt="sm" fw={500} size="sm">
        History
      </Text>
      <Box pl="sm">
        <Textarea
          label="Death history for non-leaders"
          description="Should be a whole sentence"
        />
        <Textarea
          label="Death history for leaders"
          description="Should be a sentence fragment"
        />
        <Textarea
          label="History if cat gets a scar"
          description="Should be a whole sentence"
        />
      </Box>

      <Text mt="sm" fw={500} size="sm">
        Relationships
      </Text>
      <Box pl="sm">
        <RelationshipsForm />
      </Box>
    </Fieldset>
  )
}

export default OutcomeForm;