import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const useGoogleAnalytics = () => {
  const location = useLocation();

  useEffect(() => {
    if (window.gtag) {
      window.gtag("config", process.env.VITE_GA_MEASUREMENT_ID, {
        page_path: location.pathname + location.search,
      });
    }
  }, [location]);

  const trackEvent = (action, category, label, value) => {
    if (window.gtag) {
      window.gtag("event", action, {
        event_category: category,
        event_label: label,
        value: value,
      });
    }
  };

  return { trackEvent };
};

export default useGoogleAnalytics;
