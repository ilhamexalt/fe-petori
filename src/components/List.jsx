import { Avatar, Tooltip, Modal } from "antd";
import React, { useState } from "react";
import { FaRegEdit } from "react-icons/fa";
import { MdLocationOn } from "react-icons/md";
import { Link } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import { MdDeleteOutline } from "react-icons/md";

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
          className="text-justify"
          title="Description"
          closable={false}
          open={isModalOpen}
          onOk={handleOk}
          onCancel={false}
          okText="OK"
          cancelButtonProps={{ style: { display: "none" } }}
          okButtonProps={{ style: { background: "#646df4", color: "white" } }}
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

export default function List({
  image,
  description,
  title,
  onClick,
  onClickDelete,
  tooltip,
  to,
  number,
  location,
  onClickGmaps,
}) {
  return (
    <>
      <div className="flex justify-between px-3 items-center ">
        <div className="md:w-3/5 flex gap-3 items-center">
          <div className="text-xs md:text-sm">{number}</div>
          <div>
            <Avatar src={image} />
          </div>
          <div className="flex-col capitalize">
            <div className="font-bold text-sm md:text-base ">{title}</div>
            <div className="text-xs md:text-sm">
              <Content desc={description} />
            </div>
          </div>
        </div>

        <Tooltip title={tooltip}>
          <Link
            onClick={onClickGmaps}
            className="capitalize hidden md:flex items-center gap-2 hover:text-indigo-500"
          >
            <MdLocationOn /> {location}
          </Link>
        </Tooltip>
        <div className="flex gap-5">
          <FaRegEdit
            onClick={onClick}
            className=" hover:text-indigo-500 hover:cursor-pointer"
          />
          <MdDeleteOutline
            onClick={onClickDelete}
            className=" hover:text-red-500 hover:cursor-pointer"
          />
        </div>
      </div>
    </>
  );
}
