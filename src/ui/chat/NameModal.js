import { Group, TextInput, Button, Modal } from "@mantine/core";
import { useState, useEffect } from "react";

export default function NameModal({ name, setName }) {
  const [nameInput, setNameInput] = useState("");
  const [modalOpen, setModalOpened] = useState(true);

  useEffect(() => {
    if (!modalOpen) {
      if (!name) {
        setModalOpened(true);
      }
    }
    if (modalOpen) {
      if (name) {
        setModalOpened(false);
      }
    }
  }, [modalOpen, name]);

  const submitNameForm = (e) => {
    e.preventDefault();
    sessionStorage.setItem("name", nameInput);
    setName(nameInput);
  };

  return (
    <Modal
      opened={modalOpen}
      onClose={() => setModalOpened(false)}
      hideCloseButton
      centered
    >
      <form onSubmit={(e) => submitNameForm(e)} autoComplete="off">
        <Group direction="column" grow>
          <TextInput
            data-autofocus
            placeholder="Your name"
            label="What's your name?"
            required
            radius="xl"
            size="lg"
            value={nameInput}
            onChange={(e) => setNameInput(e.target.value)}
          />
          <Button type="submit" radius="xl" size="lg">
            Join {nameInput ? `as ${nameInput}` : null}
          </Button>
        </Group>
      </form>
    </Modal>
  );
}
