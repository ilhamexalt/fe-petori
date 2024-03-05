import { Divider } from "antd";
import { FaStar } from "react-icons/fa6";
import { MdLocationOn } from "react-icons/md";

export default function StoreComponent({
  src,
  category,
  price,
  onClick,
  className,
}) {
  return (
    <div
      onClick={onClick}
      className={`hover:cursor-pointer shadow-md hover:shadow-xl transition delay-50 ease-in-out w-40 md:w-60 md:h-64 h-60 bg-white rounded-sm ${className} `}
    >
      <div>
        <div className="w-full md:w-full bg-white h-40 flex justify-center items-center">
          <img
            className="w-full h-full object-contain shadow-sm rounded-sm hover:scale-105 transition p-2 md:p-2"
            src={src}
            alt="Store"
          />
        </div>
        <div className="grid grid-cols-1 py-2 px-2 md:px-3">
          <div>
            <h1 className="text-xs text-justify md:text-base capitalize">
              {category}
            </h1>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 text-xs md:text-sm py-1 md:py-2">
            <p className="flex items-center gap-1 capitalize ">
              <MdLocationOn className="text-blue-500" />
              Location
            </p>
            <span>
              <Divider type="vertical" className="bg-gray-300 w-[1px]" />2 Km
            </span>
            <div className="md:flex items-center justify-center text-xs md:text-sm gap-1 hidden">
              <FaStar className="text-yellow-500" /> {price}
            </div>
          </div>
          <div className="flex items-center text-xs md:text-sm gap-1 md:hidden ">
            <FaStar className="text-yellow-500" /> {price}
          </div>
        </div>
      </div>
    </div>
  );
}
