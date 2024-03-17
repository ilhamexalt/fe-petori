import Layout from "./layout/Index";
import CarouselComponent from "../components/Carousel";
import Cat from "../assets/cat-run.gif";
import ButtonComponent from "../components/Button";
import { useNavigate } from "react-router-dom";
import useLocalStorage from "../hooks/useLocalStorage";
import { useStoresQuery } from "../hooks/UseStoresQuery";
import { Empty, Skeleton } from "antd";
import CardStoreComponent from "../components/CardStore";

export default function Dashboard() {
  const navigate = useNavigate();
  const [username, setUsername] = useLocalStorage("username", []);
  const { data, error, isFetching, isLoading } = useStoresQuery();

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

  return (
    <Layout>
      <Skeleton loading={isFetching} active avatar>
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
                STORE
              </h1>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-5 md:gap-10 justify-items-center mb-5 md:mb-10 ">
                {data.map((item, i) => (
                  <div key={item.id}>
                    <CardStoreComponent
                      onClick={() => navigate(`/storedetail/${item.id}`)}
                      src={item.image}
                      category={item.category}
                      price={item.price}
                    />
                  </div>
                ))}
              </div>
              <div className="flex justify-center items-center">
                <ButtonComponent
                  onClick={() => navigate("/store")}
                  className="bg-indigo-500 uppercase text-xs p-2 md:text-sm"
                >
                  View All
                </ButtonComponent>
              </div>
            </>
          )}
        </div>
      </Skeleton>
    </Layout>
  );
}
