import { useEffect, useState } from "react";
import type { Location } from "../types/models";
import { getLocationError } from "../constants/errorMessage";

const useLocation = () => {
  const [location, setLocation] = useState<Location>();

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setLocation({ latitude, longitude });
      },
      (error) => {
        getLocationError(error);
      }
    );
  }, []);

  return { location };
};

export default useLocation;
