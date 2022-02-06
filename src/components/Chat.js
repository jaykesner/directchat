import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router";
import { useHistory } from "react-router-dom";
import {
  chatMessagesQuery,
  sendMessage,
  chatRoomQuery,
  setTyping,
} from "../api/firebase";
import { useCollection } from "react-firebase-hooks/firestore";
import Name from "./Name";
import {
  Center,
  Paper,
  Title,
  Badge,
  Group,
  TextInput,
  Space,
  Box,
  Spoiler,
  Button,
  Container,
  Text,
  Skeleton,
  ScrollArea,
} from "@mantine/core";

export default function Chat() {
  const { id } = useParams();
  let history = useHistory();
  const [messages, messagesLoading, messageError] = useCollection(
    chatMessagesQuery(id)
  );
  const [chat, chatLoading, chatError] = useCollection(chatRoomQuery(id));
  const [message, setMessage] = useState("");
  const [hasName, setHasName] = useState(false);
  const viewport = useRef(null);

  useEffect(() => {
    const name = sessionStorage.getItem("name");
    if (name) {
      console.log("found name");
      setHasName(true);
    } else {
      console.log("didn't find name");
    }
  }, []);

  useEffect(() => {
    const name = sessionStorage.getItem("name");
    if (name) {
      /*
      if (viewport !== null) {
        viewport.current.scrollTo({
          top: viewport.current.scrollHeight,
          behavior: "smooth",
        });
      }
      */

      if (message.length > 0) {
        console.log("is typing");
        setTyping(name, id, true);vvvvvvvvvvvvvvvvvvv
      } else {
        setTyping(name, id, false);
      }
    }
  });

  const sendNewMessage = async (e) => {
    e.preventDefault();
    console.log("submitted message");
    const messageInfo = {
      message: message,
      roomId: id,
      name: sessionStorage.getItem("name"),
    };
    await sendMessage(messageInfo);
    setMessage("");
  };

  /* testing cleanup/effects on exit
  useEffect(
    () => () => {
      const messageInfo = {
        message: "testing this again",
        roomId: id,
        name: "jimbo2",
      };
      sendMessage(messageInfo);
      console.log("idk");
    },
    []
  );
  */
  /*
  useEffect(() => {
    const cleanup = () => {
      console.log("do the cleanup");
      const messageInfo = {
        message: "PAGE CLOSED TEST",
        roomId: "XY1B2",
        name: "pageclosedtestname",
      };
      //sendMessage(messageInfo);
    };

    window.addEventListener("beforeunload", cleanup);
    return () => {
      window.removeEventListener("beforeunload", cleanup);
    };
  }, []);
  */

  const TestDisplay = () => (
    <div>
      <div>hello! url id: {id}</div>
      {chatLoading && <div>Chat Loading</div>}
      {chat && (
        <>
          <div>chat room info: {JSON.stringify(chat.data())}</div>
          <button onClick={() => history.push("/")}>Leave</button>
          {chat.data().isTyping ? (
            <div>people typing: {chat.data().isTyping}</div>
          ) : null}
        </>
      )}
      <div>Messages: </div>
      {messagesLoading && <div>Messages Loading</div>}
      {messages &&
        messages.docs.map((doc) => (
          <div key={doc.id}>{`${doc.id} ${JSON.stringify(doc.data())}`}</div>
        ))}
      <div>
        <form onSubmit={(e) => sendNewMessage(e)}>
          <input
            type="text"
            onChange={(e) => setMessage(e.target.value)}
            value={message}
          ></input>
        </form>
      </div>
      {messageError && <div>had an error! {JSON.stringify(messageError)}</div>}
    </div>
  );

  const SkeletonText = () => (
    <Group direction="column" spacing="xs" sx={{ width: "100%" }}>
      <Group spacing="xs">
        <Skeleton width={75} height={24} />
        <Skeleton width={100} height={16} sx={{ alignSelf: "flex-end" }} />
      </Group>
      <Skeleton height={25} />
      <Skeleton height={25} />
    </Group>
  );

  return (
    <>
      {hasName ? (
        <Box
          sx={(theme) => ({
            backgroundColor: theme.colors.gray[2],
            height: "100vh",
          })}
        >
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
                    sx={{ height: 400 }}
                    offsetScrollbars
                    viewportRef={viewport}
                  >
                    <Group direction="column">
                      {messagesLoading && <SkeletonText />}
                      {messages &&
                        messages.docs.map((doc) => (
                          <Group direction="column" spacing={0} key={doc.id}>
                            <Group spacing="xs">
                              <Text weight={700}>{doc.data().name}</Text>
                              <Text
                                color="dimmed"
                                size="xs"
                                sx={{ paddingTop: 2 }}
                              >
                                Today at 12:24 PM
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
            <Container sx={{ width: "100%", marginBottom: 100 }}>
              <form onSubmit={(e) => sendNewMessage(e)}>
                <TextInput
                  placeholder="Type a message.."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  radius="xl"
                  size="lg"
                />
              </form>
            </Container>
          </Group>
        </Box>
      ) : (
        <Name />
      )}
    </>
  );
}
