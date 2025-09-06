import React from "react";
import Nav from "./NavUser";
import UserContent from "../pages/UserContent";

const UserDashboard = () => {
  return (
    <div className="w-full min-h-screen bg-[#fff9f6]">
      <Nav />
      <main className="pt-1 px-4 sm:px-6 lg:px-12">
        <UserContent />
      </main>
    </div>
  );
};

export default UserDashboard;
