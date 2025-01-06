import { Group, Radio } from "@mantine/core";

function RaritySelector({
  value,
  onChange,
}: {
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <>
      <Radio.Group
        value={value}
        onChange={onChange}
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
    </>
  );
}

export default RaritySelector;
