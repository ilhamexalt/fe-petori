import Layout from "./layout/Index";
import CardHeaderComponent from "../components/CardHeader";
import { Skeleton } from "antd";
import StoreList from "../components/StoreList";
import { useStoresQuery } from "../hooks/UseStoresQuery";
import Cat from "../assets/cat-run.gif";

export default function User() {
  const { data, isFetching, isLoading, error } = useStoresQuery();

  if (isLoading)
    return (
      <div className="flex justify-center items-center min-h-screen">
        <img src={Cat} alt={"loading"} width={300} />
      </div>
    );

  if (error) return "An error has occurred: " + error.message;

  return (
    <Layout>
      <div className="mt-16 md:mt-32 ">
        <CardHeaderComponent title="Users" />
      </div>
      <div className="grid grid-cols-1 ">
        <Skeleton loading={isFetching} active avatar>
          {data.map((store) => (
            <div
              key={store.id}
              className="w-full h-20 flex justify-between px-3 items-center border-b-[1px]"
            >
              <StoreList
                image={store.image}
                description={store.description}
                title={store.category}
                onClick={() => showModal(store.id)}
              />
            </div>
          ))}
        </Skeleton>
      </div>
    </Layout>
  );
}
