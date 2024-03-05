import React from "react";
import Layout from "./layout/Index";
import useLocalStorage from "../hooks/useLocalStorage";
import ButtonComponent from "../components/Button";
import Swal from "sweetalert2";
import { IoSettingsSharp } from "react-icons/io5";
import { Link } from "react-router-dom";

export default function Profile() {
  const [username, setUsername] = useLocalStorage("username");
  return (
    <Layout className="!p-0">
      <main className="profile-page">
        <section className="relative block h-96 md:h-[500px]">
          <div
            className="absolute top-0 w-full h-full bg-center bg-cover"
            style={{
              backgroundImage: `url('https://images.unsplash.com/photo-1562705859-72842cf88fd1?q=80&w=1633&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')`,
            }}
          >
            <span
              id="blackOverlay"
              className="w-full h-full absolute opacity-50 bg-black"
            ></span>
          </div>
          <div
            className="top-auto bottom-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden h-[70px]"
            style={{ transform: "translateZ(0)" }}
          ></div>
        </section>
        <section className="relative py-16">
          <div className="container mx-auto px-4">
            <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg -mt-64">
              <div className="px-6">
                <div className="flex flex-wrap justify-center">
                  <div className="w-full lg:w-3/12 px-4 lg:order-2 flex justify-center">
                    <div className="relative">
                      <img
                        alt="..."
                        src="https://demos.creative-tim.com/notus-js/assets/img/team-2-800x800.jpg"
                        className="shadow-xl rounded-full h-auto align-middle border-none absolute -m-16 -ml-20 lg:-ml-16 max-w-[150px]"
                      />
                    </div>
                  </div>
                  <div className="w-full lg:w-4/12 px-4 lg:order-3 lg:text-right lg:self-center">
                    <div className="py-6 px-3 mt-24 sm:mt-0 flex items-center gap-x-5">
                      <ButtonComponent
                        className="bg-indigo-500 w-full md:w-40 active:bg-indigo-600 uppercase text-white font-bold hover:shadow-md shadow text-xs px-4 py-2 rounded outline-none focus:outline-none sm:mr-2 mb-1 ease-linear transition-all duration-150"
                        type="button"
                        onClick={() =>
                          Swal.fire({
                            icon: "success",
                            text: "Profile Updated",
                          })
                        }
                      >
                        Update Profile
                      </ButtonComponent>
                      <Link to="/setting" className="hidden md:block">
                        <IoSettingsSharp />
                      </Link>
                    </div>
                  </div>
                  <div className="w-full lg:w-4/12 px-4 lg:order-1">
                    <div className="flex justify-center py-4 lg:pt-4 gap-3">
                      <div className="text-center min-w-20">
                        <span className="text-xl font-bold block uppercase tracking-wide text-gray-600">
                          22
                        </span>
                        <span className="text-sm text-gray-400">Orders</span>
                      </div>
                      <div className="text-center min-w-20">
                        <span className="text-xl font-bold block uppercase tracking-wide text-gray-600">
                          10
                        </span>
                        <span className="text-sm text-gray-400">Photos</span>
                      </div>
                      <div className="text-center min-w-20">
                        <span className="text-xl font-bold block uppercase tracking-wide text-gray-600">
                          89
                        </span>
                        <span className="text-sm text-gray-400">Comments</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="text-center md:mt-4 pb-6">
                  <h3 className="text-xl font-semibold leading-normal mb-2 text-gray-700 capitalize">
                    {username}
                  </h3>
                  <div className="text-sm leading-normal mt-0 mb-2 text-gray-400 font-bold uppercase">
                    <i className="fas fa-map-marker-alt mr-2 text-lg text-gray-400"></i>
                    Location
                  </div>
                  <div className="mb-2 text-gray-600 mt-4">
                    <i className="fas fa-briefcase mr-2 text-lg text-gray-400"></i>
                    Store Name
                  </div>
                  <div className="mb-2 text-gray-600">
                    <i className="fas fa-university mr-2 text-lg text-gray-400"></i>
                    Phone Number
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}
