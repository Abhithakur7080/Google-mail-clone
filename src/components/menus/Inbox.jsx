import React, { useState } from "react";
import { FaCaretDown } from "react-icons/fa";
import { GoTag } from "react-icons/go";
import { IoMdMore, IoMdRefresh } from "react-icons/io";
import {
  MdChevronLeft,
  MdChevronRight,
  MdCropSquare,
  MdInbox,
} from "react-icons/md";
import { TbUsers } from "react-icons/tb";
import Messages from "../shared/Messages";

const mailType = [
  {
    id: 1,
    icon: <MdInbox size={20} />,
    text: "Primary",
  },
  {
    id: 2,
    icon: <GoTag size={20} />,
    text: "Promotions",
  },
  {
    id: 3,
    icon: <TbUsers size={20} />,
    text: "Social",
  },
];

const Inbox = () => {
  const [mailQtyActive, setMailQtyActive] = useState(false);
  const [mailTypeSelected, setMailTypeSelected] = useState(1);
  return (
    <div className="flex-1 bg-white rounded-xl mx-5">
      <div className="flex items-center justify-between px-4">
        <div className="flex items-center gap-2 text-gray-700 py-2 w-full">
          <div className="flex items-center gap-1">
            <MdCropSquare size={20} />
            <FaCaretDown size={20} />
          </div>
          <div className="p-2 rounded-full hover:bg-gray-200 cursor-pointer">
            <IoMdRefresh size={20} />
          </div>
          <div className="p-2 rounded-full hover:bg-gray-200 cursor-pointer">
            <IoMdMore size={20} />
          </div>
          <div
            onMouseOver={() => setMailQtyActive(true)}
            onMouseOut={() => setMailQtyActive(false)}
            className="ml-auto p-2 rounded-sm hover:bg-gray-200 cursor-pointer relative"
          >
            <p>1 - 50 of 20,314</p>
            <div
              className={`absolute top-9 left-0 w-full ${
                mailQtyActive ? "block" : "hidden"
              }`}
            >
              <h3 className="px-3 py-2 text-xl hover:bg-gray-100">Newest</h3>
              <h3 className="px-3 py-2 text-xl hover:bg-gray-100">Oldest</h3>
            </div>
          </div>

          <div className="p-2 rounded-full hover:bg-gray-200 cursor-pointer">
            <MdChevronLeft size={20} />
          </div>
          <div className="p-2 rounded-full hover:bg-gray-200 cursor-pointer">
            <MdChevronRight size={20} />
          </div>
        </div>
      </div>
      <div className="h-[90vh] overflow-y-auto">
        <div className="flex items-center gap-1">
          {mailType.map((item) => (
            <button
              key={item.id}
              onClick={() => setMailTypeSelected(item.id)}
              className={`w-52 bg-gray-100 flex items-center gap-5 p-4 ${
                mailTypeSelected === item.id
                  ? "border-b-4 border-b-blue-600 text-blue-600"
                  : "border-b-4 border-b-transparent"
              }`}
            >
              {item.icon}
              <span>{item.text}</span>
            </button>
          ))}
        </div>
        <Messages />
      </div>
    </div>
  );
};

export default Inbox;