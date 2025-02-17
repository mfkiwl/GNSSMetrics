import React from "react";
import Header from "./Components/Constants/Header";
import Footer from "./Components/Constants/Footer";
import FromFile from "./Pages/FromFile";

const Homepage = () => {
  return (
    <div className="max-w-screen h-full sm:px-2 flex flex-col bg-gray-100 overflow-y-auto relative">
      <div className="h-1/8 w-full border-b-2 border-gray-200 fixed top-0 z-10 bg-white bg-opacity-100">
        <Header />
      </div>
      <div className="h-full w-full px-[calc(5vw)] sm:px-[calc(10vw)] py-[2vw] pt-[8vh] sm:pt-[10vh]">
        <FromFile />
      </div>
      <div className="h-1/8 w-full border-t-2 pt-6 pb-6 bg-white">
        <Footer />
      </div>
    </div>
  );
};

export default Homepage;
