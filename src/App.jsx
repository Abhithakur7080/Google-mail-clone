import React from "react";
import { Route, Routes } from "react-router-dom";
import Inbox from "./components/menus/Inbox";
import Body from "./components/Body";
import Mail from "./components/shared/Mail";
import Login from "./components/Login";
import Starred from "./components/menus/Starred";
import Sent from "./components/menus/Sent";
import Draft from "./components/menus/Draft";
import Snoozed from "./components/menus/Snoozed";
import Important from "./components/menus/Important";
import AllMail from "./components/menus/AllMails";

const App = () => {
  return (
    <div className="bg-[#f6f8fc] w-screen h-screen overflow-hidden">
      <Routes>
        <Route path="/" element={<Body />}>
          <Route index element={<Inbox />} />
          <Route path="/starred" element={<Starred />} />
          <Route path="/snoozed" element={<Snoozed />} />
          <Route path="/sent" element={<Sent />} />
          <Route path="/draft" element={<Draft />} />
          <Route path="/important" element={<Important />} />
          <Route path="/all" element={<AllMail />} />
          <Route path="mail/:id" element={<Mail />} />
        </Route>
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
};

export default App;
