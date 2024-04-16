import { CardHeader } from "@material-tailwind/react";
import { ArrowDownTrayIcon } from "@heroicons/react/24/outline";
import ButtonComponent from "./Button";
import "animate.css";
import { useEffect, useState } from "react";
import useLocalStorage from "../hooks/useLocalStorage";

export default function CardHeaderComponent({ title }) {
  const [loading, setLoading] = useState(false);
  const titleName = title.substring(0, title.length - 1);

  useEffect(() => {
    document.documentElement.style.setProperty("--animate-duration", "2s");
  }, []);

  const handleDownload = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1500);
  };

  return (
    <div>
      <CardHeader
        floated={false}
        shadow={false}
        className="rounded-sm shadow-md h-20 flex justify-between items-center px-3 md:px-5"
      >
        <div>
          <h1 className="font-semibold text-sm md:text-lg"> {title}</h1>
          <p className="text-xs md:text-base">
            These are details about the {title}
          </p>
        </div>
        <div>
          <ButtonComponent
            className=" flex items-center justify-center h-7 md:h-10 uppercase text-[8px] md:text-xs w-[80px] md:w-32"
            onClick={handleDownload}
          >
            {/* <div className="loader-download"></div> */}

            {loading ? (
              "Please wait..."
            ) : (
              <>
                <ArrowDownTrayIcon
                  strokeWidth={2}
                  className="h-[10px] w-[10px] md:h-4 md:w-4"
                />
                Download
              </>
            )}
          </ButtonComponent>
        </div>
      </CardHeader>
    </div>
  );
}
