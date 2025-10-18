import React, { useState } from "react";
// import { CiSearch } from "react-icons/ci";
import logo from "../../public/logo.png";
import { PiShoppingCartSimpleBold } from "react-icons/pi";
import { FaBars } from "react-icons/fa";
import { Link } from "react-router-dom";

function Navbar({ cartCount }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      <div className="flex bg-[#74CDF5] items-center container mx-auto justify-between p-1 fixed z-50 right-0 left-0 top-0 h-20 md:h-20">
        {/* Logo Section */}
        <Link to="/" className="flex items-center">
          <img src={logo} alt="logo" className="w-40 h-24" />
        </Link>

        {/* Search Bar Section */}
        {/* <div className="hidden md:flex items-center flex-grow max-w-sm mx-4 border rounded-md">
          <div className="relative flex items-center w-full">
            <input
              type="search"
              placeholder="Search........"
              className="w-full py-3 px-3 text-sm rounded-l-md focus:outline-none"
            />
            <button
              type="button"
              className="px-4 py-[10px] bg-[#f139ef] hover:bg-[#FB26AF] rounded-r-md border-l border-gray-300 transition-all duration-300"
            >
              <CiSearch className="text-white text-xl md:text-2xl" />
            </button>
          </div>
        </div> */}

        {/* Right Section */}
        <div className="hidden md:flex items-center space-x-5">
          <Link
            to="/checkout"
            className="relative flex items-center text-white"
          >
            <PiShoppingCartSimpleBold className="text-3xl text-white" />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-black text-xs font-bold px-2 py-0.5 rounded-full">
                {cartCount}
              </span>
            )}
          </Link>
        </div>

        {/* Hamburger Menu for Small Screens */}
        <div className="md:hidden flex items-center">
          <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
            <FaBars className="text-white text-2xl" />
          </button>
        </div>
      </div>

      {/* Hamburger Dropdown Menu */}
      {isMenuOpen && (
        <div className="absolute top-14 right-4 bg-white shadow-md rounded-md z-50 w-48">
          <ul className="flex flex-col items-start p-4 space-y-2">
            <li>
              <Link
                to="/checkout"
                className="flex items-center text-gray-800 hover:text-[#dc590d] space-x-2 relative"
              >
                <PiShoppingCartSimpleBold className="text-[#dc590d] text-2xl" />
                <span>Add to Cart</span>
                {cartCount > 0 && (
                  <span className="ml-2 bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                    {cartCount}
                  </span>
                )}
              </Link>
            </li>
          </ul>
        </div>
      )}
    </>
  );
}

export default Navbar;
