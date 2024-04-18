import { useEffect, useState } from "react";
import Layout from "./layout/Index";
import SvgComponent from "../components/Svg";
import LabelComponent from "../components/Label";
import InputComponent from "../components/Input";
import ButtonComponent from "../components/Button";
import Swal from "sweetalert2";
import { useForm } from "react-hook-form";
import useLocalStorage from "../hooks/useLocalStorage";
import { useNavigate } from "react-router-dom";

export default function ContactUs() {
  const [sending, setSending] = useState(false);
  const [isToken, setIsToken] = useLocalStorage("isToken");
  const [email, setEmail] = useLocalStorage("email");
  const [fullname, setFullname] = useLocalStorage("fullName");

  const navigate = useNavigate();

  useEffect(() => {
    if (isToken.length === 0) {
      return navigate("/");
    }
  }, []);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      fullname: fullname,
      email: email,
      message: "",
    },
  });

  const onSubmit = async (data) => {
    if (data.fullname == "" || data.email == "" || data.message == "")
      return Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Please fill all the fields!",
      });
    setSending(true);
    try {
      const response = await fetch("https://petori-service.my.id/feedback", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${isToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        Swal.fire({
          icon: "success",
          title: "Send Message",
          text: response.statusText,
          showConfirmButton: false,
          timer: 1500,
        });
        setSending(false);
      } else {
        const data = await response.json();
        Swal.fire({
          icon: "success",
          title: "Send Message",
          text: data.message,
          showConfirmButton: false,
          timer: 1500,
        });
        setSending(false);
        reset({ fullname: "", email: "", message: "" });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: `${error.message}`,
      });

      setDisabledButton(false);
    }
  };

  return (
    <Layout>
      <div className="mt-16 md:mt-32">
        <div className="max-w-screen-xl px-8 grid gap-8 grid-cols-1 md:grid-cols-2 md:px-12 lg:px-16 xl:px-32 py-10 md:py-16 mx-auto text-gray-900 ">
          <div className="flex flex-col justify-between ">
            <div>
              <h2 className="text-2xl lg:text-5xl font-bold leading-tight">
                Lets talk about everything!
              </h2>
              <div className="text-gray-700  mt-5 md:mt-8 text-sm md:text-sm">
                Hate forms? Send us an <span className="underline">email</span>{" "}
                instead.
              </div>
            </div>
            <SvgComponent />
          </div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div>
              <div>
                <LabelComponent label={"Fullname"} className="text-gray-200 " />
                <InputComponent
                  props={{
                    ...register("fullname", {
                      minLength: {
                        value: 3,
                        message: "Name must be at least 3 characters", // JS only: <p>error message</p> TS only support string
                      },
                    }),
                  }}
                  type="text"
                  placeholder="Dummy"
                  value={fullname}
                />
                <span className="text-red-500 text-xs">
                  {errors.fullname && <p>{errors.fullname?.message}</p>}
                </span>
              </div>
              <div className="mt-8">
                <LabelComponent label={"Email"} className="text-gray-200 " />
                <InputComponent
                  value={email}
                  props={{ ...register("email") }}
                  type="email"
                  placeholder="ex@gmail.com"
                />
              </div>
              <div className="mt-8">
                <LabelComponent label={"Message"} className="text-gray-200 " />
                <textarea
                  {...register("message")}
                  className="w-full h-32 border border-gray-200  bg-gray-200 text-gray-700 mt-2 p-3 rounded-md leading-tight focus:border-t-0 focus:border-r-0 focus:border-l-0 focus:rounded-none focus:outline-none focus:bg-white focus:border-indigo-500"
                ></textarea>
              </div>
              <div className="mt-8">
                <ButtonComponent
                  type={"submit"}
                  className={"w-full p-3 text-sm font-bold tracking-wide"}
                >
                  {sending ? "SENDING .." : "SEND"}
                </ButtonComponent>
              </div>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
}
