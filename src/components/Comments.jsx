import { Divider } from "antd";
import Lion from "../assets/lion.png";

export default function CommentsComponent({ fullname, bodyComment }) {
  return (
    <div className="w-full px-5 py-3 shadow-md rounded-md">
      <div className="flex items-center gap-3 mb-2">
        <img
          src={Lion ? Lion : "https://via.placeholder.com/40"}
          className="rounded-full w-10"
        />
        <span className="font-bold text-sm text-indigo-500">{fullname}</span>
      </div>
      <div className=" mb-2 ">
        <Divider type="vertical" className="bg-gray-300 w-[1px]" />
        <span className="text-xs text-justify">{bodyComment}</span>
      </div>
      <div className="text-xs font-light flex justify-end">
        commented on {new Date().toDateString()}
      </div>
    </div>
  );
}
