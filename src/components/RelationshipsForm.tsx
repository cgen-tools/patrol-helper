import { Checkbox, MultiSelect, NumberInput } from "@mantine/core";

function RelationshipsForm() {
  return (
    <>
      <MultiSelect
        label="Cats From"
        placeholder="Select cats"
        data={["p_l", "r_c", "s_c", "app1", "app2", "patrol", "multi"]}
        searchable
      />
      <MultiSelect
        label="Cats To"
        placeholder="Select cats"
        data={["p_l", "r_c", "s_c", "app1", "app2", "patrol", "multi"]}
        searchable
      />
      <Checkbox label="Mutual" />
      <MultiSelect
        label="Relationships to affect"
        placeholder="Select relationships"
        data={[
          "romantic",
          "platonic",
          "dislike",
          "comfort",
          "jealous",
          "trust",
          "respect",
        ]}
        searchable
      />
      <NumberInput
        defaultValue={0}
        label="Amount to modify"
        description="Can be positive or negative"
        min={-15}
        max={15}
      />
    </>
  );
}

export default RelationshipsForm;
