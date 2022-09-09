import { Stack, Title as MantineTitle, Button } from "@mantine/core";

export default function Title({ id, history }) {
  return (
    <Stack direction="column" align="center">
      <MantineTitle sx={{ fontSize: 64 }}>{id}</MantineTitle>
      <Button onClick={() => history.push("/")} radius="xl" size="lg">
        Leave
      </Button>
    </Stack>
  );
}
