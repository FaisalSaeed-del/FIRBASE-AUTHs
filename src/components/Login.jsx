import React, { useState } from "react";
import { Link } from "react-router-dom";
import { getAuth, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { app } from "../Firebase";
import Cover from "../images/cover.jpg";

const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

function Login() {
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

  const handleLogin = (event) => {
    event.preventDefault();
    setErrorMessage("");
    const { email, password } = formData;
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // User login successful
        const user = userCredential.user;
        window.alert("User is logged in!");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        setErrorMessage(errorMessage);
      });
  };

  const handleGoogleSignIn = () => {
    signInWithPopup(auth, googleProvider)
      .then((result) => {
        // Google sign-in successful
        const user = result.user;
        window.alert("User is logged in with Google!");
      })
      .catch((error) => {
        // Handle errors that occurred during Google sign-in
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error("Google sign-in error:", errorMessage);
      });
  };

  return (
    <div className="w-full min-h-screen overflow-hidden flex flex-col md:flex-row">
      <div className="flex-1 flex flex-col justify-center items-center">
        <h1 className="text-3xl font-semibold mb-6">User Login</h1>
        {errorMessage && <p className="text-red-500 mb-4">{errorMessage}</p>}
        <form onSubmit={handleLogin} className="w-80">
          <div className="mb-6">
            <label className="block text-gray-600">Email:</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-400 rounded-md focus:outline-none"
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-600">Password:</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-400 rounded-md focus:outline-none"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none"
          >
            Login
          </button>
          <p>
            Don't have an account?{" "}
            <Link to="/signup" className="text-blue-600">
              Register here
            </Link>
          </p>
          <p>
            Forgot password?{" "}
            <Link to="/forgot-password" className="text-blue-600">
              Click here
            </Link>
          </p>
          <button
            type="button"
            onClick={handleGoogleSignIn}
            className="w-full px-4 py-2 bg-red-600 text-white rounded-md mt-4 hover:bg-red-700 focus:outline-none"
          >
            Sign in with Google
          </button>
        </form>
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

export default Login;
