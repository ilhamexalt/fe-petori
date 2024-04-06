import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import useLocalStorage from "../hooks/useLocalStorage";

export default function FooterComponent() {
  let [year, setYear] = useState("2023");

  useEffect(() => {
    let objectDate = new Date();
    const yearNow = objectDate.getFullYear();
    setYear(yearNow);
  }, []);

  return (
    <div className="h-28 bg-indigo-500 text-white flex items-center justify-between p-5 md:p-8 w-full sticky">
      <div className="font-thin">
        <h1 className="text-sm md:text-lg font-semibold">Petori</h1>
        <p className="text-xs md:text-sm">© {year}. All right reserved.</p>
      </div>

      <div className="text-xs md:text-sm">
        <div className="hover:text-indigo-200 transition delay-50 ease-in-out">
          <Link to={"/contactus"}>Contact Us</Link>
        </div>
        <div className="hover:text-indigo-200 transition delay-50 ease-in-out">
          <Link>Privacy and Policy</Link>
        </div>
        <div className="hover:text-indigo-200 transition delay-50 ease-in-out">
          <Link>Terms and Conditions</Link>
        </div>
      </div>
    </div>
  );
}
