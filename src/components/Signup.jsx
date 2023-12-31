import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAuth, createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { app } from "../Firebase";
import Cover from "../images/cover.jpg";

const auth = getAuth(app);

function App() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setErrorMessage("");
    const { email, password } = formData;
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // User registration successful
        const user = userCredential.user;
        // Clear the input fields
        setFormData({
          email: "",
          password: "",
        });
        navigate("/");
      })
      .catch((error) => {
        // User registration failed
        const errorCode = error.code;
        const errorMessage = error.message;

        if (errorCode === "auth/email-already-in-use") {
          setErrorMessage("The email address is already in use.");
        } else {
          setErrorMessage(errorMessage);
        }
      });
  };

  const handleSignUpWithGoogle = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        // Sign-in with Google successful, navigate to the desired page or perform further actions
        navigate("/");
      })
      .catch((error) => {
        // Handle errors that occurred during Google sign-in
      });
  };

  return (
    <div className="w-full min-h-screen overflow-hidden flex flex-col md:flex-row">
      <div className="flex-1 flex flex-col justify-center items-center">
        <h1 className="text-3xl font-semibold mb-6">User Registration</h1>
        {errorMessage && <p className="text-red-500 mb-4">{errorMessage}</p>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-600">Email:</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-400 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-600">Password:</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-400 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
              required
            />
          </div>
          <div>
            <button
              type="submit"
              className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-300"
            >
              Register
            </button>
          </div>
        </form>
        <div className="mt-4">
          <button
            className="w-full px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring focus:ring-red-300"
            onClick={handleSignUpWithGoogle}
          >
            Sign Up with Google
          </button>
        </div>
      </div>
      <div className="hidden md:flex md:w-[50%] lg:w-[60%] xl:w-[70%] overflow-hidden">
        <div
          className="relative h-full"
          style={{
            clipPath: "circle(60% at 70% 50%)",
          }}
        >
          <img src={Cover} alt="" className="object-cover w-full h-full" />
        </div>
      </div>
    </div>
  );
}

export default App;
