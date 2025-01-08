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

enum allowedState {
  DontCare = "Don't Care",
  Forbidden = "Forbidden",
  Required = "Required",
}

function CatTypeSelector({
  label,
  value,
  onChange,
}: {
  label: string;
  value: [number, number] | undefined;
  onChange: (val: [number, number] | undefined) => void | undefined;
}) {
  let allowedStatus: allowedState = allowedState.DontCare;
  if (value === undefined) {
    allowedStatus = allowedState.DontCare;
  } else if (value[0] == -1 && value[1] == -1) {
    allowedStatus = allowedState.Forbidden;
  } else {
    allowedStatus = allowedState.Required;
  }

  const open = allowedStatus == allowedState.Required;

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
              allowedState.Forbidden,
              allowedState.DontCare,
              allowedState.Required,
            ]}
            value={allowedStatus}
            onChange={(newAllowedStatus) => {
              if (newAllowedStatus == allowedState.DontCare) {
                onChange(undefined);
              } else if (newAllowedStatus == allowedState.Forbidden) {
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
