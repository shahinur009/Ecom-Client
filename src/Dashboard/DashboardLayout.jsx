import { Link, Outlet, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import { FaArrowRight } from "react-icons/fa";

const DashboardLayout = () => {
  const { logOut } = useContext(AuthContext) || {};
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logOut();
    navigate("/");
  };

  return (
    <div className="flex">
      <div className="w-[15%] bg-[#dc4b76f5] min-h-screen ">
        <ul className="space-y-4 items-center p-2 text-white">
          <li>
            <Link className="text-xl font-bold  rounded-md p-2" to={"/"}>
              Back Home
            </Link>
          </li>

          <li>
            <Link
              to={"/dashboard/add-product"}
              className="flex  items-center gap-3 bg-orange-400 rounded-md p-2"
            >
              <h1 className="text-md font-bold ">Add Product</h1>
              <FaArrowRight />
            </Link>
          </li>
          <li>
            <Link
              to={"/dashboard/banner"}
              className="flex items-center gap-3 bg-orange-400 rounded-md p-2"
            >
              <h1 className="text-md font-bold">Banner</h1>
              <FaArrowRight />
            </Link>
          </li>
          <li>
            <Link
              to={"/dashboard/gallery"}
              className="flex items-center gap-3 bg-orange-400 rounded-md p-2"
            >
              <h1 className="text-md font-bold">Gallery</h1>
              <FaArrowRight />
            </Link>
          </li>
          {/* <li>
            <Link
              to={"/dashboard/videos"}
              className="flex items-center gap-3 bg-orange-400 rounded-md p-2"
            >
              <h1 className="text-md font-bold">Videos</h1>
              <FaArrowRight />
            </Link>
          </li> */}
          <li>
            <Link
              to={"/dashboard/order-list"}
              className="flex items-center gap-3 bg-orange-400 rounded-md p-2"
            >
              <h1 className="text-md font-bold">Order List</h1>
              <FaArrowRight />
            </Link>
          </li>
          <li>
            <Link
              to={"/dashboard/stock"}
              className="flex items-center gap-3 bg-orange-400 rounded-md p-2"
            >
              <h1 className="text-md font-bold">Stock</h1>
              <FaArrowRight />
            </Link>
          </li>

          <li>
            <button
              className="px-8 py-1 mt-10 bg-[#8d56668e] border"
              onClick={handleLogout}
            >
              Logout
            </button>
          </li>
        </ul>
      </div>
      <div className="w-[85%] pr-4">
        <Outlet />
      </div>
    </div>
  );
};

export default DashboardLayout;
