import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import LabelComponent from "./Label";

export default function ModalUserEdit({ title }) {
  const params = useParams();
  const [loading, setLoading] = useState(false);
  const [detail, setDetail] = useState([]);
  const [cities, setCities] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [villages, setVillages] = useState([]);
  const [provinces, setProvinces] = useState([]);

  /* Get Store By Id */
  useEffect(() => {
    setLoading(true);
    if (params.id !== undefined) {
      const getData = async () => {
        const resp = await fetch(
          `https://jsonplaceholder.typicode.com/users/${params.id}`
        );
        const results = await resp.json();
        setDetail(results);
      };
      getData();
    }
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
      <h1 className="font-semibold text-lg">{title} User</h1>
      {loading ? (
        <div className="flex justify-center items-center h-56">
          <div className="loader-univ"> </div>
        </div>
      ) : (
        <div className="w-full max-w-lg mt-5">
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full px-3 mb-6 md:mb-0">
              <LabelComponent label={"Name"} />
              <input
                className="appearance-none text-xs block w-full bg-gray-200 text-gray-700 border  rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                type="text"
                value={detail.name}
                onChange={(e) => setCities(e.target.value)}
              />
              <LabelComponent label={"Email"} />
              <input
                className="appearance-none text-xs block w-full bg-gray-200 text-gray-700 border  rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                type="email"
                value={detail.email}
                onChange={(e) => setCities(e.target.value)}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
