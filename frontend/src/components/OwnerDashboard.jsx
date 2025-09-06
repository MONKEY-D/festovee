import NavOwner from "./NavOwner";
import ContentOwner from "../pages/ContentOwner";
import YourShop from "../pages/YourShop";
import { useSelector } from "react-redux";
import AddProduct from "../pages/AddProduct";
import OwnerItemCard from "./OwnerItemCard";

const OwnerDashboard = () => {
  const { myShopData } = useSelector((state) => state.owner);

  return (
    <div className="w-full min-h-screen bg-[#fff9f6]">
      <NavOwner />

      <main className="pt-8 px-4 sm:px-6 lg:px-12">
        {/* Main Content Section */}
        <ContentOwner />

        {/* Shop Info */}
        {myShopData && <YourShop />}

        {/* Add Product Section */}
        {myShopData && myShopData.items.length === 0 && <AddProduct />}

        {/* Items Grid */}
        {myShopData?.items?.length > 0 && (
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {myShopData.items.map((item, index) => (
              <OwnerItemCard data={item} key={index} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default OwnerDashboard;
