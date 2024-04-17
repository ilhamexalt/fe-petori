import Layout from "./layout/Index";
import CardHeaderComponent from "../components/CardHeader";
import { Divider, Empty, Skeleton, Spin } from "antd";
import List from "../components/List";
import { useUsersQuery } from "../hooks/useUsersQuery";
import Cat from "../assets/cat-run.gif";
import { useNavigate } from "react-router-dom";
import { useEffect, useReducer, useState } from "react";
import ModalComponent from "../components/Modal";
import useLocalStorage from "../hooks/useLocalStorage";
import LabelComponent from "../components/Label";
import InputComponent from "../components/Input";
import Swal from "sweetalert2";
import AvatarUser from "../assets/man.png";
import { getUser } from "../services/service";
import { LoadingOutlined } from "@ant-design/icons";

const Avatar = "https://gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50";

export default function User() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [isRole, setIsRole] = useLocalStorage("isRole");
  const [isToken, setIsToken] = useLocalStorage("isToken");
  const [isLogin, setIsLogin] = useLocalStorage("isLoggedIn");
  const [phoneNumber, setPhoneNumber] = useState(0);
  const [email, setEmail] = useState("");
  const [fullname, setFullname] = useState("");
  const [address, setAddress] = useState("");
  const [role, setRole] = useState("");
  const [status, setStatus] = useState("");
  const [createdAt, setCreatedAt] = useState("");
  const [updatedAt, setUpdatedAt] = useState("");

  const [searchItem, setSearchItem] = useState("");
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [users, setUsers] = useState([]);

  const {
    data: datas,
    isLoading,
    isFetching,
    isError,
    error,
    refetch,
  } = useUsersQuery(isToken);

  const handleSearchInputChange = (e) => {
    const searchTerm = e.target.value;
    setSearchItem(searchTerm);
    const filteredItems = users.filter(
      (user) =>
        user.fullname.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredUsers(filteredItems);
  };

  const showModal = async (id) => {
    const data = await getUser(id, isToken);
    setFullname(data.fullname);
    setPhoneNumber(data.phoneNumber);
    setAddress(data.address);
    setEmail(data.email);
    setRole(data.isRole);
    setStatus(data.isActive === 1 ? "Active" : "Inactive");
    setCreatedAt(data.createdDate);
    setUpdatedAt(data.updatedDate);
    setOpen(true);
    return navigate(`/user/${id}`);
  };

  const handleDelete = ({ user }) => {
    Swal.fire({
      title: "Are you sure?",
      html:
        "<p style='font-size: 16px'> The user " +
        "<span style='font-weight: 700; text-transform: capitalize'>" +
        user.fullname +
        "</span>" +
        " will deleted </p>",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`http://175.41.165.127/Users/${user.id}`, {
          headers: {
            Authorization: `Bearer ${isToken}`,
          },
          method: "DELETE",
        })
          .then((response) => {
            if (!response.ok) {
              throw new Error(response.statusText);
            }
            return response.json();
          })
          .then((data) => {
            Swal.fire({
              title: "Deleted!",
              text: data.message,
              icon: "success",
              timer: 1000,
              showConfirmButton: false,
            });
          });
        refetch().catch((error) => {
          Swal.fire({
            icon: "error",
            title: "Error",
            text: error.message,
            timer: 1000,
            showConfirmButton: false,
          });
          setOpen(false);
        });
      }
    });
  };

  const handleCancel = () => {
    setFullname("");
    setPhoneNumber("");
    setAddress("");
    setEmail("");
    setRole("");
    setStatus("");
    setCreatedAt("");
    setUpdatedAt("");
    setOpen(false);
  };

  let data = [];
  if (!isFetching) {
    data = datas?.data || [];
  }

  useEffect(() => {
    setUsers(data);
    setFilteredUsers(data);
    window.scrollTo(0, 0);
  }, [!isFetching]);

  if (isLoading)
    return (
      <div className="flex justify-center items-center min-h-screen bg-white dark:bg-gray-800">
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
    <Layout>
      <div className="mt-16 md:mt-32 px-4 md:px-0 ">
        <CardHeaderComponent title="Users" />
      </div>

      <div className="mt-5 flex items-center justify-between px-4">
        <div></div>
        <div className="flex items-center justify-between bg-red-200">
          <InputComponent
            className="!w-40 md:w-56"
            placeholder="Search .."
            value={searchItem}
            onChange={handleSearchInputChange}
          />
        </div>
      </div>
      <div className="grid grid-cols-1 ">
        {isFetching ? (
          <Spin className="mt-10" />
        ) : (
          <>
            {filteredUsers.length === 0 ? (
              <Empty className="mt-14" />
            ) : (
              isRole === "Super Admin" && (
                <>
                  <Skeleton loading={isFetching} active avatar>
                    {filteredUsers.map((user, index) => (
                      <div
                        key={user.id}
                        className="w-full h-20 mt-5 border-b-[1px]  px-4 dark:text-gray-300"
                      >
                        <List
                          number={index + 1}
                          tooltip={
                            "https://www.google.com/maps/dir/" + user.address
                          }
                          image={user.image ? user.image : AvatarUser}
                          title={user.fullname}
                          email={user.email}
                          location={user.address.split(",")[0]}
                          onClickGmaps={() =>
                            window.open(
                              "https://www.google.com/maps/dir/" + user.address,
                              "_blank"
                            )
                          }
                          onClickEdit={() => showModal(user.id)}
                          onClickDelete={() => handleDelete({ user })}
                        />
                      </div>
                    ))}
                  </Skeleton>
                  <p className="text-sm text-right mt-3 px-4 md:px-0 dark:text-gray-300">
                    Total Data :{" "}
                    <span className="font-semibold">
                      {filteredUsers.length}
                    </span>
                  </p>
                </>
              )
            )}
          </>
        )}
      </div>
      {/* Modal */}
      <ModalComponent open={open} onCancel={handleCancel}>
        <div className="gap-y-4">
          <h1 className="font-semibold text-lg">Detail User</h1>
          {isFetching ? (
            <div className="flex justify-center items-center h-56">
              <Spin />
            </div>
          ) : (
            <div className="w-full max-w-lg mt-5">
              <div className="flex flex-wrap -mx-3 mb-6">
                <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                  <LabelComponent label={"Full Name"} />
                  <span className="uppercase text-sm">{fullname}</span>
                </div>
                <div className="w-full md:w-1/2 px-3">
                  <LabelComponent label={"Phone Number"} />
                  <span className="uppercase text-sm">
                    {phoneNumber ? phoneNumber : "-"}
                  </span>
                </div>
              </div>

              <div className="flex flex-wrap -mx-3 mb-6">
                <div className="w-full px-3 ">
                  <LabelComponent label={"Email"} />
                  <span className="uppercase text-sm">
                    {email ? email : "-"}
                  </span>
                </div>
              </div>

              <div className="flex flex-wrap -mx-3 mb-6">
                <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                  <LabelComponent label={"Province"} />
                  <span className="uppercase text-sm">
                    {address.split(",")[0] ? address.split(",")[0] : "-"}
                  </span>
                </div>
                <div className="w-full md:w-1/2 px-3">
                  <LabelComponent label={"City"} />
                  <span className="uppercase text-sm">
                    {address.split(",")[1] ? address.split(",")[1] : "-"}
                  </span>
                </div>
              </div>

              <div className="flex flex-wrap -mx-3 mb-6">
                <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                  <LabelComponent label={"District"} />
                  <span className="uppercase text-sm">
                    {address.split(",")[2] ? address.split(",")[2] : "-"}
                  </span>
                </div>
                <div className="w-full md:w-1/2 px-3">
                  <LabelComponent label={"Village"} />
                  <span className="uppercase text-sm">
                    {address.split(",")[3] ? address.split(",")[3] : "-"}
                  </span>
                </div>
              </div>

              <div className="flex flex-wrap -mx-3 mb-6">
                <div className="w-full px-3">
                  <LabelComponent label={"Number or street"} />
                  <span className="uppercase text-sm">
                    {address.split(",")[4] ? address.split(",")[4] : "-"}
                  </span>
                </div>
              </div>

              <div className="flex flex-wrap -mx-3 mb-6">
                <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                  <LabelComponent label={"Role"} />
                  <span className="uppercase text-sm">{role ? role : "-"}</span>
                </div>
                <div className="w-full md:w-1/2 px-3">
                  <LabelComponent label={"Status"} />
                  <span className="uppercase text-sm">
                    {status ? status : "-"}
                  </span>
                </div>
              </div>

              <div className="flex flex-wrap -mx-3 mb-6">
                <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                  <LabelComponent label={"Created At"} />
                  <span className="uppercase text-sm">
                    {createdAt ? createdAt : "-"}
                  </span>
                </div>
                <div className="w-full md:w-1/2 px-3">
                  <LabelComponent label={"Updated At"} />
                  <span className="uppercase text-sm">
                    {updatedAt ? updatedAt : "-"}
                  </span>
                </div>
              </div>
              <Divider />
            </div>
          )}
        </div>
      </ModalComponent>
    </Layout>
  );
}
