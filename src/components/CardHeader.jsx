import { CardHeader, Typography } from "@material-tailwind/react";
import { ArrowDownTrayIcon } from "@heroicons/react/24/outline";
import ButtonComponent from "./Button";
import { Link } from "react-router-dom";
import { IoMdAddCircle } from "react-icons/io";
import "animate.css";
import Swal from "sweetalert2";
import { useEffect } from "react";
import InputComponent from "./Input";

export default function CardHeaderComponent({ title, onChange, value }) {
  useEffect(() => {
    document.documentElement.style.setProperty("--animate-duration", "2s");
  }, []);

  return (
    <div>
      <CardHeader
        floated={false}
        shadow={false}
        className="rounded-sm shadow-md h-20 flex justify-between items-center px-3 md:px-5"
      >
        <div>
          <h1 className="font-semibold text-sm md:text-lg"> {title}</h1>
          <p className="text-xs md:text-base">
            These are details about the {title}
          </p>
        </div>
        <div>
          <ButtonComponent
            className=" bg-indigo-500 hover:ring-indigo-500 flex items-center justify-center h-7 md:h-10 uppercase text-[8px] md:text-xs w-[80px] md:w-28"
            onClick={null}
          >
            <ArrowDownTrayIcon
              strokeWidth={2}
              className="h-[10px] w-[10px] md:h-4 md:w-4"
            />
            Download
          </ButtonComponent>
        </div>
      </CardHeader>
      <div className="mt-5 mb-5 flex items-center justify-between">
        <Link
          onClick={() => {
            Swal.fire({
              showClass: {
                popup: `
                animate__animated
                animate__fadeInUp
                animate__faster
              `,
              },
              hideClass: {
                popup: `
                animate__animated
                animate__fadeOutDown
                animate__faster
              `,
              },
            });
          }}
          className="text-indigo-500 text-xs md:text-base flex items-center gap-1 pl-2 pr-2 md:pl-5 md:pr-5"
        >
          <IoMdAddCircle /> {title.substring(0, title.length - 1)}
        </Link>
        <InputComponent
          placeholder="Search .."
          onChange={onChange}
          handleSearch
        />
      </div>
      {/* <form onSubmit={handleSubmit(onSubmit)}>
        <Input register={register} required />
        <ButtonComponent
          type="submit"
          className="bg-indigo-500 hover:ring-indigo-500 h-6 md:h-8 uppercase text-[8px] md:text-xs w-full"
        >
          SAVE
        </ButtonComponent>
      </form> */}
    </div>
  );
}
