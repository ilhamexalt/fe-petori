import { MdLocationOn } from "react-icons/md";
import { FaStar } from "react-icons/fa";
import SkeletonComponent from "./Skeleton";
import { useNavigate } from "react-router-dom";
import { Divider } from "antd";
import { useQuery } from "@tanstack/react-query";

export default function StoreComponent({ title }) {
  const { data, error, isPending } = useQuery({
    queryKey: ["repoData"],
    queryFn: () =>
      fetch(`https://fakestoreapi.com/products`).then((res) => res.json()),
  });

  if (isPending)
    return (
      <div className="flex justify-center items-center h-56">
        <div className="loader-univ"> </div>
      </div>
    );
  if (error) return "An error has occurred: " + error.message;

  const navigate = useNavigate();

  return (
    <div>
      <h1 className="text-center mb-3 md:mb-10 md:text-2xl uppercase font-semibold">
        {title}
      </h1>
      <div className="grid grid-cols-2 md:grid-cols-5 gap-5 md:gap-10 justify-items-center pb-5 ">
        {data.map((item, i) => (
          <div
            className="hover:cursor-pointer shadow-md hover:shadow-xl transition delay-50 ease-in-out w-full md:h-64 h-60 bg-white rounded-sm "
            key={item.id}
            onClick={() => navigate(`/storedetail/${item.id}`)}
          >
            <div>
              <div className="w-full h-40">
                <img
                  className="w-full h-full object-contain shadow-sm rounded-sm hover:scale-105 bg-white transition p-2 md:p-4"
                  src={`${item.image}`}
                  alt="Store"
                />
              </div>
              <div className="grid grid-cols-1 py-2 px-2 md:px-3">
                <div>
                  <h1 className="text-xs text-justify md:text-base capitalize">
                    {item.category}
                  </h1>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 text-xs md:text-sm py-1 md:py-2">
                  <p className="flex items-center gap-1 capitalize ">
                    <MdLocationOn className="text-blue-500" />
                    Location
                  </p>
                  <span>
                    <Divider type="vertical" className="bg-gray-300 w-[1px]" />2
                    Km
                  </span>
                  <div className="md:flex items-center justify-center text-xs md:text-sm gap-1 hidden">
                    <FaStar className="text-yellow-500" /> {item.price}
                  </div>
                  <SkeletonComponent
                    className={`h-8 w-[155px] md:h-10 md:w-52 mt-2 left-1`}
                  />
                </div>
                <div className="flex items-center text-xs md:text-sm gap-1 md:hidden ">
                  <FaStar className="text-yellow-500" /> {item.price}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
