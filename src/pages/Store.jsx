import Layout from "./layout/Index";
import CardHeaderComponent from "../components/CardHeader";
import { Divider, Empty, Skeleton, Spin } from "antd";
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
import StoreImage from "../assets/store.png";
import { MdOutlinePets } from "react-icons/md";
import { getStore } from "../services/service";
import { ExportAsExcel } from "react-export-table";

export default function Store() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const { id } = useParams();
  const [loading, setLoading] = useState(false);

  const [cities, setCities] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [villages, setVillages] = useState([]);
  const [provinces, setProvinces] = useState([]);

  const [fullname, setFullname] = useLocalStorage("fullName");
  const [isToken, setIstoken] = useLocalStorage("isToken");
  const [isRole, setIsRole] = useLocalStorage("isRole");
  const [isLogin, setIsLogin] = useLocalStorage("isLoggedIn");
  const [idStore, setIdStore] = useLocalStorage("idStore");

  const [paramIduser, setParamIdUser] = useLocalStorage("id");
  const [storeName, setStoreName] = useState("");
  const [ownerName, setOwnerName] = useState(fullname);
  const [location, setLocation] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [district, setDistrict] = useState("");
  const [village, setVillage] = useState("");
  const [number, setNumber] = useState("");
  const [description, setDescription] = useState("");
  const [saving, setSaving] = useState(false);
  const [stores, setStores] = useState([]);
  const [filteredStores, setFilteredStores] = useState([]);
  const [image, setImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [searchItem, setSearchItem] = useState("");
  const [storeId, setStoreId] = useState("");

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

  /* Get State*/
  const handleChangeState = (e) => {
    const provinceId = e.target.value;
    fetch(
      `https://www.emsifa.com/api-wilayah-indonesia/api/regencies/${provinceId}.json`
    )
      .then((response) => response.json())
      .then((provincies) => setCities(provincies));

    const data = provinces.find((prov) => prov.id === provinceId);
    setState(data.name);
  };

  /* Get Cities */
  const handleChangeCity = (e) => {
    const regencyId = e.target.value;
    fetch(
      `https://www.emsifa.com/api-wilayah-indonesia/api/districts/${regencyId}.json`
    )
      .then((response) => response.json())
      .then((regencies) => setDistricts(regencies));

    const data = cities.find((city) => city.id === regencyId);
    setCity(data.name);
  };

  /* Get Districts*/
  const handleChangeDistrict = (e) => {
    const villageId = e.target.value;
    fetch(
      `https://www.emsifa.com/api-wilayah-indonesia/api/villages/${villageId}.json`
    )
      .then((response) => response.json())
      .then((villagies) => setVillages(villagies));
    const data = districts.find((district) => district.id === villageId);
    setDistrict(data.name);
  };

  /* Get Villages */
  const handleChangeVillage = (e) => {
    const districtId = e.target.value;
    fetch(
      `https://www.emsifa.com/api-wilayah-indonesia/api/villages/${districtId}.json`
    )
      .then((response) => response.json())
      .then((villagies) => setVillages(villagies));
    const data = villages.find((vil) => vil.id === districtId);
    setVillage(data.name);
  };

  const showModal = async (id) => {
    setLoading(true);
    if (!id) {
      setOpen(true);
      setLoading(false);
    } else {
      setLoading(false);
      //call api store by id
      const store = await getStore(isToken, id);
      isRole === "Super Admin" && setOwnerName(store?.data.idUser);

      setStoreId(id);
      setStoreName(store?.data.storeName);
      setState(store?.data.address.split(",")[0]);
      setCity(store?.data.address.split(",")[1]);
      setDistrict(store?.data.address.split(",")[2]);
      setVillage(store?.data.address.split(",")[3]);
      setNumber(store?.data.address.split(",")[4]);
      setDescription(store?.data.description);
      setPreviewImage(store?.data.storeImage);
      setOpen(true);
      return navigate(`/store/${id}`);
    }
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
    setPreviewImage(URL.createObjectURL(e.target.files[0]));
  };

  const handleSave = (e) => {
    setSaving(true);

    if (!image) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Please select a file!",
      });
      setSaving(false);
      return;
    }

    const formData = new FormData();
    let address =
      `${state}, ${city}, ${district}, ${village}, ${number}`.toLocaleLowerCase();
    formData.append("storeImage", image);
    formData.append("storeName", storeName);
    formData.append("address", address);
    formData.append("description", description);

    //save data
    if (e === undefined) {
      fetch("http://175.41.165.127/Store", {
        headers: {
          Authorization: `Bearer ${isToken}`,
        },
        method: "POST",
        body: formData,
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Failed to upload image");
          }
          return response.json();
        })
        .then((data) => {
          setSaving(false);
          Swal.fire({
            icon: "success",
            title: "Success",
            text: data.message,
            timer: 1000,
            showConfirmButton: false,
          });
          setOpen(false);
          refetch();
        })
        .catch((error) => {
          setSaving(false);
          Swal.fire({
            icon: "error",
            title: "Error",
            text: error.message,
            timer: 1000,
            showConfirmButton: false,
          });
          setOpen(false);
        });
    } else {
      //edit
      fetch(`http://175.41.165.127/Store/${id}`, {
        headers: {
          Authorization: `Bearer ${isToken}`,
        },
        method: "PATCH",
        body: formData,
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Failed to upload image");
          }
          return response.json();
        })
        .then((data) => {
          setSaving(false);
          Swal.fire({
            icon: "success",
            title: "Success",
            text: data.message,
            timer: 1000,
            showConfirmButton: false,
          });
          setOpen(false);
          refetch();
        })
        .catch((error) => {
          setSaving(false);
          Swal.fire({
            icon: "error",
            title: "Error",
            text: error.message,
            timer: 1000,
            showConfirmButton: false,
          });
          setOpen(false);
        });
    }
  };

  const handleDelete = ({ item }) => {
    const id = item.id;
    Swal.fire({
      title: "Are you sure?",
      html:
        "<p style='font-size: 16px'> The store " +
        "<span style='font-weight: 700'>" +
        item.storeName +
        "</span>" +
        " will deleted </p>",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`http://175.41.165.127/Store/${id}`, {
          headers: {
            Authorization: `Bearer ${isToken}`,
          },
          method: "DELETE",
        })
          .then((response) => {
            if (!response.ok) {
              throw new Error(response.statusText);
            }
            return response.json();
          })
          .then((data) => {
            Swal.fire({
              title: "Deleted!",
              text: data.message,
              icon: "success",
              timer: 1000,
              showConfirmButton: false,
            });
            refetch();
          })
          .catch((error) => {
            setSaving(false);
            Swal.fire({
              icon: "error",
              title: "Error",
              text: error.message,
              timer: 1000,
              showConfirmButton: false,
            });
            setOpen(false);
          });
      }
    });
  };

  const handleCancel = () => {
    setStoreName("");
    setState(null);
    setCity(null);
    setDistrict(null);
    setVillage(null);
    setNumber("");
    setDescription("");
    setPreviewImage(null);
    setOpen(false);
  };

  //hooks get all data store
  const { data, error, isError, isLoading, isFetching, refetch } =
    useStoresQuery(isToken, paramIduser);

  let datas = [];
  if (!isFetching) {
    datas = data.data.map((data) => data);
  }

  useEffect(() => {
    setStores(datas);
    setFilteredStores(datas);
  }, [!isFetching]);

  //POST
  // const formData = new FormData();
  // let address =
  //   `${state}, ${city}, ${district}, ${village}, ${number}`.toLocaleLowerCase();
  // formData.append("storeImage", image);
  // formData.append("storeName", storeName);
  // formData.append("address", address);
  // formData.append("description", description);

  // const mutation = useMutation({
  //   mutationFn: () => {
  //     return fetch("http://175.41.165.127/Store", {
  //       headers: {
  //         Authorization: `Bearer ${isToken}`,
  //       },
  //       method: "POST",
  //       body: formData,
  //     })
  //       .then((response) => {
  //         if (!response.ok) {
  //           throw new Error("Failed to upload image");
  //         }
  //         return response.json();
  //       })
  //       .then((data) => {
  //         setSaving(false);
  //         Swal.fire({
  //           icon: "success",
  //           title: "Success",
  //           text: data.message,
  //           timer: 1000,
  //           showConfirmButton: false,
  //         });
  //         setOpen(false);
  //         refetch();
  //       })
  //       .catch((error) => {
  //         setSaving(false);
  //         Swal.fire({
  //           icon: "error",
  //           title: "Error",
  //           text: error.message,
  //           timer: 1000,
  //           showConfirmButton: false,
  //         });
  //         setOpen(false);
  //       });
  //   },
  // });

  // const onSubmit = (event) => {
  //   event.preventDefault();
  //   mutation.mutate(new FormData(event.target));
  // };

  //END POST

  const handleSearchInputChange = (e) => {
    const searchItem = e.target.value;
    setSearchItem(searchItem);

    const filteredItems = stores?.filter(
      (store) =>
        store.storeName.toLowerCase().includes(searchItem.toLowerCase()) ||
        store.address.toLowerCase().includes(searchItem.toLowerCase())
    );

    setFilteredStores(filteredItems);
  };

  if (isLoading)
    return (
      <div className="flex justify-center items-center min-h-screen">
        <img src={Cat} alt={"loading"} width={300} />
      </div>
    );

  if (isError && isToken.length > 0 && isLogin.length > 0)
    return (
      <div className="flex justify-center items-center min-h-screen">
        An error has occurred: {error.message}
      </div>
    );

  if (isToken.length === 0 && isLogin.length === 0) {
    Swal.fire({
      icon: "error",
      title: "Error",
      text: "Session expired. Please login again",
      timer: 2000,
      showConfirmButton: false,
    });
    return navigate("/");
  }

  const dummy = [
    { Name: "John Doe", Age: 30, Email: "john.doe@example.com" },
    { Name: "Jane Smith", Age: 25, Email: "jane.smith@example.com" },
    // Add more data as needed
  ];

  const columns = [
    { title: "Name", dataKey: "Name" },
    { title: "Age", dataKey: "Age" },
    { title: "Email", dataKey: "Email" },
    // Add more columns as needed
  ];

  return (
    <Layout>
      <div className="mt-16 md:mt-32 px-4 md:px-0 ">
        <CardHeaderComponent title="Stores" />
      </div>
      <div className="mt-5 flex items-center justify-between px-4">
        {isRole !== "Super Admin" && (
          <Link
            onClick={() => showModal()}
            className="text-indigo-500 text-xs md:text-base flex items-center gap-1 pl-2 pr-2 md:pl-5 md:pr-5"
          >
            <IoMdAddCircle /> Store{" "}
            {/* <ExportAsExcel
              data={data}
              columns={columns}
              exportFilename="SampleData"
            /> */}
          </Link>
        )}
        <div></div>
        <InputComponent
          className="!w-40 md:w-56"
          placeholder="Search .."
          onChange={handleSearchInputChange}
          value={searchItem}
        />
      </div>

      <div className="grid grid-cols-1 px-4">
        {/* if empty data as admin or owner won't rendered */}
        {isFetching ? (
          <Spin className="mt-10" />
        ) : filteredStores.length === 0 ? (
          <div className="mt-14">
            <Empty />
          </div>
        ) : (
          filteredStores?.map((item, index) => (
            <div
              key={index}
              className="w-full h-20 mt-5 border-b-[1px] dark:text-gray-300"
            >
              <Skeleton loading={isFetching} active avatar>
                <List
                  number={index + 1}
                  to={`https://hello-iam.netlify.app`}
                  image={item.storeImage ? item.storeImage : StoreImage}
                  title={item.storeName}
                  description={item.description}
                  location={
                    item.address.split(",")[0] +
                    ", " +
                    item.address.split(",")[1]
                  }
                  onClickEdit={() => showModal(item.id)}
                  onClickDelete={() => handleDelete({ item })}
                />
              </Skeleton>
            </div>
          ))
        )}

        <p className="text-sm text-right mt-3 dark:text-gray-300">
          Total Data :{" "}
          <span className="font-semibold">
            {!isFetching && filteredStores?.length}
          </span>
        </p>
      </div>
      <ModalComponent open={open} onOk={handleSave} onCancel={handleCancel}>
        <div className="gap-y-4">
          <h1 className="font-semibold text-lg flex items-center gap-2">
            <MdOutlinePets /> Store ID #{storeId}
          </h1>
          <Divider />
          {loading ? (
            <div className="flex justify-center items-center h-56">
              <Spin />
            </div>
          ) : (
            <div className="w-full max-w-lg mt-5">
              <div className="flex flex-wrap -mx-3 ">
                {/* Store Name */}
                <div className="w-full md:w-1/2 px-3  mb-3">
                  <LabelComponent label={"Store Name"}>
                    <span className="text-red-500 ml-1">*</span>
                  </LabelComponent>
                  <InputComponent
                    disabled={isRole === "Super Admin" ? true : false}
                    className="uppercase"
                    value={id !== undefined ? storeName : storeName}
                    type="text"
                    placeholder="Lorem ipsum dolor sit amet"
                    onChange={(e) => setStoreName(e.target.value)}
                  />
                </div>

                {/* Owner Name */}
                <div className="w-full md:w-1/2 px-3 mb-3">
                  <LabelComponent label={"Owner Name"}>
                    <span className="text-red-500 ml-1">*</span>
                  </LabelComponent>
                  <InputComponent
                    disabled={isRole === "Super Admin" ? true : false}
                    className="uppercase"
                    value={id !== undefined ? ownerName : ownerName}
                    type="text"
                    placeholder="Lorem ipsum dolor sit amet"
                    onChange={(e) => setOwnerName(e.target.value)}
                  />
                </div>
              </div>

              {/* Image */}
              <div className="mb-3">
                <input
                  disabled={isRole === "Super Admin" ? true : false}
                  type="file"
                  onChange={handleImageChange}
                  accept="image/*"
                />
                <div className="mt-2 mb-3 flex justify-center">
                  <img src={previewImage} />
                </div>
              </div>

              {/* State & City  */}
              <div className="w-full grid grid-cols-1 md:grid-cols-2 md:space-y-0 space-y-3 mb-3">
                <div className="w-full md:pr-3 ">
                  <LabelComponent label={"State"}>
                    <span className="text-red-500 ml-1">*</span>
                  </LabelComponent>
                  <SelectComponent
                    onChange={handleChangeState}
                    disabled={isRole === "Super Admin" ? true : false}
                  >
                    {state ? (
                      <option value={state}>{state}</option>
                    ) : (
                      <option value={null}>----</option>
                    )}

                    {provinces.map((province) => (
                      <option key={province.id} value={province.id}>
                        {province.name}
                      </option>
                    ))}
                  </SelectComponent>
                </div>
                <div className="w-full md:pl-3">
                  <LabelComponent label={"City"}>
                    <span className="text-red-500 ml-1">*</span>
                  </LabelComponent>
                  <SelectComponent
                    onChange={handleChangeCity}
                    disabled={isRole === "Super Admin" ? true : false}
                  >
                    {city ? (
                      <option value={city}>{city}</option>
                    ) : (
                      <option value={null}>----</option>
                    )}

                    {cities.map((city) => (
                      <option key={city.id} value={city.id}>
                        {city.name}
                      </option>
                    ))}
                  </SelectComponent>
                </div>
              </div>

              {/* District & Village  */}
              <div className="w-full grid grid-cols-1 md:grid-cols-2 md:space-y-0 space-y-3 mb-3">
                <div className="w-full md:pr-3 ">
                  <LabelComponent label={"District"}>
                    <span className="text-red-500 ml-1">*</span>
                  </LabelComponent>
                  <SelectComponent
                    onChange={handleChangeDistrict}
                    disabled={isRole === "Super Admin" ? true : false}
                  >
                    {district ? (
                      <option value={district}>{district}</option>
                    ) : (
                      <option value={null}>----</option>
                    )}
                    {districts.map((district) => (
                      <option key={district.id} value={district.id}>
                        {district.name}
                      </option>
                    ))}
                  </SelectComponent>
                </div>
                <div className="w-full md:pl-3">
                  <LabelComponent label={"Village"}>
                    <span className="text-red-500 ml-1">*</span>
                  </LabelComponent>
                  <SelectComponent
                    onChange={handleChangeVillage}
                    disabled={isRole === "Super Admin" ? true : false}
                  >
                    {village ? (
                      <option value={village}>{village}</option>
                    ) : (
                      <option value={null}>----</option>
                    )}
                    {villages.map((village) => (
                      <option key={village.id} value={village.id}>
                        {village.name}
                      </option>
                    ))}
                  </SelectComponent>
                </div>
              </div>

              {/* Number */}
              <div className="flex flex-wrap -mx-3 ">
                <div className="w-full  px-3  mb-3">
                  <LabelComponent label={"Number or street"}>
                    <span className="text-red-500 ml-1">*</span>
                  </LabelComponent>
                  <InputComponent
                    disabled={isRole === "Super Admin" ? true : false}
                    className="uppercase"
                    type="text"
                    placeholder="BLOK # NO #"
                    value={id !== undefined ? number : number}
                    onChange={(e) => setNumber(e.target.value)}
                  />
                </div>
              </div>

              {/* Desc  */}
              <div className="w-full  mb-6 md:mb-0">
                <LabelComponent label={"Description"}>
                  <span className="text-red-500 ml-1">*</span>
                </LabelComponent>
                <InputComponent
                  disabled={isRole === "Super Admin" ? true : false}
                  className="uppercase"
                  type="text"
                  value={id !== undefined ? description : description}
                  placeholder="Open 9.00 am"
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>

              <Divider />
              {isRole !== "Super Admin" && (
                <div className="flex justify-end">
                  <ButtonComponent
                    className="py-1"
                    disabled={saving}
                    type="submit"
                    onClick={() => handleSave(id)}
                  >
                    {saving ? "Saving..." : "Save"}
                  </ButtonComponent>
                </div>
              )}
            </div>
          )}
        </div>
      </ModalComponent>
    </Layout>
  );
}
