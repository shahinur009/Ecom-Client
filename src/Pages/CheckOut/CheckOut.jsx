import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { CartContext } from "../Utilities/cartContext";

function Checkout() {
  const { cart, setCart } = useContext(CartContext);
  const [expandedItems, setExpandedItems] = useState({});
  const [loading, setLoading] = useState(false);
  const [divisions, setDivisions] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [upazilas, setUpazilas] = useState([]);

  //....Load cart from localStorage..........
  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(savedCart);
    fetchDivisions();
  }, []);

  //....Fetch all divisions from BD API......
  const fetchDivisions = async () => {
    try {
      setLoading(true);
      const response = await axios.get("https://bdapis.com/api/v1.2/divisions");
      if (response.data.status.code === 200) {
        setDivisions(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching divisions:", error);
    } finally {
      setLoading(false);
    }
  };

  //....Fetch districts by division..........
  const fetchDistricts = async (divisionName) => {
    try {
      setLoading(true);
      const response = await axios.get(
        `https://bdapis.com/api/v1.2/division/${divisionName}`
      );
      if (response.data.status.code === 200) {
        setDistricts(response.data.data);
        setUpazilas([]);
      }
    } catch (error) {
      console.error("Error fetching districts:", error);
      setDistricts([]);
    } finally {
      setLoading(false);
    }
  };

  //....Form state...........................
  const [form, setForm] = useState({
    name: "",
    mobile: "",
    division: "",
    district: "",
    upazila: "",
    address: "",
  });

  const handleDivision = (e) => {
    const value = e.target.value;
    setForm({ ...form, division: value, district: "", upazila: "" });

    if (value) {
      fetchDistricts(value);
    } else {
      setDistricts([]);
      setUpazilas([]);
    }
  };

  const handleDistrict = (e) => {
    const value = e.target.value;
    setForm({ ...form, district: value, upazila: "" });

    // Find the selected district and get its upazilas
    const selectedDistrict = districts.find((d) => d.district === value);
    if (selectedDistrict && selectedDistrict.upazilla) {
      setUpazilas(selectedDistrict.upazilla);
    } else {
      setUpazilas([]);
    }
  };

  //....Handle upazila change................
  const handleUpazila = (e) => setForm({ ...form, upazila: e.target.value });

  //....Generic input change.................
  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  //....Update cart quantity.................
  const updateQty = (id, type) => {
    const updatedCart = cart.map((item) =>
      item.id === id
        ? {
            ...item,
            qty: type === "inc" ? item.qty + 1 : Math.max(1, item.qty - 1),
          }
        : item
    );
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  //....Remove item..........................
  const removeFromCart = (id) => {
    const updatedCart = cart.filter((item) => item.id !== id);
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  //....Toggle product.......................
  const toggleExpand = (itemId) => {
    setExpandedItems((prev) => ({
      ...prev,
      [itemId]: !prev[itemId],
    }));
  };

  //....Function.............................
  const truncateText = (text, wordLimit = 6) => {
    const words = text.split(" ");
    if (words.length <= wordLimit) {
      return text;
    }
    return words.slice(0, wordLimit).join(" ") + "...";
  };

  //....Calculate subtotal...................
  const subTotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  //....Submit order.........................
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (cart.length === 0) return alert("Cart is empty!");

    const payload = {
      name: form.name,
      mobile: form.mobile,
      division: form.division,
      district: form.district,
      upazila: form.upazila,
      address: form.address,
      cart,
      total: subTotal,
    };

    try {
      const { data } = await axios.post(
        "http://localhost:5000/orders",
        payload
      );
      if (data.success && data.orderId) {
        alert(`Order Confirmed! Order ID: ${data.orderId}`);
        setForm({
          name: "",
          mobile: "",
          division: "",
          district: "",
          upazila: "",
          address: "",
        });
        setCart([]);
        localStorage.removeItem("cart");
        setExpandedItems({});
      } else {
        alert(data.message || "Something went wrong.");
      }
    } catch (error) {
      console.error("Order error:", error);
      alert("Something went wrong. Try again.");
    }
  };

  return (
    <>
      <div className="container mx-auto p-4 mt-24 grid grid-cols-1 lg:grid-cols-2 gap-2 ">
        {/*....Left....*/}
        <div className="shadow-md rounded-xl p-6 bg-[#e9e7e8]">
          <h2 className="text-lg font-bold mb-4">Customer Information</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  placeholder="Enter your full name"
                  value={form.name}
                  onChange={handleChange}
                  className="w-full border px-3 py-2 rounded-md"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Mobile Number
                </label>
                <input
                  type="text"
                  name="mobile"
                  placeholder="01XXXXXXXXX"
                  value={form.mobile}
                  onChange={handleChange}
                  className="w-full border px-3 py-2 rounded-md"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Division
                </label>
                <select
                  value={form.division}
                  onChange={handleDivision}
                  className="w-full border px-3 py-2 rounded-md"
                  required
                  disabled={loading}
                >
                  <option value="">Select Division</option>
                  {divisions.map((division) => (
                    <option key={division.division} value={division.division}>
                      {division.division}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  District
                </label>
                <select
                  value={form.district}
                  onChange={handleDistrict}
                  className="w-full border px-3 py-2 rounded-md"
                  required={!!form.division}
                  disabled={!form.division || loading}
                >
                  <option value="">Select District</option>
                  {districts.map((district) => (
                    <option key={district.district} value={district.district}>
                      {district.district}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Upazila
                </label>
                <select
                  value={form.upazila}
                  onChange={handleUpazila}
                  className="w-full border px-3 py-2 rounded-md"
                  required={!!form.district}
                  disabled={!form.district || upazilas.length === 0}
                >
                  <option value="">Select Upazila</option>
                  {upazilas.map((upazila, index) => (
                    <option key={index} value={upazila}>
                      {upazila}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Full Address
              </label>
              <textarea
                name="address"
                placeholder="House No, Road No, Area, Village etc."
                value={form.address}
                onChange={handleChange}
                className="w-full border px-3 py-2 rounded-md"
                required
                rows="3"
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full bg-pink-500 text-white py-3 rounded-md hover:bg-pink-600 transition disabled:bg-gray-400 font-medium"
              disabled={cart.length === 0 || loading}
            >
              {loading
                ? "Processing..."
                : cart.length === 0
                ? "Cart is Empty"
                : "Confirm Order"}
            </button>
          </form>
        </div>

        {/*....Right...*/}
        <div className="shadow-md rounded-xl p-6 bg-[#e9e7e8]">
          <h2 className="text-lg font-bold mb-4">
            Cart Products ({cart.length})
          </h2>

          {cart.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-500">Your cart is empty</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gray-50 border-b">
                    <th className="text-center p-1 font-semibold">Action</th>
                    <th className="text-left p-1 font-semibold">Product</th>
                    <th className="text-center p-1 font-semibold">Qty</th>
                    <th className="text-right p-1 font-semibold">Price</th>
                    <th className="text-right p-1 font-semibold">Sub Total</th>
                  </tr>
                </thead>
                <tbody>
                  {cart.map((item, index) => {
                    const isExpanded = expandedItems[item.id];
                    const wordCount = item.name.split(" ").length;
                    const showToggle = wordCount > 6;
                    const displayName = isExpanded
                      ? item.name
                      : truncateText(item.name, 6);

                    return (
                      <tr
                        key={`${item.id}-${index}`}
                        className="border-b hover:bg-gray-50"
                      >
                        <td className="p-3 text-center">
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="text-red-500 hover:text-red-700 p-1 rounded-full hover:bg-red-50"
                            title="Remove item"
                          >
                            <svg
                              className="w-4 h-4"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M6 18L18 6M6 6l12 12"
                              />
                            </svg>
                          </button>
                        </td>
                        <td className="p-3">
                          <div className="flex items-center space-x-3">
                            <img
                              src={item.image}
                              alt={item.name}
                              className="w-12 h-12 object-cover rounded"
                            />
                            <div className="min-w-0 flex-1">
                              <div className="font-medium text-gray-900">
                                {displayName}
                                {showToggle && (
                                  <button
                                    onClick={() => toggleExpand(item.id)}
                                    className="ml-2 text-blue-500 hover:text-blue-700 text-xs font-normal underline"
                                  >
                                    {isExpanded ? "Less" : "More"}
                                  </button>
                                )}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="p-3 text-center">
                          <div className="flex items-center justify-center space-x-1">
                            <button
                              onClick={() => updateQty(item.id, "dec")}
                              className="w-4 h-4 bg-gray-200 rounded flex items-center justify-center text-sm hover:bg-gray-300"
                            >
                              -
                            </button>
                            <span className="w-5 text-center font-medium">
                              {item.qty}
                            </span>
                            <button
                              onClick={() => updateQty(item.id, "inc")}
                              className="w-4 h-4 bg-gray-200 rounded flex items-center justify-center text-sm hover:bg-gray-300"
                            >
                              +
                            </button>
                          </div>
                        </td>
                        <td className="text-xs">৳{item.price}</td>
                        <td className="p-3 text-right font-semibold text-green-600">
                          ৳{item.price * item.qty}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>

              {/* Order Summary */}
              <div className="mt-6 pt-4 border-t">
                <div className="space-y-2">
                  <div className="flex justify-between text-gray-600">
                    <span>Subtotal ({cart.length} items):</span>
                    <span>৳{subTotal}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Shipping Fee:</span>
                    <span>৳{cart.length > 0 ? 120 : 0}</span>
                  </div>
                  <div className="flex justify-between text-lg font-bold pt-2 border-t">
                    <span>Total Amount:</span>
                    <span className="text-green-600">
                      ৳{cart.length > 0 ? subTotal + 120 : 0}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/*....Loading.*/}
        {loading && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg flex items-center space-x-3">
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-pink-500"></div>
              <p>Loading address data...</p>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default Checkout;
