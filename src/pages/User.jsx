import Layout from "./layout/Index";
import CardHeaderComponent from "../components/CardHeader";
import { Empty, Skeleton, Spin } from "antd";
import List from "../components/List";
import { useUsersQuery } from "../hooks/useUsersQuery";
import Cat from "../assets/cat-run.gif";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import ModalComponent from "../components/Modal";
import useLocalStorage from "../hooks/useLocalStorage";
import LabelComponent from "../components/Label";
import InputComponent from "../components/Input";
import SelectComponent from "../components/Select";
import ButtonComponent from "../components/Button";
import Swal from "sweetalert2";
import AvatarUser from "../assets/man.png";
// import { selectDarkMode } from "../redux/features/themeslice";
// import { useSelector } from "react-redux";

const Avatar = "https://gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50";

export default function User() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const params = useParams();
  const [loading, setLoading] = useState(false);

  const [detail, setDetail] = useState([]);
  const [cities, setCities] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [villages, setVillages] = useState([]);
  const [provinces, setProvinces] = useState([]);
  const [fullname, setFullname] = useLocalStorage("username");
  const [phoneNumber, setPhoneNumber] = useState(0);
  const [password, setPassword] = useState("");
  const [number, setNumber] = useState("");
  const [saving, setSaving] = useState(false);

  const [searchItem, setSearchItem] = useState("");
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [theme, setTheme] = useLocalStorage("theme");

  useEffect(() => {
    const getAllData = async () => {
      const resp = await fetch(`https://jsonplaceholder.typicode.com/users`);
      const results = await resp.json();
      setDetail(results);
      setFilteredUsers(results);
    };
    getAllData();
  }, []);

  const handleSearchInputChange = (e) => {
    setLoading(true);
    const searchTerm = e.target.value;
    setSearchItem(searchTerm);

    const filteredItems = data.filter(
      (user) =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    setFilteredUsers(filteredItems);
    setLoading(false);
  };

  /* Get User By Id */
  useEffect(() => {
    setLoading(true);
    /* Edit User By Id */
    if (params.id !== undefined) {
      const getDataById = async () => {
        const resp = await fetch(
          `https://jsonplaceholder.typicode.com/users/${params.id}`
        );
        const results = await resp.json();
        setDetail(results);

        setFullname(results.name);
        setPhoneNumber(results.phone);
        setPassword(results.email);
        setNumber(results.website);
      };
      getDataById();
    }
    setLoading(false);
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
    return navigate(`/user/${e}`);
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

  const handleDelete = ({ user }) => {
    Swal.fire({
      title: "Are you sure?",
      html:
        "<p style='font-size: 16px'> The user " +
        "<span style='font-weight: 700'>" +
        user.name +
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

  const { data, isFetching, isLoading, error } = useUsersQuery();

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
        <CardHeaderComponent title="Users" />
      </div>

      <div className="mt-5 flex items-center justify-between">
        <div></div>
        <div className="flex items-center justify-between bg-red-200">
          <InputComponent
            className="!w-40 md:w-56"
            placeholder="Search .."
            value={searchItem}
            onChange={handleSearchInputChange}
          />
        </div>
      </div>
      <div className="grid grid-cols-1 ">
        {loading ? (
          <Spin className="mt-10" />
        ) : (
          <>
            {filteredUsers.length === 0 ? (
              <Empty className="mt-14" />
            ) : (
              <ul>
                <Skeleton loading={isFetching} active avatar>
                  {filteredUsers.map((user, index) => (
                    <div
                      key={user.id}
                      className="w-full h-20 mt-5 border-b-[1px]"
                    >
                      <List
                        number={index + 1}
                        tooltip={
                          "https://www.google.com/maps/dir/" +
                          user.address.geo.lat +
                          "," +
                          user.address.geo.lng
                        }
                        onClickGmaps={() =>
                          window.open(
                            "https://www.google.com/maps/dir/" +
                              user.address.geo.lat +
                              "," +
                              user.address.geo.lng,
                            "_blank"
                          )
                        }
                        image={user.image ? user.image : AvatarUser}
                        description={user.email}
                        title={user.name}
                        location={user.address.city}
                        onClick={() => showModal(user.id)}
                        onClickDelete={() => handleDelete({ user })}
                      />
                    </div>
                  ))}
                </Skeleton>
              </ul>
            )}
          </>
        )}

        {/* Modal */}
        <ModalComponent open={open} onOk={handleSave} onCancel={handleCancel}>
          <div className="gap-y-4">
            <h1 className="font-semibold text-lg">Edit User</h1>
            {loading ? (
              <div className="flex justify-center items-center h-56">
                <Spin />
              </div>
            ) : (
              <div className="w-full max-w-lg mt-5">
                <div className="flex flex-wrap -mx-3 mb-6">
                  <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                    <LabelComponent label={"Full Name"} />
                    <input
                      className="appearance-none text-xs block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                      type="text"
                      value={fullname}
                      onChange={(e) => setFullname(e.target.value)}
                    />
                    <p className="text-red-500 text-xs italic">
                      Please fill out this field.
                    </p>
                  </div>
                  <div className="w-full md:w-1/2 px-3">
                    <LabelComponent label={"Phone Number"} />
                    <InputComponent
                      type="text"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                    />
                  </div>
                </div>
                <div className="flex flex-wrap -mx-3 mb-6 ">
                  <div className="w-full px-3 ">
                    <LabelComponent label={"Password"} />
                    <InputComponent
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
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
                      value={number}
                      onChange={(e) => setNumber(e.target.value)}
                    />
                  </div>
                </div>
                <div className="flex justify-end">
                  <ButtonComponent
                    className="py-1"
                    disabled={loading}
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
