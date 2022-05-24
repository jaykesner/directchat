# Direct Chat [[directchat.netlify.app](https://directchat.netlify.app/)]

Chat app made with [Create React App](https://create-react-app.dev/) and [Firebase](https://firebase.google.com/), deployed automatically from github commits to [Netlify](https://www.netlify.com/).

## What is it? Why did I build this project?

Direct Chat is a chat app that uses React for the frontend and Cloud Firestore from Firebase for the backend. This allows the app to have chat rooms, each having a five digit id that be accessed or shared directly by adding the id to the end of the url (ex. [directchat.netlify.app/XY1B2](https://directchat.netlify.app/XY1B2)). The app has no sign in or user accounts, users can create a username on the fly which is stored in the session.

My goals for this project were to create a sensibly scoped React project that I can "finish" and continue to iterate on, which includes routing, APIs, async/await, and CI/CD. Firestore is a great piece of tech for this because it's both an API and a backend, which led me to learning some things about cloud database security as well.

## How I worked on this project

- Notion for task tracking + planning
- [Mantine](https://mantine.dev/) for ui design components
- Github and Netlify to deploy branches to live site

## What I should add to this project

- Netlify setup instructions
- Testing!

## Running locally

1. Clone the repo `git clone https://github.com/jaykesner/directchat.git`
2. Install NPM packages `npm install`
3. Create a project on Firebase, add a Web App
4. Change default Cloud Firestore security rules to allow reads/writes (more on security below)
   ```
   rules_version = '2';
   service cloud.firestore {
     match /databases/{database}/documents {
       match /{document=**} {
         // change this next line from false, to true
         allow read, write: if true;
       }
     }
   }
   ```
5. Create a `.env.local` file in the base directory
6. Copy over the entire `.env` file contents into `.env.local` and add in your Firebase config values.
   ```
   // replace with your config settings, no quotes
   REACT_APP_AUTH_DOMAIN=yourproject-asdfa.firebaseapp.com
   ```
7. Run the app locally `npm start`
8. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## Security

With no user accounts and a open ruleset, the app could potentially be vulnurable to bad actors. We definitely don't want someone being able to add whatever data they want to the Cloud Firestore, and we don't want someone to be able to delete all of the data within the app.

With Direct Chat I tried to create security rules that make it so that someone can only send requests that match how the app is intended to be used, only allowing specific fields with limits on the size.

For example, to create a new chatroom, the request must have a valid five digit id that is checked using a regular expression, and it must only have a `createdAt` field that is of type `timestamp`.

```
match /chats/{id} {
  allow get;
  allow list;
  allow create: if isValidChatRoomId(request.resource.id) && hasOnlyDate();
  allow update: if hasOnlyTyping();
  //allow delete;
}

function isValidChatRoomId(chatId) {
  return chatId.matches('^[0-9A-Z]{5}$');
}

function hasOnlyDate() {
  return request.resource.data.keys().hasOnly(['createdAt']) &&
    request.resource.data.createdAt is timestamp;
}
```

Here is the full set of security rules that includes rules based on more types, arrays, and size, that can be copied into the rules console.

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if false;
    }

    function isValidChatRoomId(chatId) {
    	return chatId.matches('^[0-9A-Z]{5}$');
    }

    function isExistingChat(id) {
    	return exists(/databases/$(database)/documents/chats/$(id));
    }

    function hasOnlyDate() {
      return request.resource.data.keys().hasOnly(['createdAt']) &&
      	request.resource.data.createdAt is timestamp;
    }

    function hasOnlyMessageData() {
    	return request.resource.data.keys().hasOnly(['chatId', 'createdAt', 'text', 'name']) &&
      	request.resource.data.keys().hasAll(['chatId', 'createdAt', 'text', 'name']) &&
        request.resource.data.createdAt is timestamp &&
        request.resource.data.text is string &&
        request.resource.data.text.size() < 1000 &&
        request.resource.data.name is string &&
        request.resource.data.name.size() < 25;
    }

    function hasOnlyTyping() {
    	return request.resource.data.keys().hasOnly(['isTyping', 'createdAt']) &&
      	request.resource.data.keys().hasAll(['isTyping']) &&
        request.resource.data.isTyping is list &&
        request.resource.data.isTyping.size() <= 1;
    }

    match /chats/{id} {
      allow get;
      allow list;
      allow create: if isValidChatRoomId(request.resource.id) && hasOnlyDate();
      allow update: if hasOnlyTyping();
      //allow delete;
    }

    match /messages/{id} {
      allow get;
      allow list;
      allow create: if isExistingChat(request.resource.data.chatId) && hasOnlyMessageData();
      //allow update;
      //allow delete;
    }
  }
}
```
