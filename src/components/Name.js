import { useState } from "react";

export default function Chat() {
  const [nameInput, setNameInput] = useState("");

  const setChatName = (e) => {
    //e.preventDefault();
    sessionStorage.setItem("name", nameInput);
    console.log(sessionStorage.getItem("name"));
  };

  return (
    <div>
      <h3>name</h3>
      <form onSubmit={(e) => setChatName(e)}>
        <input
          type="text"
          onChange={(e) => setNameInput(e.target.value)}
          value={nameInput}
        ></input>
      </form>
    </div>
  );
}
