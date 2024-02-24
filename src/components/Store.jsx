import { MdLocationOn } from "react-icons/md";
import { FaStar } from "react-icons/fa";
import SkeletonComponent from "./Skeleton";

const imageStore = [
  {
    img: "https://images.unsplash.com/photo-1456926631375-92c8ce872def?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fGFuaW1hbHxlbnwwfHwwfHx8MA%3D%3D",
    name: "Dummy 1",
    location: "Serang",
    rating: 5,
  },
  {
    img: "https://images.unsplash.com/photo-1546182990-dffeafbe841d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8YW5pbWFsfGVufDB8fDB8fHww",
    name: "Dummy 2",
    location: "Cimahi",
    rating: 5,
  },
  {
    img: "https://plus.unsplash.com/premium_photo-1675715924047-a9cf6c539d9b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8YW5pbWFsfGVufDB8fDB8fHww",
    name: "Dummy 3",
    location: "Bandung",
    rating: 5,
  },
  {
    img: "https://images.unsplash.com/photo-1474511320723-9a56873867b5?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YW5pbWFsfGVufDB8fDB8fHww",
    name: "Dummy 4",
    location: "Dago",
    rating: 5,
  },
  {
    img: "https://images.unsplash.com/photo-1693666790340-9bdc710d14a3?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fGFuaW1hbCUyMGNhdHxlbnwwfHwwfHx8MA%3D%3D",
    name: "Dummy 5",
    location: "Sunter",
    rating: 5,
  },
  {
    img: "https://media.istockphoto.com/id/1473022235/photo/chinstrap-penguin-on-rocks-at-hydrurga-rocks-antarctica.webp?b=1&s=170667a&w=0&k=20&c=4uMgjL8RFCjSH1Ooavz5qMz4mwGEEVKq0gOZTPeQZS4=",
    name: "Dummy 6",
    location: "Slipi",
    rating: 4,
  },
  {
    img: "https://media.istockphoto.com/id/1425382824/photo/green-turtle-at-the-water-surface.webp?b=1&s=170667a&w=0&k=20&c=1d1BcuPxNyVCfdHKXsDRiSIP2oz3pcmCuPi7H1NtKsM=",
    name: "Dummy 7",
    location: "Dipatiukur",
    rating: 3,
  },
  {
    img: "https://media.istockphoto.com/id/1459382651/photo/morning-bear-yoga.webp?b=1&s=170667a&w=0&k=20&c=EGJsw4qYRN0qrOHxPTJhkBVDXnaW2ACfZ2vL3wGVFNs=",
    name: "Dummy 8",
    location: "Jakarta",
    rating: 2,
  },
];

export default function StoreComponent() {
  return (
    <div>
      <h1 className="text-center mb-3 md:mb-10 md:text-2xl uppercase font-semibold">
        Store
      </h1>
      <div className="grid grid-cols-2 md:grid-cols-5 gap-5 md:gap-10 justify-items-center pb-5">
        {imageStore.map((data, i) => (
          <div
            className="hover:cursor-pointer box-border ring-2 ring-indigo-500 ring-offset-2 ring-offset-white rounded-sm"
            key={i}
          >
            <div>
              <img
                className="w-full h-full object-cover rounded-sm"
                src={`${data.img}`}
                alt="Store"
              />
              <div className="p-1 pl-2 pr-2 md:pl-3 md:pr-3 flex items-center justify-between relative">
                <div>
                  <h1 className="text-sm md:text-base capitalize">
                    {data.name}
                  </h1>
                  <p className="flex items-center text-xs md:text-sm gap-1 tracking-tight capitalize">
                    <MdLocationOn />
                    {data.location}
                  </p>
                </div>
                <div className="flex items-center text-sm gap-1 ">
                  <FaStar className="text-yellow-500" /> {data.rating}
                </div>
                <SkeletonComponent
                  className={`h-8 w-[155px] md:h-10 md:w-52 mt-2 left-1`}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
