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

export default function MenuComponet() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const [username, setUsername] = useLocalStorage("username");

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
      <div className="flex items-center gap-10">
        <Link
          to={"/dashboard"}
          className="text-gray-800 font-bold items-center"
        >
          <img src={Dog} alt={"loading"} width={80} />
        </Link>
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
        <NavLink
          to={"/store"}
          className={({ isActive }) => {
            return isActive
              ? "text-white font-semibold text-base bg-indigo-500 rounded-lg pr-5 pl-5 pt-1 pb-1 hidden md:block"
              : `text-gray-800 font-semibold text-base  pr-5 pl-5 pt-1 pb-1 duration-100 ease-in-out hidden md:block`;
          }}
        >
          Stores
        </NavLink>
      </div>
      <div className="hidden md:block">
        <div className="flex items-center gap-5">
          <h1 className="font-semibold capitalize">Hi, {username} </h1>
          <ButtonComponent
            onClick={handleLogout}
            className="bg-blue-500 text-white h-8 w-8 flex items-center justify-center hover:ring-blue-500"
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
        title={`Hi, ${username}`}
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
        <div>
          <Link
            to="/user"
            className="text-body font-bold flex items-center gap-3  py-3 cursor-pointer   hover:text-indigo-500 text-sm transition-all duration-300"
          >
            <GrOrganization /> Users
          </Link>
        </div>
        <div>
          <Link
            to="/store"
            className="text-body font-bold flex items-center gap-3  py-3 cursor-pointer   hover:text-indigo-500 text-sm transition-all duration-300"
          >
            <FaRegMoneyBill1 /> Stores
          </Link>
        </div>

        <div>
          <Link
            onClick={() => {
              Swal.fire({
                title: "Coming soon!",
                icon: "info",
              });
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
