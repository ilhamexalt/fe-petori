import { Button, Input, Form, message, Spin } from "antd";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import swal from "sweetalert2";
import { LoadingOutlined } from "@ant-design/icons";

export default function Register() {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [phonenumber, setPhonenumber] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
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
        content: "Please complete the registration form",
        duration: 2,
      });
    }, 1000);
  };
  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (
      address === "" ||
      phonenumber === "" ||
      name === "" ||
      email === "" ||
      password === ""
    ) {
      openMessage();
      setLoading(false);
      return false;
    }

    try {
      const api = await fetch("https://bluepath.my.id/company/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          company: {
            address: address,
            phonenumber: phonenumber,
            email: email,
            password: password,
          },
          employee: {
            name: name,
            address: address,
            email: email,
            password: password,
            phonenumber: phonenumber,
          },
        }),
      });

      const res = await api.json();
      console.log(res);
      if (res) {
        if (res.status === 200) {
          swal("Success", res.message, "success");
          navigate("/");
        } else {
          swal("Error", res.message, "error");
          setLoading(false);
        }
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center w-full min-h-screen flex-col bg-bodyBg bg-cover">
      {contextHolder}
      <div className="mb-5 text-center">
        {/* <img src="./src/assets/logo-login.png" alt="Login" width={200} /> */}
        <h1 className="font-bold text-5xl">PETORI</h1>
        <span className="tracking-wide">DEVELOPMENT</span>
      </div>
      <Form name="basic" className="w-72">
        <Form.Item
          onChange={(e) => {
            setName(e.target.value);
          }}
        >
          <Input placeholder="Full Name" />
        </Form.Item>
        <Form.Item
          onChange={(e) => {
            setAddress(e.target.value);
          }}
        >
          <Input.TextArea placeholder="Address" />
        </Form.Item>
        <Form.Item
          onChange={(e) => {
            setPhonenumber(e.target.value);
          }}
        >
          <Input placeholder="Phone Number" />
        </Form.Item>
        <Form.Item
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        >
          <Input placeholder="Email" />
        </Form.Item>

        <Form.Item
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        >
          <Input.Password placeholder="Password" />
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="bg-indigo-500 w-full tracking-widest"
            onClick={handleRegister}
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
              "REGISTER"
            )}
          </Button>
        </Form.Item>
      </Form>
      <Link
        to="/"
        className="text-body hover:text-indigo-500 transition ease-in-out delay-50 text-xs md:text-sm -mt-4 mb-2"
      >
        Already have an account?
      </Link>
    </div>
  );
}
