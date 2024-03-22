import { Button, Input, Form, message, Spin } from "antd";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import swal from "sweetalert2";
import { LoadingOutlined } from "@ant-design/icons";
import Petori from "../../assets/petori.png";
import InputComponent from "../../components/Input";
import ButtonComponent from "../../components/Button";
import { addTodo, deleteTodo } from "../../redux/actions";
import { connect } from "react-redux";
import Swal from "sweetalert2";
import { FaEyeSlash } from "react-icons/fa";
import { FaEye } from "react-icons/fa";

const Register = ({ todos, addTodo, deleteTodo }) => {
  const [fullname, setFullname] = useState("");
  const [address, setAddress] = useState("");
  const [phonenumber, setPhonenumber] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [errorPassword, setErrorPassword] = useState(false);

  const [validateUppercase, setValidateUppercase] = useState(true);
  const [validateLength, setValidateLength] = useState(true);
  const [validateChar, setValidateChar] = useState(true);

  const [isFocused, setIsFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleInputPassword = (e) => {
    const pwFill = e.target.value;
    const uppercaseRegex = /[A-Z]/;
    const characterRegex = /[0-9]/;

    /* validation min length */
    if (pwFill.length < 8) {
      setValidateLength(true);
    } else {
      setValidateLength(false);
    }

    /* validation uppercase */
    if (pwFill.match(uppercaseRegex)) {
      setValidateUppercase(false);
    } else {
      setValidateUppercase(true);
    }

    let valPassword = false;
    /* validation character */
    if (pwFill.match(characterRegex)) {
      setValidateChar(false);
    } else {
      setValidateChar(true);
      valPassword = true;
    }

    if (!validateLength && !validateUppercase && !valPassword) {
      setPassword(pwFill);
    }

    if (validateLength || validateUppercase || valPassword) {
      setPassword(null);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!fullname || !address || !email || !password || !phonenumber) {
      setLoading(false);
      setError(true);
      Swal.fire("Error", "Please fill all the fields", "error");
      return;
    }

    try {
      // const api = await fetch("https://bluepath.my.id/company/register", {
      //   method: "POST",
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      //   body: JSON.stringify({
      //     company: {
      //       address: address,
      //       phonenumber: phonenumber,
      //       email: email,
      //       password: password,
      //     },
      //     employee: {
      //       name: name,
      //       address: address,
      //       email: email,
      //       password: password,
      //       phonenumber: phonenumber,
      //     },
      //   }),
      // });

      let datas = { fullname, address, phonenumber, email, password };
      Swal.fire({
        icon: "success",
        title: "Success",
        text: "Your account has been created!",
      });
      setError(false);
      setLoading(false);
      setIsFocused(false);
      setFullname("");
      setAddress("");
      setEmail("");
      setPhonenumber("");
      // setPassword("");
      const a = (document.getElementById("pw").value = "");
      setValidateLength(true);
      setValidateUppercase(true);
      setValidateChar(true);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  return (
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
          <form name="basic">
            <InputComponent
              type="text"
              value={fullname}
              className={error && !fullname ? "mb-5 border-red-500" : "mb-5"}
              placeholder="Full Name"
              onChange={(e) => setFullname(e.target.value)}
            />
            <InputComponent
              type="text"
              value={address}
              className={error && !address ? "mb-5 border-red-500" : "mb-5"}
              placeholder="Address"
              onChange={(e) => setAddress(e.target.value)}
            />
            <InputComponent
              type="email"
              value={email}
              className={error && !email ? "mb-5 border-red-500" : "mb-5"}
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
            />
            <InputComponent
              type="number"
              value={phonenumber}
              className={error && !phonenumber ? "mb-5 border-red-500" : "mb-5"}
              placeholder="Phone Number"
              onChange={(e) => setPhonenumber(e.target.value)}
            />
            <div className="relative">
              <InputComponent
                id={"pw"}
                type={showPassword ? "text" : "password"}
                className={error && !password ? "mb-5 border-red-500" : "mb-5"}
                placeholder="Password"
                onChange={handleInputPassword}
                // onBlur={handleBlur}
                onFocus={handleFocus}
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
            {isFocused && (
              <div className="-mt-3 mb-3 space-y-1 transition-all ease-in-out">
                <p className="text-xs md:text-sm">Password must containts</p>
                <li
                  className={
                    validateLength
                      ? "text-red-500 text-xs md:text-sm"
                      : "text-green-500 text-xs md:text-sm"
                  }
                >
                  At least 8 characters{" "}
                </li>
                <li
                  className={
                    validateUppercase
                      ? "text-red-500 text-xs md:text-sm"
                      : "text-green-500 text-xs md:text-sm"
                  }
                >
                  At least 1 uppercase letter
                </li>
                <li
                  className={
                    validateChar
                      ? "text-red-500 text-xs md:text-sm"
                      : "text-green-500 text-xs md:text-sm"
                  }
                >
                  At least 1 number or special character
                </li>
              </div>
            )}

            <ButtonComponent
              onClick={handleRegister}
              type="submit"
              className="w-full tracking-widest mb-2"
            >
              {loading ? <LoadingOutlined /> : "Register"}
            </ButtonComponent>
          </form>

          <div className="text-center">
            <Link
              to="/"
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
  );
};

// const mapStateToProps = (state) => ({
//   todos: state.todos,
// });

// const mapDispatchToProps = {
//   addTodo,
//   deleteTodo,
// };

// export default connect(mapStateToProps, mapDispatchToProps)(Register);
export default Register;
