import firebase from "firebase";
import "firebase/firestore";
import config from "./firebase-config";
import { customAlphabet } from "nanoid";

const nanoid = customAlphabet("1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZ", 5);

firebase.initializeApp(config);

export const db = firebase.firestore();

export const joinChat = (id) => {
  return new Promise((resolve, reject) => {
    console.log(`firebase func ${id}`);
    db.collection("chats")
      .doc(id)
      .get()
      .then((doc) => {
        if (doc.exists) {
          console.log("doc exists");
          resolve(true);
        } else {
          resolve(false);
        }
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const randomChat = () => {
  return new Promise((resolve, reject) => {
    db.collection("chatss")
      .get()
      .then((docs) => {
        const fetchedIds = [];
        docs.forEach((doc) => {
          //console.log(doc.id);
          fetchedIds.push(doc.id);
        });
        //console.log(fetchedIds);
        if (fetchedIds.length > 0) {
          const randomId =
            fetchedIds[Math.floor(Math.random() * fetchedIds.length)];
          resolve(randomId);
        } else {
          resolve(false);
        }
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const newChat = () => {
  const newChatId = nanoid();
  return new Promise((resolve, reject) => {
    db.collection("chats")
      .doc(newChatId)
      .set({
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      })
      .then(() => {
        resolve(newChatId);
      })
      .catch((error) => {
        console.log("error adding new chat");
        reject(error);
      });
  });
};
export const chatMessagesQuery = (id) => {
  return db
    .collection("messages")
    .where("chatId", "==", id)
    .orderBy("createdAt", "asc");
};
