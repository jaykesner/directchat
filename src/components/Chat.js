import { useParams } from "react-router";
import { chatMessagesQuery } from "../firebase";
import { useCollection } from "react-firebase-hooks/firestore";

export default function Chat() {
  const { id } = useParams();
  const [messages, loading, error] = useCollection(chatMessagesQuery(id));
  return (
    <>
      <div>hello! url id: {id}</div>
      <div>Messages: </div>
      {loading && <div>Loading</div>}
      {messages &&
        messages.docs.map((doc) => (
          <div key={doc.id}>
            {doc.id} {JSON.stringify(doc.data())}
          </div>
        ))}
      {error && <div>had an error! {JSON.stringify(error)}</div>}
    </>
  );
}
