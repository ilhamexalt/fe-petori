import Swal from "sweetalert2";
import { Link, NavLink, useNavigate } from "react-router-dom";
import Dog from "../assets/dog.gif";
import { Drawer } from "antd";
import { useState } from "react";
import { MdDashboard, MdLogout } from "react-icons/md";
import { GrOrganization } from "react-icons/gr";
import { FaRegMoneyBill1 } from "react-icons/fa6";
import { IoSettingsOutline } from "react-icons/io5";
import ButtonComponent from "./Button";
import useLocalStorage from "../hooks/useLocalStorage";
import Avatar from "../assets/avatar.png";

export default function MenuComponet() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const [username, setUsername] = useLocalStorage("username");
  const [theme, setTheme] = useLocalStorage("theme");

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
        localStorage.removeItem("username");
        return navigate("/");
      }
    });
  };

  return (
    <>
      {/* Desktop Screen */}
      <div className={`flex items-center gap-10`}>
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
            <div className="font-medium text-sm md:text-base">
              Hi, <span className="font-bold ">{username}</span>
              <div className="text-xs md:text-sm text-gray-500 dark:text-gray-400">
                {username === "admin" ? "Admin" : "Owner"}
              </div>
            </div>
          </div>
        </Link>
        {username === "admin" && (
          <NavLink
            to={"/user"}
            className={({ isActive }) => {
              return isActive
                ? "text-white font-semibold text-base bg-indigo-500 rounded-lg pr-5 pl-5 pt-1 pb-1 hidden md:block"
                : `text-gray-800 font-semibold text-base pr-5 pl-5 pt-1 pb-1 duration-100 ease-in-out hidden md:block`;
            }}
          >
            Users
          </NavLink>
        )}

        <NavLink
          to={"/store"}
          className={({ isActive }) => {
            return isActive
              ? "text-white font-semibold text-base bg-indigo-500 rounded-lg pr-5 pl-5 pt-1 pb-1 hidden md:block"
              : `text-gray-800 font-semibold text-base  pr-5 pl-5 pt-1 pb-1 duration-100 ease-in-out hidden md:block`;
          }}
        >
          {username === "admin" ? "Stores" : "My Store"}
        </NavLink>
      </div>
      <div className="hidden md:block ">
        <div className="flex items-center gap-5">
          <div className="flex items-center gap-4 font-semibold capitalize">
            <Link to={"/profile"}>
              <img
                className="rounded-full object-contain ring-2 ring-indigo-500 hover:ring-pink-500 p-1 w-10 h-10"
                src={Avatar}
                alt="Profile"
              />
            </Link>
            <div className="font-medium dark:text-white">
              Hi, <span className="font-bold">{username}</span>
              <div className="text-sm text-gray-500 dark:text-gray-400">
                {username === "admin" ? "Admin" : "Owner"}
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
        title="Petori App"
        placement="right"
        width={500}
        onClose={onClose}
        open={open}
        style={{ fontWeight: "bold" }}
      >
        <div>
          <Link
            to="/dashboard"
            className="text-body font-bold flex items-center gap-3 py-3 cursor-pointer hover:text-indigo-500 text-sm transition-all duration-300"
          >
            <MdDashboard /> Dashboard
          </Link>
        </div>
        {username === "admin" && (
          <div>
            <Link
              to="/user"
              className="text-body font-bold flex items-center gap-3  py-3 cursor-pointer   hover:text-indigo-500 text-sm transition-all duration-300"
            >
              <GrOrganization /> Users
            </Link>
          </div>
        )}

        <div>
          <Link
            to="/store"
            className="text-body font-bold flex items-center gap-3  py-3 cursor-pointer   hover:text-indigo-500 text-sm transition-all duration-300"
          >
            <FaRegMoneyBill1 /> {username === "admin" ? "Stores" : "My Store"}
          </Link>
        </div>

        <div>
          <Link
            onClick={() => {
              navigate("/setting");
            }}
            className="text-body font-bold flex items-center gap-3  py-3 cursor-pointer   hover:text-indigo-500 text-sm transition-all duration-300"
          >
            <IoSettingsOutline /> Setting
          </Link>
        </div>

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
