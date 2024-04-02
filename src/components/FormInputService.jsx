import { useParams } from "react-router-dom";
import ButtonComponent from "./Button";
import InputComponent from "./Input";
import LabelComponent from "./Label";
import SelectComponent from "./Select";
import { useDispatch, useSelector } from "react-redux";
import { closeModal, saveModal } from "../redux/features/modalSlice";
import { useState } from "react";
import Swal from "sweetalert2";

const FormInputService = () => {
  const param = useParams();
  const [serviceName, setServiceName] = useState("");
  const [isLoading, setIsloading] = useState(false);

  const dispatch = useDispatch();

  const handleClose = () => {
    dispatch(closeModal());
  };

  const handleSave = () => {
    dispatch(saveModal({ serviceName }));
    setServiceName("");
    dispatch(closeModal());
  };

  return (
    <div className="gap-y-4">
      <h1 className="font-semibold text-lg" onClick={handleClose}>
        {param.id !== undefined ? "Edit" : "Add"} Service
      </h1>
      {null ? (
        <div className="flex justify-center items-center h-56">
          <div className="loader-univ"> </div>
        </div>
      ) : (
        <div className="w-full max-w-lg mt-5">
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full  px-3 mb-6 md:mb-0">
              <LabelComponent label={"Service Name"} />
              <InputComponent
                value={serviceName}
                type="text"
                placeholder="Dummy"
                onChange={(e) => setServiceName(e.target.value)}
              />
            </div>
            {/* <div className="w-full md:w-1/2 px-3">
              <LabelComponent label={"Owner Name"} />
              <InputComponent
                value={username}
                type="text"
                placeholder="Dummy"
                onChange={(e) => setUsername(e.target.value)}
              />
            </div> */}
          </div>
          {/* <div className="flex flex-wrap -mx-3 mb-6">
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
          </div> */}

          {/* <div className="flex flex-wrap -mx-3 mb-0 md:mb-6">
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
          </div> */}

          {/* <div className="flex flex-wrap -mx-3 mb-3">
            <SelectComponent onChange={null} label={"Village"}>
              {villages.map((village) => (
                <option key={village.id} value={village.id}>
                  {village.name}
                </option>
              ))}
            </SelectComponent>

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
          </div> */}

          <div className="flex justify-end">
            <ButtonComponent
              className="py-1"
              //   disabled={isLoading}
              type="submit"
              onClick={handleSave}
            >
              {isLoading ? "Saving..." : "Save"}
            </ButtonComponent>
          </div>
        </div>
      )}
    </div>
  );
};

export default FormInputService;
