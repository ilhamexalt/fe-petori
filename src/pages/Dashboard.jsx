import Layout from "./layout/Index";
import CarouselComponent from "../components/Carousel";
import Cat from "../assets/cat-run.gif";
import ButtonComponent from "../components/Button";
import { useNavigate, useLocation } from "react-router-dom";
import useLocalStorage from "../hooks/useLocalStorage";
import { useStoresQuery } from "../hooks/UseStoresQuery";
import { Empty, Skeleton } from "antd";
import CardStoreComponent from "../components/CardStore";
import { useMediaQuery } from "react-responsive";
import StoreImage from "../assets/store.png";
import Swal from "sweetalert2";
import { useSelector } from "react-redux";

const Dashboard = () => {
  const navigate = useNavigate();
  const [isToken, setToken] = useLocalStorage("isToken");
  const [isLogin, setIsLogin] = useLocalStorage("isLoggedIn");

  const { data, error, isFetching, isLoading, isError } = useStoresQuery(
    isToken,
    1
  );

  const isDesktopScreen = useMediaQuery({
    query: "(min-width: 1224px)",
  });

  if (isLoading)
    return (
      <div className="flex justify-center items-center min-h-screen">
        <img src={Cat} alt={"loading"} width={300} />
      </div>
    );

  if (isError && isToken && isLogin.length > 0)
    return (
      <div className="flex justify-center items-center min-h-screen">
        An error has occurred: {error.message}
      </div>
    );

  if (isError && isLogin.length === 0) {
    Swal.fire({
      icon: "error",
      title: "Error",
      text: "Session expired. Please login again",
      timer: 2000,
      showConfirmButton: false,
    });
    return navigate("/");
  }

  const handleShowAll = async () => {
    alert("belum dibuat");
  };

  return (
    <Layout>
      <div className="mt-16 md:mt-32  md:px-0 px-4">
        <CarouselComponent />
      </div>
      <div className="h-auto pt-2 md:pt-10 md:px-0 px-4 ">
        <h1 className="font-bold dark:text-gray-300 text-base md:text-2xl text-center mb-2">
          STORES
        </h1>
        {!isToken || isToken.length === 0 || data.data.length === 0 ? (
          <>
            <Empty className="mt-10" />
          </>
        ) : (
          <>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-5 md:gap-10 justify-items-center mb-5 md:mb-10  ">
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
                data?.data.map((item, i) => (
                  <div key={item.id}>
                    <CardStoreComponent
                      onClick={() =>
                        navigate(`/storedetail/${item.id}`, {
                          state: item,
                        })
                      }
                      src={item.storeImage || StoreImage}
                      title={item.storeName}
                      location={item.address.split(",")[2]}
                    />
                  </div>
                ))
              )}
            </div>

            <h1 className="flex justify-end text-xs md:text-sm -mt-2 dark:text-gray-300">
              Total Data :
              <span className="font-semibold ml-1"> {data.data.length}</span>
            </h1>
            <div className="flex justify-center items-center mt-5 mb-2">
              {isFetching ? (
                <Skeleton.Input size="default" active={true} />
              ) : (
                <ButtonComponent
                  onClick={() => handleShowAll()}
                  className="bg-indigo-500 uppercase text-xs p-2 md:text-sm"
                >
                  {isFetching ? "Loading..." : "View All"}
                </ButtonComponent>
              )}
            </div>
          </>
        )}
      </div>
    </Layout>
  );
};

export default Dashboard;
