import { Group, Title as MantineTitle, Button } from "@mantine/core";

export default function Title({ id, history }) {
  return (
    <Group direction="column" position="center">
      <MantineTitle sx={{ fontSize: 64 }}>{id}</MantineTitle>
      <Button onClick={() => history.push("/")} radius="xl" size="lg">
        Leave
      </Button>
    </Group>
  );
}
