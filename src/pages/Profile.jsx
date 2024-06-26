import React, { useEffect, useRef, useState } from "react";
import Layout from "./layout/Index";
import useLocalStorage from "../hooks/useLocalStorage";
import ButtonComponent from "../components/Button";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import InputComponent from "../components/Input";
import Avatar from "../assets/avatar.png";
import CommentsComponent from "../components/Comments";
import { Modal, Spin, Tour } from "antd";
import OrderDetail from "../components/OrderDetail";
import { useMediaQuery } from "react-responsive";
import { useUserQuery } from "../hooks/useUserQuery";
import Cat from "../assets/cat-run.gif";
import { useOrdersQuery } from "../hooks/useOrdersQuery";
import { getOrderHistoryById } from "../services/service";
import OrderHistoryComponent from "../components/OrderHistory";

export default function Profile() {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useLocalStorage("isLoggedIn");
  const [isToken, setIsToken] = useLocalStorage("isToken");
  const [isRole, setIsRole] = useLocalStorage("isRole");
  const [id, setId] = useLocalStorage("id");
  const [address, setAddress] = useState("");
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [comments, setComments] = useState([]);
  const [showComments, setShowComments] = useState(false);
  const [showOrders, setShowOrders] = useState(false);
  const [loading, setLoading] = useState(false);
  const [activeComment, setActiveComment] = useState(false);
  const [activeOrder, setActiveOrder] = useState(false);
  const [openForm, setOpenForm] = useState(false);
  const [open, setOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [detailOrder, setDetailOrder] = useState("");

  const ref1 = useRef(null);
  const ref2 = useRef(null);
  const ref3 = useRef(null);

  const { data, isLoading } = useUserQuery(id, isToken);
  const { data: orders } = useOrdersQuery(isToken, id, 1, 10);

  const handleOpenForm = () => {
    if (openForm) {
      setOpenForm(false);
    } else {
      setOpenForm(true);
    }

    setFullname(data.fullname);
    setAddress(data.address);
    setEmail(data.email);
    setPhoneNumber(data.phoneNumber);
    setPassword(data.password);
  };

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

  const handleUpdateProfile = async () => {
    const response = await fetch(`https://petori-service.my.id/Users/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${isToken}`,
      },
      body: JSON.stringify({
        fullname: fullname,
        address: address,
        phoneNumber: phoneNumber,
        email: email,
        password: password,
      }),
    });

    if (response.ok) {
      Swal.fire({
        icon: "success",
        title: "Success",
        text: "Profile updated successfully!",
        timer: 1000,
        showConfirmButton: false,
      });
      setOpenForm(false);
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: response.statusText,
        timer: 1000,
        showConfirmButton: false,
      });
    }
  };

  const handleDetailOrder = async (order) => {
    const invoice = order;
    const data = await getOrderHistoryById(isToken, invoice);
    setDetailOrder(data);
    setOpen(true);
  };

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

  if (isLoading)
    return (
      <div className="flex justify-center items-center min-h-screen bg-white ">
        <img src={Cat} alt={"loading"} width={300} />
      </div>
    );

  if (
    (isLogin === undefined || isLogin.length === 0) &&
    (isToken === undefined || isToken.length === 0) &&
    data === undefined
  ) {
    Swal.fire({
      icon: "error",
      title: "Error",
      text: "Session expired. Please login again",
      timer: 2000,
      showConfirmButton: false,
    });
    return navigate("/");
  }

  return (
    <Layout className={"!p-0"}>
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
                "relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg -mt-64"
              }
            >
              <div className="px-6">
                <div className="flex flex-wrap justify-center">
                  <div className="w-full lg:w-3/12 px-4 lg:order-2 flex justify-center">
                    <div className="relative">
                      <img
                        alt="Profile"
                        src={Avatar}
                        className=" h-auto align-middle border-none absolute -m-16 -ml-20 lg:-ml-16 max-w-[150px]"
                      />
                    </div>
                  </div>
                  <div className="w-full lg:w-4/12 px-4 lg:order-3 lg:text-right lg:self-center">
                    <div className="md:py-6 py-3 px-3 mt-24 sm:mt-0 flex items-center gap-x-5">
                      {openForm ? (
                        <button
                          onClick={handleOpenForm}
                          className=" w-full md:w-40 flex justify-center font-bold hover:shadow-md  items-center uppercase text-xs  gap-1 h-8 text-white bg-gray-500 shadow-sm rounded-md ease-linear transition-all duration-150"
                        >
                          Cancel
                        </button>
                      ) : (
                        <ButtonComponent
                          className="!bg-white w-full md:w-40  uppercase text-white font-bold hover:shadow-md shadow text-xs px-4 py-2  sm:mr-2 mb-1 ease-linear transition-all duration-150"
                          type="button"
                          onClick={handleOpenForm}
                        >
                          UPDATE PROFILE
                        </ButtonComponent>
                      )}

                      {/* <Link
                        ref={ref3}
                        to="/setting"
                        className="hidden md:block"
                      >
                        <IoSettingsSharp />
                      </Link> */}
                    </div>
                  </div>

                  {isRole !== "Super Admin" ? (
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
                  ) : (
                    <div className="w-full lg:w-4/12 px-4 lg:order-1">
                      <div className="flex justify-center py-4 lg:pt-4 gap-3"></div>
                    </div>
                  )}

                  <Tour
                    onFinish={() => setIsOpen(false)}
                    open={isOpen}
                    onClose={() => setIsOpen(false)}
                    steps={steps}
                    placement="bottomRight"
                  />
                </div>

                {/* FORM */}
                {openForm ? (
                  <div className="md:mt-4 mt-0 pb-6">
                    <div className="mb-2">
                      <InputComponent
                        autoFocus
                        id="fullname"
                        disabled={openForm ? false : true}
                        type={"text"}
                        placeholder={"Full Name"}
                        className={`text-center  bg-gray-100 capitalize px-2 ${
                          openForm ? "" : "cursor-not-allowed"
                        } `}
                        value={fullname}
                        onChange={(e) => setFullname(e.target.value)}
                      />
                    </div>
                    <div className="mb-2">
                      <InputComponent
                        disabled={openForm ? false : true}
                        type={"text"}
                        placeholder={
                          "Format : Province, City, District, Village, Street"
                        }
                        className={`text-center bg-gray-100 capitalize ${
                          openForm ? "" : "cursor-not-allowed"
                        } `}
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                      />
                    </div>
                    <div className=" text-gray-600 mb-2">
                      <InputComponent
                        disabled={openForm ? false : true}
                        type={"email"}
                        placeholder={"Email"}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className={`text-center bg-gray-100 lowercase ${
                          openForm ? "" : "cursor-not-allowed"
                        } `}
                      />
                    </div>
                    <div className="mb-2 text-gray-600">
                      <InputComponent
                        disabled={openForm ? false : true}
                        type={"text"}
                        placeholder={"Phone Number"}
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        className={`text-center bg-gray-100 capitalize ${
                          openForm ? "" : "cursor-not-allowed"
                        } `}
                      />
                    </div>
                    <div className="mb-2 text-gray-600">
                      <InputComponent
                        disabled={openForm ? false : true}
                        type={"password"}
                        placeholder={"Password"}
                        // value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className={`text-center bg-gray-100 capitalize ${
                          openForm ? "" : "cursor-not-allowed"
                        } `}
                      />
                    </div>
                    <ButtonComponent
                      disabled={openForm ? false : true}
                      onClick={handleUpdateProfile}
                      className={`w-full uppercase text-sm font-semibold ${
                        openForm ? "cursor-pointer" : "cursor-not-allowed"
                      }`}
                    >
                      SAVE
                    </ButtonComponent>
                  </div>
                ) : (
                  <div className="md:mt-4 mt-0 pb-6 space-y-2 text-xs md:text-sm">
                    <div className="text-center uppercase">
                      {" "}
                      {data?.fullname}
                    </div>
                    <div className="text-center uppercase">
                      {" "}
                      {data?.address}
                    </div>
                    <div className="text-center uppercase"> {data?.email}</div>
                    <div className="text-center "> {data?.phoneNumber}</div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Comments */}
          {loading && <Spin className="flex justify-center" />}
          <div className="container mx-auto px-4 ">
            {showComments && (
              <>
                <div>
                  <h1 className="mb-5 ">Comments</h1>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                  {comments.map((comment) => (
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
                  <h1 className="mb-5">Orders History</h1>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-6 gap-5">
                  {orders?.data.map((order, index) => (
                    <div key={index}>
                      <OrderHistoryComponent
                        onClick={() => handleDetailOrder(order)}
                        invoice={order}
                      />
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
            <OrderDetail data={detailOrder} />
          </Modal>
        </section>
      </main>
    </Layout>
  );
}
