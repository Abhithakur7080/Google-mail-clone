import React, { useState } from "react";
import { BiLabel, BiSend } from "react-icons/bi";
import { BsChatLeftText } from "react-icons/bs";
import { IoStarOutline } from "react-icons/io5";
import { LiaTrashAlt } from "react-icons/lia";
import { LuMails, LuPencil, LuPlus } from "react-icons/lu";
import {
  MdInbox,
  MdLabelOutline,
  MdOutlineDrafts,
  MdOutlineKeyboardArrowDown,
  MdOutlineKeyboardArrowUp,
  MdOutlineScheduleSend,
  MdOutlineWatchLater,
} from "react-icons/md";
import { RiSpam2Line } from "react-icons/ri";
import { Tooltip as ReactTooltip } from "react-tooltip";
import { VscGear } from "react-icons/vsc";
import { useDispatch } from "react-redux";
import { setOpen } from "../redux/reducers/appSlice";

const menus = [
  {
    id: 1,
    icon: <MdInbox size={24} />,
    text: "Inbox",
  },
  {
    id: 2,
    icon: <IoStarOutline size={24} />,
    text: "Starred",
  },
  {
    id: 3,
    icon: <MdOutlineWatchLater size={24} />,
    text: "Snoozed",
  },
  {
    id: 4,
    icon: <BiSend size={24} />,
    text: "Sent",
  },
  {
    id: 5,
    icon: <MdOutlineDrafts size={24} />,
    text: "Drafts",
  },
];
const moreMenus = [
    {
        id: 1,
        icon: <BiLabel size={24}/> ,
        text: "Important"
    },
    {
        id: 2,
        icon: <BsChatLeftText size={24}/>,
        text: "Chats"
    },
    {
        id: 3,
        icon: <MdOutlineScheduleSend size={24}/>,
        text: "Scheduled"
    },
    {
        id: 4,
        icon: <LuMails size={24}/>,
        text: "All Mail"
    },
    {
        id: 5,
        icon: <RiSpam2Line size={24}/>,
        text: "Spam"
    },
    {
        id: 6,
        icon: <LiaTrashAlt size={24}/>,
        text: "Trash"
    },
    {
        id: 7,
        icon: <MdLabelOutline size={24}/>,
        text: "Categories"
    },
    {
        id: 8,
        icon: <VscGear size={24} />,
        text: "Manage labels"
    },
    {
        id: 9,
        icon: <LuPlus size={24} />,
        text: "Create new label"
    },
];

const Sidebar = () => {
  const [expand, setExpand] = useState(false);
  const dispatch = useDispatch()
  return (
    <div className="w-60">
      <div className="p-3">
        <button onClick={() => dispatch(setOpen(true))} className="flex items-center gap-2 p-4 rounded-2xl hover:shadow-md bg-[#C2E7FF]">
          <LuPencil size={24} />
          <h1 className="text-xl">Compose</h1>
        </button>
      </div>
      {menus.map((menu) => (
        <div data-tooltip-id={menu.text} key={menu.id} className="text-gray-800">
          <div className="flex items-center gap-4 pl-6 py-1 rounded-r-full hover:cursor-pointer hover:bg-gray-200">
            {menu.icon}
            <p>{menu.text}</p>
          </div>
          <ReactTooltip id={menu.text} place={"right"} content={menu.text}/>
        </div>
      ))}
      <div className="text-gray-800" onClick={() => setExpand((prev) => !prev)}>
        <div className="flex items-center gap-4 pl-6 py-1 rounded-r-full hover:cursor-pointer hover:bg-gray-200">
          {expand ? (
            <MdOutlineKeyboardArrowUp size={24} />
          ) : (
            <MdOutlineKeyboardArrowDown size={24} />
          )}

          <p>{expand ? "Less" : "More"}</p>
        </div>
      </div>
      {
        expand && moreMenus.map((menu) => (
            <div data-tooltip-id={menu.text} key={menu.id} className="text-gray-800">
              <div className="flex items-center gap-4 pl-6 py-1 rounded-r-full hover:cursor-pointer hover:bg-gray-200">
                {menu.icon}
                <p>{menu.text}</p>
              </div>
              <ReactTooltip id={menu.text} place={"right"} content={menu.text}/>
            </div>
          ))
      }
    </div>
  );
};

export default Sidebar;
