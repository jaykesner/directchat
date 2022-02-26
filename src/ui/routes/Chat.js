import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router";
import { useHistory } from "react-router-dom";
import {
  chatMessagesQuery,
  sendMessage,
  chatRoomQuery,
  setTyping,
} from "../../api/firebase";
import { useCollection } from "react-firebase-hooks/firestore";
import MessageSkeleton from "../utils/MessageSkeleton";
import {
  Paper,
  Title,
  Group,
  TextInput,
  Space,
  Button,
  Container,
  Text,
  Skeleton,
  ScrollArea,
  Modal,
  Loader,
} from "@mantine/core";
import { useScrollLock } from "@mantine/hooks";

export default function Chat() {
  const { id } = useParams();
  let history = useHistory();
  const [messages, messagesLoading] = useCollection(chatMessagesQuery(id));
  const [chat] = useCollection(chatRoomQuery(id));
  const [message, setMessage] = useState("");
  const [nameInput, setNameInput] = useState("");
  const [name, setName] = useState(sessionStorage.getItem("name"));
  const [opened, setOpened] = useState(true);
  const viewport = useRef(null);

  useScrollLock(true);

  useEffect(() => {
    if (!messagesLoading) {
      viewport.current.scrollTo({
        top: viewport.current.scrollHeight,
        behavior: "auto",
      });
    }
  }, [messagesLoading, messages]);

  useEffect(() => {
    if (name) {
      if (message.length > 0) {
        setTyping(name, id, true);
      } else {
        setTyping(name, id, false);
      }
    }
  });

  useEffect(() => {
    if (!opened) {
      if (!name) {
        if (nameInput) {
          sessionStorage.setItem("name", nameInput);
          setName(nameInput);
          setOpened(false);
        } else {
          setOpened(true);
        }
      }
    }
    if (opened) {
      if (name) {
        setOpened(false);
      }
    }
  }, [opened, name, nameInput]);

  const sendNewMessage = async (e) => {
    e.preventDefault();
    if (name) {
      const messageInfo = {
        message: message,
        roomId: id,
        name: name,
      };
      await sendMessage(messageInfo);
    }
    setMessage("");
  };

  const nameFormSubmit = (e) => {
    e.preventDefault();
    sessionStorage.setItem("name", nameInput);
    setName(nameInput);
    setOpened(false);
  };

  const formatMessageDate = (date) => {
    const month = date.getMonth() + 1;
    const minutes = (date.getMinutes() < 10 ? "0" : "") + date.getMinutes();
    const seconds = (date.getSeconds() < 10 ? "0" : "") + date.getSeconds();

    const formattedDate = `${month}/${date.getDate()}/${date.getFullYear()} ${date.getHours()}:${minutes}:${seconds}`;
    return formattedDate;
  };

  return (
    <>
      <Modal
        opened={opened}
        onClose={() => setOpened(false)}
        hideCloseButton
        centered
        transition="fade"
      >
        <form onSubmit={(e) => nameFormSubmit(e)} autoComplete="off">
          <Group direction="column" grow>
            <TextInput
              data-autofocus
              placeholder="Your name"
              label="What's your name?"
              required
              radius="xl"
              size="lg"
              value={nameInput}
              onChange={(e) => setNameInput(e.target.value)}
            />
            <Button type="submit" radius="xl" size="lg">
              Join {nameInput ? `as ${nameInput}` : null}
            </Button>
          </Group>
        </form>
      </Modal>
      <Group direction="column" spacing="xl" position="center">
        <Title sx={{ fontSize: 64 }}>{id}</Title>
        <Group>
          <Button onClick={() => history.push("/")} radius="xl" size="lg">
            Leave
          </Button>
        </Group>
        <Container sx={{ width: "100%" }}>
          <Paper shadow="lg" radius="lg">
            <Container>
              <Space h="xs" />
              <ScrollArea
                sx={{ height: 380 }}
                offsetScrollbars
                viewportRef={viewport}
              >
                <Group direction="column">
                  {messagesLoading && (
                    <>
                      <MessageSkeleton />
                      <MessageSkeleton />
                      <MessageSkeleton />
                    </>
                  )}
                  {messages &&
                    messages.docs.map((doc) => (
                      <Group direction="column" spacing={0} key={doc.id}>
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
                      </Group>
                    ))}
                </Group>
              </ScrollArea>
              <Space h="xs" />
            </Container>
          </Paper>
        </Container>
        <Container sx={{ width: "100%" }}>
          <form onSubmit={(e) => sendNewMessage(e)} autoComplete="off">
            <TextInput
              placeholder="Type a message.."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              radius="xl"
              size="lg"
            />
          </form>
          {chat && chat.data().isTyping && chat.data().isTyping.length > 0 && (
            <Group spacing={5} style={{ paddingLeft: 10, paddingTop: 2 }}>
              <Loader size="sm" variant="dots" />
              <Text size="sm" weight={700}>
                {chat && chat.data().isTyping}
              </Text>
              <Text size="sm"> is typing...</Text>
            </Group>
          )}
        </Container>
      </Group>
    </>
  );
}
