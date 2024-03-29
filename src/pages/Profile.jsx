import React, { useEffect, useRef, useState } from "react";
import Layout from "./layout/Index";
import useLocalStorage from "../hooks/useLocalStorage";
import ButtonComponent from "../components/Button";
import Swal from "sweetalert2";
import { IoSettingsSharp } from "react-icons/io5";
import { Link } from "react-router-dom";
import InputComponent from "../components/Input";
import Avatar from "../assets/avatar.png";
import CommentsComponent from "../components/Comments";
import { Modal, Spin, Tour } from "antd";
import OrderDetail from "../components/OrderDetail";
import { useMediaQuery } from "react-responsive";

export default function Profile() {
  const [username, setUsername] = useLocalStorage("username");
  const [Location, setLocation] = useState("");
  const [comments, setComments] = useState([]);
  const [showComments, setShowComments] = useState(false);
  const [showOrders, setShowOrders] = useState(false);

  const [loading, setLoading] = useState(false);
  const [activeComment, setActiveComment] = useState(false);
  const [activeOrder, setActiveOrder] = useState(false);
  const [theme, setTheme] = useLocalStorage("theme");

  useEffect(() => {
    const getComments = () => {
      fetch("https://dummyjson.com/comments")
        .then((res) => res.json())
        .then((res) => setComments(res.comments));
    };
    getComments();
  }, []);

  const handleComments = () => {
    setLoading(true);
    setActiveOrder(false);
    setActiveComment(true);
    setTimeout(() => {
      setShowOrders(false);
      setShowComments(true);
      setLoading(false);
    }, 1000);
  };
  const handleOrders = () => {
    setLoading(true);
    setActiveComment(false);
    setActiveOrder(true);
    setTimeout(() => {
      setShowComments(false);
      setShowOrders(true);
      setLoading(false);
    }, 1000);
  };

  const [open, setOpen] = useState(false);

  const ref1 = useRef(null);
  const ref2 = useRef(null);
  const ref3 = useRef(null);

  const [isOpen, setIsOpen] = useState(false);
  const steps = [
    {
      title: "Info",
      description: "You can see your order history.",
      nextButtonProps: {
        children: <p>Next</p>,
        style: {
          // backgroundColor: "rgb(99 102 241 / 1)",
          backgroundColor: "#1890ff",
        },
      },
      target: () => ref1.current,
    },
    {
      title: "Info",
      description: "You can see comments on your store.",
      nextButtonProps: {
        style: {
          backgroundColor: "#1890ff",
        },
        //onClick: () => setTour(true), // insert to database for flagging
      },
      target: () => ref2.current,
    },
    {
      title: "Info",
      description: "You can setting the website.",
      nextButtonProps: {
        style: {
          backgroundColor: "#1890ff",
        },
      },
      target: () => ref3.current,
    },
  ];

  const isDesktopScreen = useMediaQuery({
    query: "(min-width: 1224px)",
  });

  if (isDesktopScreen) {
    useEffect(() => {
      setIsOpen(true);
    }, []);
  }

  return (
    <Layout
      className={theme === "dark" ? "bg-gray-800 text-gray-300 !p-0" : "!p-0"}
    >
      <main className="profile-page">
        <section className="relative block h-96 md:h-[500px]">
          <div
            className="absolute top-0 w-full h-full bg-center bg-cover"
            style={{
              backgroundImage: `url('https://images.unsplash.com/photo-1562705859-72842cf88fd1?q=80&w=1633&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')`,
            }}
          >
            <span
              id="blackOverlay"
              className="w-full h-full absolute opacity-50 bg-black"
            ></span>
          </div>
          <div
            className="top-auto bottom-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden h-[70px]"
            style={{ transform: "translateZ(0)" }}
          ></div>
        </section>
        <section className="relative py-16">
          <div className="container mx-auto px-4">
            <div
              className={
                theme === "dark"
                  ? "relative flex flex-col min-w-0 break-words bg-gray-800 w-full mb-6 shadow-xl rounded-lg -mt-64"
                  : "relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg -mt-64"
              }
            >
              <div className="px-6">
                <div className="flex flex-wrap justify-center">
                  <div className="w-full lg:w-3/12 px-4 lg:order-2 flex justify-center">
                    <div className="relative">
                      <img
                        alt="Profile"
                        // src="https://demos.creative-tim.com/notus-js/assets/img/team-2-800x800.jpg"
                        src={Avatar}
                        className=" h-auto align-middle border-none absolute -m-16 -ml-20 lg:-ml-16 max-w-[150px]"
                        // shadow-xl rounded-full
                      />
                    </div>
                  </div>
                  <div className="w-full lg:w-4/12 px-4 lg:order-3 lg:text-right lg:self-center">
                    <div className="py-6 px-3 mt-24 sm:mt-0 flex items-center gap-x-5">
                      <ButtonComponent
                        className="bg-indigo-500 w-full md:w-40 active:bg-indigo-600 uppercase text-white font-bold hover:shadow-md shadow text-xs px-4 py-2 rounded outline-none focus:outline-none sm:mr-2 mb-1 ease-linear transition-all duration-150"
                        type="button"
                        onClick={() =>
                          Swal.fire({
                            icon: "success",
                            text: "Profile Updated",
                          })
                        }
                      >
                        Update Profile
                      </ButtonComponent>
                      <Link
                        ref={ref3}
                        to="/setting"
                        className="hidden md:block"
                      >
                        <IoSettingsSharp />
                      </Link>
                    </div>
                  </div>
                  <div className="w-full lg:w-4/12 px-4 lg:order-1">
                    <div className="flex justify-center py-4 lg:pt-4 gap-3">
                      <div
                        ref={ref1}
                        className="text-center min-w-20 hover:cursor-pointer"
                        onClick={handleOrders}
                      >
                        <span
                          className={
                            activeOrder
                              ? "text-xl font-bold block uppercase tracking-wide text-indigo-500"
                              : "text-xl font-bold block uppercase tracking-wide text-gray-600"
                          }
                        >
                          22
                        </span>
                        <span
                          className={
                            activeOrder
                              ? "text-sm text-indigo-300"
                              : "text-sm text-gray-400"
                          }
                        >
                          Orders
                        </span>
                      </div>
                      <div className="text-center min-w-20">
                        <span className="text-xl font-bold block uppercase tracking-wide text-gray-600">
                          10
                        </span>
                        <span className="text-sm text-gray-400">Photos</span>
                      </div>
                      <div
                        ref={ref2}
                        className="text-center min-w-20 hover:cursor-pointer"
                        onClick={handleComments}
                      >
                        <span
                          className={
                            activeComment
                              ? "text-xl font-bold block uppercase tracking-wide text-indigo-500"
                              : "text-xl font-bold block uppercase tracking-wide text-gray-600"
                          }
                        >
                          89
                        </span>
                        <span
                          className={
                            activeComment
                              ? "text-sm text-indigo-300"
                              : "text-sm text-gray-400"
                          }
                        >
                          Comments
                        </span>
                      </div>
                    </div>

                    <Tour
                      onFinish={() => setIsOpen(false)}
                      open={isOpen}
                      onClose={() => setIsOpen(false)}
                      steps={steps}
                      placement="bottomRight"
                    />
                  </div>
                </div>

                <div className="md:mt-4 pb-6">
                  <div className="mb-2">
                    <InputComponent
                      type={"text"}
                      placeholder={username}
                      className={"text-center bg-gray-100 capitalize  "}
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                    />
                  </div>
                  <div className="mb-2">
                    <InputComponent
                      type={"text"}
                      placeholder={"Location"}
                      className={"text-center bg-gray-100 capitalize  "}
                      value={Location}
                      onChange={(e) => setLocation(e.target.value)}
                    />
                  </div>
                  <div className=" text-gray-600 mb-2">
                    <InputComponent
                      type={"text"}
                      placeholder={"Store Name"}
                      className={"text-center bg-gray-100 capitalize  "}
                    />
                  </div>
                  <div className="mb-2 text-gray-600">
                    <InputComponent
                      type={"text"}
                      placeholder={"Phone Number"}
                      className={"text-center bg-gray-100 capitalize "}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Comments */}
          {loading && <Spin className="flex justify-center" />}
          <div className="container mx-auto px-4 ">
            {showComments && (
              <>
                <div>
                  <h1 className="mb-5">Comments</h1>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                  {comments.map((comment, index) => (
                    <div key={comment.id}>
                      <CommentsComponent
                        bodyComment={comment.body}
                        fullname={comment.user.username}
                      />
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>

          {/* Orders */}
          <div className="container mx-auto px-4 ">
            {showOrders && (
              <>
                <div>
                  <h1 className="mb-5">Orders</h1>
                </div>
                <div className="grid grid-cols-3 md:grid-cols-6 gap-5">
                  {comments.map((comment, index) => (
                    <div key={comment.id}>
                      <div
                        className="w-full  dark:text-white dark:bg-gray-800 bg-white text-gray-800 text-center px-5 py-3 md:py-5 shadow-md rounded-md cursor-pointer "
                        onClick={() => setOpen(true)}
                      >
                        <h1 className="text-sm  dark:text-white dark:bg-gray-800 font-semibold  text-gray-800">
                          Ticket ID #13{comment.id}52
                        </h1>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
          <Modal
            centered
            okText="Ok"
            cancelButtonProps={{ style: { display: "none" } }}
            okButtonProps={{ style: { display: "none" } }}
            open={open}
            onOk={() => setOpen(false)}
            onCancel={() => setOpen(false)}
            width={1200}
          >
            <OrderDetail />
          </Modal>
        </section>
      </main>
    </Layout>
  );
}
