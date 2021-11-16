import logo from "../directchat-logo.jpg";
import svg1 from "../chat-svg1.svg";
import svg2 from "../chat-svg2.svg";
import svg3 from "../chat-svg3.svg";
import { ReactComponent as EnterIcon } from "../enter-icon.svg";
import { newChat, joinChat, randomChat } from "../firebase";
import { useHistory } from "react-router-dom";
import { useState } from "react";
import {
  Container,
  Title,
  createStyles,
  Group,
  Text,
  Button,
  TextInput,
  Center,
  Image,
  Grid,
  Col,
  AppShell,
  Header,
  Box,
  SimpleGrid,
  ThemeIcon,
  UnstyledButton,
} from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";

const useStyles = createStyles((theme) => ({
  landing: {
    height: "80vh",
  },
  info: {
    backgroundColor: theme.colors.gray[2],
    height: "45vh",
  },
  info2: {
    backgroundColor: theme.colors.gray[3],
    height: "45vh",
  },
  button: {
    "&:hover": {
      backgroundColor: theme.colors.blue[5],
    },
  },
  footer: {
    backgroundColor: theme.colors.gray[6],
    height: "45vh",
  },
  test1: {
    backgroundColor: theme.colors.red[1],
  },
  test2: {
    backgroundColor: theme.colors.red[2],
  },
}));

export default function Home() {
  let history = useHistory();
  const [roomId, setRoomId] = useState("");
  const { classes } = useStyles();
  const matches = useMediaQuery("(min-width: 768px)");

  const addNewChat = async () => {
    const chatId = await newChat();
    console.log(`chatId ${chatId}`);
    history.push(`/${chatId}`);
  };

  const joinChatById = async () => {
    if (roomId) {
      const chatRoom = await joinChat(roomId);
      if (chatRoom) {
        history.push(`/${roomId}`);
      }
      console.log(chatRoom);
    } else {
      return;
    }
  };

  const joinChatById2 = async (event) => {
    event.preventDefault();
    if (roomId) {
      const chatRoom = await joinChat(roomId);
      if (chatRoom) {
        history.push(`/${roomId}`);
      }
      console.log(chatRoom);
    } else {
      return;
    }
  };

  const joinRandomChat = async () => {
    const randomChatId = await randomChat();
    if (randomChatId) {
      console.log(randomChatId);
      history.push(`/${randomChatId}`);
    } else {
      console.log("no chat rooms exist for random chat");
      const chatId = await newChat();
      history.push(`/${chatId}`);
    }
  };

  return (
    <>
      <Center className={classes.landing}>
        <Group direction="column" position="center">
          <Title>Direct Chat</Title>
          <Text size="xs">directchat.netlify.app</Text>
          <form onSubmit={(e) => joinChatById2(e)}>
            <TextInput
              placeholder="XY1B2"
              label="Room ID"
              value={roomId}
              onChange={(event) => setRoomId(event.target.value)}
              rightSection={
                <UnstyledButton onClick={() => joinChatById()}>
                  <ThemeIcon className={classes.button}>
                    <EnterIcon />
                  </ThemeIcon>
                </UnstyledButton>
              }
            />
          </form>
          <Group>
            <Button className={classes.button} onClick={() => addNewChat()}>
              New
            </Button>
            <Button
              className={classes.button}
              onClick={() => joinRandomChat()}
              variant="gradient"
              gradient={{ from: "teal", to: "blue", deg: 60 }}
            >
              Random
            </Button>
          </Group>
        </Group>
      </Center>
      <Center className={classes.info}>
        <Group grow direction={matches ? "row" : "column"}>
          <Image width={matches ? 400 : 300} alt="svg image" src={svg1} />
          <Box>
            <Title align="center" order={2} style={{ marginBottom: 10 }}>
              Centered text title
            </Title>
            <Text align="center" color="primary">
              Centered description text.
            </Text>
          </Box>
        </Group>
      </Center>
      <Center className={classes.info2}>
        <Group grow direction={matches ? "row" : "column-reverse"}>
          <Box>
            <Title align="center" order={2}>
              Centered text title
            </Title>
            <Text align="center">Cenetered description text.</Text>
          </Box>
          <Image width={matches ? 400 : 300} alt="svg image" src={svg3} />
        </Group>
      </Center>
      <Center className={classes.footer} />
    </>
  );
}
