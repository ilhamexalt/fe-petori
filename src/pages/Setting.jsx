import { Divider } from "antd";
import Layout from "./layout/Index";

export default function Setting() {
  return (
    <Layout>
      <div className="mt-16 md:mt-32">
        <div>
          <h1 className="text-sm md:text-lg font-semibold">
            Language and dates
          </h1>
          <p className="text-xs md:text-base text-justify text-gray-500">
            Choose what language and date format to use throughout your account.
          </p>
          <Divider />
          <div className="flex justify-between mb-5 text-xs md:text-base ">
            <div className="min-w-36">
              <p className="">Language</p>
            </div>
            <div className="min-w-36">
              <p className="text-left">English</p>
            </div>
            <div className="w-20 px-2 py-1 flex justify-center items-center rounded-md text-white">
              <p className="text-indigo-500 font-semibold">Update</p>
            </div>
          </div>
          <div className="flex justify-between mb-5 text-xs md:text-base">
            <div className="min-w-36">
              <p className="">Date Format</p>
            </div>
            <div className="min-w-36">
              <p className="text-left">Automatic timezone</p>
            </div>
            <div className="w-20 px-2 py-1 flex justify-center items-center rounded-md text-white">
              <p className="text-indigo-500 font-semibold">Update</p>
            </div>
          </div>
          <div className="flex justify-between text-xs md:text-base">
            <div className="">
              <p className="font-semibold ">Delete account</p>
            </div>

            <div>
              <div className="bg-red-500 w-20 px-2 py-1 flex justify-center items-center rounded-md text-white">
                <p className="font-semibold">Delete</p>
              </div>
            </div>
          </div>
          <div className="max-w-60 md:max-w-80 text-justify text-xs md:text-base">
            <p className="text-gray-500">
              No longer want to use our service? You can delete your account
              here. This action is not reversible. All information related to
              this account will be deleted permanently.
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
}
