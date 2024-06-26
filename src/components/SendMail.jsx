import React, { useState } from "react";
import { RxCross2 } from "react-icons/rx";
import { MdOpenInFull, MdOutlineCloseFullscreen } from "react-icons/md";
import { TbMinus } from "react-icons/tb";
import { useDispatch, useSelector } from "react-redux";
import {
  appSelector,
  setFull,
  setMinimize,
  setOpen,
} from "../redux/reducers/appSlice";
import { useFirebase } from "../firebase/firebase";
import { serverTimestamp } from "firebase/firestore";
import { draftMail, newMail } from "../redux/reducers/mailSlice";

const SendMail = () => {
  const { open, minimize, full } = useSelector(appSelector);
  const currentUser = useFirebase();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    sender: "",
    receiver: "",
    subject: "",
    content: "",
  });
  const handleChangeFormData = (e) => {
    let key = e.target.name;
    let value = e.target.value;
    setFormData({ ...formData, [key]: value });
  };
  const handleClear = () => {
    setFormData({
      sender: "",
      receiver: "",
      subject: "",
      content: "",
    });
  };
  const handleSubmitFormData = (e) => {
    e.preventDefault();
    if (!formData.receiver || !formData.subject || !formData.content) {
      alert("All fields are required");
      return;
    }
    const updatedData = {
      ...formData,
      sender: currentUser.email,
      read: false,
      createdAt: serverTimestamp(),
    };
    dispatch(newMail(updatedData));
    handleClear();
    dispatch(setOpen(false));
  };

  const handleClose = () => {
    if (open && formData.receiver && formData.subject && formData.content) {
      const updatedData = {
        ...formData,
        read: true,
        sender: currentUser.email,
        createdAt: serverTimestamp(),
      };
      dispatch(draftMail(updatedData));
      handleClear();
    }
    dispatch(setOpen(false));
  };

  return (
    <div
      className={`${
        open ? "block" : "hidden"
      } bg-white shadow-slate-600 rounded-t-md h-full`}
    >
      <div className="flex px-1 py-2 bg-[#f2f6fc] rounded-t-md">
        <h1>New Message</h1>
        <div
          onClick={() => dispatch(setMinimize())}
          className="ml-auto p-2 rounded-full bg-gray-200 cursor-pointer"
        >
          <TbMinus size={20} />
        </div>
        <div
          onClick={() => dispatch(setFull())}
          className="p-2 rounded-full bg-gray-200 cursor-pointer"
        >
          {full ? (
            <MdOutlineCloseFullscreen size={20} />
          ) : (
            <MdOpenInFull size={20} />
          )}
        </div>
        <div
          onClick={handleClose}
          className="p-2 rounded-full bg-gray-200 cursor-pointer"
        >
          <RxCross2 size={20} />
        </div>
      </div>
      <form
        onSubmit={handleSubmitFormData}
        className={`flex-col p-3 gap-2 ${minimize ? "hidden" : "flex"}`}
      >
        <input
          name="receiver"
          value={formData.receiver}
          onChange={handleChangeFormData}
          type="text"
          placeholder="To"
          className="outline-none py-1"
        />
        <input
          type="text"
          name="subject"
          value={formData.subject}
          onChange={handleChangeFormData}
          placeholder="Subject"
          className="outline-none py-1"
        />
        <textarea
          name="content"
          value={formData.content}
          onChange={handleChangeFormData}
          cols={30}
          rows={10}
          className="outline-none py-1 resize-none"
        ></textarea>
        <button
          type="submit"
          className="rounded-full w-fit px-4 py-2 text-white font-medium bg-[#0b57d0]"
        >
          Send
        </button>
      </form>
    </div>
  );
};

export { SendMail };
