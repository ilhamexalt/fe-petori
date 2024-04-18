import { Divider } from "antd";
import { FaStar } from "react-icons/fa6";
import { MdLocationOn } from "react-icons/md";
import useLocalStorage from "../hooks/useLocalStorage";

export default function CardStoreComponent({
  src,
  title,
  price,
  onClick,
  className,
  location,
}) {
  return (
    <div
      onClick={onClick}
      className={`bg-white hover:cursor-pointer shadow-md hover:shadow-xl transition delay-50 ease-in-out w-full md:h-64 h-60 rounded-sm  ${className}`}
    >
      <div>
        <div className="w-full bg-white h-40 flex justify-center items-center">
          <img
            className="w-full h-full object-contain shadow-sm rounded-sm hover:scale-105 transition p-2 md:p-2"
            src={src}
            alt="Store"
          />
        </div>
        <div className="grid grid-cols-1 py-2 px-2 md:px-3">
          <div>
            <p className="text-[10px] text-justify md:text-sm capitalize">
              {title}
            </p>
          </div>
          <div className="flex w-full justify-between text-[10px] mt-1 h-5 md:h-10">
            <div className="flex items-center capitalize gap-1  ">
              <MdLocationOn className="text-blue-500" /> {location}
              <Divider type="vertical" className="bg-gray-300 w-[1px]" /> 2 Km
            </div>

            <div className="flex items-center justify-center capitalize pr-2  ">
              <FaStar className="text-yellow-500 mr-1 hidden md:block" />{" "}
              <span className="hidden md:block "> 5.0 </span>
            </div>
          </div>
          <div className="flex items-center text-[10px] gap-1 md:hidden mt-1 ">
            <FaStar className="text-yellow-500" /> 5.0
          </div>
        </div>
      </div>
    </div>
  );
}
