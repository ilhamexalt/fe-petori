import { Link, useParams } from "react-router-dom";
import Layout from "./layout/Index";
import { useEffect, useState } from "react";
import CardStoreComponent from "../components/CardStore";
import ButtonComponent from "../components/Button";
import { FloatButton } from "antd";
import { HomeOutlined } from "@ant-design/icons";
import Swal from "sweetalert2";

export default function StoreDetail() {
  const params = useParams();
  const [detail, setDetail] = useState([]);
  const [showForm, setShowFom] = useState(false);

  /* Get Store By Id */
  useEffect(() => {
    const getData = async () => {
      const resp = await fetch(
        `https://fakestoreapi.com/products/${params.id}`
      );
      const results = await resp.json();
      setDetail(results);
    };
    getData();
  }, [params]);

  return (
    <Layout>
      <div className="mt-16 md:mt-32 ">
        <h1 className="text-center my-5 md:mb-10 md:text-xl text-sm font-semibold capitalize">
          {detail.category} Store
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Left */}
          <div className="grid grid-cols-1 md:grid-cols-2  md:items-center md:max-h-64 max-h-60 ">
            <div></div>
            <div className="flex justify-center">
              <CardStoreComponent
                className="!w-full md:!w-3/4"
                src={detail.image}
                category={detail.category}
                price={detail.price}
              />
            </div>
          </div>
          {/* Right */}
          {/* Left */}
          <div className="grid grid-cols-1 md:grid-cols-2 md:ml-5 mt-2 md:mt-0 ">
            <div className="px-3 py-2 shadow-md bg-white hover:shadow-lg md:max-h-64 md:min-h-64 max-h-60 overflow-y-auto scrollable-element">
              <p className="text-justify text-xs md:text-sm bg-white">
                {detail.description}
              </p>
            </div>
            <div></div>
            <ButtonComponent
              onClick={() =>
                Swal.fire({
                  html: "Please download the Petori Mobile in <a style='color:blue' href='https://hello-iam.netlify.app'>here</a>",
                  icon: "info",
                  title: "Info",
                  text: "",
                  showConfirmButton: false,
                })
              }
              className="mt-2 md:mt-5 bg-indigo-500 hover:ring-indigo-500 flex items-center justify-center h-7 md:h-10 uppercase text-[8px] md:text-xs w-full"
            >
              Order Now
            </ButtonComponent>
          </div>

          <Link to={"/dashboard"}>
            <FloatButton.Group type="primary">
              <FloatButton
                className="bg-white"
                icon={<HomeOutlined className="hover:text-indigo-500" />}
              />
            </FloatButton.Group>
          </Link>
        </div>
      </div>
    </Layout>
  );
}
