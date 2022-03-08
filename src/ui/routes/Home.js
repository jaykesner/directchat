import Navigation from "../home/Navigation";
import Content from "../home/Content";
import svg1 from "../../images/chat-svg1.svg";
import svg3 from "../../images/chat-svg3.svg";
import { Container, createStyles, Center } from "@mantine/core";

const useStyles = createStyles((theme) => ({
  landing: {
    height: "738px",
  },
  info: {
    backgroundColor:
      theme.colorScheme === "dark"
        ? theme.colors.dark[5]
        : theme.colors.gray[3],
    height: "378px",
  },
  info2: {
    backgroundColor:
      theme.colorScheme === "dark"
        ? theme.colors.dark[4]
        : theme.colors.gray[4],
    height: "378px",
  },
  footer: {
    backgroundColor:
      theme.colorScheme === "dark"
        ? theme.colors.dark[3]
        : theme.colors.gray[5],
    height: "400px",
  },
}));

export default function Home() {
  const { classes } = useStyles();

  return (
    <>
      <Center className={classes.landing}>
        <Container>
          <Navigation />
        </Container>
      </Center>
      <Center className={classes.info}>
        <Container>
          <Content
            image={svg1}
            textTitle="Chat with React and Firebase"
            textContent="Firebase provides a fast cloud database for messaging and chat room features, updated using state in React."
          />
        </Container>
      </Center>
      <Center className={classes.info2}>
        <Content
          image={svg3}
          flip
          textTitle="No sign in, shareable URL"
          textContent="Create or join a chat room using five digit chat rooms, using any name you want."
        />
      </Center>
      <Center className={classes.footer} />
    </>
  );
}
