import { useEffect, useReducer, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { LoadingOutlined } from "@ant-design/icons";
import ButtonComponent from "../../components/Button";
import Petori from "../../assets/petori.png";
import useLocalStorage from "../../hooks/useLocalStorage";
import InputComponent from "../../components/Input";
import Swal from "sweetalert2";
import { Spin } from "antd";

export default function Login() {
  const navigate = useNavigate();
  const [localStorage, setLocalStorage] = useLocalStorage("username", []);
  const [isLogin, setIsLogin] = useLocalStorage("isLoggedIn", []);

  const [phoneNumber, setPhonenumber] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const onSubmit = (e) => {
    e.preventDefault();
    try {
      if (phoneNumber === "" || password === "") {
        setError(true);
        Swal.fire("Error", "Please fill all the fields", "error");
        return;
      }

      if (phoneNumber === "admin" && password === "1") {
        setLocalStorage(phoneNumber);
        setIsLogin(true);
        navigate("/dashboard");
      } else if (phoneNumber === "owner1" && password === "1") {
        //active yet
        let timerInterval;
        Swal.fire({
          icon: "info",
          title:
            "<p style='text-align: center; font-size: 20px'>Your account is not active yet! </p>",
          html: `<p style='text-align: center; font-size: 12px'> you will be directed to the verification page, please wait .. </p>`,
          timer: 3000,
          showCancelButton: false,
          showConfirmButton: false,
          timerProgressBar: true,
          // didOpen: () => {
          //   Swal.showLoading();
          //   const timer = Swal.getPopup().querySelector("b");
          //   timerInterval = setInterval(async () => {
          //     timer.textContent = `${Swal.getTimerLeft()}`;
          //   }, 100);
          // },
          // willClose: () => {
          //   clearInterval(timerInterval);
          //   return navigate("/verification");
          // },
          didOpen: (toast) => {
            toast.onmouseenter = Swal.stopTimer;
            toast.onmouseleave = Swal.resumeTimer;
          },
          willClose: () => {
            return navigate("/verification");
          },
        });
      } else if (phoneNumber === "owner2" && password === "1") {
        setLocalStorage(phoneNumber);
        setIsLogin(true);
        navigate("/dashboard");
      } else if (
        (phoneNumber !== "owner1" && password !== "1") ||
        (phoneNumber !== "owner2" && password !== "1") ||
        (phoneNumber !== "admin" && password !== "1")
      ) {
        Swal.fire("Error", "Incorrect phone number or password!", "error");
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Error : " + e.error,
      });
    }
  };

  return (
    <>
      <div className="flex justify-center items-center w-full min-h-screen bg-gray-50">
        <div className="bg-white w-72 md:w-96  shadow-md hover:shadow-lg rounded-br-2xl rounded-bl-sm rounded-tl-2xl ">
          <div className="w-full py-3 bg-gradient-to-r from-indigo-500 to-blue-500 rounded-br-2xl rounded-bl-sm rounded-tl-2xl rounded-tr-sm">
            <div className="font-bold text-5xl flex justify-center">
              <img src={Petori} alt="Petori Logo " className="w-24 md:w-44" />
            </div>
            <p className="text-center text-xs font-thin text-white">
              © 2024 - Development
            </p>
          </div>
          <div className="pt-5 px-5 py-5">
            {error && (
              <p className="text-red-500 text-center text-xs mb-2">{error}</p>
            )}
            <form name="basic" onSubmit={onSubmit} className="relative">
              <InputComponent
                type="text"
                className={
                  error && !phoneNumber ? "mb-5 border-red-500" : "mb-5"
                }
                placeholder="Phone Number"
                value={phoneNumber}
                onChange={(e) => setPhonenumber(e.target.value)}
              />

              <InputComponent
                type="password"
                className={error && !password ? "mb-5 border-red-500" : "mb-5"}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <ButtonComponent
                disabled={loading}
                type="submit"
                className="w-full tracking-widest p-1 mb-2"
              >
                {loading ? (
                  <Spin
                    indicator={
                      <LoadingOutlined
                        style={{
                          fontSize: 18,
                          color: "white",
                        }}
                        spin
                      />
                    }
                  />
                ) : (
                  "Log In"
                )}
              </ButtonComponent>
            </form>

            <div className="text-center">
              <Link
                to="/signup"
                className="text-gray-800  hover:text-indigo-500 transition ease-in-out delay-75 text-xs md:text-sm  mb-2"
              >
                {"Don't have an account yet?"}
              </Link>
            </div>
            <div className="text-center">
              <Link
                to="/forgotpassword"
                className="text-gray-800 hover:text-indigo-500 transition ease-in-out delay-50 text-xs md:text-sm"
              >
                Forgot password?
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
