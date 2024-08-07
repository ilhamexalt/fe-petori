import Layout from "./layout/Index";
import CarouselComponent from "../components/Carousel";
import Cat from "../assets/cat-run.gif";
import { useNavigate } from "react-router-dom";
import useLocalStorage from "../hooks/useLocalStorage";
import { useStoresQuery } from "../hooks/UseStoresQuery";
import { Empty, Skeleton, Spin } from "antd";
import CardStoreComponent from "../components/CardStore";
import { useMediaQuery } from "react-responsive";
import StoreImage from "../assets/store.png";
import Swal from "sweetalert2";
import { useEffect, useState } from "react";
import { getStoresByUserId } from "../services/service";
import PaginationComponent from "../components/Pagination";
import ButtonComponent from "../components/Button";

const Dashboard = () => {
  let pageNumber = Array.from({ length: 5 }, (_, i) => i + 1);

  const navigate = useNavigate();
  const [isToken, setToken] = useLocalStorage("isToken");
  const [isLogin, setIsLogin] = useLocalStorage("isLoggedIn");
  const [stores, setStores] = useState([]);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [activePrev, setActivePrev] = useState(false);
  const [activeNext, setActiveNext] = useState(false);
  const [loading, setLoading] = useState(false);

  const { data, isFetching, isLoading } = useStoresQuery(
    isToken,
    1,
    page,
    pageSize
  );

  const handleNext = async () => {
    setLoading(true);
    const newPage = page + 1;
    setPage(newPage);
    const data = await getStoresByUserId(isToken, 1, newPage, pageSize);
    setStores(data?.data);
    setLoading(false);
  };

  const handlePrev = async () => {
    setLoading(true);
    const newPage = page - 1;
    setPage(newPage);
    const data = await getStoresByUserId(isToken, 1, newPage, pageSize);
    setStores(data?.data);
    setLoading(false);
  };

  const fetchNewData = async (isToken, page, pageSize) => {
    setLoading(true);
    const data = await getStoresByUserId(isToken, 1, page, pageSize);
    setLoading(false);
    return data;
  };

  useEffect(() => {
    console.log("render : ", page);
    fetchNewData(isToken, page, pageSize).then((data) => {
      setStores(data?.data);
      if (data?.data?.length === 0) {
        setActiveNext(false);
      } else {
        setActiveNext(true);
      }
    });
    setActivePrev(true);
    setStores(data?.data);
  }, [!isFetching, page, pageSize]);

  const isDesktopScreen = useMediaQuery({
    query: "(min-width: 1224px)",
  });

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
    <Layout className={"md:px-0 px-4"}>
      <div className="mt-16 md:mt-32">
        <CarouselComponent />
      </div>
      <div className="h-auto pt-2 md:pt-10 ">
        <h1 className="font-bold  text-base md:text-2xl text-center mt-5 mb-5">
          ALL STORES
        </h1>
        {!isToken || isToken.length === 0 || data.data.length === 0 ? (
          <>
            <Empty className="mt-10" />
          </>
        ) : (
          <>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-5 md:gap-10 justify-items-center mb-5 md:mb-10  ">
              {stores?.map((item, i) => (
                <div key={item.id}>
                  {isFetching ? (
                    <Skeleton.Image
                      style={
                        isDesktopScreen
                          ? { width: 240, height: 256 }
                          : { width: 160, height: 240 }
                      }
                      active={true}
                    />
                  ) : loading ? (
                    <Skeleton.Image
                      style={
                        isDesktopScreen
                          ? { width: 240, height: 256 }
                          : { width: 160, height: 240 }
                      }
                      active={loading}
                    />
                  ) : (
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
                  )}
                </div>
              ))}
            </div>

            <h1 className="flex justify-end text-xs md:text-sm -mt-2 ">
              Total Data :
              <span className="font-semibold ml-1"> {stores?.length}</span>
            </h1>
            <div className="flex justify-center items-center mt-5 mb-2">
              {isFetching ? (
                <Skeleton.Input size="default" active={true} />
              ) : (
                <div className="flex">
                  {pageNumber?.map((item, i) => (
                    <div key={i}>
                      <button
                        className={`rounded-sm  w-10 h-8 md:w-12 md:h-8  hover:bg-indigo-500  hover:text-white text-black text-sm flex justify-center items-center`}
                        onClick={() => {
                          setPage(item);
                        }}
                      >
                        {item}
                      </button>
                    </div>
                  ))}
                  {/* <PaginationComponent
                    activePrev={activePrev}
                    activeNext={activeNext}
                    totalData={stores?.length}
                    page={page}
                    titlePrev={page}
                    titleNext={page + 1}
                    onClickPrev={handlePrev}
                    onClickNext={handleNext}
                  /> */}
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </Layout>
  );
};

export default Dashboard;
