import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useHistory } from "react-router-dom";
import { chatRoomQuery } from "../../api/firebase";
import { useCollection } from "react-firebase-hooks/firestore";
import NameModal from "../chat/NameModal";
import Title from "../chat/Title";
import Messages from "../chat/Messages";
import NewMessage from "../chat/NewMessage";
import TypingIndicator from "../chat/TypingIndicator";
import { Container, Stack } from "@mantine/core";
import { useScrollLock } from "@mantine/hooks";

export default function Chat() {
  const { id } = useParams();
  const history = useHistory();
  const [chatRoom] = useCollection(chatRoomQuery(id));
  const [chatRoomExists, setChatRoomExists] = useState(false);
  const [name, setName] = useState(sessionStorage.getItem("name"));

  useScrollLock(true);

  useEffect(() => {
    if (chatRoom) {
      if (chatRoom.data()) {
        setChatRoomExists(true);
      } else {
        history.push(`/`);
      }
    }
  }, [chatRoom, history]);

  return (
    <>
      {chatRoomExists && (
        <>
          <NameModal name={name} setName={setName} />
          <Stack spacing="xl" align="center" justify="center">
            <Title id={id} history={history} />
            <Container style={{ width: "100%" }}>
              <Messages id={id} />
            </Container>
            <Container style={{ width: "100%" }}>
              <NewMessage id={id} name={name} />
              <TypingIndicator chatRoom={chatRoom} />
            </Container>
          </Stack>
        </>
      )}
    </>
  );
}
