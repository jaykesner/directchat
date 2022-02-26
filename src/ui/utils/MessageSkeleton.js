import { Group, Skeleton } from "@mantine/core";

export default function MessageSkeleton() {
  return (
    <Group direction="column" spacing="xs" sx={{ width: "100%" }}>
      <Group spacing="xs">
        <Skeleton width={75} height={24} />
        <Skeleton width={100} height={16} sx={{ alignSelf: "flex-end" }} />
      </Group>
      <Skeleton height={25} />
      <Skeleton height={25} />
    </Group>
  );
}
