import { Link, useNavigate, useParams } from "react-router-dom";
import CardHeaderComponent from "../components/CardHeader";
import Layout from "./layout/Index";
import { IoMdAddCircle } from "react-icons/io";
import InputComponent from "../components/Input";
import useLocalStorage from "../hooks/useLocalStorage";
import { Divider, Empty, Skeleton, Spin } from "antd";
import { useEffect, useState } from "react";
import ModalComponent from "../components/Modal";
import LabelComponent from "../components/Label";
import SelectComponent from "../components/Select";
import ButtonComponent from "../components/Button";
import Swal from "sweetalert2";
import { useServicesQuery } from "../hooks/useServicesQuery";
import { useStoresQuery } from "../hooks/UseStoresQuery";
import Lion from "../assets/service.png";
import CardServiceComponent from "../components/CardService";
import { getService, patchService, postService } from "../services/service";
import { MdOutlinePets } from "react-icons/md";
import { FaStore } from "react-icons/fa";

const Service = () => {
  const [username, setUsername] = useLocalStorage("fullName");
  const [isToken, setIsToken] = useLocalStorage("isToken");
  const [isLogin, setIsLogin] = useLocalStorage("isLoggedIn");
  const [paramIduser, setParamIdUser] = useLocalStorage("id");
  const [isRole, setIsRole] = useLocalStorage("isRole");

  const [datas, setDatas] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const params = useParams();

  const [serviceName, setServiceName] = useState("");
  const [servicePrice, setServicePrice] = useState("");
  const [storeId, setStoreId] = useState("");

  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const [saving, setSaving] = useState(false);
  const [storeDropdown, setStoreDropdown] = useState([]);

  // useEffect(() => {
  //   setIsLoading(true);
  //   if (params.id !== undefined) {
  //     const getService = async () => {
  //       const response = await fetch(
  //         "https://freetestapi.com/api/v1/animals/" + params.id
  //       );
  //       const data = await response.json();
  //       setServiceName(data.name);
  //       setServicePrice(data.description);
  //     };
  //     getService();
  //   } else {
  //     const getService = async () => {
  //       const response = await fetch("https://freetestapi.com/api/v1/animals");
  //       const data = await response.json();
  //       setDatas(data);
  //     };
  //     getService();
  //   }

  //   setIsLoading(false);
  // }, [params]);

  const { data, isFetching, isError, error, refetch } =
    useServicesQuery(isToken);
  const { data: stores, isFetching: isFetchingStore } = useStoresQuery(
    isToken,
    paramIduser
  );

  let storesName = [];
  if (!isFetchingStore) {
    for (let i = 0; i < stores?.data.length; i++) {
      storesName.push({
        id: stores?.data[i].id,
        storeName: stores?.data[i].storeName,
      });
    }
  }
  useEffect(() => {
    setStoreDropdown(storesName);
  }, [!isFetchingStore]);

  const showModal = async (id) => {
    setOpen(true);
    if (!id) {
      return null;
    } else {
      //call api service by id
      const data = await getService(isToken, id);
      setServiceName(data?.data.serviceName);
      setServicePrice(data?.data.servicePrice);
      const store = storeDropdown.filter(
        (store) => store.id === data?.data.storeId
      );
      setStoreId(store[0]);
      return navigate(`/service/${id}`);
    }
  };

  const handleChangeStore = (e) => {
    setStoreId(e.target.value);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);

    if (!serviceName || !servicePrice || !storeId) {
      setSaving(false);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Please fill all the fields",
        showConfirmButton: false,
        timer: 1000,
      });
      return;
    }

    //call api post
    let body = {
      serviceName: serviceName,
      servicePrice: servicePrice,
      storeId: storeId,
    };
    if (params.id === undefined) {
      const res = await postService(isToken, body);
      if (!res.ok) {
        setSaving(false);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: res.statusText,
        });
      } else {
        setSaving(false);
        Swal.fire({
          icon: "success",
          title: "Success",
          text: data.message,
          showConfirmButton: false,
          timer: 1000,
        });
        setServiceName("");
        setServicePrice("");
        setStoreDropdown(null);
        setOpen(false);
        refetch();
      }
    } else {
      body = {
        serviceName: serviceName,
        servicePrice: servicePrice,
        storeId: storeId.id,
      };
      console.log(body);
      const res = await patchService(isToken, params.id, body);
      if (!res.ok) {
        setSaving(false);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: res.statusText,
        });
      } else {
        setSaving(false);
        Swal.fire({
          icon: "success",
          title: "Success",
          text: data.message,
          showConfirmButton: false,
          timer: 1000,
        });
        setServiceName("");
        setServicePrice("");
        // setStoreDropdown(null);
        setOpen(false);
        refetch();
      }
    }
  };

  const handleDelete = ({ data }) => {
    Swal.fire({
      title: "Are you sure?",
      html:
        "<p style='font-size: 16px'> The service " +
        "<span style='font-weight: 700'>" +
        data.serviceName +
        "</span>" +
        " will deleted </p>",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Deleted!",
          text: "Your data has been deleted.",
          icon: "success",
        });
      }
    });
  };

  const handleCancel = () => {
    setOpen(false);
    setServiceName("");
    setServicePrice("");
    setStoreId(null);
  };

  if (isLoading)
    return (
      <div className="flex justify-center items-center min-h-screen">
        <img src={Cat} alt={"loading"} width={300} />
      </div>
    );

  if (isError && isToken.length > 0 && isLogin.length > 0)
    return (
      <div className="flex justify-center items-center min-h-screen">
        An error has occurred: {error.message}
      </div>
    );

  if (isToken.length === 0 && isLogin.length === 0) {
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
      <div className="mt-16 md:mt-32">
        <CardHeaderComponent title="Services" />
      </div>
      <div className="mt-5 flex items-center justify-between px-4">
        {username !== "Super Admin" && (
          <Link
            onClick={() => showModal()}
            className="text-indigo-500 text-xs md:text-base flex items-center gap-1 pl-2 pr-2 md:pl-5 md:pr-5"
          >
            <IoMdAddCircle /> Service
          </Link>
        )}
        <div></div>
        <InputComponent
          className="!w-40 md:w-56"
          placeholder="Search .."
          onChange={null}
        />
      </div>

      {isFetching ? (
        <Spin className="mt-10 flex justify-center" />
      ) : data?.data.length === 0 ? (
        <div className="mt-14">
          <Empty />
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-5 px-4 gap-3">
          <Skeleton loading={isFetching} active avatar>
            {data?.data.map((item) => (
              <div key={item.id} className="w-full mt-2 flex justify-center  ">
                <CardServiceComponent
                  storeName={item.storeId}
                  img={Lion}
                  serviceName={item.serviceName}
                  servicePrice={item.servicePrice}
                  onClickEdit={() => showModal(item.id)}
                  onClickDelete={() => handleDelete({ data: item })}
                />
              </div>
            ))}
          </Skeleton>
        </div>
      )}

      <p className="text-sm text-right mt-3  px-4">
        Total Data :{" "}
        <span className="font-semibold">
          {!isFetching && data?.data.length}
        </span>
      </p>

      <ModalComponent open={open} onOk={handleSave} onCancel={handleCancel}>
        <div className="gap-y-4">
          <h1 className="font-semibold text-lg flex items-center gap-2">
            <MdOutlinePets /> Service
          </h1>
          <Divider />
          {isLoading ? (
            <div className="flex justify-center items-center h-56">
              <Spin />
            </div>
          ) : (
            <div className="w-full max-w-lg mt-5">
              <div className="flex flex-wrap -mx-3 mb-6">
                <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                  <LabelComponent>
                    Service Name<span className="text-red-500 ml-1">*</span>
                  </LabelComponent>
                  <InputComponent
                    disabled={isRole === "Super Admin" ? true : false}
                    type="text"
                    placeholder="Dummy"
                    value={params.id !== undefined ? serviceName : serviceName}
                    onChange={(e) => setServiceName(e.target.value)}
                  />
                </div>
                <div className="w-full md:w-1/2 px-3">
                  <LabelComponent>
                    Service Price <span className="text-red-500 ml-1">*</span>
                  </LabelComponent>
                  <InputComponent
                    value={
                      params.id !== undefined ? servicePrice : servicePrice
                    }
                    disabled={isRole === "Super Admin" ? true : false}
                    type="number"
                    placeholder="Dummy"
                    onChange={(e) => setServicePrice(e.target.value)}
                  />
                </div>
              </div>

              <div className="w-full  mb-6 md:mb-0">
                <LabelComponent>
                  {" "}
                  Store Name <span className="text-red-500 ml-1">*</span>
                </LabelComponent>
                <SelectComponent
                  onChange={handleChangeStore}
                  label={"Store Name"}
                  className="!w-full"
                  disabled={isRole === "Super Admin" ? true : false}
                >
                  {storeId ? (
                    <option value={storeId.id}>{storeId.storeName}</option>
                  ) : (
                    <option value={null}>---</option>
                  )}

                  {storeDropdown.map((item) => (
                    <option key={item.id} value={item.id}>
                      {item.storeName}
                    </option>
                  ))}
                </SelectComponent>
              </div>

              <Divider />
              {isRole !== "Super Admin" && (
                <div className="flex justify-end">
                  <ButtonComponent
                    className="py-1"
                    disabled={saving}
                    type="submit"
                    onClick={handleSave}
                  >
                    {saving ? "Saving..." : "Save"}
                  </ButtonComponent>
                </div>
              )}
            </div>
          )}
        </div>
      </ModalComponent>
    </Layout>
  );
};

export default Service;
