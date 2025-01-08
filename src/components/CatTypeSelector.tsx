import {
  Grid,
  GridCol,
  RangeSlider,
  SegmentedControl,
  Text,
} from "@mantine/core";

const marks = [
  { value: 1, label: 1 },
  { value: 2, label: 2 },
  { value: 3, label: 3 },
  { value: 4, label: 4 },
  { value: 5, label: 5 },
  { value: 6, label: 6 },
];

type catTypeStatus = "Don't Care" | "Forbidden" | "Required";

function CatTypeSelector({
  label,
  value,
  onChange,
}: {
  label: string;
  value: [number, number] | undefined;
  onChange: (val: [number, number] | undefined) => void | undefined;
}) {
  let allowedStatus: catTypeStatus = "Don't Care";
  if (value === undefined) {
    allowedStatus = "Don't Care";
  } else if (value[0] == -1 && value[1] == -1) {
    allowedStatus = "Forbidden";
  } else {
    allowedStatus = "Required";
  }

  const open = allowedStatus == "Required";

  return (
    <>
      <Grid grow>
        <GridCol span={6}>
          <Text size="sm">{label}</Text>
        </GridCol>
        <GridCol span={6}>
          <SegmentedControl
            fullWidth
            data={[
              "Forbidden",
              "Don't Care",
              "Required",
            ]}
            value={allowedStatus}
            onChange={(newAllowedStatus) => {
              if (newAllowedStatus == "Don't Care") {
                onChange(undefined);
              } else if (newAllowedStatus == "Forbidden") {
                onChange([-1, -1]);
              } else {
                onChange([1, 6]);
              }
            }}
          />
        </GridCol>
        {open && (
          <GridCol span={6} offset={6}>
            <RangeSlider
              label={null}
              size="md"
              minRange={0}
              min={1}
              max={6}
              step={1}
              marks={marks}
              pb="xl"
              value={value}
              onChange={onChange}
            />
          </GridCol>
        )}
      </Grid>
    </>
  );
}

export default CatTypeSelector;
