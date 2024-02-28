import { Carousel } from "antd";
export default function CarouselComponent() {
  return (
    <Carousel autoplay speed={2000}>
      <div className="w-full h-full md:h-[480px] 2xl:h-[780px]">
        <img
          className="object-cover w-full h-full"
          src="https://images.unsplash.com/photo-1619911433730-3100a65c4771?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Carousel"
        />
      </div>
      <div className="w-full h-full md:h-[480px] 2xl:h-[780px]">
        <img
          className="object-cover w-full h-full"
          src="https://images.unsplash.com/photo-1546182990-dffeafbe841d?q=80&w=1459&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Carousel"
        />
      </div>
      <div className="w-full h-full md:h-[480px] 2xl:h-[780px]">
        <img
          className="object-cover bg-center w-full h-full"
          src="https://images.unsplash.com/photo-1470093851219-69951fcbb533?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Carousel"
        />
      </div>
    </Carousel>
  );
}
