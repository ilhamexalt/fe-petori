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
    <div className="relative">
      <NavbarComponent />
      <div
        className={`${className} bg-gray-50 dark:bg-gray-800 min-h-screen px-5 md:px-9 py-2 md:py-4 `}
      >
        {children}
        {/* <div>
          <FloatButton.BackTop
            icon={<FaArrowCircleUp />}
            className="bg-white border-none"
          />
        </div>{" "} */}
      </div>

      <FooterComponent />
    </div>
  );
}
