import { useParams } from "react-router";
import {
  chatMessagesQuery,
  sendMessage,
  chatRoomQuery,
  setTyping,
} from "../firebase";
import { useCollection } from "react-firebase-hooks/firestore";
import { useEffect, useState } from "react";
import Name from "./Name";

export default function Chat() {
  const { id } = useParams();
  const [messages, messagesLoading, messageError] = useCollection(
    chatMessagesQuery(id)
  );
  const [chat, chatLoading, chatError] = useCollection(chatRoomQuery(id));
  const [message, setMessage] = useState("");
  const [hasName, setHasName] = useState(false);

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
      if (message.length > 0) {
        console.log("is typing");
        setTyping(name, id, true);
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

  return (
    <>
      {hasName ? (
        <div>
          <div>hello! url id: {id}</div>
          {chatLoading && <div>Chat Loading</div>}
          {chat && (
            <>
              <div>chat room info: {JSON.stringify(chat.data())}</div>
              <div>people typing: {chat.data().isTyping}</div>
            </>
          )}
          <div>Messages: </div>
          {messagesLoading && <div>Messages Loading</div>}
          {messages &&
            messages.docs.map((doc) => (
              <div key={doc.id}>{`${doc.id} ${JSON.stringify(
                doc.data()
              )}`}</div>
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
          {messageError && (
            <div>had an error! {JSON.stringify(messageError)}</div>
          )}
        </div>
      ) : (
        <Name />
      )}
    </>
  );
}
