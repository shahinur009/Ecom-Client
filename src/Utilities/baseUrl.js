//  Development base URL
const baseUrl =
  process.env.NODE_ENV === "production"
    ? "https://rabsbabyzones.com" 
    : "https://ecom-server-iota.vercel.app";

export default baseUrl;
