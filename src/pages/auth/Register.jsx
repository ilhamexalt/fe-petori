import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { LoadingOutlined } from "@ant-design/icons";
import Petori from "../../assets/petori.png";
import InputComponent from "../../components/Input";
import ButtonComponent from "../../components/Button";
import Swal from "sweetalert2";
import { FaEyeSlash } from "react-icons/fa";
import { FaEye } from "react-icons/fa";
import SelectComponent from "../../components/Select";
import { register } from "../../services/service";

const Register = () => {
  const [cities, setCities] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [villages, setVillages] = useState([]);
  const [provinces, setProvinces] = useState([]);
  const [fullname, setFullname] = useState("");
  const [number, setNumber] = useState("");
  const [phonenumber, setPhonenumber] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [city, setCity] = useState("NULL");
  const [district, setDistrict] = useState("NULL");
  const [village, setVillage] = useState("NULL");
  const [province, setProvince] = useState("NULL");

  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [errorCity, setErrorCity] = useState(false);
  const [errorDistrict, setErrorDistrict] = useState(false);
  const [errorVillage, setErrorVillage] = useState(false);
  const [errorProvince, setErrorProvince] = useState(false);
  const [errorPassword, setErrorPassword] = useState(false);
  const [errorPhoneNumber, setErrorPhoneNumber] = useState(false);

  const [validateUppercase, setValidateUppercase] = useState(true);
  const [validateLength, setValidateLength] = useState(true);
  const [validateChar, setValidateChar] = useState(true);

  const [isFocused, setIsFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleInputPassword = (e) => {
    const pwFill = e.target.value;
    const uppercaseRegex = /[A-Z]/;
    const characterRegex = /[0-9]/;

    /* validation min length */
    if (pwFill.length < 8) {
      setValidateLength(true);
    } else {
      setValidateLength(false);
    }

    /* validation uppercase */
    if (pwFill.match(uppercaseRegex)) {
      setValidateUppercase(false);
    } else {
      setValidateUppercase(true);
    }

    let valPassword = false;
    /* validation character */
    if (pwFill.match(characterRegex)) {
      setValidateChar(false);
    } else {
      setValidateChar(true);
      valPassword = true;
    }

    if (!validateLength && !validateUppercase && !valPassword) {
      setPassword(pwFill);
    }

    if (validateLength || validateUppercase || valPassword) {
      setPassword(null);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (
      !fullname ||
      !number ||
      !email ||
      !password ||
      !phonenumber ||
      !province ||
      !city ||
      !district ||
      !village
    ) {
      setLoading(false);
      setError(true);
      if (province === "NULL") setErrorProvince(true);
      if (city === "NULL") setErrorCity(true);
      if (district === "NULL") setErrorDistrict(true);
      if (village === "NULL") setErrorVillage(true);

      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Please fill all the fields",
        timer: 1000,
        showConfirmButton: false,
      });
      return;
    }

    try {
      const response = await register({
        fullname: fullname,
        phoneNumber: phonenumber,
        password: password,
        address:
          province +
          ", " +
          city +
          ", " +
          district +
          ", " +
          village +
          ", " +
          number,
        email: email,
      });

      if (response.ok) {
        const data = await response.json();
        Swal.fire({
          icon: "success",
          title: "Success",
          text: data.message,
          timer: 1000,
          showConfirmButton: false,
        });
        setError(false);
        setLoading(false);
        setIsFocused(false);
        setFullname("");
        setNumber("");
        setPhonenumber("");
        setEmail("");
        const a = (document.getElementById("pw").value = "");
        setValidateLength(true);
        setValidateUppercase(true);
        setValidateChar(true);
        return navigate("/");
      } else {
        const data = await response.json();
        Swal.fire({
          icon: "error",
          title: "Error",
          text: data.message,
          timer: 1000,
          showConfirmButton: false,
        });
        setLoading(false);
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error,
        timer: 1000,
        showConfirmButton: false,
      });
      setLoading(false);
    }
  };

  /* Get All State */
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
    setProvince(data.name);
    setErrorProvince(false);
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
    setErrorCity(false);
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
    setErrorDistrict(false);
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
    setErrorVillage(false);
  };

  return (
    <div className="flex justify-center items-center w-full min-h-screen bg-gray-50 dark:bg-gray-800">
      <div className="bg-white w-80 md:w-[400px] shadow-md hover:shadow-lg rounded-br-2xl rounded-bl-sm rounded-tl-2xl ">
        <div className="w-full py-3 bg-gradient-to-r from-indigo-500 to-blue-500 rounded-br-2xl rounded-bl-sm rounded-tl-2xl rounded-tr-sm">
          <div className="font-bold text-5xl flex justify-center">
            <img src={Petori} alt="Petori Logo " className="w-24 md:w-44" />
          </div>
          <p className="text-center text-xs font-light text-white">
            © 2024 - Development
          </p>
        </div>

        <div className="pt-5 px-5 py-5">
          <form name="basic">
            <InputComponent
              type="text"
              value={fullname}
              className={
                error && !fullname
                  ? "mb-5 border-red-500 uppercase"
                  : "mb-5 uppercase"
              }
              placeholder="Full Name"
              onChange={(e) => setFullname(e.target.value)}
            />

            <InputComponent
              type="email"
              value={email}
              className={
                error && !email
                  ? "mb-5 border-red-500 uppercase"
                  : "mb-5 uppercase"
              }
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
            />
            <InputComponent
              type="number"
              value={phonenumber}
              className={
                error && !phonenumber
                  ? "mb-5 border-red-500 uppercase"
                  : "mb-5 uppercase"
              }
              placeholder="Phone Number"
              onChange={(e) => setPhonenumber(e.target.value)}
            />
            {/* {error && errorPhoneNumber && (
              <span className="text-red-500">
                Phone number must start with 0
              </span>
            )} */}
            <div className="w-full mb-5">
              {/* state/ province  */}
              <div className="w-full mb-5">
                <SelectComponent
                  onChange={handleChangeState}
                  className={
                    error && errorProvince
                      ? "!border-red-500"
                      : "!border-gray-200"
                  }
                >
                  <option value={province}>---</option>
                  {provinces.map((province) => (
                    <option key={province.id} value={province.id}>
                      {province.name}
                    </option>
                  ))}
                </SelectComponent>
              </div>

              {/* city */}
              <div className="w-full mb-5">
                <SelectComponent
                  onChange={handleChangeCity}
                  className={error && errorCity ? "!border-red-500" : ""}
                >
                  <option value={city}>---</option>
                  {cities.map((city) => (
                    <option key={city.id} value={city.id}>
                      {city.name}
                    </option>
                  ))}
                </SelectComponent>
              </div>

              {/* districts */}
              <div className="w-full mb-5">
                <SelectComponent
                  onChange={handleChangeDistrict}
                  className={error && errorDistrict ? "!border-red-500" : ""}
                >
                  <option value={district}>---</option>
                  {districts.map((district) => (
                    <option key={district.id} value={district.id}>
                      {district.name}
                    </option>
                  ))}
                </SelectComponent>
              </div>

              {/* villages */}
              <div className="w-full mb-5">
                <SelectComponent
                  onChange={handleChangeVillage}
                  className={error && errorVillage ? "!border-red-500" : null}
                >
                  <option value={village}>---</option>
                  {villages.map((village) => (
                    <option key={village.id} value={village.id}>
                      {village.name}
                    </option>
                  ))}
                </SelectComponent>
              </div>
            </div>

            <InputComponent
              type="text"
              value={number}
              className={
                error && !number
                  ? "mb-5 border-red-500 uppercase"
                  : "mb-5 uppercase"
              }
              placeholder="Jl.Dummy No.Dummy Blok Dummy RT/RW 001/002"
              onChange={(e) => setNumber(e.target.value)}
            />
            <div className="relative">
              <InputComponent
                id={"pw"}
                type={showPassword ? "text" : "password"}
                className={error && !password ? "mb-5 border-red-500" : "mb-5"}
                placeholder="Password"
                onChange={handleInputPassword}
                // onBlur={handleBlur}
                onFocus={handleFocus}
              />

              {showPassword ? (
                <div className="absolute right-0 top-0 cursor-pointer w-10 h-10">
                  <FaEye
                    className="absolute right-3 top-3"
                    onClick={() => setShowPassword(!showPassword)}
                  />
                </div>
              ) : (
                <div className="absolute right-0 top-0 cursor-pointer w-10 h-10 ">
                  <FaEyeSlash
                    className="absolute right-3 top-3"
                    onClick={() => setShowPassword(!showPassword)}
                  />
                </div>
              )}
            </div>
            {isFocused && (
              <div className="-mt-3 mb-3 space-y-1 transition-all ease-in-out">
                <p className="text-xs md:text-sm">Password must containts</p>
                <li
                  className={
                    validateLength
                      ? "text-red-500 text-xs md:text-sm"
                      : "text-green-500 text-xs md:text-sm"
                  }
                >
                  At least 8 characters{" "}
                </li>
                <li
                  className={
                    validateUppercase
                      ? "text-red-500 text-xs md:text-sm"
                      : "text-green-500 text-xs md:text-sm"
                  }
                >
                  At least 1 uppercase letter
                </li>
                <li
                  className={
                    validateChar
                      ? "text-red-500 text-xs md:text-sm"
                      : "text-green-500 text-xs md:text-sm"
                  }
                >
                  At least 1 number or special character
                </li>
              </div>
            )}

            <ButtonComponent
              onClick={handleRegister}
              type="submit"
              className="w-full tracking-widest mb-2"
            >
              {loading ? <LoadingOutlined /> : "Register"}
            </ButtonComponent>
          </form>

          <div className="text-center">
            <Link
              to="/"
              className="text-gray-800  hover:text-indigo-500 transition ease-in-out delay-75 text-xs md:text-sm  mb-2"
            >
              {"Don't have an account yet?"}
            </Link>
          </div>
          <div className="text-center">
            <Link
              to="/forgotpassword"
              className="text-gray-800 hover:text-indigo-500 transition ease-in-out delay-50 text-xs md:text-sm"
            >
              Forgot password?
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
