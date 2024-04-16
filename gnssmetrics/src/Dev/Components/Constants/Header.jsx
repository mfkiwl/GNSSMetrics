import React from "react";
import { IoIosMenu } from "react-icons/io";
import { RiGpsFill } from "react-icons/ri";
import { IoSettings } from "react-icons/io5";
import { FaRegCircleUser } from "react-icons/fa6";
import { FaRegQuestionCircle } from "react-icons/fa";
import Name from "../../Styles/Name";
import Navbar from "../Nav/Navbar";

const Header = () => {
  return (
    <div className="flex gap-2 items-center justify-between px-2 md:px-4">
      <button className="sm:hidden">
        <IoIosMenu size={35} />
      </button>
      <div className="flex gap-2">
        <button>
          <RiGpsFill size={35} />
        </button>
        <div>
          <Name />
        </div>
      </div>
      <div className="sm:flex gap-4 hidden">
        <Navbar />
      </div>
      <div className="flex gap-4">
        <IoSettings size={20} />
        <FaRegCircleUser size={20} />
        <FaRegQuestionCircle size={20} />
      </div>
    </div>
  );
};

export default Header;
