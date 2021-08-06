import { useParams } from "react-router";
import { chatMessagesQuery } from "../firebase";
import { useCollection } from "react-firebase-hooks/firestore";
import { useState } from "react";
import { sendMessage } from "../firebase";

export default function Chat() {
  const { id } = useParams();
  const [messages, loading, error] = useCollection(chatMessagesQuery(id));
  const [message, setMessage] = useState("");

  const sendNewMessage = async (e) => {
    e.preventDefault();
    console.log("submitted message");
    const newMessage = await sendMessage(message, id);
  };

  return (
    <>
      <div>hello! url id: {id}</div>
      <div>Messages: </div>
      {loading && <div>Loading</div>}
      {messages &&
        messages.docs.map((doc) => (
          <div key={doc.id}>{`${doc.id} ${JSON.stringify(doc.data())}`}</div>
        ))}
      <div>
        <form onSubmit={(e) => sendNewMessage(e)}>
          <input
            type="text"
            onChange={(e) => setMessage(e.target.value)}
          ></input>
        </form>
      </div>
      {error && <div>had an error! {JSON.stringify(error)}</div>}
    </>
  );
}
