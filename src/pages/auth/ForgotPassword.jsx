import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { LoadingOutlined } from "@ant-design/icons";
import ButtonComponent from "../../components/Button";
import Petori from "../../assets/petori.png";
import useLocalStorage from "../../hooks/useLocalStorage";
import InputComponent from "../../components/Input";
import Swal from "sweetalert2";

export default function ForgotPassword() {
  const navigate = useNavigate();
  const [localStorage, setLocalStorage] = useLocalStorage("username", []);
  const [isLogin, setIsLogin] = useLocalStorage("isLoggedIn", []);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChangePassword = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!phoneNumber) {
      Swal.fire("Error", "Please fill all the fields", "error");
      setError(true);
      setLoading(false);
      return;
    }

    const response = await fetch(
      "https://petori-service.my.id/ForgotPassword?phoneNumber=" + phoneNumber,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      console.log("Error: ", response.statusText);
      setLoading(false);
      Swal.fire("Error", response.statusText, "error");
    }

    if (response.ok) {
      const data = await response.json();
      Swal.fire({
        icon: "success",
        title: "Success",
        text: data.message,
        timer: 1000,
        showConfirmButton: false,
      });
      setLoading(false);
      return navigate("/verification/reset-password", { state: phoneNumber });
    }
  };

  return (
    <>
      <div className="flex justify-center items-center w-full min-h-screen bg-gray-50 ">
        <div className="bg-white w-80 md:w-[400px] shadow-md hover:shadow-lg rounded-br-2xl rounded-bl-sm rounded-tl-2xl ">
          <div className="w-full py-3 bg-gradient-to-r from-indigo-500 to-blue-500 rounded-br-2xl rounded-bl-sm rounded-tl-2xl rounded-tr-sm">
            <div className="font-bold text-5xl flex justify-center">
              <img src={Petori} alt="Petori Logo " className="w-24 md:w-44" />
            </div>
            <p className="text-center text-xs font-light text-white">
              © 2024 - Development
            </p>
          </div>
          <div className="pt-5 px-5 py-5">
            <form
              name="basic"
              className="relative"
              onSubmit={handleChangePassword}
            >
              <div className="relative">
                <InputComponent
                  id="phoneNumber"
                  value={phoneNumber}
                  type="number"
                  className={
                    error && !phoneNumber ? "mb-5 border-red-500" : "mb-5"
                  }
                  placeholder="Phone Number"
                  onChange={(e) => setPhoneNumber(e.target.value)}
                />
              </div>

              <ButtonComponent
                disabled={loading}
                type="submit"
                className="w-full tracking-widest p-1 mb-2"
              >
                {loading ? <LoadingOutlined /> : "Reset"}
              </ButtonComponent>
            </form>

            <div className="text-center">
              <Link
                to="/"
                className="text-gray-800  hover:text-indigo-500 transition ease-in-out delay-75 text-xs md:text-sm  mb-2"
              >
                {"Back to sign in"}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
