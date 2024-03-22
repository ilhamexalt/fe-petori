import Layout from "./layout/Index";
import CarouselComponent from "../components/Carousel";
import Cat from "../assets/cat-run.gif";
import ButtonComponent from "../components/Button";
import { useNavigate } from "react-router-dom";
import useLocalStorage from "../hooks/useLocalStorage";
import { useStoresQuery } from "../hooks/UseStoresQuery";
import { Empty, Skeleton } from "antd";
import CardStoreComponent from "../components/CardStore";
import { useMediaQuery } from "react-responsive";
import { useEffect, useState } from "react";

export default function Dashboard() {
  const navigate = useNavigate();
  const [username, setUsername] = useLocalStorage("username", []);
  const [count, setCount] = useState(10);
  const { error, isFetching, isLoading } = useStoresQuery(count);
  const [data, setData] = useState([]);
  const [loadingShow, setLoadingShow] = useState(false);
  const [theme, setTheme] = useLocalStorage("theme");

  useEffect(() => {
    const getStores = async () => {
      const getData = await fetch(
        `https://fakestoreapi.com/products?limit=${count}`
      );
      const results = await getData.json();
      setData(results);
    };
    getStores();
  }, []);

  const isDesktopScreen = useMediaQuery({
    query: "(min-width: 1224px)",
  });

  if (isLoading)
    return (
      <div className="flex justify-center items-center min-h-screen">
        <img src={Cat} alt={"loading"} width={300} />
      </div>
    );

  if (error)
    return (
      <div className="flex justify-center items-center min-h-screen">
        An error has occurred: {error.message}
      </div>
    );

  const handleShowAll = async () => {
    setLoadingShow(true);
    setCount(count + 5);
    const newCount = count + 5;
    const getData = await fetch(
      `https://fakestoreapi.com/products?limit=${newCount}`
    );
    const results = await getData.json();
    setData(results);
    setLoadingShow(false);
  };

  return (
    <Layout>
      <div className="mt-16 md:mt-32">
        <CarouselComponent />
      </div>
      <div className="h-auto pt-2 md:pt-10">
        {/* FETCH ALL STORE */}
        {username.length === 0 ? (
          <Empty />
        ) : (
          <>
            <h1 className="font-bold text-base md:text-2xl text-center mb-2">
              STORES
            </h1>

            <div className="grid grid-cols-2 md:grid-cols-5 gap-5 md:gap-10 justify-items-center mb-5 md:mb-10 ">
              {data.map((item, i) => (
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
                  ) : (
                    <CardStoreComponent
                      onClick={() => navigate(`/storedetail/${item.id}`)}
                      src={item.image}
                      category={item.category}
                      price={item.price}
                    />
                  )}
                  {/* {loadingShow && item * 2 && (
                      <Spin className="flex justify-center mt-5" />
                    )} */}
                </div>
              ))}
            </div>

            <h1 className="flex justify-end text-xs md:text-sm -mt-2">
              Total Data : {count}
            </h1>
            <div className="flex justify-center items-center mt-5 mb-2">
              {isFetching ? (
                <Skeleton.Input size="default" active={true} />
              ) : (
                <ButtonComponent
                  onClick={() => handleShowAll()}
                  className="bg-indigo-500 uppercase text-xs p-2 md:text-sm"
                >
                  {/*  fungsi button perlu dicek lagi, karena data nya gapake react query */}
                  {loadingShow ? "Loading..." : "View All"}
                </ButtonComponent>
              )}
            </div>
          </>
        )}
      </div>
    </Layout>
  );
}
