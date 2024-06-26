import React from "react";
import logo from "../assets/mail.webp";
import { signInWithGoogle } from "../firebase/builds";

const Login = () => {
  return (
    <div className="w-screen h-screen flex items-center justify-center">
      <div className="w-[450px] h-screen md:h-fit md:shadow-md shadow-gray-600 rounded-sm flex flex-col items-center">
        <div className="w-3/4 slide-bottom">
          <img src={logo} alt="logo" className="w-full" />
        </div>
        <h3 className="text-4xl font-bold text-red-600">Google Mail</h3>
        <p className="mb-5 text-md italic text-gray-600 mt-1">
          Become a Professional
        </p>
        <button
          onClick={signInWithGoogle}
          className="border-2 border-gray-400 rounded-[3rem] px-6 py-4 mb-8 transition-all hover:shadow-lg text-lg font-semibold text-neutral-600"
        >
          Login or Signup with Google
        </button>
      </div>
    </div>
  );
};

export default Login;
