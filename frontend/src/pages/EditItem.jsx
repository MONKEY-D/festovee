import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import logo from "../assets/FESTOVEE_LOGO_ONLY.png";
import axios from "axios";
import { serverUrl } from "../App";
import { useDispatch } from "react-redux";
import { setMyShopData } from "../redux/ownerSlice";
import Swal from "sweetalert2";
import Loading from "../components/Loading";

const EditItem = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { itemId } = useParams();

  const [frontendImage, setFrontendImage] = useState("");
  const [backendImage, setBackendImage] = useState(null);
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState(0);
  const [description, setDescription] = useState("");
  const [unit, setUnit] = useState("");
  const [tags, setTags] = useState([]);
  const [tagInput, setTagInput] = useState("");

  const [loading, setLoading] = useState(false);

  // ✅ Fetch item details by ID
  useEffect(() => {
    const handleGetItemById = async () => {
      try {
        const result = await axios.get(
          `${serverUrl}/api/item/get-by-id/${itemId}`,
          { withCredentials: true }
        );
        const item = result.data;

        setFrontendImage(item.image || "");
        setName(item.name || "");
        setCategory(item.category || "");
        setPrice(item.price || "");
        setStock(item.stock || 0);
        setDescription(item.description || "");
        setUnit(item.unit || "");

        // ✅ normalize tags (always array)
        try {
          const parsedTags = Array.isArray(item.tags)
            ? item.tags
            : JSON.parse(item.tags || "[]");
          setTags(parsedTags);
        } catch {
          setTags([]);
        }
      } catch (error) {
        console.log(error);
        Swal.fire("Error", "Failed to load item details!", "error");
      }
    };
    handleGetItemById();
  }, [itemId]);

  const handleImage = (e) => {
    const file = e.target.files[0];
    if (file) {
      setBackendImage(file);
      setFrontendImage(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("name", name);
      formData.append("category", category);
      formData.append("price", price);
      formData.append("stock", stock);
      formData.append("description", description);
      formData.append("unit", unit);
      tags.forEach((tag) => formData.append("tags", tag));
      if (backendImage) {
        formData.append("image", backendImage);
      }

      const result = await axios.put(
        `${serverUrl}/api/item/edit-item/${itemId}`,
        formData,
        { withCredentials: true }
      );

      dispatch(setMyShopData(result.data));

      Swal.fire("Success", "Product updated successfully!", "success").then(
        () => navigate("/")
      );
    } catch (error) {
      console.log(error);
      Swal.fire("Error", "Failed to update product!", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleTagKeyDown = (e) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      const value = tagInput.trim();
      if (value && !tags.includes(value)) {
        setTags([...tags, value]);
      }
      setTagInput("");
    }
  };

  const removeTag = (tagToRemove) => {
    setTags(tags.filter((t) => t !== tagToRemove));
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-[#fff9f6] relative overflow-hidden">
      {/* Background Blobs */}
      <div className="absolute inset-0">
        <div className="absolute w-96 h-96 bg-pink-300 rounded-full opacity-30 top-[-50px] left-[-50px] animate-bounce-slow"></div>
        <div className="absolute w-80 h-80 bg-yellow-300 rounded-full opacity-30 top-[150px] right-[-60px] animate-bounce-slow"></div>
        <div className="absolute w-72 h-72 bg-green-300 rounded-full opacity-30 bottom-[100px] left-[80px] animate-bounce-slow"></div>
      </div>

      {/* Form box */}
      <form
        onSubmit={handleSubmit}
        className="relative z-10 w-full max-w-4xl bg-white rounded-2xl shadow-2xl p-6 flex flex-col gap-6 backdrop-blur-sm"
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
          Edit Product
        </h2>

        {/* Product Image + Name/Category */}
        <div className="flex flex-col sm:flex-row gap-6">
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Product Image
            </label>
            <div className="flex flex-col items-center gap-2">
              <label
                htmlFor="productImage"
                className="w-32 h-32 border-2 border-dashed border-gray-300 rounded-xl flex items-center justify-center cursor-pointer overflow-hidden hover:border-[#ff4d2d]"
              >
                {frontendImage ? (
                  <img
                    src={frontendImage}
                    alt="Preview"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-gray-400 text-sm">Upload</span>
                )}
              </label>
              <input
                id="productImage"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImage}
              />
            </div>
          </div>

          <div className="flex-1 flex flex-col gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Product Name
              </label>
              <input
                type="text"
                placeholder="Enter product name"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff4d2d]"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Category
              </label>
              <select
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff4d2d]"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option>Handlooms & Textiles</option>
                <option>Apparel & Fashion</option>
                <option>Home & Living</option>
                <option>Electronics & Appliances</option>
                <option>Stationery & Office Supplies</option>
                <option>Health & Wellness</option>
                <option>Food & Beverages</option>
                <option>Bamboo & Sustainable Products</option>
                <option>Industrial & Raw Materials</option>
                <option>Automobile & Spare Parts</option>
                <option>Logistics & Packaging</option>
                <option>Export-Exclusive Section</option>
                <option>others</option>
              </select>
            </div>
          </div>
        </div>

        {/* Price, Stock, Unit */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Price
            </label>
            <input
              type="number"
              min="0"
              placeholder="Enter price"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff4d2d]"
              required
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Stock
            </label>
            <input
              type="number"
              min="0"
              placeholder="Available stock"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff4d2d]"
              value={stock}
              onChange={(e) => setStock(e.target.value)}
            />
          </div>
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Unit
            </label>
            <select
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff4d2d]"
              value={unit}
              onChange={(e) => setUnit(e.target.value)}
            >
              <option value="piece">piece</option>
              <option value="kg">kg</option>
              <option value="box">box</option>
            </select>
          </div>
        </div>

        {/* Tags */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Tags (for search)
          </label>
          <div className="flex flex-wrap gap-2 mb-2">
            {tags.map((tag) => (
              <span
                key={tag}
                className="bg-[#ff4d2d] text-white px-2 py-1 rounded-full text-sm flex items-center gap-1"
              >
                {tag}
                <button
                  type="button"
                  onClick={() => removeTag(tag)}
                  className="text-white font-bold ml-1"
                >
                  ×
                </button>
              </span>
            ))}
          </div>
          <input
            type="text"
            placeholder="Type a tag and press Enter"
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
            onKeyDown={handleTagKeyDown}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff4d2d]"
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Description
          </label>
          <textarea
            rows="3"
            placeholder="Enter product description"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff4d2d]"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </div>

        {/* Submit with Loading */}
        <button
          type="submit"
          disabled={loading}
          className={`w-full flex items-center justify-center py-2 rounded-lg shadow-md transition-colors ${
            loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-[#ff4d2d] hover:bg-[#e04325]"
          } text-white`}
        >
          {loading ? (
            <span className="flex items-center gap-2">
              <Loading size={20} color="#fff" />
              Updating...
            </span>
          ) : (
            "Update Product"
          )}
        </button>
      </form>

      <style>{`
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(50px); }
        }
        .animate-bounce-slow { animation: bounce-slow 5s ease-in-out infinite; }
      `}</style>
    </div>
  );
};

export default EditItem;
