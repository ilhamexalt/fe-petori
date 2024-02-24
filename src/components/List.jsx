import React from "react";
import { Button, List, Skeleton } from "antd";
import { MdLocationOn, MdOutlinePets } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";
import { GrView } from "react-icons/gr";
import { Link } from "react-router-dom";
import ButtonComponent from "./Button";

export default function ListComponent({
  dataSource,
  initLoading,
  loading,
  onLoadMore,
}) {
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
        <ButtonComponent
          onClick={onLoadMore}
          className="bg-indigo-500 hover:ring-indigo-500"
        >
          Show More
        </ButtonComponent>
      </div>
    ) : null;
  return (
    <>
      <List
        className="demo-loadmore-list"
        loading={initLoading}
        itemLayout="horizontal"
        loadMore={loadMore}
        dataSource={dataSource}
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
                avatar={<MdOutlinePets size={35} />}
                title={
                  <Link
                    to={null}
                    className="text-sm md:text-base md:font-semibold capitalize"
                  >
                    Store Name
                  </Link>
                }
                description="Description .."
              />
              <div className="flex items-center gap-2 capitalize">
                <MdLocationOn /> Location
              </div>
            </Skeleton>
          </List.Item>
        )}
      />
    </>
  );
}
