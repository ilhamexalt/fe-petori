import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { LoadingOutlined } from "@ant-design/icons";
import ButtonComponent from "../../components/Button";
import Petori from "../../assets/petori.png";
import useLocalStorage from "../../hooks/useLocalStorage";
import InputComponent from "../../components/Input";
import Swal from "sweetalert2";
import { Spin } from "antd";
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import { login } from "../../services/service";
import CryptoJS from "crypto-js";

export default function Login() {
  const navigate = useNavigate();

  const [fullname, setFullname] = useLocalStorage("fullName", []);
  const [isRole, setIsRole] = useLocalStorage("isRole", []);
  const [isLogin, setIsLogin] = useLocalStorage("isLoggedIn", []);
  const [isToken, setIsToken] = useLocalStorage("isToken", []);
  const [id, setId] = useLocalStorage("id", []);
  const [location, setLocation] = useLocalStorage("currentLocation", []);
  const [email, setEmail] = useLocalStorage("email", []);

  const [phoneNumber, setPhonenumber] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (isLogin && isToken.length > 0 && isRole.length > 0)
      return navigate("/dashboard");
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    navigator.geolocation.getCurrentPosition(async (position) => {
      const lat = position.coords.latitude;
      const lng = position.coords.longitude;
      setLocation(lat + " " + lng);
    });

    if (phoneNumber === "" || password === "" || location === "") {
      setError(true);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Please fill all the fields",
        timer: 1000,
        showConfirmButton: false,
      });
      setLoading(false);
      return;
    }

    try {
      const response = await login({ phoneNumber, password, location });
      if (!response.ok) {
        const data = await response.json();
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: data.message + response.statusText,
          timer: 1000,
          showConfirmButton: false,
        });
        setLoading(false);
        return null;
      }

      if (response.ok) {
        const data = await response.json();
        if (data?.data.isActive !== 1) {
          setLoading(false);
          Swal.fire({
            icon: "info",
            title: `<p style='text-align: center; font-size: 12px'>${data.message}</p>`,
            html: `<p style='text-align: center; font-size: 12px'> you will be directed to the verification page, please wait... </p>`,
            timer: 3000,
            showCancelButton: false,
            showConfirmButton: false,
            timerProgressBar: true,
            didOpen: (toast) => {
              toast.onmouseenter = Swal.stopTimer;
              toast.onmouseleave = Swal.resumeTimer;
            },
            willClose: () => {
              return navigate("/verification/", {
                state: data.data,
              });
            },
          });
        } else {
          setLoading(false);
          setId(data.data.id);
          setFullname(data.data.fullname);

          // const fullname = CryptoJS.AES.encrypt(
          //   data.data.fullname,
          //   "p3t0r1p3t0r1"
          // ).toString();
          // setFullname(fullname);

          setIsRole(data.data.isRole);
          setIsToken(data.token);
          setIsLogin(true);
          setEmail(data.data.email);
          Swal.fire({
            icon: "success",
            title: "Success",
            html: `<p style='text-align: center; font-size: 20px; '> ${data.message}</p>`,
            timer: 1000,
            showConfirmButton: false,
            willClose: () => {
              return navigate("/dashboard", { state: data.data });
            },
          });
        }
      }
    } catch (error) {
      setLoading(false);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error.message,
      });
    }
  };

  return (
    <>
      {/* <div className="flex justify-center items-center w-full min-h-screen bg-gray-50 ">
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
            {error && (
              <p className="text-red-500 text-center text-xs mb-2">{error}</p>
            )}
            <form name="basic" className="relative">
              <InputComponent
                type="text"
                className={
                  error && !phoneNumber ? "mb-5 border-red-500" : "mb-5"
                }
                placeholder="Phone Number"
                value={phoneNumber}
                onChange={(e) => setPhonenumber(e.target.value)}
              />
              <div className="relative">
                <InputComponent
                  type={showPassword ? "text" : "password"}
                  className={
                    error && !password ? "mb-5 border-red-500" : "mb-5"
                  }
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />

                {showPassword ? (
                  <div className="absolute right-0 top-0 cursor-pointer w-10 h-10">
                    <FaEye
                      className="absolute right-3 top-3"
                      onClick={() => setShowPassword(!showPassword)}
                    />
                  </div>
                ) : (
                  <div className="absolute right-0 top-0 cursor-pointer w-10 h-10 ">
                    <FaEyeSlash
                      className="absolute right-3 top-3"
                      onClick={() => setShowPassword(!showPassword)}
                    />
                  </div>
                )}
              </div>
              <ButtonComponent
                onClick={handleLogin}
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
      </div> */}

      <div className="area">
        <ul className="circles">
          <div className="flex justify-center items-center min-h-screen">
            <div className="bg-white w-80 md:w-[400px] shadow-md hover:shadow-lg rounded-br-2xl rounded-bl-sm rounded-tl-2xl ">
              <div className="w-full py-3 bg-gradient-to-r from-indigo-500 to-blue-500 rounded-br-2xl rounded-bl-sm rounded-tl-2xl rounded-tr-sm">
                <div className="font-bold text-5xl flex justify-center">
                  <img
                    src={Petori}
                    alt="Petori Logo "
                    className="w-24 md:w-44"
                  />
                </div>
                <p className="text-center text-xs font-light text-white">
                  © 2024 - Development
                </p>
              </div>
              <div className="pt-5 px-5 py-5">
                {error && (
                  <p className="text-red-500 text-center text-xs mb-2">
                    {error}
                  </p>
                )}
                <form name="basic" className="relative">
                  <InputComponent
                    type="text"
                    className={
                      error && !phoneNumber ? "mb-5 border-red-500" : "mb-5"
                    }
                    placeholder="Phone Number"
                    value={phoneNumber}
                    onChange={(e) => setPhonenumber(e.target.value)}
                  />
                  <div className="relative">
                    <InputComponent
                      type={showPassword ? "text" : "password"}
                      className={
                        error && !password ? "mb-5 border-red-500" : "mb-5"
                      }
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />

                    {showPassword ? (
                      <div className="absolute right-0 top-0 cursor-pointer w-10 h-10">
                        <FaEye
                          className="absolute right-3 top-3"
                          onClick={() => setShowPassword(!showPassword)}
                        />
                      </div>
                    ) : (
                      <div className="absolute right-0 top-0 cursor-pointer w-10 h-10 ">
                        <FaEyeSlash
                          className="absolute right-3 top-3"
                          onClick={() => setShowPassword(!showPassword)}
                        />
                      </div>
                    )}
                  </div>
                  <ButtonComponent
                    onClick={handleLogin}
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
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
        </ul>
      </div>
    </>
  );
}
