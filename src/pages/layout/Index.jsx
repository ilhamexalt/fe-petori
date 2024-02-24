import { useEffect } from "react";
import FooterComponent from "../../components/Footer";
import { NavbarComponent } from "../../components/Navbar";

// eslint-disable-next-line react/prop-types
export default function Layout({ children, className }) {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <>
      <NavbarComponent />
      <div className={`${className} min-h-screen`}>{children}</div>
      <FooterComponent />
    </>
  );
}
