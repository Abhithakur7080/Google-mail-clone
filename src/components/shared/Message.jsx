import React from "react";
import { MdCropSquare } from "react-icons/md";
import { RiStarLine } from "react-icons/ri";
import { useLocation, useNavigate } from "react-router-dom";
import { updateDataFromFirestore } from "../../firebase/builds";
import { useDispatch } from "react-redux";
import { markAsStarred } from "../../redux/reducers/mailSlice";
import { GoStarFill } from "react-icons/go";
import { BiLabel } from "react-icons/bi";

const Message = ({ message }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  const handleClick = async () => {
    await updateDataFromFirestore("inbox", message.id, {
      read: true,
    });
    await updateDataFromFirestore("starred", message.id, {
      read: true,
    });
    navigate(`/mail/${message.id}`);
  };

  const handleStarClick = () => {
    dispatch(markAsStarred({ id: message.id, mail: message }));
  };

  return (
    <div className="flex items-start justify-between border-gray-200 px-4 py-3 text-sm hover:shadow-md">
      <div className="flex items-center gap-3">
        {message.isImportant ? (
          <div
            className={`flex-none text-gray-700 cursor-pointer ${
              !message.read && "font-bold text-opacity-100"
            }`}
          >
            <BiLabel className="w-5 h-5" />
          </div>
        ) : (
          <div
            className={`flex-none text-gray-700 cursor-pointer ${
              !message.read && "font-bold text-opacity-100"
            }`}
          >
            <MdCropSquare className="w-5 h-5" />
          </div>
        )}
        {(location.pathname === "/" || location.pathname === "/starred") &&
          (message.isStarred ? (
            <div
              onClick={handleStarClick}
              className={`flex-none text-yellow-600 cursor-pointer ${
                !message.read && "font-bold text-opacity-100"
              }`}
            >
              <GoStarFill className="w-5 h-5" />
            </div>
          ) : (
            <div
              onClick={handleStarClick}
              className={`flex-none text-gray-700 cursor-pointer ${
                !message.read && "font-bold text-opacity-100"
              }`}
            >
              <RiStarLine className="w-5 h-5" />
            </div>
          ))}
      </div>
      <div
        onClick={handleClick}
        className="hover:cursor-pointer flex flex-1 items-center justify-between"
      >
        {location.pathname !== "/" && (
          <div className="flex-[0.5] ml-2">
            <p
              className={`text-gray-700 inline-block max-w-full trunck-text ${
                !message.read && "font-bold text-gray-700"
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
        <div className="flex-1 mx-4 max-w-[75%]">
          <p
            className={`text-gray-700 inline-block max-w-full trunck-text ${
              !message.read && "font-bold text-gray-700"
            }`}
          >
            {message.content}
          </p>
        </div>
        <div
          className={`flex-none text-gray-500 text-sm ${
            !message.read && "font-bold text-gray-700"
          }`}
        >
          {new Date(message.createdAt?.seconds * 1000).toUTCString()}
        </div>
      </div>
    </div>
  );
};

export default Message;
