import { useState, useEffect } from "react";
import axios from "axios";

const useCustomHook = (endpoint) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(endpoint);
        setData(response.data);
        setLoading(false);
      } catch (err) {
        setError(err.message || "Error occurred while fetching data");
        setLoading(false);
      }
    };
    fetchData();
  }, [endpoint]);

  return { data, loading, error };
};

export default useCustomHook;
