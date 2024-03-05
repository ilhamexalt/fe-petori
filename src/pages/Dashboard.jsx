import Layout from "./layout/Index";
import CarouselComponent from "../components/Carousel";
import Cat from "../assets/cat-run.gif";
import ButtonComponent from "../components/Button";
import { useNavigate } from "react-router-dom";
import useLocalStorage from "../hooks/useLocalStorage";
import StoreComponentNew from "../components/Store";
import { useStoresQuery } from "../hooks/UseStoresQuery";

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
      <div className="mt-16 md:mt-32">
        <CarouselComponent />
      </div>
      <div className="h-auto pt-2 md:pt-10">
        <h1 className="font-bold text-base md:text-2xl text-center mb-2">
          STORE
        </h1>
        {/* <Skeleton loading={isFetching} active avatar> */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-5 md:gap-10 justify-items-center mb-5 md:mb-10 ">
          {data.map((item, i) => (
            <div key={item.id}>
              <StoreComponentNew
                onClick={() => navigate(`/storedetail/${item.id}`)}
                src={item.image}
                category={item.category}
                price={item.price}
              />
            </div>
          ))}
        </div>
        {/* </Skeleton> */}
        <div className="flex justify-center items-center">
          <ButtonComponent
            onClick={() => navigate("/store")}
            className="bg-indigo-500 uppercase text-xs p-2 md:text-sm"
          >
            View All
          </ButtonComponent>
        </div>
      </div>
    </Layout>
  );
}
