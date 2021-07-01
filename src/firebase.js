import firebase from "firebase";
import "firebase/firestore";
import config from "./firebase-config";
import { customAlphabet } from "nanoid";

const nanoid = customAlphabet("1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZ", 5);

firebase.initializeApp(config);

export const db = firebase.firestore();

export const newChat = () => {
  const newChatId = nanoid();
  return new Promise((resolve, reject) => {
    db.collection("chats")
      .doc(newChatId)
      .set({
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      })
      .then(() => {
        //console.log(`added new chat ${docref.id}`);
        resolve(newChatId);
      })
      .catch((error) => {
        console.log("error adding new chat");
        reject(error);
      });
    /*
    db.collection("chats")
      .add({
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      })
      .then((docref) => {
        console.log(`added new chat ${docref.id}`);
        resolve(docref.id);
      })
      .catch((error) => {
        console.log("error adding new chat");
        reject(error);
      });
      */
  });
};
export const chatMessages = (id) => {
  return db
    .collection("messages")
    .where("chatId", "==", id)
    .orderBy("createdAt", "asc");
};
