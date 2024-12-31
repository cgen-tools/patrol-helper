import { Fieldset, Group, NumberInput, Radio, Textarea } from "@mantine/core";
import { Outcome } from "../types";

function OutcomeForm({outcome}: {outcome: Outcome}) {
  return (
    <Fieldset>
      <Radio.Group value={outcome.outcomeType} defaultValue="standard" label="Outcome Type">
        <Group>
          <Radio value="success" label="Success" />
          <Radio value="failure" label="Failure" />
          <Radio value="antag_success" label="Antagonize Success" />
          <Radio value="antag_failure" label="Antagonize Failure" />
        </Group>
      </Radio.Group>

      <NumberInput value={outcome.exp} mt="sm" label="Experience" defaultValue={20} />

      <Textarea
        value={outcome.text}
        mt="sm"
        label="Outcome text"
        placeholder="Enter text"
      />
    </Fieldset>
  )
}

export default OutcomeForm;