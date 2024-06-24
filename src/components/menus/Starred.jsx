import React, { useState } from "react";
import { FaCaretDown } from "react-icons/fa";
import { IoMdMore, IoMdRefresh } from "react-icons/io";
import {
  MdChevronLeft,
  MdChevronRight,
  MdCropSquare,
} from "react-icons/md";

const Starred = () => {
  const [mailQtyActive, setMailQtyActive] = useState(false);
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
        
      </div>
    </div>
  );
};

export default Starred;
