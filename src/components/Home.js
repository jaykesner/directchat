import svg1 from "../images/chat-svg1.svg";
import svg3 from "../images/chat-svg3.svg";
import { ReactComponent as EnterIcon } from "../images/enter-icon.svg";
import { newChat, joinChat, randomChat } from "../api/firebase";
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
  Box,
  ThemeIcon,
  UnstyledButton,
  Paper,
} from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";

const useStyles = createStyles((theme) => ({
  landing: {
    height: "738px",
  },
  info: {
    backgroundColor:
      theme.colorScheme === "dark"
        ? theme.colors.dark[5]
        : theme.colors.gray[3],
    height: "378px",
  },
  info2: {
    backgroundColor:
      theme.colorScheme === "dark"
        ? theme.colors.dark[4]
        : theme.colors.gray[4],
    height: "378px",
  },
  footer: {
    backgroundColor:
      theme.colorScheme === "dark"
        ? theme.colors.dark[3]
        : theme.colors.gray[5],
    height: "400px",
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
        <Container>
          <Paper padding="xl" shadow="lg" radius="lg" withBorder>
            <Group direction="column" position="center">
              <Title sx={{ fontSize: 48 }}>Direct Chat</Title>
              <form onSubmit={(e) => joinChatById2(e)} autoComplete="off">
                <TextInput
                  placeholder="XY1B2"
                  label="Room ID"
                  size="xl"
                  radius="xl"
                  value={roomId}
                  onChange={(event) => setRoomId(event.target.value)}
                  rightSection={
                    <UnstyledButton
                      onClick={() => joinChatById()}
                      sx={{ paddingRight: "16px" }}
                    >
                      <ThemeIcon
                        size="xl"
                        radius="xl"
                        className={classes.button}
                      >
                        <EnterIcon />
                      </ThemeIcon>
                    </UnstyledButton>
                  }
                />
              </form>
              <Group>
                <Button size="xl" radius="xl" onClick={() => addNewChat()}>
                  New
                </Button>
                <Button
                  onClick={() => joinRandomChat()}
                  variant="gradient"
                  size="xl"
                  radius="xl"
                  gradient={{ from: "teal", to: "blue", deg: 60 }}
                >
                  Random
                </Button>
              </Group>
            </Group>
          </Paper>
        </Container>
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
