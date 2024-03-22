import { Link, useParams } from "react-router-dom";
import Layout from "./layout/Index";
import { useEffect, useState } from "react";
import CardStoreComponent from "../components/CardStore";
import ButtonComponent from "../components/Button";
import { FloatButton, Skeleton } from "antd";
import { HomeOutlined } from "@ant-design/icons";
import Swal from "sweetalert2";
import { useMediaQuery } from "react-responsive";
import useLocalStorage from "../hooks/useLocalStorage";

export default function StoreDetail() {
  const params = useParams();
  const [detail, setDetail] = useState([]);
  const [showForm, setShowFom] = useState(false);
  const [isFetching, setIsFetching] = useState(true);
  const [theme, setTheme] = useLocalStorage("theme");

  /* Get Store By Id */
  useEffect(() => {
    const getData = async () => {
      const resp = await fetch(
        `https://fakestoreapi.com/products/${params.id}`
      );
      const results = await resp.json();
      setDetail(results);
      if (results) setIsFetching(false);
    };
    getData();
  }, [params]);

  const isDesktopScreen = useMediaQuery({
    query: "(min-width: 1224px)",
  });

  return (
    <Layout className={theme === "dark" ? "bg-gray-800 text-gray-300" : ""}>
      <div className="mt-16 md:mt-32 ">
        <h1 className="text-center my-5 md:mb-10 md:text-xl text-sm font-semibold capitalize">
          {detail.category} Store
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Left */}
          <div className="grid grid-cols-1 md:grid-cols-2  md:items-center md:max-h-64 max-h-60 ">
            <div></div>
            <div className="flex justify-center">
              {isFetching ? (
                <Skeleton.Image
                  style={
                    isDesktopScreen
                      ? { width: 240, height: 256 }
                      : { width: 160, height: 240 }
                  }
                  active={true}
                />
              ) : (
                <CardStoreComponent
                  className="!w-full md:!w-3/4"
                  src={detail.image}
                  category={detail.category}
                  price={detail.price}
                />
              )}
            </div>
          </div>
          {/* Right */}
          {/* Left */}
          <div className="grid grid-cols-1 md:grid-cols-2 md:ml-5 mt-2 md:mt-0 ">
            {isFetching ? (
              <Skeleton active />
            ) : (
              <div
                className={
                  theme === "dark"
                    ? "px-3 py-2 shadow-md bg-gray-800 text-gray-300 hover:shadow-lg md:max-h-64 md:min-h-64 max-h-60 overflow-y-auto scrollable-element"
                    : "px-3 py-2 shadow-md bg-white hover:shadow-lg md:max-h-64 md:min-h-64 max-h-60 overflow-y-auto scrollable-element"
                }
              >
                <table>
                  <tbody>
                    <tr>
                      <td className="text-xs md:text-sm">Category</td>
                      <td className="text-xs md:text-sm">
                        : {detail.category}
                      </td>
                    </tr>
                    <tr>
                      <td className="text-xs md:text-sm">Price</td>
                      <td className="text-xs md:text-sm">: ${detail.price}</td>
                    </tr>
                    <tr>
                      <td className="text-xs md:text-sm">Rating</td>
                      <td className="text-xs md:text-sm">
                        : {detail.rating.rate}
                      </td>
                    </tr>
                    <tr>
                      <td className="text-xs md:text-sm">Count</td>
                      <td className="text-xs md:text-sm">
                        : {detail.rating.count}
                      </td>
                    </tr>
                  </tbody>
                </table>
                <p className="text-justify text-xs md:text-sm mt-2">
                  {detail.description}
                </p>
              </div>
            )}

            <div></div>
            {isFetching ? (
              <Skeleton.Input size="large" active={true} />
            ) : (
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
            )}
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
