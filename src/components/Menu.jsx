import Swal from "sweetalert2";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import Dog from "../assets/dog.gif";
import { Drawer, Tour } from "antd";
import { useRef, useState } from "react";
import { MdClose, MdDashboard, MdLogout } from "react-icons/md";
import { GrOrganization } from "react-icons/gr";
import { FaRegMoneyBill1 } from "react-icons/fa6";
import { IoSettingsOutline } from "react-icons/io5";
import ButtonComponent from "./Button";
import useLocalStorage from "../hooks/useLocalStorage";
import Avatar from "../assets/avatar.png";
import { useMediaQuery } from "react-responsive";
import CryptoJS from "crypto-js";

export default function MenuComponet() {
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const [fullname, setFullname] = useLocalStorage("fullName");
  // const decrypted = CryptoJS.AES.decrypt(fullname, "p3t0r1p3t0r1").toString(
  //   CryptoJS.enc.Utf8
  // );
  // console.log("This : ", decrypted);

  const [isToken, setToken] = useLocalStorage("isToken");

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  const handleLogout = () => {
    Swal.fire({
      icon: "info",
      text: "Are you sure want to log out?",
      confirmButtonText: "Yes",
      showCancelButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem("fullName");
        localStorage.removeItem("isLoggedIn");
        localStorage.removeItem("isToken");
        localStorage.removeItem("isRole");
        localStorage.removeItem("id");
        Swal.fire({
          icon: "success",
          title: "Success",
          text: "Successfully logged out.",
          timer: 1000,
          showConfirmButton: false,
        });
        setTimeout(() => {
          clearTimeout();
          return navigate("/");
        }, 1000);
      }
    });
  };

  const ref1 = useRef(null);
  const ref2 = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const steps = [
    {
      title: "Info",
      description: "You can see your the store here.",
      nextButtonProps: {
        children: <p>Next</p>,
        style: {
          backgroundColor: "#1890ff",
        },
      },
      target: () => ref1.current,
    },
    {
      title: "Info",
      description: "You can see your the profile here.",
      nextButtonProps: {
        style: {
          backgroundColor: "#1890ff",
        },
        // onClick: () => handleUpdateIsTour(), // insert to database for flagging
      },
      target: () => ref2.current,
    },
  ];

  const handleUpdateIsTour = async () => {
    const response = await fetch(`https://petori-service.my.id/CompleteTour`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${isToken}`,
      },
    });
  };

  const isDesktopScreen = useMediaQuery({
    query: "(min-width: 1224px)",
  });

  // if (location.pathname === "/dashboard") {
  //   if (!isDesktopScreen)
  //     //&& location.state.isTour === 0
  //     useEffect(() => {
  //       setIsOpen(true);
  //     }, []);
  // }

  return (
    <>
      {/* Desktop Screen */}
      <div className="flex items-center gap-10">
        <Link
          to={"/dashboard"}
          className="text-gray-800 font-bold items-center hidden md:block"
        >
          <img src={Dog} alt={"loading"} width={80} />
        </Link>
        <Link
          to={"/profile"}
          className="font-semibold capitalize block md:hidden"
        >
          <div className="flex items-center gap-4">
            <img
              className="rounded-full object-contain ring-2 ring-indigo-500 hover:ring-pink-500 p-1 w-10 h-10"
              src={Avatar}
              alt="Profile"
            />
            <div className="font-medium text-sm md:text-base ">
              Hi, <span className="font-bold ">{fullname}</span>
              <div className="text-xs md:text-sm text-gray-500 ">
                {fullname === "Super Admin" ? "Super Admin" : "Owner"}
              </div>
            </div>
          </div>
        </Link>
        {fullname === "Super Admin" && (
          <NavLink
            to={"/user"}
            className={({ isActive }) => {
              return isActive
                ? `text-white font-semibold text-base bg-indigo-500 rounded-lg pr-5 pl-5 pt-1 pb-1 hidden md:block`
                : `text-gray-800  font-semibold text-base pr-5 pl-5 pt-1 pb-1 duration-100 ease-in-out hidden md:block`;
            }}
          >
            Users
          </NavLink>
        )}

        <NavLink
          ref={ref1}
          to={"/store"}
          className={({ isActive }) => {
            return isActive
              ? `text-white font-semibold text-base bg-indigo-500 rounded-lg pr-5 pl-5 pt-1 pb-1 hidden md:block`
              : `text-gray-800  font-semibold text-base  pr-5 pl-5 pt-1 pb-1 duration-100 ease-in-out hidden md:block`;
          }}
        >
          {fullname === "Super Admin" ? "Stores" : "My Store"}
        </NavLink>

        {/* <NavLink
          // ref={ref1}
          to={"/service"}
          className={({ isActive }) => {
            return isActive
              ? `text-white font-semibold text-base bg-indigo-500 rounded-lg pr-5 pl-5 pt-1 pb-1 hidden md:block`
              : `text-gray-800  font-semibold text-base  pr-5 pl-5 pt-1 pb-1 duration-100 ease-in-out hidden md:block`;
          }}
        >
          {fullname === "Super Admin" ? "Services" : "My Services"}
        </NavLink> */}

        <Tour
          onFinish={() => setIsOpen(false)}
          open={isOpen}
          onClose={() => setIsOpen(false)}
          steps={steps}
          placement="bottomRight"
        />
      </div>
      <div className="hidden md:block ">
        <div className="flex items-center gap-5">
          <div className="flex items-center gap-4 font-semibold capitalize">
            <Link to={"/profile"} ref={ref2}>
              <img
                className="rounded-full object-contain ring-2 ring-indigo-500 hover:ring-pink-500 p-1 w-10 h-10"
                src={Avatar}
                alt="Profile"
              />
            </Link>
            <div className="font-medium ">
              Hi, <span className="font-bold">{fullname}</span>
              <div className="text-sm text-gray-500 ">
                {fullname === "Super Admin" ? "Super Admin" : "Owner"}
              </div>
            </div>
          </div>

          <ButtonComponent
            onClick={handleLogout}
            className=" text-white h-8 w-8 flex items-center justify-center !bg-gray-500 hover:!ring-gray-500"
          >
            <MdLogout />
          </ButtonComponent>
        </div>
      </div>
      {/* End */}

      {/* Mobile Screen */}
      <ButtonComponent
        onClick={showDrawer}
        className="bg-indigo-500 md:hidden h-10 w-[60px] flex items-center justify-center hover:ring-indigo-500"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
          />
        </svg>
      </ButtonComponent>

      <Drawer
        closeIcon={<MdClose />}
        placement="right"
        width={500}
        onClose={onClose}
        open={open}
        // style={}
      >
        <div className="-mt-5">
          <NavLink
            to="/dashboard"
            className={({ isActive }) => {
              return isActive
                ? "text-body font-bold flex items-center gap-3 py-3 cursor-pointer text-indigo-500 hover:text-indigo-500 text-sm transition-all duration-300"
                : `text-body font-bold flex items-center gap-3 py-3 cursor-pointer hover:text-indigo-500 text-sm transition-all duration-300`;
            }}
          >
            <MdDashboard /> Dashboard
          </NavLink>
        </div>
        {fullname === "Super Admin" && (
          <div>
            <NavLink
              to="/user"
              className={({ isActive }) => {
                return isActive
                  ? "text-body font-bold flex items-center gap-3 py-3 cursor-pointer text-indigo-500 hover:text-indigo-500 text-sm transition-all duration-300"
                  : `text-body font-bold flex items-center gap-3 py-3 cursor-pointer hover:text-indigo-500 text-sm transition-all duration-300`;
              }}
            >
              <GrOrganization /> Users
            </NavLink>
          </div>
        )}

        <div>
          <NavLink
            to="/store"
            className={({ isActive }) => {
              return isActive
                ? "text-body font-bold flex items-center gap-3 py-3 cursor-pointer text-indigo-500 hover:text-indigo-500 text-sm transition-all duration-300"
                : `text-body font-bold flex items-center gap-3 py-3 cursor-pointer hover:text-indigo-500 text-sm transition-all duration-300`;
            }}
          >
            <FaRegMoneyBill1 />{" "}
            {fullname === "Super Admin" ? "Stores" : "My Store"}
          </NavLink>
        </div>

        {/* <div>
          <NavLink
            to="/service"
            className={({ isActive }) => {
              return isActive
                ? "text-body font-bold flex items-center gap-3 py-3 cursor-pointer text-indigo-500 hover:text-indigo-500 text-sm transition-all duration-300"
                : `text-body font-bold flex items-center gap-3 py-3 cursor-pointer hover:text-indigo-500 text-sm transition-all duration-300`;
            }}
          >
            <GrServices /> Service
          </NavLink>
        </div> */}
        {/* <div>
          <NavLink
            to="/setting"
            className={({ isActive }) => {
              return isActive
                ? "text-body font-bold flex items-center gap-3 py-3 cursor-pointer text-indigo-500 hover:text-indigo-500 text-sm transition-all duration-300"
                : `text-body font-bold flex items-center gap-3 py-3 cursor-pointer hover:text-indigo-500 text-sm transition-all duration-300`;
            }}
          >
            <IoSettingsOutline /> Setting
          </NavLink>
        </div> */}

        <div>
          <Link
            onClick={handleLogout}
            className="text-body font-bold flex items-center gap-3  py-3 cursor-pointer  hover:text-indigo-500"
          >
            <MdLogout /> Logout
          </Link>
        </div>
      </Drawer>
      {/* End */}
    </>
  );
}
