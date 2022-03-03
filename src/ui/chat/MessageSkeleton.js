import { Group, Skeleton } from "@mantine/core";

export default function MessageSkeleton({ amount }) {
  return [...Array(amount)].map((x, index) => (
    <Group key={index} direction="column" spacing="xs" sx={{ width: "100%" }}>
      <Group spacing="xs">
        <Skeleton width={75} height={24} />
        <Skeleton width={100} height={16} style={{ alignSelf: "flex-end" }} />
      </Group>
      <Skeleton height={25} />
      <Skeleton height={25} />
    </Group>
  ));
}
