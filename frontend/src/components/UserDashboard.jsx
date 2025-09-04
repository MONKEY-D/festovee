import React, { useState } from "react";
import { FaLocationDot } from "react-icons/fa6";
import { IoIosSearch } from "react-icons/io";
import { FiShoppingCart } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { serverUrl } from "../App";
import { setUserData } from "../redux/userSlice";
import { PlaceholdersAndVanishInput } from "./ui/placeholders-and-vanish-input";
import { IoMdClose } from "react-icons/io";

// shadcn imports
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "../components/ui/dropdown-menu";

const UserDashboard = () => {
  const [showSearch, setShowSearch] = useState(false);
  const { userData, city } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const handleLogout = async () => {
    try {
      await axios.get(`${serverUrl}/api/auth/signout`, {
        withCredentials: true,
      });
      dispatch(setUserData(null));
    } catch (error) {
      console.log(error);
    }
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    console.log("Search submitted!");
  };

  const handleSearchChange = (e) => {
    console.log("Searching for:", e.target.value);
  };

  return (
    <div className="w-full fixed top-0 z-[9999] bg-[#fff9f6] shadow-md px-5 flex items-center justify-between h-[80px] gap-6">
      {/* Logo */}
      <h1 className="text-3xl font-bold text-[#ff4d2d]">Festovee</h1>

      {/* Desktop Search */}
      <div className="hidden md:flex md:w-[50%] lg:w-[40%] h-[60px] bg-white rounded-xl shadow-md items-center px-4 gap-3">
        <div className="flex items-center gap-2 px-3 py-1 bg-[#ff4d2d]/10 rounded-full">
          <FaLocationDot size={20} className="text-[#ff4d2d]" />
          <span className="text-gray-700 font-medium text-sm">{city}</span>
        </div>
        <PlaceholdersAndVanishInput
          placeholders={[
            "Search restaurants, dishes...",
            "Search brands...",
            "Search categories...",
          ]}
          onChange={handleSearchChange}
          onSubmit={handleSearchSubmit}
        />
      </div>

      {/* Actions */}
      <div className="flex items-center gap-4">
        {/* Mobile search toggle */}
        <IoIosSearch
          size={25}
          className="text-[#ff4d2d] md:hidden cursor-pointer"
          onClick={() => setShowSearch((prev) => !prev)}
        />

        {/* Shopping cart */}
        <div className="relative cursor-pointer">
          <FiShoppingCart size={24} className="text-[#ff4d2d]" />
          <span className="absolute -right-2 -top-2 w-5 h-5 text-xs font-bold flex items-center justify-center text-white bg-[#ff4d2d] rounded-full">
            0
          </span>
        </div>

        {/* My Orders button (Desktop) */}
        <button className="hidden md:block px-3 py-1 rounded-lg bg-[#ff4d2d]/10 text-[#ff4d2d] text-sm font-medium">
          My Orders
        </button>

        {/* User Avatar + Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger>
            <div className="w-10 h-10 rounded-full flex items-center justify-center bg-[#ff4d2d] text-white font-semibold text-lg shadow-lg cursor-pointer">
              {userData?.fullName?.slice(0, 1)}
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-44 z-[10000]">
            <DropdownMenuItem className="font-semibold">
              {userData?.fullName}
            </DropdownMenuItem>
            <DropdownMenuItem className="text-[#ff4d2d] font-semibold cursor-pointer">
              My Orders
            </DropdownMenuItem>
            <DropdownMenuItem
              className="text-[#ff4d2d] font-semibold cursor-pointer"
              onClick={handleLogout}
            >
              Log Out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Mobile Search Overlay */}
      {showSearch && (
        <div className="fixed top-[90px] left-0 w-full px-5 z-[9998]">
          <div className="bg-white shadow-lg rounded-xl p-3 flex items-center gap-3">
            <div className="flex items-center gap-2 px-3 py-1 bg-[#ff4d2d]/10 rounded-full">
              <FaLocationDot size={20} className="text-[#ff4d2d]" />
              <span className="text-gray-700 font-medium text-sm">
                {city || "Your City"}
              </span>
            </div>
            <PlaceholdersAndVanishInput
              placeholders={["Search restaurants...", "Search brands..."]}
              onChange={handleSearchChange}
              onSubmit={handleSearchSubmit}
            />
            {/* Close icon */}
            <IoMdClose
              size={24}
              className="text-gray-500 cursor-pointer"
              onClick={() => setShowSearch(false)}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default UserDashboard;
