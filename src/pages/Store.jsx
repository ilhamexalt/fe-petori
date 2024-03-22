import Layout from "./layout/Index";
import CardHeaderComponent from "../components/CardHeader";
import { Skeleton } from "antd";
import { Link, useNavigate, useParams } from "react-router-dom";
import Cat from "../assets/cat-run.gif";
import { useEffect, useState } from "react";
import List from "../components/List";
import { useStoresQuery } from "../hooks/UseStoresQuery";
import useLocalStorage from "../hooks/useLocalStorage";
import ModalComponent from "../components/Modal";
import InputComponent from "../components/Input";
import { IoMdAddCircle } from "react-icons/io";
import LabelComponent from "../components/Label";
import SelectComponent from "../components/Select";
import ButtonComponent from "../components/Button";
import Swal from "sweetalert2";

export default function Store() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const params = useParams();
  const [loading, setLoading] = useState(false);
  const [detail, setDetail] = useState([]);
  const [cities, setCities] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [villages, setVillages] = useState([]);
  const [provinces, setProvinces] = useState([]);
  const [username, setUsername] = useLocalStorage("username");
  const [storeName, setStoreName] = useState("");
  const [saving, setSaving] = useState(false);
  const [theme, setTheme] = useLocalStorage("theme");

  /* Get Store By Id */
  useEffect(() => {
    setLoading(true);
    if (params.id !== undefined) {
      const getData = async () => {
        const resp = await fetch(
          `https://fakestoreapi.com/products/${params.id}`
        );
        const results = await resp.json();
        setDetail(results);
      };
      getData();
    }
    setStoreName("");
    setTimeout(() => {
      setLoading(false);
    }, 1000);
    window.scrollTo(0, 0);
  }, [params]);

  /* Get State */
  useEffect(() => {
    const fetchData = async () => {
      const data = await fetch(
        "https://www.emsifa.com/api-wilayah-indonesia/api/provinces.json"
      );
      const results = await data.json();
      setProvinces(results);
    };
    fetchData();
  }, []);

  /* Get Cities*/
  const handleChangeState = (e) => {
    const provinceId = e.target.value;
    fetch(
      `https://www.emsifa.com/api-wilayah-indonesia/api/regencies/${provinceId}.json`
    )
      .then((response) => response.json())
      .then((provincies) => setCities(provincies));
  };

  /* Get District*/
  const handleChangeCity = (e) => {
    const regencyId = e.target.value;
    fetch(
      `https://www.emsifa.com/api-wilayah-indonesia/api/districts/${regencyId}.json`
    )
      .then((response) => response.json())
      .then((regencies) => setDistricts(regencies));
  };

  /* Get Village*/
  const handleChangeDistrict = (e) => {
    const villageId = e.target.value;
    fetch(
      `https://www.emsifa.com/api-wilayah-indonesia/api/villages/${villageId}.json`
    )
      .then((response) => response.json())
      .then((villagies) => setVillages(villagies));
  };

  const showModal = (e) => {
    setOpen(true);
    if (!e) return null;
    return navigate(`/store/${e}`);
  };

  const handleSave = () => {
    setSaving(true);
    //call api post
    setTimeout(() => {
      setSaving(false);
      setOpen(false);
      Swal.fire({
        icon: "success",
        title: "Success",
        text: "Your store has been created!",
      });
    }, 1000);
  };

  const handleDelete = ({ store }) => {
    Swal.fire({
      title: "Are you sure?",
      html:
        "<p style='font-size: 16px'> The store " +
        "<span style='font-weight: 700'>" +
        store.category +
        "</span>" +
        " will deleted </p>",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success",
        });
      }
    });
  };

  const handleCancel = () => {
    setOpen(false);
  };

  //hooks get all data store
  const { data, error, isLoading, isFetching } = useStoresQuery();

  if (isLoading)
    return (
      <div
        className={
          theme === "dark"
            ? "bg-gray-800 text-gray-300 flex justify-center items-center min-h-screen"
            : "bg-white flex justify-center items-center min-h-screen"
        }
      >
        <img src={Cat} alt={"loading"} width={300} />
      </div>
    );

  if (error) return "An error has occurred: " + error.message;

  return (
    <Layout className={theme === "dark" ? "bg-gray-800 text-gray-300" : ""}>
      <div className="mt-16 md:mt-32 ">
        <CardHeaderComponent title="Stores" />
      </div>
      <div className="mt-5 flex items-center justify-between">
        {/* nanti ganti role */}
        {username !== "admin" && (
          <Link
            onClick={showModal}
            className="text-indigo-500 text-xs md:text-base flex items-center gap-1 pl-2 pr-2 md:pl-5 md:pr-5"
          >
            <IoMdAddCircle /> Store
          </Link>
        )}
        <div></div>
        <InputComponent
          className="!w-40 md:w-56"
          placeholder="Search .."
          onChange={null}
        />
      </div>
      <div className="grid grid-cols-1 ">
        <Skeleton loading={isFetching} active avatar>
          {/* IF ADMIN FETCH ALL STORE, IF OWNER FETCH STORE BY ID */}
          {data.map((store, index) => (
            <div key={store.id} className="w-full h-20 mt-5 border-b-[1px]">
              <List
                tooltip={
                  "https://www.google.com/maps/dir/" + store.id + "," + store.id
                }
                onClickGmaps={() =>
                  window.open(
                    "https://www.google.com/maps/dir/" +
                      store.price +
                      "," +
                      store.price,
                    "_blank"
                  )
                }
                number={index + 1}
                to={`https://hello-iam.netlify.app`}
                image={store.image}
                description={store.description}
                title={store.category}
                location={store.price}
                onClick={() => showModal(store.id)}
                onClickDelete={() => handleDelete({ store })}
              />
            </div>
          ))}
        </Skeleton>

        <ModalComponent open={open} onOk={handleSave} onCancel={handleCancel}>
          <div className="gap-y-4">
            <h1 className="font-semibold text-lg">
              {params.id !== undefined ? "Edit" : "Add"} Store
            </h1>
            {loading ? (
              <div className="flex justify-center items-center h-56">
                <div className="loader-univ"> </div>
              </div>
            ) : (
              <div className="w-full max-w-lg mt-5">
                <div className="flex flex-wrap -mx-3 mb-6">
                  <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                    <LabelComponent label={"Store Name"} />
                    <input
                      className="appearance-none text-xs block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                      type="text"
                      value={
                        params.id !== undefined ? detail.category : storeName
                      }
                      onChange={(e) => setStoreName(e.target.value)}
                    />
                    <p className="text-red-500 text-xs italic">
                      Please fill out this field.
                    </p>
                  </div>
                  <div className="w-full md:w-1/2 px-3">
                    <LabelComponent label={"Owner Name"} />
                    <InputComponent
                      value={username}
                      type="text"
                      placeholder="Dummy"
                      onChange={(e) => setUsername(e.target.value)}
                    />
                  </div>
                </div>
                <div className="flex flex-wrap -mx-3 mb-6">
                  <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                    <LabelComponent label={"Service"} />
                    <InputComponent
                      value={params.id !== undefined ? detail.title : storeName}
                      type="text"
                      placeholder="Dummy"
                      onChange={(e) => setCities(e.target.value)}
                    />
                  </div>
                  <div className="w-full md:w-1/2 px-3">
                    <LabelComponent label={"Location"} />
                    <InputComponent
                      value={params.id !== undefined ? detail.price : storeName}
                      type="text"
                      placeholder="Dummy"
                      onChange={(e) => setCities(e.target.value)}
                    />
                  </div>
                </div>

                {/* Dropdown*/}
                <div className="flex flex-wrap -mx-3 mb-0 md:mb-6">
                  <SelectComponent onChange={handleChangeState} label={"State"}>
                    {provinces.map((province) => (
                      <option key={province.id} value={province.id}>
                        {province.name}
                      </option>
                    ))}
                  </SelectComponent>
                  <SelectComponent onChange={handleChangeCity} label={"City"}>
                    {cities.map((city) => (
                      <option key={city.id} value={city.id}>
                        {city.name}
                      </option>
                    ))}
                  </SelectComponent>

                  <SelectComponent
                    onChange={handleChangeDistrict}
                    label={"District"}
                  >
                    {districts.map((district) => (
                      <option key={district.id} value={district.id}>
                        {district.name}
                      </option>
                    ))}
                  </SelectComponent>
                </div>

                <div className="flex flex-wrap -mx-3 mb-3">
                  <SelectComponent onChange={null} label={"Village"}>
                    {villages.map((village) => (
                      <option key={village.id} value={village.id}>
                        {village.name}
                      </option>
                    ))}
                  </SelectComponent>
                  {/* End Dropdown*/}

                  <div className="w-full md:w-2/3 px-3 mb-6 ">
                    <LabelComponent label={"Number"} />
                    <InputComponent
                      type="text"
                      placeholder="Dummy"
                      onChange={(e) => setCities(e.target.value)}
                    />
                  </div>
                  <div className="w-full px-3 mb-6 md:mb-0">
                    <LabelComponent label={"Description"} />
                    <InputComponent
                      type="text"
                      placeholder="Dummy"
                      onChange={(e) => setCities(e.target.value)}
                    />
                  </div>
                </div>

                <div className="flex justify-end">
                  <ButtonComponent
                    className="py-1"
                    disabled={isLoading}
                    type="submit"
                    onClick={handleSave}
                  >
                    {saving ? "Saving..." : "Save"}
                  </ButtonComponent>
                </div>
              </div>
            )}
          </div>
        </ModalComponent>
      </div>
    </Layout>
  );
}
