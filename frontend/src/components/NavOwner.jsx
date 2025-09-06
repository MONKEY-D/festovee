import { FiShoppingCart, FiPackage } from "react-icons/fi";
import { AiOutlinePlus } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { serverUrl } from "../App";
import { setUserData } from "../redux/userSlice";
import logo from "../assets/FESTOVEE_LOGO_ONLY.png";

// shadcn imports
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "../components/ui/dropdown-menu";
import { useNavigate } from "react-router-dom";

const NavOwner = () => {
  const { userData } = useSelector((state) => state.user);
  const { myShopData } = useSelector((state) => state.owner);
  const dispatch = useDispatch();
  const navigate = useNavigate();

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

  return (
    <div className="w-full top-0 z-[9999] bg-[#fff9f6] shadow-md px-5 flex items-center justify-between h-[80px] gap-6">
      {/* Logo */}
      <img
        src={logo}
        alt="Festovee Logo"
        className="h-10 w-auto object-contain cursor-pointer"
      />

      {/* Center Add Product Button */}
      {myShopData?.items?.length > 0 && (
        <button
          className="flex items-center gap-2 px-4 py-2 bg-[#ff4d2d] text-white font-medium rounded-xl shadow-md hover:bg-[#e04325] transition-all duration-200 
                   text-sm sm:text-base"
          onClick={() => navigate("/add-product")}
        >
          <AiOutlinePlus size={20} />
          <span className="hidden sm:inline">Add Product</span>
        </button>
      )}

      {/* Actions */}
      <div className="flex items-center gap-4">
        {/* My Orders button (Responsive) */}
        {/* <div className="relative">
          <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#ff4d2d]/15 hover:bg-[#ff4d2d]/25 text-[#ff4d2d] text-sm font-medium cursor-pointer">
            <FiPackage size={20} />
            <span className="hidden md:inline">My Orders</span>
          </button>
          
          <span className="absolute -right-2 -top-2 w-5 h-5 text-xs font-bold flex items-center justify-center text-white bg-[#ff4d2d] rounded-full">
            0
          </span>
        </div> */}

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
            <DropdownMenuItem
              className="text-[#ff4d2d] font-semibold cursor-pointer"
              onClick={handleLogout}
            >
              Log Out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

export default NavOwner;
