import { Carousel } from "antd";

export default function CarouselComponent() {
  return (
    <Carousel autoplay speed={2000}>
      <div>
        <img
          className="object-cover w-full h-full"
          src="https://images.unsplash.com/photo-1552581234-26160f608093?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Carousel"
        />
      </div>
      <div>
        <img
          className="object-cover w-full h-full"
          src="https://plus.unsplash.com/premium_photo-1663134377392-50c34664d632?q=80&w=1471&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Carousel"
        />
      </div>
      <div>
        <img
          className="object-cover w-full h-full"
          src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Carousel"
        />
      </div>
    </Carousel>
  );
}
