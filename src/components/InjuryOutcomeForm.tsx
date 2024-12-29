import { Box, Checkbox, MultiSelect, SimpleGrid } from "@mantine/core";
import { INJURIES } from "../resources";

function InjuryOutcomeForm() {
  return (
    <Box mx="sm">
      <SimpleGrid cols={4}>
        <MultiSelect placeholder="Cats" data={["p_l", "r_c", "s_c", "app1", "app2", "patrol", "multi"]} searchable />
        <MultiSelect placeholder="Injuries" data={INJURIES} searchable />
        <MultiSelect placeholder="Scars" data={INJURIES} searchable />
        <Checkbox my="auto" label="Silence" />
      </SimpleGrid>
    </Box>
  )
}

export default InjuryOutcomeForm;