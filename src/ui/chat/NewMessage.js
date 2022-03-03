import { useEffect, useState } from "react";
import { sendMessage, setTyping } from "../../api/firebase";
import { TextInput } from "@mantine/core";

export default function NewMessage({ id, name }) {
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (name) {
      if (message.length > 0) {
        setTyping(name, id, true);
      } else {
        setTyping(name, id, false);
      }
    }
  });

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
  return (
    <form onSubmit={(e) => sendNewMessage(e)} autoComplete="off">
      <TextInput
        placeholder="Type a message.."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        radius="xl"
        size="lg"
      />
    </form>
  );
}
