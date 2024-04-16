import React from "react";
import Header from "./Components/Constants/Header";
import Footer from "./Components/Constants/Footer";

const Livepage = () => {
  return (
    <div className="max-w-screen h-screen mx-2 pb-2 flex flex-col">
      <div className="h-1/8 w-full">
        <Header />
      </div>
      <div className="border-2 border-black h-full w-full">Body</div>
      <div className="h-1/8 w-full">
        <Footer />
      </div>
    </div>
  );
};

export default Livepage;
