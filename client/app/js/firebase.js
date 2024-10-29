import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.apiKey,
  authDomain: process.env.authDomain,
  projectId: process.env.projectId,
  storageBucket: process.env.storageBucket,
  messagingSenderId: process.env.messagingSenderId,
  appId: process.env.appId,
  measurementId: process.env.measurementId,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Register function with validation
async function register() {
  const firstName = document.getElementById('firstName').value.trim();
  const lastName = document.getElementById('lastName').value.trim();
  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value;

  // Input validation
  if (!firstName || !lastName || !email || !password) {
    alert("Please fill in all fields.");
    return;
  }

  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Store additional user data in Firestore
    await setDoc(doc(db, "users", user.uid), {
      uid: user.uid,
      firstName,
      lastName,
      email,
    });

    alert("Registration successful!");
    window.location.href = "welcome.html";
  } catch (error) {
    alert(`Error: ${error.message}`);
  }
}

// Login function
async function login() {
  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value;

  if (!email || !password) {
    alert("Please enter email and password.");
    return;
  }

  try {
    await signInWithEmailAndPassword(auth, email, password);
    alert("Login successful!");
    window.location.href = "dashboard.html"; // Redirect on success
  } catch (error) {
    alert(`Error: ${error.message}`);
  }
}

// Google Sign-In
async function googleSignIn() {
  const provider = new GoogleAuthProvider();
  try {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;

    // Store user info if first login
    const userRef = doc(db, "users", user.uid);
    if (!userRef.exists()) {
      await setDoc(userRef, {
        uid: user.uid,
        name: user.displayName,
        email: user.email,
      });
    }

    alert("Google Sign-In successful!");
    window.location.href = "dashboard.html";
  } catch (error) {
    alert(`Error: ${error.message}`);
  }
}

// Attach event listeners
document.getElementById("registrationForm").addEventListener("submit", (e) => {
  e.preventDefault();
  register();
});

document.getElementById("google-btn").addEventListener("click", googleSignIn);

