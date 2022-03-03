import { Group, Loader, Text } from "@mantine/core";

export default function TypingIndicator({ chatRoom }) {
  const showTypingMessage =
    chatRoom && chatRoom.data().isTyping && chatRoom.data().isTyping.length > 0;
  return (
    <div>
      {showTypingMessage ? (
        <Group spacing={5} style={{ paddingLeft: 10, paddingTop: 2 }}>
          <Loader size="sm" variant="dots" />
          <Text size="sm" weight={700}>
            {chatRoom.data().isTyping}
          </Text>
          <Text size="sm"> is typing...</Text>
        </Group>
      ) : null}
    </div>
  );
}
