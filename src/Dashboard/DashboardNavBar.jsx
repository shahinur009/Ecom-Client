import { Link } from "react-router-dom";
import logo from "../../public/sweetpencilbdlogo.png";
import { CiSearch } from "react-icons/ci";
import { PiShoppingCartSimpleBold } from "react-icons/pi";
import { useContext } from "react";
import { AuthContext } from "../Provider/AuthProvider";

const DashboardNavBar = () => {
  const { user, logOut } = useContext(AuthContext) || {};

  const handleLogOut = () => {
    logOut()
      .then(() => {})
      .catch((error) => console.log(error));
  };
  return (
    <>
      <div className="flex items-center justify-between shadow-md bg-[#dc590d] px-4 py-2">
        {/* Logo Section */}
        <Link to="/dashboard" className="flex items-center justify-center">
          <img src={logo} alt="logo" className="w-24 h-24 bg-[#dc590d]" />
          <h1 className="text-white font-bold md:text-2xl">Dashboard </h1>
        </Link>

        {/* Search and Right Section */}
        <div>
          {/* Right Section */}
          <div className="flex items-center space-x-5 ml-4">
            {user ? (
              <>
                <button
                  onClick={handleLogOut}
                  className="text-white font-medium btn-ghost btn bg-green-500 hover:text-black hover:bg-green-200"
                >
                  LogOut
                </button>
              </>
            ) : (
              <Link
                to="/login"
                className="text-white font-medium btn-ghost btn bg-green-500 hover:text-black hover:bg-green-200"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default DashboardNavBar;
