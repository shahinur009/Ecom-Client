import React from "react";
import logo from "../../public/new-image/logo.png";
import { FaFacebook } from "react-icons/fa";
import { LuInstagram } from "react-icons/lu";
import { SiGmail } from "react-icons/si";

const Footer = () => {
  return (
    <div>
      <footer className="bg-[#F8F8EC] text-black p-2 border-2">
        <div className="container grid md:grid-cols-3 justify-center items-center">
          <div className="flex flex-col justify-between items-center">
            <img
              src={logo}
              alt="mousum shop logo"
              className="h-44 w-48 flex mx-auto md:block -mt-8"
            />
            <h1 className="text-xl md:text-2xl text-black font-bold -mt-4">
              <span className="text-orange-500">Sweet Pencil</span> BD-Online
            </h1>
            <p className="w-full flex mx-auto justify-center items-center">Best Online shop in Bangladesh</p>
          </div>
          <div>
            <h1 className="text-black font-bold">Services</h1>
            <ul>
              <li>Tablet</li>
              <li>Message Oil</li>
              <li>Food Products</li>
              <li>More</li>
            </ul>
          </div>
          <div>
            <h1 className="text-black font-bold">Contact Us</h1>
            <ul>
              <li>+8801623503666</li>
              <li>sweetpencilonline11@gmail.com</li>
              <li>Dhaka, Bangladesh</li>
              <li></li>
            </ul>
            <div className="flex justify-start items-center gap-3 text-2xl mt-2 text-[#dc590d]">
              <a
                href="https://www.facebook.com/SweetPencilBD1"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaFacebook />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <LuInstagram />
              </a>
              <a href="mailto:sweetpencilonline11@gmail.com">
                <SiGmail />
              </a>
            </div>
          </div>
        </div>
        <h1 className="text-orange-500 text-center">
          All rights reserved by @sweetPencilBD.online
        </h1>
      </footer>
    </div>
  );
};

export default Footer;
