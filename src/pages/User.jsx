import Layout from "./layout/Index";
import CardHeaderComponent from "../components/CardHeader";
import { Modal, Skeleton } from "antd";
import List from "../components/List";
import { useUsersQuery } from "../hooks/useUsersQuery";

import Cat from "../assets/cat-run.gif";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import ModalUserEdit from "../components/ModalUserEdit";

const Avatar = "https://gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50";

export default function User() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);

  const showModal = (e) => {
    setOpen(true);
    return navigate(`/user/${e}`);
  };
  const handleSave = () => {
    setConfirmLoading(true);
    //call api post
    setTimeout(() => {
      setOpen(false);
      setConfirmLoading(false);
    }, 2000);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  const { data, isFetching, isLoading, error } = useUsersQuery();
  if (isLoading)
    return (
      <div className="flex justify-center items-center min-h-screen">
        <img src={Cat} alt={"loading"} width={300} />
      </div>
    );

  if (error) return "An error has occurred: " + error.message;

  return (
    <Layout>
      <div className="mt-16 md:mt-32 ">
        <CardHeaderComponent title="Users" />
      </div>
      <div className="grid grid-cols-1 ">
        <Skeleton loading={isFetching} active avatar>
          {data.map((user, index) => (
            <div
              key={user.id}
              className="w-full h-20 flex justify-between px-3 items-center border-b-[1px]"
            >
              <List
                number={index + 1}
                to={`/user/${user.id}`}
                url={user.website}
                image={user.image ? user.image : Avatar}
                description={user.email}
                title={user.name}
                onClick={() => showModal(user.id)}
              />
            </div>
          ))}
        </Skeleton>

        <Modal
          className="modalStyle"
          title={
            <div className="px-2">
              <ModalUserEdit title={"Edit"} />
            </div>
          }
          open={open}
          onOk={handleSave}
          okText="Save"
          okButtonProps={{ style: { background: "green", color: "white" } }}
          confirmLoading={confirmLoading}
          onCancel={handleCancel}
        ></Modal>
      </div>
    </Layout>
  );
}
