import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getAnalytics } from 'firebase/analytics'
import { getPerformance } from 'firebase/performance'

const firebaseConfig = {
  apiKey: "AIzaSyAV5YG54M6bblRhAbBhNJtyAYaVekYM0pE",
  authDomain: "todo-app-alx.firebaseapp.com",
  projectId: "todo-app-alx",
  storageBucket: "todo-app-alx.appspot.com",
  messagingSenderId: "1073081665196",
  appId: "1:1073081665196:web:ffda2479a9ef016d248109",
  measurementId: "G-0CH8HF1E9M"
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const auth = getAuth(app)

if (app.name && typeof window !== 'undefined') {
  getAnalytics(app)
  getPerformance(app)
}

export default auth
