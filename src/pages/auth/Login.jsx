import { Button, Form, Input, Spin, message } from "antd";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { LoadingOutlined } from "@ant-design/icons";
import ButtonComponent from "../../components/Button";

export default function Login() {
  const navigate = useNavigate();
  const [phonenumber, setPhonenumber] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);

  const [messageApi, contextHolder] = message.useMessage();
  const key = "updatable";

  const openMessage = () => {
    messageApi.open({
      key,
      type: "loading",
      content: "Loading...",
    });
    setTimeout(() => {
      messageApi.open({
        key,
        type: "warning",
        content: "Please input phone number and password",
        duration: 2,
      });
    }, 1000);
  };

  const isLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    // if (phonenumber === "" || password === "") {
    //   openMessage();
    //   setLoading(false);
    //   return false;
    // }
    try {
      // const api = await fetch("https://bluepath.my.id/company/login", {
      //   method: "POST",
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      //   body: JSON.stringify({
      //     phonenumber: phonenumber,
      //     password: password,
      //   }),
      // });
      // if (api.status === 200) {
      //   const res = await api.json();
      //   if (res.token) {
      //     localStorage.setItem("token", res.token);
      //     localStorage.setItem("data", JSON.stringify(res.data));
      //     setTimeout(() => navigate("/dashboard"), 2000);
      //   }
      // } else {
      //   const res = await api.json();
      //   swal("Warning", res.message, "warning", {
      //     buttons: false,
      //     timer: 2000,
      //   });
      //   setLoading(false);
      // }

      setLoading(false);
      navigate("/dashboard");
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  // useEffect(() => {
  //   const token = localStorage.getItem("token");
  //   if (token) {
  //     return navigate("/dashboard");
  //   }
  // }, [navigate]);

  return (
    <>
      <div className="flex justify-center items-center w-full min-h-screen flex-col bg-bodyBg bg-cover">
        {contextHolder}
        <div className="mb-5 flex-col text-center">
          <Link to={"/"} className="font-bold text-5xl ">
            PETORI
          </Link>
          <p className="tracking-wide">DEVELOPMENT</p>
        </div>
        <Form name="basic">
          <Form.Item
            className="w-full"
            onChange={(e) => {
              setPhonenumber(e.target.value);
            }}
          >
            <Input placeholder="Phone Number" required />
          </Form.Item>

          <Form.Item
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          >
            <Input.Password placeholder="Password" required />
          </Form.Item>

          <Form.Item>
            <ButtonComponent
              onClick={isLogin}
              className="bg-indigo-500 w-full tracking-widest p-1 hover:ring-indigo-500"
            >
              {loading ? (
                <Spin
                  indicator={
                    <LoadingOutlined
                      style={{
                        fontSize: 18,
                        color: "white",
                      }}
                      spin
                    />
                  }
                />
              ) : (
                "LOGIN"
              )}
            </ButtonComponent>
            {/* <Button
              type="primary"
              htmlType="submit"
              className="bg-indigo-500 w-full tracking-widest"
              onClick={isLogin}
            >
              {loading ? (
                <Spin
                  indicator={
                    <LoadingOutlined
                      style={{
                        fontSize: 18,
                        color: "white",
                      }}
                      spin
                    />
                  }
                />
              ) : (
                "LOGIN"
              )}
            </Button> */}
          </Form.Item>
        </Form>

        <Link
          to="/signup"
          className="text-gray-800 hover:text-indigo-500 transition ease-in-out delay-75 text-xs md:text-sm -mt-4 mb-2"
        >
          {"Don't have an account yet?"}
        </Link>
        <Link
          to="/forgotpassword"
          className="text-gray-800 hover:text-indigo-500 transition ease-in-out delay-50 text-xs md:text-sm"
        >
          Forgot password?
        </Link>
      </div>
    </>
  );
}
