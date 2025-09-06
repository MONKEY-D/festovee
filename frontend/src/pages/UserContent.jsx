import CategoryCard from "../components/CategoryCard";
import { getCategories } from "../assets/category.js";

const UserContent = () => {
  const categories = getCategories();

  return (
    <div className="mt-10 pb-10 w-full max-w-10xl mx-auto px-4">
      <h1 className="text-gray-900 text-xl sm:text-2xl md:text-3xl font-semibold mb-6 text-center">
        Inspiration for your first order
      </h1>

      {/* Desktop & Tablet → Grid */}
      <div className="hidden sm:grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
        {categories.map((cate, index) => (
          <CategoryCard
            key={index}
            category={cate.category}
            image={cate.image}
          />
        ))}
      </div>

      {/* Mobile → Horizontal Scroll */}
      <div className="sm:hidden flex overflow-x-auto gap-4 pb-2 scrollbar-hide">
        {categories.map((cate, index) => (
          <CategoryCard
            key={index}
            category={cate.category}
            image={cate.image}
          />
        ))}
      </div>
    </div>
  );
};

export default UserContent;
