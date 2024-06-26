import React from "react";
import {
  MdCheckBox,
  MdCropSquare,
  MdOutlineMarkEmailUnread,
  MdOutlineWatchLater,
  MdWatchLater,
} from "react-icons/md";
import { RiSpam2Fill, RiStarLine } from "react-icons/ri";
import { useLocation, useNavigate } from "react-router-dom";
import { updateDataFromFirestore } from "../../firebase/builds";
import { useDispatch } from "react-redux";
import { markAsStarred } from "../../redux/reducers/mailSlice";
import { GoStarFill } from "react-icons/go";
import { BiArchiveIn, BiLabel, BiSolidLabel } from "react-icons/bi";
import { useFirebase } from "../../firebase/firebase";
import { IoMailUnread } from "react-icons/io5";
import { LuMail } from "react-icons/lu";

const Message = ({ message = {} }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const currentUser = useFirebase();

  const handleClick = async () => {
    if (currentUser.email === message.receiver) {
      if (message.isStarred) {
        await updateDataFromFirestore("starred", message.id, {
          read: true,
        });
      }
      if (message.isImportant) {
        await updateDataFromFirestore("important", message.id, {
          read: true,
        });
      }
      if (message.isSpam) {
        await updateDataFromFirestore("spam", message.id, {
          read: true,
        });
      } else {
        await updateDataFromFirestore("inbox", message.id, {
          read: true,
        });
      }
    }
    navigate(`/mail/${message.id}`);
  };

  const handleStarClick = () => {
    dispatch(markAsStarred(message.id));
  };

  return (
    <div className="flex w-screen md:w-full items-start justify-between border-gray-200 px-4 py-3 text-sm hover:shadow-md">
      <div className="flex items-center gap-3">
        {location.pathname === "/important" && message.isImportant ? (
          <div
            className={`flex-none text-gray-700 cursor-pointer ${
              !message.read &&
              message.receiver === currentUser.email &&
              "font-bold text-opacity-100"
            }`}
          >
            <BiSolidLabel className="w-5 h-5" />
          </div>
        ) : location.pathname === "/archive" && message.isArchived ? (
          <div
            className={`flex-none text-gray-700 cursor-pointer ${
              !message.read &&
              message.receiver === currentUser.email &&
              "font-bold text-opacity-100"
            }`}
          >
            <BiArchiveIn className="w-5 h-5" />
          </div>
        ) : location.pathname === "/snoozed" && message.isSnoozed ? (
          <div
            className={`flex-none text-gray-700 cursor-pointer ${
              !message.read &&
              message.receiver === currentUser.email &&
              "font-bold text-opacity-100"
            }`}
          >
            <MdWatchLater className="w-5 h-5" />
          </div>
        ) : location.pathname === "/spam" && message.isSpam ? (
          <div
            className={`flex-none text-red-700 cursor-pointer ${
              !message.read &&
              message.receiver === currentUser.email &&
              "font-bold text-opacity-100"
            }`}
          >
            <RiSpam2Fill className="w-5 h-5" />
          </div>
        ) : location.pathname === "/sent" ? (
          <div
            className={`flex-none text-gray-700 cursor-pointer ${
              !message.read &&
              message.receiver === currentUser.email &&
              "font-bold text-opacity-100"
            }`}
          >
            <MdCheckBox className="w-5 h-5" />
          </div>
        ) : (
          <div
            className={`flex-none text-gray-700 cursor-pointer ${
              !message.read &&
              message.receiver === currentUser.email &&
              "font-bold text-opacity-100"
            }`}
          >
            {message.read ? (
              <LuMail className="w-5 h-5" />
            ) : (
              <MdOutlineMarkEmailUnread className="w-5 h-5" />
            )}
          </div>
        )}
        {(location.pathname === "/" || location.pathname === "/starred") &&
          (message.isStarred ? (
            <div
              onClick={handleStarClick}
              className={`flex-none text-yellow-600 cursor-pointer ${
                !message.read &&
                message.receiver === currentUser.email &&
                "font-bold text-opacity-100"
              }`}
            >
              <GoStarFill className="w-5 h-5" />
            </div>
          ) : (
            <div
              onClick={handleStarClick}
              className={`flex-none text-gray-700 cursor-pointer ${
                !message.read &&
                message.receiver === currentUser.email &&
                "font-bold text-opacity-100"
              }`}
            >
              <RiStarLine className="w-5 h-5" />
            </div>
          ))}
      </div>
      <div
        onClick={handleClick}
        className="hover:cursor-pointer flex flex-1 items-center justify-between flex-col md:flex-row"
      >
        {location.pathname !== "/" && (
          <div className="flex-[0.5] md:ml-2">
            <p
              className={`text-gray-700 inline-block max-w-full ${
                !message.read &&
                message.receiver === currentUser.email &&
                "font-bold text-gray-700"
              }`}
            >
              {location.pathname === "/sent" && `To: ${message.receiver}`}
              {location.pathname === "/draft" && (
                <span>
                  <span className="text-red-700">Draft: </span>
                  {message.receiver}
                </span>
              )}
              {location.pathname !== "/sent" &&
                location.pathname !== "/draft" &&
                message.sender}
            </p>
          </div>
        )}
        <div className="flex-1 md:mx-4 max-w-[75%]">
          <p
            className={`text-gray-700 inline-block max-w-full trunck-text ${
              !message.read &&
              message.receiver === currentUser.email &&
              "font-bold text-gray-700"
            }`}
          >
            {message.content}
          </p>
        </div>
        <div
          className={`flex-none text-gray-500 text-sm ${
            !message.read &&
            message.receiver === currentUser.email &&
            "font-bold text-gray-700"
          }`}
        >
          {message.createdAt}
        </div>
      </div>
    </div>
  );
};

export { Message };
