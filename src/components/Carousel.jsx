import { Carousel } from "antd";
import { FaInstagram } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";

import image_1 from "../assets/carousel-1.png";
import image_2 from "../assets/carousel-2.png";

export default function CarouselComponent() {
  return (
    <Carousel autoplay speed={2000}>
      {/* md:h-[480px] 2xl:h-[780px] */}
      <div className="w-full h-full  bg-black bg-opacity-90 relative">
        <img
          className="object-cover w-full h-full"
          src={image_1}
          alt="Carousel"
        />
        <div className="absolute bottom-5 left-5 md:bottom-20 md:left-20 flex gap-5">
          <FaInstagram
            size={25}
            className="cursor-pointer hover:text-gray-800 transition-all"
          />
          <FaSquareXTwitter size={25} className="cursor-pointer" />
        </div>
      </div>
      <div className="w-full h-full  relative">
        <img
          className="object-cover w-full h-full"
          src={image_2}
          alt="Carousel"
        />
        <div className="absolute bottom-5 left-5 md:bottom-20 md:left-20 flex gap-5">
          <FaInstagram
            size={25}
            className="cursor-pointer hover:text-gray-800 transition-all"
          />
          <FaSquareXTwitter size={25} className="cursor-pointer" />
        </div>
      </div>
    </Carousel>
  );
}
