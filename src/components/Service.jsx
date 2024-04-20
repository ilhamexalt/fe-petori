import React, { useEffect, useState } from "react";
import useLocalStorage from "../hooks/useLocalStorage";
import { useParams, useNavigate, Link } from "react-router-dom";
import { IoMdAddCircle } from "react-icons/io";
import InputComponent from "./Input";
import CardServiceComponent from "./CardService";
import { MdOutlinePets } from "react-icons/md";
import ModalComponent from "./Modal";
import LabelComponent from "./Label";
import ButtonComponent from "./Button";
import { Divider, Empty, Skeleton, Spin } from "antd";
import Service from "../assets/service.png";
import { getService, patchService, postService } from "../services/service";
import Swal from "sweetalert2";

const ServiceComponent = ({ props }) => {
  const [username, setUsername] = useLocalStorage("fullName");
  const [isToken, setIsToken] = useLocalStorage("isToken");
  const [isLogin, setIsLogin] = useLocalStorage("isLoggedIn");
  const [paramIduser, setParamIdUser] = useLocalStorage("id");
  const [isRole, setIsRole] = useLocalStorage("isRole");
  const [loading, setLoading] = useState(false);
  const params = useParams();
  const [serviceName, setServiceName] = useState("");
  const [servicePrice, setServicePrice] = useState("");
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const [saving, setSaving] = useState(false);
  const [services, setServices] = useState([]);
  const [filteredServices, setFilteredServices] = useState([]);
  const [searchItem, setSearchItem] = useState("");
  const [limit, setLimit] = useState(5);

  const [loadingService, setLoadingService] = useState(false);

  const showModal = async (id) => {
    setLoadingService(true);
    setOpen(true);
    if (!id) {
      setLoadingService(false);
      return null;
    } else {
      //call api service by id
      const data = await getService(isToken, id);
      setServiceName(data?.data.serviceName);
      setServicePrice(data?.data.servicePrice);
      setLoadingService(false);

      return navigate(`/store/${id}`);
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);

    if (!serviceName || !servicePrice) {
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
      storeId: props?.id,
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
        const data = await res.json();
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
        setOpen(false);
      }
    } else {
      body = {
        serviceName: serviceName,
        servicePrice: servicePrice,
      };
      const res = await patchService(isToken, params.id, body);
      if (!res.ok) {
        setSaving(false);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: res.statusText,
        });
      } else {
        const data = res.json();
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
        pushData();
        setOpen(false);
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
        fetch(`https://petori-service.my.id/Service/${data.id}`, {
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
          })
          .catch((error) => {
            setSaving(false);
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
    setOpen(false);
    setServiceName("");
    setServicePrice("");
  };

  const handleSearchInputChange = (e) => {
    setLoading(true);
    const searchItem = e.target.value;
    setSearchItem(searchItem);

    const filteredItems = services?.filter((service) =>
      service.serviceName.toLowerCase().includes(searchItem.toLowerCase())
    );

    setFilteredServices(filteredItems);
    setLoading(false);
  };

  const handleShowMore = () => {
    if (props?.services.length - filteredServices?.length < 5)
      return setLimit(
        limit + props?.services.length - filteredServices?.length
      );
    setLimit(limit + 5);
  };

  const datas = [];
  const pushData = () => {
    for (let i = 0; i < limit; i++) {
      if (props?.services[i] !== undefined) {
        datas.push(props?.services[i]);
      } else {
        break;
      }
    }
  };

  useEffect(() => {
    pushData();
    setServices(datas);
    setFilteredServices(datas);
  }, [props, limit, !saving]);

  return (
    <div>
      <div className="mt-8 flex items-center justify-between px-4 ">
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
          onChange={handleSearchInputChange}
        />
      </div>

      {props?.services.length === 0 ? (
        <div className="mt-14">
          <Empty />
        </div>
      ) : loading ? (
        <div className="flex justify-center">
          <Spin />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-5 px-4 gap-3">
          <Skeleton loading={loading} active avatar>
            {filteredServices?.map((service, index) => (
              <div key={index} className="w-full mt-2 flex justify-center  ">
                <CardServiceComponent
                  storeName={props.storeName}
                  img={Service}
                  serviceName={service.serviceName}
                  servicePrice={service.servicePrice}
                  onClickEdit={() => showModal(service.id)}
                  onClickDelete={() => handleDelete({ data: service })}
                />
              </div>
            ))}
          </Skeleton>
        </div>
      )}

      {filteredServices?.length > 0 && (
        <>
          <p className="text-sm text-right mt-3  px-4 ">
            Total Data :{" "}
            <span className="font-semibold">{filteredServices?.length}</span>
          </p>

          <div className="flex justify-center mt-5">
            <ButtonComponent onClick={handleShowMore}>
              Show More
            </ButtonComponent>
          </div>
        </>
      )}

      <ModalComponent open={open} onOk={handleSave} onCancel={handleCancel}>
        <div className="gap-y-4">
          <h1 className="font-semibold text-lg flex items-center gap-2">
            <MdOutlinePets /> Service
          </h1>
          <Divider />
          {loadingService ? (
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

              <Divider />
              {isRole !== "Super Admin" && (
                <div className="flex justify-end gap-2">
                  <button
                    onClick={handleCancel}
                    className="flex justify-center items-center gap-1 w-28 h-8 text-white bg-gray-500 shadow-sm rounded-md transition"
                  >
                    Cancel
                  </button>
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
    </div>
  );
};

export default ServiceComponent;
