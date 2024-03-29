import { useState } from "react";
import { useHistory } from "react-router-dom";
import {
  newChat,
  joinChat,
  randomChat,
  deleteChat,
  deleteMessages,
} from "../../api/firebase";
import {
  Paper,
  Group,
  Stack,
  Title,
  TextInput,
  Button,
  UnstyledButton,
  ThemeIcon,
  Radio,
} from "@mantine/core";
import { ReactComponent as EnterIcon } from "../../images/enter-icon.svg";

export default function Navigation({ selectTheme, themeStyle }) {
  let history = useHistory();
  const [roomId, setRoomId] = useState("");

  const addNewChat = async () => {
    const chatId = await newChat();
    console.log(`chatId ${chatId}`);
    history.push(`/${chatId}`);
  };

  const joinChatById = async (event) => {
    if (event) {
      event.preventDefault();
    }
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
    //const randomToDelete = await randomChat();
    //console.log(randomToDelete);

    // delete random chat
    await deleteRandomChat();

    // join random chat, or create new if none exist
    const randomChatToJoin = await randomChat();
    if (randomChatToJoin) {
      console.log(`joining random chat ${randomChatToJoin}`);
      history.push(`/${randomChatToJoin}`);
    } else {
      console.log("no chat rooms exist for random chat");
      const chatId = await newChat();
      history.push(`/${chatId}`);
    }
  };

  const deleteRandomChat = async () => {
    const randomChatToDelete = await randomChat();
    //console.log(`trying to delete ${randomChatToDelete}`);
    // todo: check date on client before trying to delete
    if (randomChatToDelete) {
      try {
        const deletedChat = await deleteChat(randomChatToDelete);
        console.log(`deleted ${deletedChat}`);
        if (deletedChat) {
          await deleteMessages(deletedChat);
          console.log(`deleted messages from ${deletedChat}`);
        }
      } catch (e) {
        console.log(`no delete needed on chat ${randomChatToDelete}`);
      }
    }
  };

  return (
    <Paper p="xl" shadow="lg" radius="lg" withBorder>
      <Stack align="center">
        <Title sx={{ fontSize: 48 }}>Direct Chat</Title>
        <form onSubmit={(e) => joinChatById(e)} autoComplete="off">
          <TextInput
            placeholder="XY1B2"
            label="Room ID"
            size="xl"
            radius="xl"
            value={roomId}
            onChange={(event) => setRoomId(event.target.value)}
            rightSection={
              <UnstyledButton
                onClick={joinChatById}
                sx={{ paddingRight: "18px" }}
              >
                <ThemeIcon size="xl" radius="xl">
                  <EnterIcon />
                </ThemeIcon>
              </UnstyledButton>
            }
          />
        </form>
        <Group>
          <Button size="xl" radius="xl" onClick={addNewChat}>
            New
          </Button>
          <Button
            onClick={joinRandomChat}
            variant="gradient"
            size="xl"
            radius="xl"
            gradient={{ from: "teal", to: "blue", deg: 60 }}
          >
            Random
          </Button>
        </Group>
        <Radio.Group value={themeStyle} onChange={selectTheme}>
          <Radio value="light" label="Light" />
          <Radio value="dark" label="Dark" />
          <Radio value="dark2" label="Dark2" />
        </Radio.Group>
        <Button>Test Button</Button>
      </Stack>
    </Paper>
  );
}
