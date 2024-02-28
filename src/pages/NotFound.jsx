import { Link } from "react-router-dom";
import "../../src/assets/css/notfound.css";
import { FaBackward } from "react-icons/fa";

export default function NotFound() {
  return (
    <section className="page_404">
      <div className="container">
        <div className="row">
          <div className="col-sm-12 ">
            <div className="col-sm-10 col-sm-offset-1  text-center">
              <div className="four_zero_four_bg">
                <h1 className="text-center ">404</h1>
              </div>

              <div className="contant_box_404">
                <h3 className="text-sm md:text-xl font-bold">
                  Page who is find, not found!
                </h3>
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-center">
          <Link
            to="/dashboard"
            className=" bg-indigo-500 flex justify-center  hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-md w-12"
          >
            <FaBackward />
          </Link>
        </div>
      </div>
    </section>
  );
}
