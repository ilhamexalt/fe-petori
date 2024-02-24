import { CardHeader, Typography } from "@material-tailwind/react";
import { ArrowDownTrayIcon } from "@heroicons/react/24/outline";
import ButtonComponent from "./Button";
import { Link } from "react-router-dom";
import { IoMdAddCircle } from "react-icons/io";
import "animate.css";
import Swal from "sweetalert2";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import InputComponent from "./Input";

const Input = ({ register, required, errors }) => (
  <div className="flex flex-col gap-y-2">
    <input
      {...register("fullname", { required })}
      type="text"
      placeholder="Fullname"
      className="bg-gray-50 border border-gray-300 text-gray-900 rounded-md  focus:ring-blue-500 focus:border-blue-500 block  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 pl-1 md:pl-3 pt-1 pb-1 w-full text-xs md:text-base"
      // aria-invalid={errors.fullname ? "true" : "false"}
    />
    {/* {errors.fullname?.type === "required" && (
      <p role="alert">First name is required</p>
    )} */}
    <input
      {...register("address", { required })}
      type="text"
      placeholder="Address"
      className="bg-gray-50 border border-gray-300 text-gray-900 rounded-md  focus:ring-blue-500 focus:border-blue-500 block  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 pl-1 md:pl-3 pt-1 pb-1 w-full text-xs md:text-base"
    />
    <input
      {...register("phonenumber", { required })}
      type="text"
      placeholder="Phone Number"
      className="bg-gray-50 border border-gray-300 text-gray-900 rounded-md  focus:ring-blue-500 focus:border-blue-500 block  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 pl-1 md:pl-3 pt-1 pb-1 w-full text-xs md:text-base"
    />
    <input
      {...register("email", { required })}
      type="email"
      placeholder="Email"
      className="bg-gray-50 border border-gray-300 text-gray-900 rounded-md  focus:ring-blue-500 focus:border-blue-500 block  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 pl-1 md:pl-3 pt-1 pb-1 w-full text-xs md:text-base"
    />
    <input
      {...register("password", { required })}
      type="password"
      placeholder="Password"
      className="bg-gray-50 border border-gray-300 text-gray-900 rounded-md  focus:ring-blue-500 focus:border-blue-500 block  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 pl-1 md:pl-3 pt-1 pb-1 w-full text-xs md:text-base"
    />
  </div>
);

export default function CardHeaderComponent({ title }) {
  useEffect(() => {
    document.documentElement.style.setProperty("--animate-duration", "2s");
  }, []);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => console.log(data);
  console.log(watch("example"));

  return (
    <div>
      <CardHeader
        floated={false}
        shadow={false}
        className="rounded-sm shadow-md h-20 flex justify-between items-center pl-3 pr-3 md:pl-5 md:pr-5"
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
        <InputComponent placeholder="Search .." />
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
