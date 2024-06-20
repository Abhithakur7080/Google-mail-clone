import React from "react";
import Navbar from "./components/shared/Navbar";
import { Route, Routes } from "react-router-dom";
import Inbox from "./components/menus/Inbox";
import Body from "./components/Body";
import Mail from "./components/shared/Mail";
import SendMail from "./components/SendMail";
import { useSelector } from "react-redux";
import { appSelector } from "./redux/reducers/appSlice";

const App = () => {
  const { full } = useSelector(appSelector);
  return (
    <div className="bg-[#f6f8fc] w-screen h-screen overflow-hidden">
      <Navbar />
      <Routes>
        <Route path="/" element={<Body />}>
          <Route index element={<Inbox />} />
          <Route path="mail/:id" element={<Mail />} />
        </Route>
      </Routes>
      <div className={`absolute shadow-md ${full ? "w-screen top-0 left-0 right-0 bottom-0 md:top-10 md:left-10 md:right-10 md:bottom-10" : "w-screen md:w-96 bottom-0 right-0 md:right-20"} z-10`}>
        <SendMail />
      </div>
    </div>
  );
};

export default App;
