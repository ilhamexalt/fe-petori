import React from "react";

function OrderHistoryComponent({ onClick, invoice }) {
  return (
    <div
      className="w-full   bg-white text-gray-800 text-center px-5 py-5 shadow-md rounded-md cursor-pointer "
      onClick={onClick}
    >
      <h1 className="text-sm font-semibold  text-gray-800">{invoice}</h1>
    </div>
  );
}

export default OrderHistoryComponent;
