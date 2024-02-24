import Layout from "./layout/Index";
import ListComponent from "../components/List";
// import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import CardHeaderComponent from "../components/CardHeader";

// const { isPending, error, data } = useQuery({
//   queryKey: ["repoData"],
//   queryFn: () => fetch(BASE_URL).then((res) => res.json()),
// });

export default function Store() {
  const count = 5;
  const BASE_URL = `https://randomuser.me/api/?results=${count}&inc=name,gender,email,nat,picture&noinfo`;

  const [initLoading, setInitLoading] = useState(true);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [list, setList] = useState([]);

  useEffect(() => {
    fetch(BASE_URL)
      .then((res) => res.json())
      .then((res) => {
        setInitLoading(false);
        setData(res.results);
        setList(res.results);
      });
  }, []);

  const onLoadMore = () => {
    setLoading(true);
    setList(
      data.concat(
        [...new Array(count)].map(() => ({
          loading: true,
          name: {},
          picture: {},
        }))
      )
    );
    fetch(BASE_URL)
      .then((res) => res.json())
      .then((res) => {
        const newData = data.concat(res.results);
        setData(newData);
        setList(newData);
        setLoading(false);
        // window.dispatchEvent(new Event('resize'));
      });
  };

  return (
    <Layout>
      <div className="p-9">
        <CardHeaderComponent title="Stores" />
        <ListComponent
          dataSource={list}
          BASE_URL={BASE_URL}
          loading={loading}
          initLoading={initLoading}
          onLoadMore={onLoadMore}
        />
      </div>
    </Layout>
  );
}
