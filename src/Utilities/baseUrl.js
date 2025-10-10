//  Development base URL
const baseUrl =
  process.env.NODE_ENV === "production"
    ? "https://rabsbabyzones.com" 
    : "http://localhost:5000";

export default baseUrl;
