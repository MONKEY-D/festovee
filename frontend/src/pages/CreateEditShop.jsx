import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react"; // back icon
import logo from "../assets/FESTOVEE_LOGO_ONLY.png";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { serverUrl } from "../App";
import { setMyShopData } from "../redux/ownerSlice";

const CreateEditShop = () => {
  const navigate = useNavigate();
  const { myShopData } = useSelector((state) => state.owner);
  const { currentCity, currentState, currentAddress } = useSelector(
    (state) => state.user
  );

  // States for form fields
  const [frontendImage, setFrontendImage] = useState(myShopData?.image || null);
  const [backendImage, setBackendImage] = useState(null);
  const [name, setName] = useState(myShopData?.name || "");
  const [address, setAddress] = useState(myShopData?.address || currentAddress);
  const [city, setCity] = useState(myShopData?.city || currentCity);
  const [state, setState] = useState(myShopData?.state || currentState);
  const dispatch = useDispatch();

  // Image selection handler
  const handleImage = (e) => {
    const file = e.target.files[0];
    if (file) {
      setBackendImage(file); // Save for uploading
      setFrontendImage(URL.createObjectURL(file)); // Preview
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("city", city);
      formData.append("state", state);
      formData.append("address", address);

      if (backendImage) {
        formData.append("image", backendImage);
      }
      const result = await axios.post(
        `${serverUrl}/api/shop/create-edit`,
        formData,
        { withCredentials: true }
      );
      dispatch(setMyShopData(result.data));
      console.log(result.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      className="min-h-screen w-full flex items-center justify-center relative overflow-hidden"
      style={{ backgroundColor: "#fff9f6" }}
    >
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute w-96 h-96 bg-pink-300 rounded-full opacity-30 animate-bounce-slow top-[-50px] left-[-50px]"></div>
        <div className="absolute w-80 h-80 bg-yellow-300 rounded-full opacity-30 animate-bounce-slow top-[150px] right-[-60px]"></div>
        <div className="absolute w-72 h-72 bg-green-300 rounded-full opacity-30 animate-bounce-slow bottom-[100px] left-[80px]"></div>
      </div>

      {/* Form Box */}
      <form
        className="relative z-10 w-full max-w-md bg-white rounded-2xl shadow-2xl p-6 flex flex-col gap-5"
        onSubmit={handleSubmit}
      >
        {/* Back Button */}
        <button
          type="button"
          onClick={() => navigate("/")}
          className="absolute top-4 left-4 flex items-center gap-2 text-[#ff4d2d] hover:text-[#e04325] transition-colors"
        >
          <ArrowLeft size={22} />
          <span className="hidden sm:inline text-sm font-medium">Back</span>
        </button>

        {/* Logo */}
        <div className="flex justify-center mt-6 mb-4">
          <img
            src={logo}
            alt="Festovee Logo"
            className="h-20 w-auto object-contain"
          />
        </div>

        <h2 className="text-xl font-semibold text-center text-gray-800">
          Create / Edit Shop
        </h2>

        {/* Shop Image Upload */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Shop Image
          </label>
          <div className="flex flex-col items-center gap-2">
            <label
              htmlFor="shopImage"
              className="w-32 h-32 border-2 border-dashed border-gray-300 rounded-xl flex items-center justify-center cursor-pointer overflow-hidden relative hover:border-[#ff4d2d]"
            >
              {frontendImage ? (
                <img
                  src={frontendImage}
                  alt="Shop Preview"
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="text-gray-400 text-center text-sm">
                  Upload
                </span>
              )}
            </label>
            <input
              id="shopImage"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImage}
            />
          </div>
        </div>

        {/* Shop Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Shop Name
          </label>
          <input
            type="text"
            placeholder="Enter shop name"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff4d2d]"
            required
            onChange={(e) => setName(e.target.value)}
            value={name}
          />
        </div>

        {/* City */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            City
          </label>
          <input
            type="text"
            placeholder="Enter city"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff4d2d]"
            required
            onChange={(e) => setCity(e.target.value)}
            value={city}
          />
        </div>

        {/* State */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            State
          </label>
          <input
            type="text"
            placeholder="Enter state"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff4d2d]"
            required
            onChange={(e) => setState(e.target.value)}
            value={state}
          />
        </div>

        {/* Address */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Address
          </label>
          <textarea
            placeholder="Enter address"
            rows="1"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff4d2d]"
            required
            onChange={(e) => setAddress(e.target.value)}
            value={address}
          ></textarea>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-[#ff4d2d] text-white py-2 rounded-lg shadow-md hover:bg-[#e04325] transition-colors"
        >
          Save Shop
        </button>
      </form>

      {/* Background Animation */}
      <style>
        {`
          @keyframes bounce-slow {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(50px); }
          }
          .animate-bounce-slow {
            animation: bounce-slow 5s ease-in-out infinite;
          }
        `}
      </style>
    </div>
  );
};

export default CreateEditShop;
