import { CardHeader } from "@material-tailwind/react";
import { ArrowDownTrayIcon } from "@heroicons/react/24/outline";
import ButtonComponent from "./Button";
import { Link } from "react-router-dom";
import { IoMdAddCircle } from "react-icons/io";
import "animate.css";
import { useEffect, useState } from "react";
import InputComponent from "./Input";
import useLocalStorage from "../hooks/useLocalStorage";
import { Modal } from "antd";
import ModalStoreEdit from "./ModalStoreEdit";
import ModalUserEdit from "./ModalUserEdit";

export default function CardHeaderComponent({ title, onChange, value }) {
  const [username, setUsername] = useLocalStorage("username");
  const [openStore, setOpenStore] = useState(false);
  const [openUser, setOpenUser] = useState(false);
  const [loading, setLoading] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const titleName = title.substring(0, title.length - 1);

  useEffect(() => {
    document.documentElement.style.setProperty("--animate-duration", "2s");
  }, []);

  const handleDownload = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1500);
  };

  //Modal Stpre
  const showModalStore = (e) => {
    setOpenStore(true);
  };

  const handleCancel = () => {
    setOpenStore(false);
    setOpenUser(false);
  };

  const handleSaveStore = () => {
    setConfirmLoading(true);
    //call api post
    setTimeout(() => {
      setOpenStore(false);
      setConfirmLoading(false);
    }, 2000);
  };
  //End

  //Modal User
  const showModalUser = (e) => {
    setOpenUser(true);
  };

  const handleSaveUser = () => {
    setConfirmLoading(true);
    //call api post
    setTimeout(() => {
      setOpenUser(false);
      setConfirmLoading(false);
    }, 2000);
  };
  //End

  return (
    <div>
      <CardHeader
        floated={false}
        shadow={false}
        className="rounded-sm shadow-md h-20 flex justify-between items-center px-3 md:px-5"
      >
        <div>
          <h1 className="font-semibold text-sm md:text-lg"> {title}</h1>
          <p className="text-xs md:text-base">
            These are details about the {title}
          </p>
        </div>
        <div>
          <ButtonComponent
            className=" flex items-center justify-center h-7 md:h-10 uppercase text-[8px] md:text-xs w-[80px] md:w-32"
            onClick={handleDownload}
          >
            {loading ? (
              <div className="loader-download"></div>
            ) : (
              <>
                <ArrowDownTrayIcon
                  strokeWidth={2}
                  className="h-[10px] w-[10px] md:h-4 md:w-4"
                />
                Download
              </>
            )}
          </ButtonComponent>
        </div>
      </CardHeader>
      <div className="mt-5 mb-5 flex items-center justify-between">
        <Link
          onClick={titleName === "Store" ? showModalStore : showModalUser}
          className="text-indigo-500 text-xs md:text-base flex items-center gap-1 pl-2 pr-2 md:pl-5 md:pr-5"
        >
          <IoMdAddCircle /> {titleName}
        </Link>
        <Modal
          className="modalStyle"
          title={
            <div className="px-2">
              {titleName === "Store" ? (
                <ModalStoreEdit title={"Add"} />
              ) : (
                <ModalUserEdit title={"Add"} />
              )}
            </div>
          }
          open={titleName === "Store" ? openStore : openUser}
          onOk={titleName === "Store" ? handleSaveStore : handleSaveUser}
          okText="Save"
          okButtonProps={{ style: { background: "green", color: "white" } }}
          confirmLoading={confirmLoading}
          onCancel={handleCancel}
        ></Modal>

        <InputComponent
          className="!w-40 md:w-56"
          placeholder="Search .."
          onChange={onChange}
          handleSearch
        />
      </div>
    </div>
  );
}
