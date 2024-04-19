import React from "react";

export default function PaginationComponent({
  onClickPrev,
  onClickNext,
  activePrev,
  activeNext,
  page,
  totalData,
  titlePrev,
  titleNext,
}) {
  return (
    <div className="border border-gray-200 flex justify-center">
      <button
        disabled={page === 1 ? true : false}
        className={`${
          activePrev ? "bg-indigo-500 !text-white" : ""
        } rounded-sm w-14 h-10 hover:bg-indigo-500  hover:text-white text-black text-sm flex justify-center items-center ${
          page === 1 ? "cursor-not-allowed" : "cursor-pointer"
        }`}
        onClick={onClickPrev}
      >
        {titlePrev}
      </button>
      <button
        disabled={totalData < 10 ? true : false}
        className={`${
          activeNext ? "bg-indigo-500 !text-white" : ""
        } rounded-sm w-14 h-10 white  hover:bg-indigo-500 hover:text-white text-black text-sm  flex justify-center items-center ${
          totalData < 10 ? "cursor-not-allowed" : "cursor-pointer"
        }`}
        onClick={onClickNext}
      >
        {titleNext}
      </button>
    </div>
  );
}
