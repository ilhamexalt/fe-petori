import Layout from "./layout/Index";
import CardHeaderComponent from "../components/CardHeader";

import { Avatar, Modal, Tooltip } from "antd";
import { MdLocationOn } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import Cat from "../assets/cat-run.gif";

import { useState } from "react";
import ButtonComponent from "../components/Button";
import Swal from "sweetalert2";
import { MdOutlineDelete } from "react-icons/md";
import { RxUpdate } from "react-icons/rx";
import ModalStoreEdit from "../components/ModalStoreEdit";

const ReadMore = ({ children }) => {
  const text = children;
  const [isReadMore, setIsReadMore] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOk = () => {
    setIsModalOpen(false);
    setIsReadMore(!isReadMore);
  };

  const toggleReadMore = () => {
    setIsReadMore(!isReadMore);
    setIsModalOpen(true);
  };
  return (
    <>
      {isReadMore ? (
        text.slice(0, 20)
      ) : (
        <Modal
          className="text-justify"
          title="Description"
          closable={false}
          open={isModalOpen}
          onOk={handleOk}
          footer={[
            <ButtonComponent
              className="uppercase ring-1 text-xs md:text-sm hover:ring-indigo-500 bg-indigo-500 !w-10 md:!w-14 p-1"
              onClick={handleOk}
            >
              Ok
            </ButtonComponent>,
          ]}
        >
          <span className="text-xs md:text-base">{text}</span>
        </Modal>
      )}
      <span
        onClick={toggleReadMore}
        className="text-indigo-500 hover:cursor-pointer"
      >
        {isReadMore ? "...read more" : " show less"}
      </span>
    </>
  );
};

const Content = ({ desc }) => {
  return (
    <div>
      <ReadMore>{desc}</ReadMore>
    </div>
  );
};

export default function Store() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);

  const showModal = (e) => {
    setOpen(true);
    return navigate(`/store/${e}`);
  };
  const handleOk = () => {
    setConfirmLoading(true);
    setTimeout(() => {
      setOpen(false);
      setConfirmLoading(false);
    }, 2000);
  };
  const handleCancel = () => {
    setOpen(false);
  };

  const { data, error, isPending } = useQuery({
    queryKey: ["repoData"],
    queryFn: () =>
      fetch(`https://fakestoreapi.com/products`).then((res) => res.json()),
  });

  if (isPending)
    return (
      <div className="flex justify-center items-center min-h-screen">
        <img src={Cat} alt={"loading"} width={300} />
      </div>
    );
  if (error) return "An error has occurred: " + error.message;

  return (
    <Layout>
      <div className="p-9">
        <CardHeaderComponent title="Stores" />
        <div className="grid grid-cols-1 ">
          <div>
            {data.map((store) => (
              <div
                key={store.id}
                className="w-full h-20 flex justify-between px-3 items-center border-b-[1px]"
              >
                <div className="md:w-3/5 flex gap-3">
                  <div>
                    <Avatar src={store.image} />
                  </div>
                  <div className="flex-col capitalize">
                    <div className="font-bold text-sm md:text-base ">
                      {store.category}
                    </div>
                    <div className="text-xs md:text-sm">
                      <Content desc={store.description} />
                    </div>
                  </div>
                </div>
                <Tooltip title="https://">
                  <Link
                    to={"/"}
                    className="capitalize hidden md:flex items-center gap-2 hover:text-indigo-500"
                  >
                    <MdLocationOn /> Location
                  </Link>
                </Tooltip>

                <div className="flex gap-5">
                  <FaRegEdit
                    onClick={() => showModal(store.id)}
                    className=" hover:text-indigo-500 hover:cursor-pointer"
                  />
                </div>
              </div>
            ))}
          </div>
          <Modal
            className="modalStyle"
            title={
              <div className="px-2">
                <ModalStoreEdit />
              </div>
            }
            open={open}
            onOk={handleOk}
            okText="Save"
            okButtonProps={{ style: { background: "green", color: "white" } }}
            confirmLoading={confirmLoading}
            onCancel={handleCancel}
          ></Modal>
        </div>
      </div>
    </Layout>
  );
}
