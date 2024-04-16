import { Avatar, Tooltip, Modal } from "antd";
import React, { useState } from "react";
import { FaRegEdit, FaEye } from "react-icons/fa";
import { MdLocationOn } from "react-icons/md";
import { Link } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import { FaRegTrashAlt } from "react-icons/fa";
import useLocalStorage from "../hooks/useLocalStorage";
import { GrServices } from "react-icons/gr";

const ReadMore = ({ children }) => {
  const text = children;
  const [isReadMore, setIsReadMore] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const isDesktopOrLaptop = useMediaQuery({
    query: "(min-width: 1224px)",
  });

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
        isDesktopOrLaptop ? (
          text.slice(0, 60)
        ) : (
          text.slice(0, 20)
        )
      ) : (
        <Modal
          className="text-justify capitalize"
          title="Description"
          closable={false}
          open={isModalOpen}
          onOk={handleOk}
          onCancel={false}
          okText="OK"
          cancelButtonProps={{ style: { display: "none" } }}
          okButtonProps={{ style: { background: "#646df4", color: "white" } }}
        >
          {text}
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
      <ReadMore className="text-xs md:text-sm">{desc}</ReadMore>
    </div>
  );
};

export default function List({
  image,
  description,
  title,
  tooltip,
  number,
  location,
  email,
  onClickGmaps,
  onClickEdit,
  onClickDelete,
  onClickService,
}) {
  const [isRole, setIsRole] = useLocalStorage("isRole");
  return (
    <>
      <div className="flex justify-between px-3 items-center ">
        <div className="md:w-3/5 flex gap-3 items-center">
          <div className="text-xs md:text-sm">{number}</div>
          <div>
            <Avatar src={image} />
          </div>
          <div className={`flex-col ${email ? "lowercase" : "capitalize"}`}>
            <div className="font-bold text-sm md:text-base">{title}</div>
            <div className="text-xs md:text-sm">
              {email ? email : <Content desc={description} />}
            </div>
          </div>
        </div>

        <Tooltip title={tooltip}>
          <Link
            to={onClickGmaps}
            target="_blank"
            className="uppercase hidden md:flex text-sm items-center gap-2 hover:text-indigo-500"
          >
            <MdLocationOn /> {location}
          </Link>
        </Tooltip>
        <div className="flex gap-5">
          {isRole !== "Super Admin" ? (
            <>
              <GrServices
                onClick={onClickService}
                className=" hover:text-indigo-500 hover:cursor-pointer text-xs md:text-sm"
              />
              <FaRegEdit
                onClick={onClickEdit}
                className=" hover:text-indigo-500 hover:cursor-pointer text-xs md:text-sm"
              />
            </>
          ) : (
            <FaEye
              onClick={onClickEdit}
              className=" hover:text-indigo-500 hover:cursor-pointer text-xs md:text-sm"
            />
          )}
          <FaRegTrashAlt
            onClick={onClickDelete}
            className=" text-red-500 hover:cursor-pointer text-xs md:text-sm"
          />
        </div>
      </div>
    </>
  );
}
