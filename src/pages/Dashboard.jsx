import Layout from "./layout/Index";
import { useQuery } from "@tanstack/react-query";
import CarouselComponent from "../components/Carousel";
import StoreComponent from "../components/Store";
import Cat from "../assets/cat-run.gif";
import ButtonComponent from "../components/Button";
import { useNavigate } from "react-router-dom";
import useLocalStorage from "../hooks/useLocalStorage";
import { useEffect } from "react";

export default function Dashboard() {
  const navigate = useNavigate();
  const [username, setUsername] = useLocalStorage("username", []);
  const { error, isFetching, isLoading } = useQuery({
    queryKey: ["repoData"],
    queryFn: () =>
      fetch("https://fakestoreapi.com/products").then((res) => res.json()),
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

  // if (username.length === 0) {
  //   useEffect(() => {
  //     return navigate("/login");
  //   }, [username]);
  // }

  return (
    <Layout>
      <div className="p-5 md:p-9">
        <div>
          <CarouselComponent />
        </div>
        <div className="h-auto pt-2 md:pt-10">
          <StoreComponent title="Store" />
          <div className="flex justify-center items-center">
            <ButtonComponent
              onClick={() => navigate("/store")}
              className="bg-indigo-500 uppercase text-xs p-2 md:text-sm"
            >
              View All
            </ButtonComponent>
          </div>
        </div>
      </div>
    </Layout>
  );
}
