import React from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import { IoIosSearch } from "react-icons/io";
import { IoOptions } from "react-icons/io5";
import { AiOutlineQuestionCircle } from "react-icons/ai";
import { GoGear } from "react-icons/go";
import { PiDotsNineBold } from "react-icons/pi";
import logo from "../../assets/logo.png";
import { Tooltip as ReactTooltip } from "react-tooltip";

const Navbar = () => {
  return (
    <>
      <div className="flex items-center justify-between my-3 h-16">
        <div className="flex items-center justify-between gap-10">
          <div className="flex items-center gap-2 ms-8">
            {/* menu icon */}
            <div
              data-tooltip-id="main-menu"
              className="p-3 rounded-full hover:bg-gray-200 cursor-pointer"
            >
              <RxHamburgerMenu size={24} />
            </div>
            {/* logo */}
            <img src={logo} alt="logo" className="w-28" title="Gmail" />
          </div>
        </div>
        <div className="md:block hidden w-[50%]">
          <div className="flex items-center bg-[#eaf1fb] px-2 py-2 rounded-full">
            <div
              data-tooltip-id="search"
              className="p-3 rounded-full hover:bg-gray-300 cursor-pointer"
            >
              <IoIosSearch size={24} className="text-gray-700" />
            </div>
            <input
              type="text"
              placeholder="Search mail"
              className="rounded-full w-full bg-transparent outline-none px-1 text-xl"
            />
            <div
              data-tooltip-id="search-options"
              className="p-3 rounded-full hover:bg-gray-300 cursor-pointer"
            >
              <IoOptions size={24} className="text-gray-700" />
            </div>
          </div>
        </div>
        <div className="md:block hidden me-8">
          <div className="flex items-center gap-2">
            <div
              data-tooltip-id="support"
              className="p-3 rounded-full hover:bg-gray-300 cursor-pointer"
            >
              <AiOutlineQuestionCircle size={30} className="text-gray-700" />
            </div>
            <div
              data-tooltip-id="setting"
              className="p-3 rounded-full hover:bg-gray-300 cursor-pointer"
            >
              <GoGear size={30} className="text-gray-700" />
            </div>
            <div
              data-tooltip-id="google-apps"
              className="p-3 rounded-full hover:bg-gray-300 cursor-pointer"
            >
              <PiDotsNineBold size={30} className="text-gray-700" />
            </div>
            <div data-tooltip-id="user-info" className="cursor-pointer">
              <img
                className="w-10 h-10 rounded-full"
                src="https://static.vecteezy.com/system/resources/previews/019/896/008/original/male-user-avatar-icon-in-flat-design-style-person-signs-illustration-png.png"
                alt="Rounded avatar"
              />
            </div>
          </div>
        </div>
      </div>
      <ReactTooltip place="bottom" id="main-menu" content="Main menu"/>
      <ReactTooltip place="bottom" id="search" content="Search"/>
      <ReactTooltip place="bottom" id="search-options" content="Show search options"/>
      <ReactTooltip place="bottom" id="support" content="Support"/>
      <ReactTooltip place="bottom" id="setting" content="Settings"/>
      <ReactTooltip place="bottom" id="google-apps" content="Google apps"/>
      <ReactTooltip place="bottom" id="user-info" content="abhijeetthakur7080@gmail.com"/>
    </>
  );
};

export default Navbar;
