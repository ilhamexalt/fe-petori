import Layout from "./layout/Index";
import { useQuery } from "@tanstack/react-query";
import CarouselComponent from "../components/Carousel";
import StoreComponent from "../components/Store";
import Cat from "../assets/cat-run.gif";

export default function Dashboard() {
  const { isPending, error } = useQuery({
    queryKey: ["repoData"],
    queryFn: () =>
      fetch("https://fakestoreapi.com/products").then((res) => res.json()),
  });

  if (isPending)
    return (
      <div className="flex justify-center items-center min-h-screen">
        <img src={Cat} alt={"loading"} width={300} />
      </div>
    );

  if (error) return "An error has occurred: " + error.message;

  return (
    <Layout>
      <div className="p-5 md:p-9">
        <div>
          <CarouselComponent />
        </div>
        <div className="h-auto pt-2 md:pt-10">
          <StoreComponent />
        </div>
      </div>
    </Layout>
  );
}
