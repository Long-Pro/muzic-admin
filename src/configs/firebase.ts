import { initializeApp } from 'firebase/app'
import {
  getAuth,
  GoogleAuthProvider,
  FacebookAuthProvider,
  TwitterAuthProvider,
  GithubAuthProvider,
} from 'firebase/auth'

const firebaseConfig = {
  apiKey: 'AIzaSyA3WukMEjD7O775as9-IjRITLtssJSJNow',
  authDomain: 'mangatoon-a7603.firebaseapp.com',
  projectId: 'mangatoon-a7603',
  storageBucket: 'mangatoon-a7603.appspot.com',
  messagingSenderId: '1050372001477',
  appId: '1:1050372001477:web:5a542b8b4ec44797abaaac',
  measurementId: 'G-W43LMNJ6VE',
}

const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
export const google = new GoogleAuthProvider()
export const facebook = new FacebookAuthProvider()
export const twitter = new TwitterAuthProvider()
export const github = new GithubAuthProvider()

// Chí Nhân
// // Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// // For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: "AIzaSyA3WukMEjD7O775as9-IjRITLtssJSJNow",
//   authDomain: "mangatoon-a7603.firebaseapp.com",
//   projectId: "mangatoon-a7603",
//   storageBucket: "mangatoon-a7603.appspot.com",
//   messagingSenderId: "1050372001477",
//   appId: "1:1050372001477:web:5a542b8b4ec44797abaaac",
//   measurementId: "G-W43LMNJ6VE"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
