import { Spin } from "antd";
import { useReducer } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { LoadingOutlined } from "@ant-design/icons";
import ButtonComponent from "../../components/Button";
import Petori from "../../assets/petori.png";
import useLocalStorage from "../../hooks/useLocalStorage";
import loginReducer from "../../hooks/useReducerLogin";
import InputComponent from "../../components/Input";

const initialState = {
  phoneNumber: "",
  password: "",
  isLoading: false,
  error: "",
};

export default function Login() {
  const navigate = useNavigate();
  const [localStorage, setLocalStorage] = useLocalStorage("username", []);
  const [isLogin, setIsLogin] = useLocalStorage("isLoggedIn", []);

  const [state, dispatch] = useReducer(loginReducer, initialState);
  const { phoneNumber, password, isLoading, error } = state;

  const onSubmit = async (e) => {
    e.preventDefault();
    dispatch({ type: "login" });
    try {
      await new Promise((resolve, reject) => {
        setTimeout(() => {
          if (phoneNumber !== "" && password !== "") {
            setLocalStorage(phoneNumber);
            resolve();
            setIsLogin(true);
            navigate("/dashboard");
          } else {
            reject();
          }
        }, 1000);
      });
      dispatch({ type: "success" });
    } catch (error) {
      dispatch({ type: "error" });
    }
  };

  return (
    <>
      <div className="flex justify-center items-center w-full min-h-screen bg-gray-50">
        <div className="bg-white md:w-64 shadow-md hover:shadow-lg rounded-br-2xl rounded-bl-sm rounded-tl-2xl ">
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
            <form name="basic" onSubmit={onSubmit}>
              <InputComponent
                type="text"
                className="mb-5"
                placeholder="Phone Number"
                value={phoneNumber}
                onChange={(e) =>
                  dispatch({
                    type: "field",
                    fieldName: "phoneNumber",
                    payload: e.currentTarget.value,
                  })
                }
              />

              <InputComponent
                type="password"
                className="mb-5"
                placeholder="Password"
                value={password}
                onChange={(e) =>
                  dispatch({
                    type: "field",
                    fieldName: "password",
                    payload: e.currentTarget.value,
                  })
                }
              />
              <ButtonComponent
                disabled={isLoading}
                type="submit"
                className="w-full tracking-widest p-1 mb-2"
              >
                {isLoading ? (
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
