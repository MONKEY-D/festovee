import NavOwner from "./NavOwner";
import ContentOwner from "./ContentOwner";

const OwnerDashboard = () => {
  return (
    <div className="w-full min-h-screen bg-[#fff9f6]">
      <NavOwner />
      <main className="pt-[80px] sm:pt-[80px] md:pt-[90px] lg:pt-[100px]">
        <ContentOwner />
      </main>
    </div>
  );
};

export default OwnerDashboard;
