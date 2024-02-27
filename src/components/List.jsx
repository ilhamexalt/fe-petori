import React from "react";
import { List } from "antd";
import ButtonComponent from "./Button";
import { useLocation } from "react-router-dom";

export default function ListComponent({
  dataSource,
  initLoading,
  loading,
  onLoadMore,
  renderItem,
}) {
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

  return (
    <>
      <List
        className="demo-loadmore-list"
        loading={initLoading}
        itemLayout="horizontal"
        loadMore={loadMore}
        dataSource={dataSource}
        renderItem={renderItem}
      />
    </>
  );
}
