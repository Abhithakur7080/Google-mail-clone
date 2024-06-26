import React, { useState } from "react";
import { AiOutlineQuestionCircle } from "react-icons/ai";
import { GoGear } from "react-icons/go";
import { PiDotsNineBold } from "react-icons/pi";
import { Tooltip as ReactTooltip } from "react-tooltip";
import { useFirebase } from "../../firebase/firebase";
import logo from "../../assets/logo.png";
import { RxHamburgerMenu } from "react-icons/rx";
import { setMenuOpen } from "../../redux/reducers/appSlice";
import { logoutUser } from "../../firebase/builds";
import { useDispatch } from "react-redux";

const Navbar = () => {
  const [menuLogout, setMenuLogout] = useState(false);
  const dispatch = useDispatch();
  const currentUser = useFirebase();
  const defaultAvatar =
    "https://static.vecteezy.com/system/resources/previews/019/896/008/original/male-user-avatar-icon-in-flat-design-style-person-signs-illustration-png.png";

  return (
    <>
      <div className="flex items-center justify-between my-0 md:my-3 h-16">
        <div className="flex items-center justify-between gap-10">
          <div className="flex items-center gap-2 ms-2 md:ms-8">
            {/* menu icon */}
            <div
              onClick={() => dispatch(setMenuOpen())}
              data-tooltip-id="main-menu"
              className="p-3 rounded-full hover:bg-gray-200 cursor-pointer"
            >
              <RxHamburgerMenu size={30} className="text-gray-700" />
            </div>
            {/* logo */}
            <img src={logo} alt="logo" className="w-28" title="Gmail" />
          </div>
        </div>
        <div className="md:block hidden w-[50%]">
          <div className="flex items-center bg-[#eaf1fb] w-full px-2 py-2 rounded-full">
            {/* Search */}
            <div
              data-tooltip-id="search"
              className="p-3 rounded-full hover:bg-gray-300 cursor-pointer flex-1"
            >
              <input
                type="text"
                placeholder="Search mail"
                className="rounded-full w-full bg-transparent outline-none px-1 text-xl"
              />
            </div>
            <div
              data-tooltip-id="search-options"
              className="p-3 rounded-full hover:bg-gray-300 cursor-pointer ml-auto"
            >
              <GoGear size={30} className="text-gray-700 " />
            </div>
          </div>
        </div>
        <div className="me-5 md:me-8">
          <div className="flex items-center gap-2">
            <div
              data-tooltip-id="support"
              className="p-3 rounded-full md:block hidden hover:bg-gray-300 cursor-pointer"
            >
              <AiOutlineQuestionCircle size={30} className="text-gray-700" />
            </div>
            <div
              data-tooltip-id="setting"
              className="p-3 rounded-full hover:bg-gray-300 cursor-pointer md:block hidden"
            >
              <GoGear size={30} className="text-gray-700" />
            </div>
            <div
              data-tooltip-id="google-apps"
              className="p-3 rounded-full hover:bg-gray-300 cursor-pointer md:block hidden"
            >
              <PiDotsNineBold size={30} className="text-gray-700" />
            </div>
            {/* User Info */}
            {currentUser && (
              <div
                data-tooltip-id="user-info"
                className="cursor-pointer relative"
                onMouseEnter={() => setMenuLogout(true)}
                onMouseLeave={() => setMenuLogout(false)}
              >
                <img
                  className="w-10 h-10 rounded-full"
                  src={currentUser.photoURL || defaultAvatar}
                  alt="Rounded avatar"
                />
                <div
                  onClick={logoutUser}
                  className={`bg-gray-200 absolute top-10 -left-4 rounded-md overflow-hidden ${
                    menuLogout ? "block" : "hidden"
                  }`}
                >
                  <h3 className="text-lg text-gray-800 p-2 hover:bg-gray-300">
                    Logout
                  </h3>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      {/* Tooltips */}
      <ReactTooltip
        className="hidden md:block"
        place="bottom"
        id="main-menu"
        content="Main menu"
      />
      <ReactTooltip
        className="hidden md:block"
        place="bottom"
        id="search"
        content="Search"
      />
      <ReactTooltip
        className="hidden md:block"
        place="bottom"
        id="search-options"
        content="Show search options"
      />
      <ReactTooltip
        className="hidden md:block"
        place="bottom"
        id="support"
        content="Support"
      />
      <ReactTooltip
        className="hidden md:block"
        place="bottom"
        id="setting"
        content="Settings"
      />
      <ReactTooltip
        className="hidden md:block"
        place="bottom"
        id="google-apps"
        content="Google apps"
      />
      <ReactTooltip
        className="hidden md:block"
        place="bottom"
        id="user-info"
        content={currentUser ? currentUser.email : "Not logged in"}
      />
    </>
  );
};

export { Navbar };
