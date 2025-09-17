import { useEffect, useState } from "react";
import bg from "../../../../public/Login-background.jpg";
import axios from "axios";
import Swal from "sweetalert2";

const OrderList = () => {
  const [orders, setOrders] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const ordersPerPage = 10;
  const [totalOrders, setTotalOrders] = useState(0);
  const [loading, setLoading] = useState(false);

  const statuses = ["All", "Pending", "Shipping", "Delivered"];

  const getOrders = async () => {
    try {
      setLoading(true);
      const res = await axios.get("http://localhost:5000/orders", {
        params: {
          status: selectedStatus === "All" ? "" : selectedStatus,
          page: currentPage,
          limit: ordersPerPage,
        },
      });
      setOrders(res.data.orders);
      setTotalOrders(res.data.totalCount);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching orders:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    getOrders();
  }, [currentPage, selectedStatus]);

  const totalPages = Math.ceil(totalOrders / ordersPerPage);

  const handleDelete = async (id) => {
    console.log("Deleting order ID:", id); // Debugging

    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await axios.delete(
            `http://localhost:5000/orders/${id}`
          );

          console.log("Delete response:", response.data); // Debugging

          if (response.data.success) {
            setOrders((prevOrders) =>
              prevOrders.filter((order) => order._id !== id)
            );
            setTimeout(() => getOrders(), 500);
            Swal.fire("Deleted!", "Order has been deleted.", "success");
            getOrders();
          } else {
            Swal.fire(
              "Error",
              response.data.message || "Failed to delete order!",
              "error"
            );
          }
        } catch (error) {
          console.error("Delete error:", error.response?.data || error.message);
          Swal.fire("Error", "Failed to delete order!", "error");
        }
      }
    });
  };

  return (
    <section
      style={{ backgroundImage: `url(${bg})` }}
      className="px-4 mx-auto bg-cover bg-center min-h-screen w-full bg-white"
    >
      <h1 className="text-2xl font-bold text-center py-5">Order List</h1>
      <div className="mb-4">
        <label className="mr-2 font-medium text-gray-700">
          Filter by Status:
        </label>
        <select
          className="px-4 py-2 border border-gray-300 rounded-md"
          value={selectedStatus}
          onChange={(e) => {
            setSelectedStatus(e.target.value);
            setCurrentPage(1);
          }}
        >
          {statuses.map((status) => (
            <option key={status} value={status}>
              {status}
            </option>
          ))}
        </select>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-300 px-4 py-2">Order no</th>
              <th className="border border-gray-300 px-4 py-2">
                Customer Name
              </th>
              <th className="border border-gray-300 px-4 py-2">Phone</th>
              <th className="border border-gray-300 px-4 py-2">Address</th>
              <th className="border border-gray-300 px-4 py-2">Product</th>
              <th className="border border-gray-300 px-4 py-2">Price</th>
              <th className="border border-gray-300 px-4 py-2">Quantity</th>
              <th className="border border-gray-300 px-4 py-2">Courier Fee</th>
              <th className="border border-gray-300 px-4 py-2">Total Cost</th>
              <th className="border border-gray-300 px-4 py-2">Order Date</th>
              <th className="border border-gray-300 px-4 py-2">Status</th>
              <th className="border border-gray-300 px-4 py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="12" className="text-center py-4">
                  Loading...
                </td>
              </tr>
            ) : (
              orders.map((order, index) => (
                <tr key={order._id} className="text-center">
                  <td className="border border-gray-300 px-4 py-2">
                    {index + 1}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {order.customerName}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {order.phone}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {order.address}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {order.productName}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    ৳{order.productPrice}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {order.quantity}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    ৳{order.courierFee}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    ৳{order.totalCost}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {new Date(order.orderDate).toLocaleDateString()}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {order.status}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    <button
                      className="btn btn-error"
                      onClick={() => handleDelete(order._id.toString())}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      <div className="flex justify-between mt-4">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className="px-4 py-2 border border-gray-300 rounded-md"
        >
          Previous
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() =>
            setCurrentPage((prev) => (prev < totalPages ? prev + 1 : prev))
          }
          disabled={currentPage === totalPages}
          className="px-4 py-2 border border-gray-300 rounded-md"
        >
          Next
        </button>
      </div>
    </section>
  );
};

export default OrderList;
