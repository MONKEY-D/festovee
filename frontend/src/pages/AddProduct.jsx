import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FaPlus } from "react-icons/fa";

const AddProduct = () => {
  const { myShopData } = useSelector((state) => state.owner);
  const navigate = useNavigate();

  // If shop exists, no need to show card
  if (!myShopData) return null;

  return (
    <div className="w-full flex justify-center mt-8 mb-6">
      <div className="bg-white rounded-md shadow-lg p-6 flex flex-col items-center gap-4 max-w-xs hover:shadow-xl transition-shadow">
        <FaPlus className="text-4xl text-[#ff4d2d]" />
        <h3 className="text-lg font-semibold text-gray-900">Add Product</h3>
        <p className="text-sm text-gray-500 text-center">
          Add a new product to your shop and start selling quickly.
        </p>
        <button
          onClick={() => navigate("/add-product")}
          className="mt-2 w-full bg-[#ff4d2d] text-white py-2 px-4 rounded-md font-medium hover:bg-[#e04325] transition-colors"
        >
          Add Now
        </button>
      </div>
    </div>
  );
};

export default AddProduct;
