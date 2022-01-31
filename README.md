# Direct Chat

Chat app made with [Create React App](https://github.com/facebook/create-react-app) and [Firebase](https://firebase.google.com/), deployed on [Netlify](https://www.netlify.com/).

[directchat.netlify.app](https://directchat.netlify.app/)

## Build Structure
Developing on the `develop` branch, then merging into `master` for Netlify to automatically pick up and deploy to live site.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## README todo
- instructions for setup/installation
    - firebase setup
        - need `firebase-config.js` included in `src`
        - firebase setup to include rule change from default

```
const firebaseConfig = {
  apiKey: "APIKEY",
  authDomain: "AUTHDOMAIN",
  projectId: "PROJECTID",
  storageBucket: "STORAGEBUCKET",
  messagingSenderId: "MESSAGINGSENDERID",
  appId: "APPID",
  measurementId: "MEASUREMENTID"
};
export default firebaseConfig;
```