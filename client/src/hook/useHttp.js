import { useCallback } from "react";
import axios from "axios";
export const url_http = "http://localhost:5000";
const useHttp = () => {
  const searchResults = useCallback(async (data, link, getData) => {
    try {
      const search = await axios.post(
        `${url_http}${link}`,
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
// "https://booking-q22t.onrender.com";
