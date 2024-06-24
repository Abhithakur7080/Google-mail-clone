import React from "react";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";
import SendMail from "./SendMail";
import Navbar from "./shared/Navbar";
import { useSelector } from "react-redux";
import { appSelector } from "../redux/reducers/appSlice";

const Body = () => {
  const { full } = useSelector(appSelector);
  return (
    <>
      <Navbar />
      <div className="flex">
        <Sidebar />
        <Outlet />
        <div
          className={`absolute shadow-md ${
            full
              ? "top-0 left-0 right-0 bottom-0 md:top-10 md:left-10 md:right-10 md:bottom-auto"
              : "md:w-96 bottom-0 right-0 md:right-20"
          } z-10`}
        >
          <SendMail />
        </div>
      </div>
    </>
  );
};

export default Body;
