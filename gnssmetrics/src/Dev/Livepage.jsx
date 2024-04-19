import React from "react";
import Header from "./Components/Constants/Header";
import Footer from "./Components/Constants/Footer";
import FromLive from "./Pages/FromLive";

const Homepage = () => {
  return (
    <div className="max-w-screen h-full px-2 pb-2 flex flex-col bg-gray-100 overflow-y-auto">
      <div className="h-1/8 w-full border-b-2 border-gray-200">
        <Header />
      </div>
      <div className="h-full w-full px-[calc(5vw)] sm:px-[calc(10vw)] py-[2vw]">
        <FromLive />
      </div>
      <div className="h-1/8 w-full">
        <Footer />
      </div>
    </div>
  );
};

export default Homepage;
