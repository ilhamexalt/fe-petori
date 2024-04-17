import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import useLocalStorage from "../hooks/useLocalStorage";
import { verification } from "../services/service";

export default function Verification() {
  const urlLocation = useLocation();
  const [fullname, setFullname] = useLocalStorage("fullName", []);
  const [isRole, setIsRole] = useLocalStorage("isRole", []);
  const [isLogin, setIsLogin] = useLocalStorage("isLoggedIn", []);
  const [isToken, setIsToken] = useLocalStorage("isToken", []);
  const [id, setId] = useLocalStorage("id", []);
  const [otp, setOtp] = useState(new Array(4).fill(""));
  const otpBoxReference = useRef([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isToken.length > 0 && !isRole.length > 0) {
      return navigate("/");
    }
  }, []);

  function handleChange(value, index) {
    let newArr = [...otp];
    newArr[index] = value;
    setOtp(newArr);

    if (value && index < 4 - 1) {
      otpBoxReference.current[index + 1].focus();
    }
  }

  function handleBackspaceAndEnter(e, index) {
    if (e.key === "Backspace" && !e.target.value && index > 0) {
      otpBoxReference.current[index - 1].focus();
    }
    if (e.key === "Enter" && e.target.value && index < 4 - 1) {
      otpBoxReference.current[index + 1].focus();
    }
  }

  const handleVerifyAccount = async (e) => {
    e.preventDefault();
    let id = urlLocation.state.id;
    const otpParse = otp[0] + otp[1] + otp[2] + otp[3];

    if (urlLocation.pathname === "/verification/reset-password") {
      Swal.fire({
        icon: "info",
        title: "Change your password",
        text: `Please enter new your password`,
        showCancelButton: false,
        confirmButtonText: "SUBMIT",
        showLoaderOnConfirm: true,
        input: "password",
        inputAttributes: {
          autocapitalize: "off",
        },
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
        preConfirm: async (newPassword) => {
          try {
            if (newPassword === "")
              return Swal.showValidationMessage("Cannot be empty");

            //post data
            const response = await fetch(
              "https://petori-service.my.id/ChangePassword",
              {
                method: "PATCH",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  phoneNumber: urlLocation.state,
                  password: newPassword,
                  otp: otpParse,
                }),
              }
            );
            if (!response.ok) {
              Swal.showValidationMessage(
                `Request failed: ${response.statusText}`
              );
            } else {
              Swal.fire({
                icon: "success",
                title: "Password changed successfully!",
                text: "You can now login with your new password.",
                timer: 1000,
                timerProgressBar: true,
                showConfirmButton: false,
              }).then(() => {
                navigate("/");
              });
            }
          } catch (error) {
            Swal.showValidationMessage(`
              Request failed: ${error}
            `);
          }
        },
      });
    } else {
      const response = await verification({
        id,
        otp: otpParse,
      });

      const data = await response.json();
      if (response.ok) {
        Swal.fire({
          icon: "success",
          title: "Success",
          text: data.message,
          timer: 1000,
          showConfirmButton: false,
        });
        setFullname(data.data.fullname);
        setIsRole(data.data.isRole);
        setIsToken(data.token);
        setIsLogin(true);
        setId(data.data.id);
        setTimeout(() => {
          navigate("/dashboard");
        }, 1500);
        clearTimeout();
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: data.message,
        });
      }
    }
  };

  const resendOtp = async () => {
    const response = await fetch(
      `https://petori-service.my.id/ResendOTP?phoneNumber=${urlLocation.state.phoneNumber}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (response.ok) {
      const data = await response.json();
      Swal.fire({
        icon: "success",
        title: "Success",
        text: data.message,
        timer: 1000,
        showConfirmButton: false,
      });
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: response.statusText,
      });
    }
  };

  return (
    <div className="relative font-inter antialiased">
      <main className="relative min-h-screen flex flex-col justify-center bg-slate-50 overflow-hidden">
        <div className="w-full max-w-6xl mx-auto px-4 md:px-6 py-24">
          <div className="flex justify-center">
            <div className="max-w-md mx-auto text-center bg-white px-4 sm:px-8 py-10 rounded-xl shadow">
              <header className="mb-8">
                <h1 className="text-2xl font-bold mb-1">
                  Mobile Phone Verification
                </h1>
                <p className="text-[15px] text-slate-500">
                  Enter the 4-digit verification code that was sent to your
                  phone number.
                </p>
              </header>
              <form id="otp-form" onSubmit={handleVerifyAccount}>
                <div className="flex items-center justify-center gap-3">
                  {otp.map((digit, index) => (
                    <input
                      key={index}
                      value={digit}
                      maxLength={1}
                      onChange={(e) => handleChange(e.target.value, index)}
                      onKeyUp={(e) => handleBackspaceAndEnter(e, index)}
                      ref={(reference) =>
                        (otpBoxReference.current[index] = reference)
                      }
                      type="text"
                      pattern="[0-9]+"
                      className="w-14 h-14 text-center text-2xl font-extrabold text-slate-900 bg-slate-100 border border-transparent hover:border-slate-200 appearance-none rounded p-4 outline-none focus:bg-white focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
                      required
                    />
                  ))}
                </div>
                <div className="max-w-[260px] mx-auto mt-4">
                  <button
                    // cursor-not-allowed
                    type="submit"
                    className=" w-full inline-flex justify-center whitespace-nowrap rounded-lg bg-indigo-500 px-3.5 py-2.5 text-sm font-medium text-white shadow-sm shadow-indigo-950/10 hover:bg-indigo-600 focus:outline-none focus:ring focus:ring-indigo-300 focus-visible:outline-none focus-visible:ring focus-visible:ring-indigo-300 transition-colors duration-150"
                  >
                    Verify Account
                  </button>
                </div>
              </form>
              <div className="text-sm text-slate-500 mt-4">
                Didn't receive code?{" "}
                <button
                  className="font-medium text-indigo-500 hover:text-indigo-600"
                  onClick={resendOtp}
                >
                  Resend
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
