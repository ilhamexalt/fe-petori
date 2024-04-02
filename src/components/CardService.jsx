import { FaRegEdit, FaRegTrashAlt } from "react-icons/fa";
import useLocalStorage from "../hooks/useLocalStorage";
import { FaEye } from "react-icons/fa6";

export default function CardServiceComponent({
  img,
  serviceName,
  servicePrice,
  storeName,
  onClickEdit,
  onClickDelete,
}) {
  const [isRole, setIsRole] = useLocalStorage("isRole");
  return (
    <div className="bg-white w-full md:w-48 py-5 shadow-md relative ">
      <div className="absolute w-full flex justify-center items-center  text-xs md:text-sm py-1 text-white bg-indigo-500 top-0  ">
        {storeName}
      </div>
      <div className="flex justify-center mt-5">
        <img
          src={img}
          alt="Service Image"
          className="shadow-md rounded-full hover:scale-105 transition "
        />
      </div>
      <div className="px-5 flex justify-between items-center mt-5">
        <div>
          <div className="">
            <h1 className="font-semibold  text-xs md:text-sm">{serviceName}</h1>
          </div>
          <div className="mt-2">
            <p className="font-light text-xs md:text-sm">
              Rp. {new Intl.NumberFormat().format(servicePrice)}
            </p>
          </div>
        </div>

        <div className="flex gap-3">
          {isRole !== "Super Admin" ? (
            <FaRegEdit onClick={onClickEdit} className=" text-xs md:text-sm" />
          ) : (
            <FaEye
              onClick={onClickEdit}
              className=" hover:text-indigo-500 hover:cursor-pointer text-xs md:text-sm"
            />
          )}
          <FaRegTrashAlt
            onClick={onClickDelete}
            className="text-red-500  text-xs md:text-sm"
          />
        </div>
      </div>
    </div>
  );
}
