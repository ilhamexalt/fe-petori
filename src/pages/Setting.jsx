import { Divider, Switch } from "antd";
import Layout from "./layout/Index";
import Swal from "sweetalert2";
import { connect, useDispatch, useSelector } from "react-redux";
import { selectDarkMode, toggleDarkMode } from "../redux/features/themeslice";
import useLocalStorage from "../hooks/useLocalStorage";

const Setting = () => {
  const darkMode = useSelector(selectDarkMode);
  const dispatch = useDispatch();

  const handleToggle = () => {
    dispatch(toggleDarkMode());
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <Layout>
      <div className="mt-16 md:mt-32 px-4">
        <div>
          <h1 className="text-sm md:text-lg font-semibold">
            Language and dates
          </h1>
          <p className="text-xs md:text-base text-justify text-gray-400">
            Choose what language and date format to use throughout your account.
          </p>
          <Divider />
          <div className="flex justify-between mb-5 text-xs md:text-base ">
            <div className="min-w-36">
              <p className="">Language</p>
            </div>
            <div className="min-w-36">
              <p className="text-left">English</p>
            </div>
            <div className="w-20 px-2 py-1 flex justify-center items-center rounded-md text-white">
              <Switch defaultChecked className="bg-gray-400" />
            </div>
          </div>
          <div className="flex justify-between mb-5 text-xs md:text-base">
            <div className="min-w-36">
              <p className="">Date Format</p>
            </div>
            <div className="min-w-36">
              <p className="text-left">Automatic timezone</p>
            </div>
            <div className="w-20 px-2 py-1 flex justify-center items-center rounded-md text-white">
              <Switch defaultChecked className="bg-gray-400" />
            </div>
          </div>
          <div className="flex justify-between mb-5 text-xs md:text-base">
            <div className="min-w-36">
              <p className="">Theme</p>
            </div>
            <div className="min-w-36">
              <p className="text-left">Dark Mode</p>
            </div>
            <div className="w-20 px-2 py-1 flex justify-center items-center rounded-md text-white">
              {/* sementara buat dark mode dulu */}
              <Switch
                disabled={true}
                onChange={handleToggle}
                className="bg-gray-400"
              />
            </div>
          </div>
          <div className="flex justify-between items-center text-xs md:text-base">
            <div className="">
              <p className="font-semibold ">Delete account</p>
            </div>
            <button
              onClick={() => {
                Swal.fire({
                  icon: "warning",
                  title: "Delete your account?",
                  text: `Please type "Delete Permanently" to confirm`,
                  showCancelButton: true,
                  confirmButtonText: "OK",
                  showLoaderOnConfirm: true,
                  input: "text",
                  inputAttributes: {
                    autocapitalize: "off",
                  },
                  showClass: {
                    popup: `
                    animate__animated
                    animate__fadeInUp
                    animate__faster
                  `,
                  },
                  hideClass: {
                    popup: `
                    animate__animated
                    animate__fadeOutDown
                    animate__faster
                  `,
                  },
                  preConfirm: async (login) => {
                    try {
                      if (login === "")
                        return Swal.showValidationMessage("Cannot be empty");

                      //post data
                      if (login === "Delete Permanently") {
                      }
                    } catch (error) {
                      Swal.showValidationMessage(`
                        Request failed: ${error}
                      `);
                    }
                  },
                });
              }}
              className="py-1 bg-red-500 text-white px-3 rounded-md text-center font-semibold"
            >
              Delete
            </button>
          </div>
          <div className="max-w-60 md:max-w-80 text-justify text-xs md:text-base">
            <p className="text-gray-400">
              No longer want to use our service? You can delete your account
              here. This action is not reversible. All information related to
              this account will be deleted permanently.
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

const mapStateToProps = (state) => ({
  darkMode: state.theme.darkMode,
});

const mapDispatchToProps = {
  toggleDarkMode,
};

export default connect(mapStateToProps, mapDispatchToProps)(Setting);
