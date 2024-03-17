import Layout from "./layout/Index";
import CardHeaderComponent from "../components/CardHeader";
import { Modal, Skeleton } from "antd";
import { useNavigate } from "react-router-dom";
import Cat from "../assets/cat-run.gif";
import { useState } from "react";
import ModalStoreEdit from "../components/ModalStoreEdit";
import List from "../components/List";
import { useStoresQuery } from "../hooks/UseStoresQuery";
import useLocalStorage from "../hooks/useLocalStorage";

export default function Store() {
  const [theme, setTheme] = useLocalStorage("theme");
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);

  const showModal = (e) => {
    setOpen(true);
    return navigate(`/store/${e}`);
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

  //hooks get all data store
  const { data, error, isLoading, isFetching } = useStoresQuery();

  if (isLoading)
    return (
      <div className="flex justify-center items-center min-h-screen">
        <img src={Cat} alt={"loading"} width={300} />
      </div>
    );

  if (error) return "An error has occurred: " + error.message;

  return (
    <Layout className={theme === "dark" ? "bg-slate-900 text-gray-50" : ""}>
      <div className="mt-16 md:mt-32 ">
        <CardHeaderComponent title="Stores" />
      </div>
      <div className="grid grid-cols-1 ">
        <Skeleton loading={isFetching} active avatar>
          {/* IF ADMIN FETCH ALL STORE, IF OWNER FETCH STORE BY ID */}
          {data.map((store, index) => (
            <div
              key={store.id}
              className="w-full h-20 flex justify-between px-3 items-center border-b-[1px]"
            >
              <List
                number={index + 1}
                to={`https://hello-iam.netlify.app`}
                image={store.image}
                description={store.description}
                title={store.category}
                onClick={() => showModal(store.id)}
              />
            </div>
          ))}
        </Skeleton>

        <Modal
          className="modalStyle"
          title={
            <div className="px-2">
              <ModalStoreEdit title={"Edit"} />
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
