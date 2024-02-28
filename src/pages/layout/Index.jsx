import { useEffect } from "react";
import FooterComponent from "../../components/Footer";
import { NavbarComponent } from "../../components/Navbar";
import { FloatButton } from "antd";
import { FaArrowCircleUp } from "react-icons/fa";
// eslint-disable-next-line react/prop-types
export default function Layout({ children, className }) {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <>
      <NavbarComponent />
      <div className={`${className} min-h-screen bg-gray-50`}>
        {children}
        {/* <div>
          <FloatButton.BackTop
            icon={<FaArrowCircleUp />}
            className="bg-white border-none"
          />
        </div>{" "} */}
      </div>

      <FooterComponent />
    </>
  );
}
