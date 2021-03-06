import { useState } from "react";
import { useHistory } from "react-router-dom";
import { newChat, joinChat, randomChat } from "../../api/firebase";
import {
  Paper,
  Group,
  Title,
  TextInput,
  Button,
  UnstyledButton,
  ThemeIcon,
} from "@mantine/core";
import { ReactComponent as EnterIcon } from "../../images/enter-icon.svg";

export default function Navigation() {
  let history = useHistory();
  const [roomId, setRoomId] = useState("");

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
                <ThemeIcon size="xl" radius="xl">
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
  );
}
