import { useEffect, useState } from "react";
import Avatar from "../assets/avatar.png";

export default function OrderDetail({ data }) {
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    let result = 0;
    for (let i = 0; i < data.data.serviceDetails.length; i++) {
      result =
        data.data.serviceDetails[i].subTotal *
          data.data.serviceDetails[i].quantity +
        result;
      setTotalPrice(result);
    }
  }, [data]);

  return (
    <div className="py-14 px-4 md:px-6 2xl:px-20 2xl:container 2xl:mx-auto">
      <div className="flex justify-start item-start space-y-2 flex-col">
        <h1 className="text-lg  font-semibold leading-7 lg:leading-9 text-gray-800">
          {data?.data.orderHistory.invoiceNumber}
        </h1>
        <p className="text-xs  font-medium leading-6 text-gray-600">
          {data?.data.orderHistory.orderDate}
        </p>
      </div>
      <div className="mt-5 flex flex-col xl:flex-row jusitfy-center items-stretch w-full xl:space-x-8 space-y-4 md:space-y-6 xl:space-y-0">
        <div className="flex flex-col justify-start items-start w-full space-y-4 md:space-y-6 xl:space-y-8">
          <div className="flex flex-col justify-start items-start bg-gray-50 px-4 py-4 md:py-6 md:p-6 xl:p-8 w-full">
            <p className="text-base  font-semibold leading-6 xl:leading-5 text-gray-800">
              Order's History
            </p>
            <div className="mt-4 md:mt-6 flex flex-col md:flex-row justify-start items-start md:items-center md:space-x-6 xl:space-x-8 w-full">
              <div className="pb-4 md:pb-8 w-full md:w-40">
                <img
                  className="w-full hidden md:block"
                  src={Avatar}
                  alt="Order Photo"
                />
                <img
                  className="w-full md:hidden"
                  src={Avatar}
                  alt="Order Photo"
                />
              </div>

              <div className="border-b border-gray-200 md:flex-row flex-col flex justify-between items-start w-full pb-8 space-y-4 md:space-y-0">
                <table className="w-full text-sm text-justify">
                  <tbody>
                    {data?.data.serviceDetails.map((detail, index) => (
                      <tr key={index}>
                        <td className="py-1">{detail.service.serviceName}</td>
                        <td> {detail.quantity}</td>
                        <td className="text-right">
                          Rp.{" "}
                          {new Intl.NumberFormat("en-ID").format(
                            detail.subTotal
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <div className="flex justify-center flex-col md:flex-row  items-stretch w-full space-y-4 md:space-y-0 md:space-x-6 xl:space-x-8">
            <div className="flex flex-col px-4 py-6 md:p-6 xl:p-8 w-full bg-gray-50 space-y-6">
              <h3 className="text-base  font-semibold leading-5 text-gray-800">
                Summary
              </h3>
              <div className="flex justify-center items-center w-full space-y-4 flex-col border-gray-200 border-b pb-4">
                <div className="flex justify-between w-full">
                  <p className="text-sm  leading-4 text-gray-800">Subtotal</p>
                  <p className="text-sm  leading-4 text-gray-600">
                    Rp. {new Intl.NumberFormat("en-ID").format(totalPrice)}
                  </p>
                </div>

                <div className="flex justify-between items-center w-full">
                  <p className="text-sm  leading-4 text-gray-800">Shipping</p>
                  <p className="text-sm  leading-4 text-gray-600">Rp. 0 </p>
                </div>
              </div>
              <div className="flex justify-between items-center w-full">
                <p className="text-base  font-semibold leading-4 text-gray-800">
                  Total
                </p>
                <p className="text-base  font-semibold leading-4 text-gray-600">
                  Rp. {new Intl.NumberFormat("en-ID").format(totalPrice)}
                </p>
              </div>
            </div>
            <div className="flex flex-col justify-center px-4 py-6 md:p-6 xl:p-8 w-full bg-gray-50 space-y-6">
              <h3 className="text-base  font-semibold leading-5 text-gray-800">
                Shipping
              </h3>
              <div className="flex justify-between items-start w-full">
                <div className="flex justify-center items-center space-x-4">
                  <div className="w-8 h-8">
                    <img
                      className="w-full h-full"
                      alt="logo"
                      src="https://i.ibb.co/L8KSdNQ/image-3.png"
                    />
                  </div>
                  <div className="flex flex-col justify-start items-center">
                    <p className="text-sm leading-6  font-semibold text-gray-800">
                      Gojek Delivery
                      <br />
                      <span className="font-normal">
                        Delivery with 24 Hours
                      </span>
                    </p>
                  </div>
                </div>
                <p className="text-sm font-semibold leading-6  text-gray-800">
                  Rp. 0
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-gray-50 w-full xl:w-96 flex justify-between items-center md:items-start px-4 py-6 md:p-6 xl:p-8 flex-col">
          <h3 className="text-base  font-semibold leading-5 text-gray-800">
            Customer
          </h3>
          <div className="flex flex-col md:flex-row xl:flex-col justify-start items-stretch h-full w-full md:space-x-6 lg:space-x-8 xl:space-x-0">
            <div className="flex flex-col justify-start items-start flex-shrink-0">
              <div className="flex justify-center w-full md:justify-start items-center space-x-4 py-8 border-b border-gray-200">
                <img
                  src="https://i.ibb.co/5TSg7f6/Rectangle-18.png"
                  alt="avatar"
                />
                <div className="flex justify-start items-start flex-col space-y-2">
                  <p className="text-sm  font-semibold leading-4 text-left text-gray-800">
                    {data?.data.customer.fullname}
                  </p>
                  <p className="text-xs  leading-5 text-gray-600">
                    10 Previous Orders
                  </p>
                </div>
              </div>

              <div className="flex justify-center text-gray-800  md:justify-start items-center space-x-4 py-4 border-b border-gray-200 w-full">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M19 5H5C3.89543 5 3 5.89543 3 7V17C3 18.1046 3.89543 19 5 19H19C20.1046 19 21 18.1046 21 17V7C21 5.89543 20.1046 5 19 5Z"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M3 7L12 13L21 7"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <p className="cursor-pointer text-xs leading-5 ">
                  {data?.data.customer.email}
                </p>
              </div>
            </div>
            <div className="flex justify-between xl:h-full items-stretch w-full flex-col mt-6 md:mt-0">
              <div className="flex justify-center md:justify-start xl:flex-col flex-col md:space-x-6 lg:space-x-8 xl:space-x-0 space-y-4 xl:space-y-12 md:space-y-0 md:flex-row items-center md:items-start">
                <div className="flex justify-center md:justify-start items-center md:items-start flex-col space-y-4 xl:mt-8">
                  <p className="text-sm  font-semibold leading-4 text-center md:text-left text-gray-800">
                    Shipping Address
                  </p>
                  <p className="w-48 lg:w-full uppercase xl:w-48 text-center md:text-left text-xs leading-5 text-gray-600">
                    {data?.data.customer.address}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
