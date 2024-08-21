import { useCallback } from "react";
import axios from "axios";
const useHttp = () => {
  const searchResults = useCallback(async (data, link, getData) => {
    try {
      const search = await axios.post(
        `https://booking-q22t.onrender.com${link}`,
        { data },
        { headers: { "Content-Type": "application/json" } }
      );

      if (getData) {
        getData(search.data.results);
      }
    } catch (error) {
      console.log(error);
      if (error.response?.data.message) {
        alert("email da duoc su dung");
        return;
      }
    }
  }, []);
  return {
    searchResults,
  };
};
export default useHttp;
export const url_http = "https://booking-q22t.onrender.com";
