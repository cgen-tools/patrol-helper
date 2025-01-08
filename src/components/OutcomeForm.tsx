import {
  Button,
  Fieldset,
  Group,
  NumberInput,
  Radio,
  Textarea,
} from "@mantine/core";
import { Outcome } from "../types";
import RaritySelector from "./RaritySelector";

function OutcomeForm({
  outcome,
  setOutcome,
  deleteOutcome,
  canDelete = true,
}: {
  outcome: Outcome;
  setOutcome: (value: Outcome) => void;
  deleteOutcome: () => void;
  canDelete: boolean;
}) {
  return (
    <Fieldset mb="sm">
      <Radio.Group
        value={outcome.outcomeType}
        onChange={(newValue) =>
          setOutcome({ ...outcome, outcomeType: newValue })
        }
        defaultValue="standard"
        label="Outcome Type"
      >
        <Group>
          <Radio value="success" label="Success" />
          <Radio value="failure" label="Failure" />
          <Radio value="antag_success" label="Antagonize Success" />
          <Radio value="antag_failure" label="Antagonize Failure" />
        </Group>
      </Radio.Group>

      <RaritySelector
        value={outcome.rarity}
        onChange={(newValue) => setOutcome({ ...outcome, rarity: newValue })}
      />

      <NumberInput
        value={outcome.exp}
        onChange={(newValue) =>
          setOutcome({ ...outcome, exp: Number(newValue) })
        }
        mt="sm"
        label="Experience"
        defaultValue={20}
      />

      <Textarea
        value={outcome.text}
        onChange={(newValue) =>
          setOutcome({ ...outcome, text: newValue.target.value })
        }
        mt="sm"
        label="Outcome text"
        placeholder="Enter text"
      />

      {canDelete &&
        <Group mt="md" justify="flex-end">
          <Button onClick={deleteOutcome} variant="filled" color="red">
            Delete Outcome
          </Button>
        </Group>
      }
    </Fieldset>
  );
}

export default OutcomeForm;
