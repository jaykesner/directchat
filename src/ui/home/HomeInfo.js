import { useMediaQuery } from "@mantine/hooks";
import { Title, Group, Text, Image, Box } from "@mantine/core";

export default function HomeInfo({ image, flip }) {
  const matches = useMediaQuery("(min-width: 768px)");
  const flippedRow = flip ? "row-reverse" : "row";

  return (
    <Group direction={matches ? flippedRow : "column"} position="center">
      <Image width={matches ? 400 : 300} alt="svg image" src={image} />
      <Box>
        <Title align="center" order={2} style={{ marginBottom: 10 }}>
          Centered text title
        </Title>
        <Text align="center" color="primary">
          Centered description text.
        </Text>
      </Box>
    </Group>
  );
}
