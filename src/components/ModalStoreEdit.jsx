import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ButtonComponent from "./Button";
import Swal from "sweetalert2";
import { MdOutlineDelete } from "react-icons/md";
import { RxUpdate } from "react-icons/rx";
import InputComponent from "./Input";
import SelectComponent from "./Select";
import LabelComponent from "./Label";

export default function ModalStoreEdit() {
  const params = useParams();
  const [loading, setLoading] = useState(false);
  const [detail, setDetail] = useState([]);
  const [cities, setCities] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [villages, setVillages] = useState([]);
  const [provinces, setProvinces] = useState([]);

  /* Get Store By Id */
  const getData = async () => {
    const resp = await fetch(`https://fakestoreapi.com/products/${params.id}`);
    const results = await resp.json();
    setDetail(results);
  };
  useEffect(() => {
    setLoading(true);
    getData();
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

  return (
    <div className="gap-y-4">
      <h1 className="font-semibold text-lg">Edit Store</h1>
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
                value={detail.category}
                onChange={(e) => setCities(e.target.value)}
              />
              <p className="text-red-500 text-xs italic">
                Please fill out this field.
              </p>
            </div>
            <div className="w-full md:w-1/2 px-3">
              <LabelComponent label={"Owner Name"} />
              <InputComponent
                type="text"
                placeholder="Dummy"
                onChange={(e) => setCities(e.target.value)}
              />
            </div>
          </div>
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
              <LabelComponent label={"Service"} />
              <InputComponent
                type="text"
                placeholder="Dummy"
                onChange={(e) => setCities(e.target.value)}
              />
            </div>
            <div className="w-full md:w-1/2 px-3">
              <LabelComponent label={"Location"} />
              <InputComponent
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

            <SelectComponent onChange={handleChangeDistrict} label={"District"}>
              {districts.map((district) => (
                <option key={district.id} value={district.id}>
                  {district.name}
                </option>
              ))}
            </SelectComponent>
          </div>

          <div className="flex flex-wrap -mx-3 mb-6">
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
        </div>
      )}
    </div>
  );
}
