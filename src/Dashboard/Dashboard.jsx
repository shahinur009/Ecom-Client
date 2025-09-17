import React from "react";
import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";

const Dashboard = () => {
  return (
    <div className="flex flex-col md:flex-row h-screen bg-[#8eeaea] overflow-hidden">
      {/* <aside className="w-full md:w-1/6 bg-[#2b0564] p-5 flex md:flex-col flex-row gap-4">
        <Link className="text-xl font-bold bg-white rounded-md p-2" to={"/"}>
          Back Home
        </Link>
        <Link
          to={"/dashboard/add-product"}
          className="flex  items-center gap-3 bg-orange-400 rounded-md p-2"
        >
          <h1 className="text-md font-bold ">Add Product</h1>
          <FaArrowRight />
        </Link>
        <Link
          to={"/dashboard/banner"}
          className="flex items-center gap-3 bg-orange-400 rounded-md p-2"
        >
          <h1 className="text-md font-bold">Banner</h1>
          <FaArrowRight />
        </Link>
        <Link
          to={"/dashboard/order-list"}
          className="flex items-center gap-3 bg-orange-400 rounded-md p-2"
        >
          <h1 className="text-md font-bold">Order List</h1>
          <FaArrowRight />
        </Link>
        <Link
          to={"/dashboard/stock"}
          className="flex items-center gap-3 bg-orange-400 rounded-md p-2"
        >
          <h1 className="text-md font-bold">Stock</h1>
          <FaArrowRight />
        </Link>
      </aside> */}
      <main className="flex-1 md:p-6">
        <header className="flex flex-col md:flex-row justify-center items-center mb-6">
          <h2 className="text-2xl font-semibold mb-4 md:mb-0 text-center uppercase">
            Admin Panel
          </h2>
        </header>
        <section className="bg-white p-4 rounded-md shadow-md mb-6">
          <h3 className="text-xl font-semibold mb-4">Admin Information</h3>
          <p className="text-md">Name: Admin</p>
          <p className="text-md">Email: admin@sweetpencilbd.com</p>
          <p className="text-md">Role: Admin</p>
        </section>
      </main>
    </div>
  );
};

export default Dashboard;
