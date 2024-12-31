import { Fieldset, Group, Radio } from "@mantine/core";

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
    </Fieldset>
  )
}

export default OutcomeForm;