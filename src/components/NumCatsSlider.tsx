import { RangeSlider, Space, Text } from "@mantine/core";

const marks = [
  { value: 1, label: 1 },
  { value: 2 },
  { value: 3 },
  { value: 4 },
  { value: 5 },
  { value: 6, label: 6 },
];

function NumCatsSlider({
  value,
  onChange,
  label
}: {
  value: [number, number] | undefined;
  onChange: (v: [number, number]) => void;
  label: string
}) {
  return (
    <>
      <Text fw={500} mt="sm" size="sm">
        {label}
      </Text>
      <RangeSlider
        value={value}
        onChange={onChange}
        size="md"
        marks={marks}
        minRange={0}
        min={1}
        max={6}
        step={1}
      />
      <Space h="md" />
    </>
  );
}

export default NumCatsSlider;
