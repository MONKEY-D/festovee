import { FaPen, FaShop } from "react-icons/fa6";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const YourShop = () => {
  const navigate = useNavigate();
  const { myShopData } = useSelector((state) => state.owner);

  if (!myShopData) return null;

  return (
    <div className="w-full flex flex-col items-center mt-0 px-4 sm:px-6">
      {/* Header */}
      <div className="flex items-center gap-3 text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
        <FaShop className="text-[#ff4d2d] text-3xl sm:text-4xl md:text-5xl lg:text-6xl" />
        Welcome to {myShopData.name}
      </div>

      {/* Shop Card */}
      <div className="w-full max-w-4xl bg-white rounded-md shadow-lg overflow-hidden relative">
        {/* Edit Button */}
        <button
          onClick={() => navigate("/create-edit-shop")}
          className="absolute top-3 right-3 bg-[#ff4d2d] p-2 rounded-full shadow-md hover:bg-gray-100 transition"
        >
          <FaPen className="text-[#fff]" />
        </button>

        {/* Shop Image */}
        <img
          src={myShopData.image}
          alt={myShopData.name}
          className="w-full h-64 sm:h-80 object-cover"
        />

        {/* Shop Info */}
        <div className="p-6 sm:p-8">
          <h2 className="text-lg sm:text-2xl font-bold text-gray-900 mb-2">
            {myShopData.name}
          </h2>
          <p className="text-sm sm:text-lg text-gray-600">
            {myShopData.city}, {myShopData.state}
          </p>
          <p className="text-sm sm:text-base text-gray-500 mt-1">
            {myShopData.address}
          </p>
        </div>
      </div>
    </div>
  );
};

export default YourShop;
