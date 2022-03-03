import { useState } from "react";
import { useParams } from "react-router";
import { useHistory } from "react-router-dom";
import { chatRoomQuery } from "../../api/firebase";
import { useCollection } from "react-firebase-hooks/firestore";
import NameModal from "../chat/NameModal";
import Title from "../chat/Title";
import Messages from "../chat/Messages";
import NewMessage from "../chat/NewMessage";
import TypingIndicator from "../chat/TypingIndicator";
import { Group, Container } from "@mantine/core";
import { useScrollLock } from "@mantine/hooks";

export default function Chat() {
  const { id } = useParams();
  const history = useHistory();
  const [chatRoom] = useCollection(chatRoomQuery(id));
  const [name, setName] = useState(sessionStorage.getItem("name"));

  useScrollLock(true);

  return (
    <>
      <NameModal name={name} setName={setName} />
      <Group direction="column" spacing="xl" position="center">
        <Title id={id} history={history} />
        <Container style={{ width: "100%" }}>
          <Messages id={id} />
        </Container>
        <Container style={{ width: "100%" }}>
          <NewMessage id={id} name={name} />
          <TypingIndicator chatRoom={chatRoom} />
        </Container>
      </Group>
    </>
  );
}
