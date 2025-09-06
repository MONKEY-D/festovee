// import React, { useState } from "react";
// import { FaLocationDot } from "react-icons/fa6";
// import { IoIosSearch } from "react-icons/io";
// import { FiPackage, FiShoppingCart } from "react-icons/fi";
// import { useDispatch, useSelector } from "react-redux";
// import axios from "axios";
// import { serverUrl } from "../App";
// import { setUserData } from "../redux/userSlice";
// import { PlaceholdersAndVanishInput } from "./ui/placeholders-and-vanish-input";
// import { IoMdClose } from "react-icons/io";
// import logo from "../assets/FESTOVEE_LOGO_ONLY.png";

// // shadcn imports
// import {
//   DropdownMenu,
//   DropdownMenuTrigger,
//   DropdownMenuContent,
//   DropdownMenuItem,
// } from "./ui/dropdown-menu";

// const Nav = () => {
//   const [showSearch, setShowSearch] = useState(false);
//   const { userData, currentCity } = useSelector((state) => state.user);
//   const dispatch = useDispatch();

//   const handleLogout = async () => {
//     try {
//       await axios.get(`${serverUrl}/api/auth/signout`, {
//         withCredentials: true,
//       });
//       dispatch(setUserData(null));
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   const handleSearchSubmit = (e) => {
//     e.preventDefault();
//     console.log("Search submitted!");
//   };

//   const handleSearchChange = (e) => {
//     console.log("Searching for:", e.target.value);
//   };

//   return (
//     <div className="w-full fixed top-0 z-[9999] bg-[#fff9f6] shadow-md px-5 flex items-center justify-between h-[80px] gap-6">
//       {/* Logo */}
//       <img
//         src={logo}
//         alt="Festovee Logo"
//         className="h-10 w-auto object-contain cursor-pointer"
//       />

//       {/* Desktop Search */}
//       <div className="hidden md:flex md:w-[50%] lg:w-[40%] h-[60px] bg-white rounded-xl shadow-md items-center px-5 gap-3">
//         <div className="flex items-center gap-2 rounded-full">
//           <FaLocationDot size={20} className="text-[#ff4d2d]" />
//           <span className="text-gray-700 font-medium text-sm">
//             {currentCity}
//           </span>
//         </div>
//         <PlaceholdersAndVanishInput
//           placeholders={[
//             "Search handlooms...",
//             "Search brands...",
//             "Search categories...",
//           ]}
//           onChange={handleSearchChange}
//           onSubmit={handleSearchSubmit}
//         />
//       </div>

//       {/* Actions */}
//       <div className="flex items-center gap-4">
//         {/* Mobile search toggle */}
//         <IoIosSearch
//           size={25}
//           className="text-[#ff4d2d] md:hidden cursor-pointer"
//           onClick={() => setShowSearch((prev) => !prev)}
//         />

//         {/* Shopping cart */}
//         <div className="relative cursor-pointer">
//           <FiShoppingCart size={24} className="text-[#ff4d2d]" />
//           <span className="absolute -right-2 -top-2 w-5 h-5 text-xs font-bold flex items-center justify-center text-white bg-[#ff4d2d] rounded-full">
//             0
//           </span>
//         </div>

//         {/* My Orders button (Desktop) */}
//         <div className="relative">
//           <button className="flex items-center gap-2 px-2 py-2 rounded-lg bg-[#ff4d2d]/15 hover:bg-[#ff4d2d]/25 text-[#ff4d2d] text-sm font-medium cursor-pointer">
//             <FiPackage size={20} />
//             <span className="hidden md:inline">My Orders</span>
//           </button>
//           {/* Badge */}
//           <span className="absolute -right-2 -top-2 w-5 h-5 text-xs font-bold flex items-center justify-center text-white bg-[#ff4d2d] rounded-full">
//             0
//           </span>
//         </div>

//         {/* User Avatar + Dropdown */}
//         <DropdownMenu>
//           <DropdownMenuTrigger>
//             <div className="w-10 h-10 rounded-full flex items-center justify-center bg-[#ff4d2d] text-white font-semibold text-lg shadow-lg cursor-pointer">
//               {userData?.fullName?.slice(0, 1)}
//             </div>
//           </DropdownMenuTrigger>
//           <DropdownMenuContent className="w-44 z-[10000]">
//             <DropdownMenuItem className="font-semibold">
//               {userData?.fullName}
//             </DropdownMenuItem>
//             <DropdownMenuItem className="text-[#ff4d2d] font-semibold cursor-pointer md:hidden">
//               My Orders
//             </DropdownMenuItem>
//             <DropdownMenuItem
//               className="text-[#ff4d2d] font-semibold cursor-pointer"
//               onClick={handleLogout}
//             >
//               Log Out
//             </DropdownMenuItem>
//           </DropdownMenuContent>
//         </DropdownMenu>
//       </div>

//       {/* Mobile Search Overlay */}
//       {showSearch && (
//         <div className="fixed top-[90px] left-0 w-full px-5 z-[9998]">
//           <div className="bg-white shadow-lg rounded-xl p-3 flex items-center gap-3">
//             <div className="flex items-center gap-2 px-3 py-1 bg-[#ff4d2d]/10 rounded-full">
//               <FaLocationDot size={20} className="text-[#ff4d2d]" />
//               <span className="text-gray-700 font-medium text-sm">
//                 {currentCity || "Your City"}
//               </span>
//             </div>
//             <PlaceholdersAndVanishInput
//               placeholders={["Search restaurants...", "Search brands..."]}
//               onChange={handleSearchChange}
//               onSubmit={handleSearchSubmit}
//             />
//             {/* Close icon */}
//             <IoMdClose
//               size={24}
//               className="text-gray-500 cursor-pointer"
//               onClick={() => setShowSearch(false)}
//             />
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Nav;

import React, { useState } from "react";
import { FaLocationDot } from "react-icons/fa6";
import { IoIosSearch } from "react-icons/io";
import { FiPackage, FiShoppingCart } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { serverUrl } from "../App";
import { setUserData } from "../redux/userSlice";
import { PlaceholdersAndVanishInput } from "./ui/placeholders-and-vanish-input";
import { IoMdClose } from "react-icons/io";
import logo from "../assets/FESTOVEE_LOGO_ONLY.png";

// shadcn imports
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "./ui/dropdown-menu";

const Nav = () => {
  const [showSearch, setShowSearch] = useState(false);
  const { userData, currentCity } = useSelector((state) => state.user);
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
    <div className="w-full top-0 z-[9999] bg-[#fff9f6] shadow-md px-5 flex items-center justify-between h-[80px] gap-6">
      {/* If search is open on small screen → show ONLY search bar */}
      {showSearch ? (
        <div className="flex w-full items-center bg-white rounded-lg px-3 py-1 shadow-md gap-2">
          <FaLocationDot size={20} className="text-[#ff4d2d]" />
          <span className="text-gray-700 font-medium text-sm">
            {currentCity || "Your City"}
          </span>
          <PlaceholdersAndVanishInput
            placeholders={["Search restaurants...", "Search brands..."]}
            onChange={handleSearchChange}
            onSubmit={handleSearchSubmit}
          />
          <IoMdClose
            size={22}
            className="text-gray-500 cursor-pointer"
            onClick={() => setShowSearch(false)}
          />
        </div>
      ) : (
        <>
          {/* Logo (hidden on small when search is clicked) */}
          <img
            src={logo}
            alt="Festovee Logo"
            className="h-10 w-auto object-contain cursor-pointer"
          />

          {/* Desktop Search (always centered in large screen) */}
          <div className="hidden md:flex md:w-[50%] lg:w-[40%] h-[60px] bg-white rounded-xl shadow-md items-center px-5 gap-3 mx-auto">
            <FaLocationDot size={20} className="text-[#ff4d2d]" />
            <span className="text-gray-700 font-medium text-sm">
              {currentCity}
            </span>
            <PlaceholdersAndVanishInput
              placeholders={[
                "Search handlooms...",
                "Search brands...",
                "Search categories...",
              ]}
              onChange={handleSearchChange}
              onSubmit={handleSearchSubmit}
            />
          </div>

          {/* Mobile Search Icon (centered) */}
          <div className="flex md:hidden flex-1 justify-center">
            <IoIosSearch
              size={28}
              className="text-[#ff4d2d] cursor-pointer"
              onClick={() => setShowSearch(true)}
            />
          </div>

          {/* Right-side actions */}
          <div className="flex items-center gap-4">
            {/* Shopping cart (Desktop only) */}
            <div className="relative cursor-pointer hidden md:block">
              <FiShoppingCart size={24} className="text-[#ff4d2d]" />
              <span className="absolute -right-2 -top-2 w-5 h-5 text-xs font-bold flex items-center justify-center text-white bg-[#ff4d2d] rounded-full">
                0
              </span>
            </div>

            {/* My Orders button (Desktop only) */}
            <div className="relative hidden md:flex">
              <button className="flex items-center gap-2 px-2 py-2 rounded-lg bg-[#ff4d2d]/15 hover:bg-[#ff4d2d]/25 text-[#ff4d2d] text-sm font-medium cursor-pointer">
                <FiPackage size={20} />
                <span>My Orders</span>
              </button>
              {/* Badge */}
              <span className="absolute -right-2 -top-2 w-5 h-5 text-xs font-bold flex items-center justify-center text-white bg-[#ff4d2d] rounded-full">
                0
              </span>
            </div>

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

                {/* Mobile-only My Orders */}
                <DropdownMenuItem className="text-[#ff4d2d] font-semibold cursor-pointer md:hidden">
                  <FiPackage size={16} className="mr-2" /> My Orders
                </DropdownMenuItem>

                {/* Mobile-only Cart */}
                <DropdownMenuItem className="text-[#ff4d2d] font-semibold cursor-pointer md:hidden">
                  <FiShoppingCart size={16} className="mr-2" /> Cart (0)
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
        </>
      )}
    </div>
  );
};

export default Nav;
