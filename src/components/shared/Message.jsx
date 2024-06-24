import React from "react";
import { MdCropSquare } from "react-icons/md";
import { RiStarLine } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import { updateDataFromFirestore } from "../../firebase/builds";
import { useDispatch } from "react-redux";
import { markAsStarred } from "../../redux/reducers/mailSlice";

const Message = ({ message }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleClick = async () => {
    await updateDataFromFirestore("inbox", message.id, {
      read: true,
    });
    navigate(`/mail/${message.id}`);
  };
  return (
    <div className="flex items-start justify-between border-gray-200 px-4 py-3 text-sm hover:shadow-md">
      <div className="flex items-center gap-3">
        <div
          className={`flex-none text-gray-700 cursor-pointer ${
            !message.read && "font-bold text-opacity-100"
          }`}
        >
          <MdCropSquare className="w-5 h-5" />
        </div>
        <div
          onClick={() =>
            dispatch(markAsStarred({ id: message.id, mail: message.mail }))
          }
          className={`flex-none text-gray-700 cursor-pointer ${
            !message.read && "font-bold text-opacity-100"
          }`}
        >
          <RiStarLine className="w-5 h-5" />
        </div>
      </div>
      <div
        onClick={handleClick}
        className="hover:cursor-pointer flex items-center justify-between"
      >
        <div className="flex-1 ml-4 max-w-[75%]">
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
