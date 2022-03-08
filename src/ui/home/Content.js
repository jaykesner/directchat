import { useMediaQuery } from "@mantine/hooks";
import { Title, Group, Text, Image, Box } from "@mantine/core";

export default function Content({ image, flip, textTitle, textContent }) {
  const matches = useMediaQuery("(min-width: 768px)");
  const flippedRow = flip ? "row-reverse" : "row";

  return (
    <Group direction={matches ? flippedRow : "column"} position="center">
      <Image width={matches ? 400 : 300} alt="svg image" src={image} />
      <Box style={{ width: "400px" }}>
        <Title align="center" order={2} style={{ marginBottom: 10 }}>
          {textTitle}
        </Title>
        <Text align="center" color="primary">
          {textContent}
        </Text>
      </Box>
    </Group>
  );
}
