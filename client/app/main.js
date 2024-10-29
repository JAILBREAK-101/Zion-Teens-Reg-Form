import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore";
import "./css/style.css";

// Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: import.meta.env.VITE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_APP_ID,
  measurementId: import.meta.env.VITE_MEASUREMENT_ID,
};

// console.log("API Key:", import.meta.env.VITE_API_KEY);
// console.log("Auth Domain:", import.meta.env.VITE_AUTH_DOMAIN);

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Inject form HTML into #app
document.querySelector('#app').innerHTML = `
  <div class="wrapper">
    <h1>Sign Up for RCCG Province 41 Teens</h1>
    <form id="registrationForm" class="form">
      <label for="firstName">First Name</label>
      <input type="text" id="firstName" name="firstName" required />

      <label for="lastName">Surname</label>
      <input type="text" id="lastName" name="lastName" required />

      <label for="dob">Date of Birth</label>
      <input type="date" id="dob" name="dob" required />

      <label for="educationLevel">Education Level</label>
      <select id="educationLevel" name="educationLevel" required>
          <option value="">Select Education Level</option>
          <option value="primary">Primary</option>
          <option value="secondary">Secondary</option>
          <option value="tertiary">Tertiary</option>
      </select>

      <label for="department">Department</label>
      <select id="department" name="department" required>
          <option value="">Select Department</option>
          <option value="choir">Choir</option>
          <option value="ushering">Ushering</option>
          <option value="technical">Technical</option>
          <option value="youth">Youth</option>
      </select>

      <label for="username">Username</label>
      <input type="text" id="username" name="username" required />

      <label for="email">Email</label>
      <input type="email" id="email" name="email" required />

      <label for="password">Password</label>
      <input type="password" id="password" name="password" required />

      <button type="submit" class="submit-btn">Sign Up</button>
      <button type="button" id="google-btn" class="google-btn">Sign Up with Google</button>
    </form>
  </div>
`;

// Registration function
async function register() {
  const firstName = document.getElementById('firstName').value.trim();
  const lastName = document.getElementById('lastName').value.trim();
  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value;

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
    window.location.href = "/welcome.html";
  } catch (error) {
    alert(`Error: ${error.message}`);
  }
}

// Google Sign-In function
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
