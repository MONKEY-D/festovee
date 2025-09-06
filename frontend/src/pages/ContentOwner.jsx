import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import b2bImage from "../assets/b2b_delivery.png";

const ContentOwner = () => {
  const { myShopData } = useSelector((state) => state.owner);
  const navigate = useNavigate();

  if (myShopData) return null;

  return (
    <div className="w-full flex flex-col lg:flex-row items-center justify-between max-w-6xl mx-auto px-6 py-16 gap-10">
      {/* Text Section */}
      <div className="flex-1 text-center lg:text-left">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight">
          Grow Your B2B Business
        </h2>
        <p className="mt-4 text-gray-600 text-base sm:text-lg md:text-xl">
          Manage your shop, fulfill orders, and connect with other businesses
          seamlessly.
        </p>

        {!myShopData && (
          <div className="mt-8 flex justify-center lg:justify-start w-full">
            <button
              onClick={() => navigate("/create-edit-shop")}
              className="w-full max-w-xs sm:max-w-sm px-6 py-4 bg-[#ff4d2d] text-white font-semibold rounded-2xl shadow-lg 
                 hover:bg-[#e04325] transition duration-300 transform hover:scale-105 flex items-center justify-center gap-2"
            >
              Get Started
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </button>
          </div>
        )}
      </div>

      {/* Image Section */}
      <div className="flex-1 w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-full">
        <img
          src={b2bImage}
          alt="B2B Delivery Illustration"
          className="w-full h-auto rounded-2xl shadow-2xl"
        />
      </div>
    </div>
  );
};

export default ContentOwner;
