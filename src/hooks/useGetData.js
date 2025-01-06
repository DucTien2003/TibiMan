import axiosRequest from "@/api/axiosRequest";
import { useState, useEffect } from "react";

export function useGetData(apis) {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [responseData, setResponseData] = useState([]);

  useEffect(() => {
    console.log(
      "Call:",
      apis.map((api) => api.url)
    );

    const getData = async () => {
      try {
        setLoading(true);
        const responses = await Promise.all(
          apis.map((api) =>
            axiosRequest(api.url, {
              method: "get",
              body: api.body,
              query: api.query,
              params: api.params,
            })
          )
        );

        const data = responses.map((response) => response.data);

        setResponseData(data);
        setLoading(false);
        setError(null);
      } catch (error) {
        console.log("Error:" + error.message);
        setError(error.message);
        setLoading(false);
      }
    };

    getData();
  }, [apis]);

  return {
    error,
    loading,
    responseData,
  };
}
