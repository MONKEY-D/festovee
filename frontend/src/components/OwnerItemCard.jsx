import { FaPen, FaTrashAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const OwnerItemCard = ({ data }) => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col sm:flex-row bg-white rounded-lg shadow-md overflow-hidden border border-[#ff4d2d] hover:shadow-lg transition-shadow duration-300">
      {/* Image Section */}
      <div className="w-full sm:w-40 h-48 sm:h-auto flex-shrink-0 bg-gray-50">
        <img
          src={data.image}
          alt={data.name}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Info & Actions */}
      <div className="flex flex-col justify-between p-4 flex-1">
        <div>
          <h2 className="text-lg font-semibold text-[#ff4d2d]">{data.name}</h2>
          <p className="text-sm text-gray-600 mt-1">
            Category: {data.category}
          </p>
          <p className="text-sm text-gray-600 mt-1">
            <span className="font-medium">Price:</span> Rs. {data.price}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="mt-4 flex gap-4 text-gray-600">
          <button
            onClick={() => navigate(`/edit-item/${data._id}`)}
            className="flex items-center justify-center gap-1 p-2 rounded-md hover:bg-[#ff4d2d] hover:text-white transition-colors duration-200"
          >
            <FaPen />
            <span className="text-sm hidden sm:inline">Edit</span>
          </button>
          <button className="flex items-center justify-center gap-1 p-2 rounded-md hover:bg-red-500 hover:text-white transition-colors duration-200">
            <FaTrashAlt />
            <span className="text-sm hidden sm:inline">Delete</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default OwnerItemCard;
