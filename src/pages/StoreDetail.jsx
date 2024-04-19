import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import Layout from "./layout/Index";
import CardStoreComponent from "../components/CardStore";
import ButtonComponent from "../components/Button";
import { FloatButton, Skeleton } from "antd";
import { HomeOutlined } from "@ant-design/icons";
import Swal from "sweetalert2";
import { useMediaQuery } from "react-responsive";
import useLocalStorage from "../hooks/useLocalStorage";
import { useStoreQuery } from "../hooks/UseStoreQuery";
import Cat from "../assets/cat-run.gif";

export default function StoreDetail() {
  const { id } = useParams();
  const [isToken, setIsToken] = useLocalStorage("isToken");
  const [isLogin, setIsLogin] = useLocalStorage("isLoggedIn");

  const navigate = useNavigate();

  const isDesktopScreen = useMediaQuery({
    query: "(min-width: 1224px)",
  });

  const { data, isLoading, isFetching, isError, error } = useStoreQuery(
    isToken,
    id
  );

  if (isLoading)
    return (
      <div className="flex justify-center items-center min-h-screen bg-white ">
        <img src={Cat} alt={"loading"} width={300} />
      </div>
    );

  if (
    (isLogin === undefined || isLogin.length === 0) &&
    (isToken === undefined || isToken.length === 0) &&
    data === undefined
  ) {
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
      <div className="mt-16 md:mt-32  md:px-0 px-4 ">
        <h1 className="text-center my-5 md:mb-10 md:text-xl text-sm font-semibold capitalize ">
          {data?.data.storeName} Store
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
                  title={data?.data.storeName}
                  src={data?.data.storeImage}
                  location={data?.data.address.split(",")[2]}
                  category={data?.data.description}
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
              <div className="px-3 py-3 shadow-md bg-white hover:shadow-lg md:max-h-64 md:min-h-64 max-h-60 overflow-y-auto scrollable-element">
                <table class="table-auto text-[10px] md:text-sm  text-justify mb-2">
                  <thead>
                    <tr>
                      <th>Location</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        <Link
                          target="_blank"
                          className="text-blue-500 truncate hover:underline"
                          to={data?.data.location}
                        >
                          {data?.data.location}
                        </Link>
                      </td>
                    </tr>
                  </tbody>
                </table>
                <table class="table-auto text-[10px] md:text-sm  text-justify">
                  <thead>
                    <tr>
                      <th>Desc</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>{data?.data.description}</td>
                    </tr>
                  </tbody>
                </table>
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
