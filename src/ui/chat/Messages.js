import { useEffect, useRef } from "react";
import { useCollection } from "react-firebase-hooks/firestore";
import { chatMessagesQuery } from "../../api/firebase";
import MessageSkeleton from "./MessageSkeleton";
import { Paper, ScrollArea, Group, Stack, Text, Skeleton } from "@mantine/core";

export default function Messages({ id }) {
  const viewport = useRef(null);

  const [messages, messagesLoading] = useCollection(chatMessagesQuery(id));

  useEffect(() => {
    if (!messagesLoading) {
      viewport.current.scrollTo({
        top: viewport.current.scrollHeight,
        behavior: "auto",
      });
    }
  }, [messages, messagesLoading]);

  const formatMessageDate = (date) => {
    const month = date.getMonth() + 1;
    const minutes = (date.getMinutes() < 10 ? "0" : "") + date.getMinutes();
    const seconds = (date.getSeconds() < 10 ? "0" : "") + date.getSeconds();

    const formattedDate = `${month}/${date.getDate()}/${date.getFullYear()} ${date.getHours()}:${minutes}:${seconds}`;
    return formattedDate;
  };

  return (
    <Paper p="sm" shadow="lg" radius="lg">
      <ScrollArea sx={{ height: 380 }} offsetScrollbars viewportRef={viewport}>
        <Stack>
          {messagesLoading && <MessageSkeleton amount={3} />}
          {messages &&
            messages.docs.map((doc) => (
              <Stack spacing={0} key={doc.id}>
                <Group spacing="xs">
                  <Text weight={700}>
                    {doc.data().name ? doc.data().name : "NoName"}
                  </Text>
                  <Text color="dimmed" size="xs" sx={{ paddingTop: 2 }}>
                    {doc.data().createdAt ? (
                      formatMessageDate(doc.data().createdAt.toDate())
                    ) : (
                      <Skeleton> 2/15/2022 15:53:00</Skeleton>
                    )}
                  </Text>
                </Group>
                <Text>{doc.data().text}</Text>
              </Stack>
            ))}
        </Stack>
      </ScrollArea>
    </Paper>
  );
}
