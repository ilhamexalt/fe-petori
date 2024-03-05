import React from "react";
import { List } from "antd";
import ButtonComponent from "./Button";
import { useLocation } from "react-router-dom";

export default function ListComponent({ initLoading, loading, onLoadMore }) {
  const location = useLocation();
  const loadMore =
    !initLoading && !loading ? (
      <div
        style={{
          textAlign: "center",
          marginTop: 12,
          height: 32,
          lineHeight: "32px",
        }}
      >
        {location.pathname !== "/store" && (
          <ButtonComponent
            onClick={onLoadMore}
            className="bg-indigo-500 hover:ring-indigo-500"
          >
            Show More
          </ButtonComponent>
        )}
      </div>
    ) : null;

  //   const count = 5;
  // const BASE_URL = `https://randomuser.me/api/?results=${count}&inc=name,gender,email,nat,picture&noinfo`;

  // const [initLoading, setInitLoading] = useState(true);
  // const [loading, setLoading] = useState(false);
  // const [data, setData] = useState([]);
  // const [list, setList] = useState([]);

  // useEffect(() => {
  //   fetch(BASE_URL)
  //     .then((res) => res.json())
  //     .then((res) => {
  //       setInitLoading(false);
  //       setData(res.results);
  //       setList(res.results);
  //     });
  // }, []);

  // const onLoadMore = () => {
  //   setLoading(true);
  //   setList(
  //     data.concat(
  //       [...new Array(count)].map(() => ({
  //         loading: true,
  //         name: {},
  //         picture: {},
  //       }))
  //     )
  //   );
  //   fetch(BASE_URL)
  //     .then((res) => res.json())
  //     .then((res) => {
  //       const newData = data.concat(res.results);
  //       setData(newData);
  //       setList(newData);
  //       setLoading(false);
  //       // window.dispatchEvent(new Event('resize'));
  //     });
  // };

  return (
    <>
      {/* <ListComponent
        dataSource={list}
        loading={loading}
        initLoading={initLoading}
        onLoadMore={onLoadMore}
        renderItem={(item) => (
          <List.Item
            actions={[
              <Link to={null} key="list-loadmore-edit">
                <FaRegEdit />
              </Link>,
              <Link to={null} key="list-loadmore-more">
                <GrView />
              </Link>,
            ]}
          >
            <Skeleton avatar title={false} loading={item.loading} active>
              <List.Item.Meta
                avatar={<Avatar src={item.picture.medium} />}
                title={
                  <Link
                    to={null}
                    className="text-sm md:text-base md:font-semibold capitalize"
                  >
                    {item.email}
                  </Link>
                }
                description={item.gender}
              />
              <div className="flex items-center gap-2 capitalize">
                <MdLocationOn /> Dummy
              </div>
            </Skeleton>
          </List.Item>
        )}
      /> */}
    </>
  );
}
