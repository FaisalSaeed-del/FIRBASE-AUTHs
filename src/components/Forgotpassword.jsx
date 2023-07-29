import React, { useState } from "react";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { app } from "../Firebase";
import Cover from "../images/cover.jpg"

const auth = getAuth(app);

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [isEmailSent, setIsEmailSent] = useState(false);

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleSendPasswordResetEmail = () => {
    sendPasswordResetEmail(auth, email)
      .then(() => {
        setIsEmailSent(true);
      })
      .catch((error) => {
        // Handle any errors that occurred during sending the password reset email
      });
  };

  return (
    <div className="w-full min-h-screen overflow-hidden flex flex-col md:flex-row">
      <div className="flex-1 flex flex-col justify-center items-center">
        <h1 className="text-3xl font-semibold mb-6">Forgot Password</h1>
        {isEmailSent ? (
          <p className="text-green-500">Reset password link sent to your email.</p>
        ) : (
          <div>
            <input
              type="email"
              value={email}
              onChange={handleEmailChange}
              className="w-full px-4 py-2 border border-gray-400 rounded-md focus:outline-none focus:ring focus:ring-blue-300 mb-4"
              placeholder="Enter your email"
              required
            />
            <button
              onClick={handleSendPasswordResetEmail}
              className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-300"
            >
              Send Password Reset Email
            </button>
          </div>
        )}
      </div>
      <div className="hidden md:flex md:w-[50%] lg:w-[60%] xl:w-[70%] overflow-hidden">
        <div
          className="relative h-full"
          style={{
            clipPath: "circle(60% at 70% 50%)",
          
          }}
        >
          <img
            src={Cover}
            alt=""
            className="object-cover w-full h-full"
          />
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
