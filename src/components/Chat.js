import { useParams } from "react-router";
import { chatMessagesQuery } from "../firebase";
import { useCollection } from "react-firebase-hooks/firestore";
import { useEffect, useState } from "react";
import { sendMessage } from "../firebase";
import Name from "./Name";

export default function Chat() {
  const { id } = useParams();
  const [messages, loading, error] = useCollection(chatMessagesQuery(id));
  const [message, setMessage] = useState("");
  const [hasName, setHasName] = useState(false);

  const sendNewMessage = async (e) => {
    e.preventDefault();
    console.log("submitted message");
    const messageInfo = {
      message: message,
      roomId: id,
      name: sessionStorage.getItem("name"),
    };
    const newMessage = await sendMessage(messageInfo);
  };

  useEffect(() => {
    const name = sessionStorage.getItem("name");
    if (name) {
      console.log("found name");
      setHasName(true);
    } else {
      console.log("didn't find name");
    }
  }, []);

  /*
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

  return (
    <>
      {hasName ? (
        <div>
          <div>hello! url id: {id}</div>
          <div>Messages: </div>
          {loading && <div>Loading</div>}
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
          {error && <div>had an error! {JSON.stringify(error)}</div>}
        </div>
      ) : (
        <Name />
      )}
    </>
  );
}
