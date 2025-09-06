const CategoryCard = ({ category, image }) => {
  return (
    <div className="flex flex-col items-center bg-white rounded-xl shadow-sm border hover:shadow-md hover:-translate-y-1 transition p-1 cursor-pointer">
      <div className="w-full h-32 sm:h-36 md:h-40 rounded-sm overflow-hidden bg-gray-50 flex items-center justify-center">
        <img
          src={image}
          alt={category}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="mt-2 text-center text-sm sm:text-base font-medium text-gray-700">
        {category}
      </div>
    </div>
  );
};

export default CategoryCard;
