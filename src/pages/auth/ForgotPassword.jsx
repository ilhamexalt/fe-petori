import { useEffect, useReducer, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { LoadingOutlined } from "@ant-design/icons";
import ButtonComponent from "../../components/Button";
import Petori from "../../assets/petori.png";
import Cat from "../../assets/cat-run.gif";
import useLocalStorage from "../../hooks/useLocalStorage";
import InputComponent from "../../components/Input";
import Swal from "sweetalert2";
import { Spin } from "antd";
import { FaEye, FaEyeSlash } from "react-icons/fa6";

const initialState = {
  phoneNumber: "",
  password: "",
  isLoading: false,
  error: "",
};

export default function ForgotPassword() {
  const navigate = useNavigate();
  const [localStorage, setLocalStorage] = useLocalStorage("username", []);
  const [isLogin, setIsLogin] = useLocalStorage("isLoggedIn", []);

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(false);

  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [loading, setLoading] = useState(false);

  const handleChangePassword = (e) => {
    e.preventDefault();
    setLoading(true);

    if (!currentPassword || !newPassword || !confirmPassword) {
      Swal.fire("Error", "Please fill all the fields", "error");
      setError(true);
      setLoading(false);
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("New password and confirm password do not match.");
      setLoading(false);
      return;
    }

    Swal.fire({
      icon: "success",
      title: "Password changed successfully!",
      text: "You can now login with your new password.",
      timer: 1000,
      timerProgressBar: true,
      showConfirmButton: false,
    }).then(() => {
      navigate("/", {});
    });

    // setCurrentPassword("");
    // setNewPassword("");
    // setConfirmPassword("");
    // setError("");
  };

  return (
    <>
      <div className="flex justify-center items-center w-full min-h-screen bg-gray-50">
        <div className="bg-white w-72 md:w-96 shadow-md hover:shadow-lg rounded-br-2xl rounded-bl-sm rounded-tl-2xl ">
          <div className="w-full py-3 bg-gradient-to-r from-indigo-500 to-blue-500 rounded-br-2xl rounded-bl-sm rounded-tl-2xl rounded-tr-sm">
            <div className="font-bold text-5xl flex justify-center">
              <img src={Petori} alt="Petori Logo " className="w-24 md:w-44" />
            </div>
            <p className="text-center text-xs font-thin text-white">
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
                  // required={true}
                  id="currentPassword"
                  value={currentPassword}
                  type="password"
                  className={
                    error && !currentPassword ? "mb-5 border-red-500" : "mb-5"
                  }
                  placeholder="Current Password"
                  onChange={(e) => setCurrentPassword(e.target.value)}
                />
              </div>
              <div className="relative">
                <InputComponent
                  id="newPassword"
                  value={newPassword}
                  type={showNewPassword ? "text" : "password"}
                  className={
                    error && !showNewPassword ? "mb-5 border-red-500" : "mb-5"
                  }
                  placeholder="New Password"
                  onChange={(e) => setNewPassword(e.target.value)}
                />
                {showNewPassword ? (
                  <div className="absolute right-0 top-0 cursor-pointer w-10 h-10">
                    <FaEye
                      className="absolute right-3 top-3"
                      onClick={() => setShowNewPassword(!showNewPassword)}
                    />
                  </div>
                ) : (
                  <div className="absolute right-0 top-0 cursor-pointer w-10 h-10 ">
                    <FaEyeSlash
                      className="absolute right-3 top-3"
                      onClick={() => setShowNewPassword(!showNewPassword)}
                    />
                  </div>
                )}
              </div>
              <div className="relative">
                <InputComponent
                  id="confirmPassword"
                  value={confirmPassword}
                  type={showConfirmPassword ? "text" : "password"}
                  className={
                    error && !showConfirmPassword
                      ? "mb-5 border-red-500"
                      : "mb-5"
                  }
                  placeholder="Confirm New Password"
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
                {showConfirmPassword ? (
                  <div className="absolute right-0 top-0 cursor-pointer w-10 h-10">
                    <FaEye
                      className="absolute right-3 top-3"
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                    />
                  </div>
                ) : (
                  <div className="absolute right-0 top-0 cursor-pointer w-10 h-10 ">
                    <FaEyeSlash
                      className="absolute right-3 top-3"
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                    />
                  </div>
                )}
                {error && (
                  <p className="text-red-500 text-xs mb-3 -mt-3">{error}</p>
                )}
              </div>
              <ButtonComponent
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
