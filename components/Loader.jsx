import React from "react";

const Loader = () => {
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="w-12 h-12 border-t-4 border-b-4 border-t-orange-500 border-b-orange-500 rounded-full animate-spin" />
    </div>
  );
};

export default Loader;
