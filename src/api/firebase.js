import firebase from "firebase/app";
import "firebase/firestore";
import { customAlphabet } from "nanoid";

const nanoid = customAlphabet("1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZ", 5);

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
  measurementId: process.env.REACT_APP_MEASUREMENT_ID,
};

firebase.initializeApp(firebaseConfig);

export const db = firebase.firestore();

export const joinChat = (id) => {
  return new Promise((resolve, reject) => {
    db.collection("chats")
      .doc(id)
      .get()
      .then((doc) => {
        if (doc.exists) {
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
    db.collection("chats")
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
        lastMessageAt: firebase.firestore.FieldValue.serverTimestamp(),
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

export const deleteChat = (id) => {
  return new Promise((resolve, reject) => {
    db.collection("chats")
      .doc(id)
      .delete()
      .then(() => {
        console.log(`deleted chat ${id}`);
        resolve(id);
      })
      .catch((error) => {
        if (error.code === "permission-denied") {
          reject("rejected by permissions");
        } else {
          reject("other rejection");
        }
      });
  });
};

export const deleteMessages = (id) => {
  return new Promise((resolve, reject) => {
    db.collection("messages")
      .where("chatId", "==", id)
      .get()
      .then((docs) => {
        docs.forEach((doc) => {
          doc.ref.delete();
        });
        console.log("deleted messages");
        resolve("deleted messages by id");
      })
      .catch((error) => {
        console.log("error deleting messages by id");
        reject(error);
      });
  });
};

export const sendMessage = (messageInfo) => {
  const { message, roomId, name } = messageInfo;
  return new Promise((resolve, reject) => {
    db.collection("messages")
      .add({
        chatId: roomId,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        text: message,
        name: name,
      })
      .then(() => {
        console.log("added message");
        resolve("added new message");
      })
      .catch((error) => {
        console.log("error sending new message");
        reject(error);
      });
  });
};

export const updateLastMessage = (id) => {
  db.collection("chats").doc(id).update({
    lastMessageAt: firebase.firestore.FieldValue.serverTimestamp(),
  });
};

export const setTyping = (name, id, isTyping) => {
  const arrayMethod = isTyping
    ? firebase.firestore.FieldValue.arrayUnion(name)
    : firebase.firestore.FieldValue.arrayRemove(name);
  db.collection("chats").doc(id).update({
    isTyping: arrayMethod,
  });
};

export const chatMessagesQuery = (id) => {
  return db
    .collection("messages")
    .where("chatId", "==", id)
    .orderBy("createdAt", "asc");
};

export const chatRoomQuery = (id) => {
  return db.collection("chats").doc(id);
};
