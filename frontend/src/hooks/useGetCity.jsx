import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setCurrentAddress,
  setCurrentCity,
  setCurrentState,
} from "../redux/userSlice";
import axios from "axios";

const useGetCity = () => {
  const dispatch = useDispatch();
  const { userData } = useSelector((state) => state.user);
  const apiKey = import.meta.env.VITE_GEOAPIKEY;

  useEffect(() => {
    if (!navigator.geolocation) return;

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          // console.log("Position:", position);
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;

          const result = await axios.get(
            `https://api.geoapify.com/v1/geocode/reverse?lat=${latitude}&lon=${longitude}&format=json&apiKey=${apiKey}`
          );

          const place = result?.data?.results?.[0];
          // console.log("Geoapify response:", place);

          const detectedCity =
            place?.city ||
            place?.town ||
            place?.village ||
            place?.county ||
            place?.state ||
            "Unknown City";

          const detectedState = place?.state || "Unknown State";

          const detectedAddress = place?.formatted || "unknown Address";

          dispatch(setCurrentCity(detectedCity));
          dispatch(setCurrentState(detectedState));
          dispatch(setCurrentAddress(detectedAddress));
        } catch (err) {
          console.error("Error fetching city:", err);
        }
      },
      (error) => {
        console.error("Geolocation error:", error);
      }
    );
  }, [userData, apiKey, dispatch]);
};

export default useGetCity;
