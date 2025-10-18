//  Development base URL
const baseUrl =
  process.env.NODE_ENV === "production"
    ? "https://ecom-server-iota.vercel.app"
    : "http://localhost:5000";

export default baseUrl;
