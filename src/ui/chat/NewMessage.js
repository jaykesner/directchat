import { useEffect, useState } from "react";
import { sendMessage, setTyping, updateLastMessage } from "../../api/firebase";
import { TextInput } from "@mantine/core";

export default function NewMessage({ id, name }) {
  const [message, setMessage] = useState("");
  const [wasTyping, setWasTyping] = useState(false);

  useEffect(() => {
    if (name) {
      if (message.length > 0 && !wasTyping) {
        setTyping(name, id, true);
        setWasTyping(true);
      }

      if (message.length === 0 && wasTyping) {
        setTyping(name, id, false);
        setWasTyping(false);
      }
    }
  }, [name, message, id, wasTyping]);

  const sendNewMessage = async (e) => {
    e.preventDefault();
    if (name) {
      const messageInfo = {
        message: message,
        roomId: id,
        name: name,
      };
      await sendMessage(messageInfo);
      updateLastMessage(id);
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
