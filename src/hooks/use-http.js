import { useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import { searchActions } from "../store/slice/search";

const useHttp = function () {
  const dispatch = useDispatch();
  const [error, setError] = useState(null);

  const sendRequest = useCallback(
    async function (requestConfig, applyData) {
      dispatch(searchActions.setIsLoading({ isLoading: true }));
      try {
        const response = await fetch(requestConfig.url, {
          method: requestConfig.method || "GET",
          mode: requestConfig.mode || "cors",
          headers: requestConfig.headers || {},
          body: requestConfig.body || null,
        });

        if (!response.ok) {
          throw new Error({
            title: "Loading failed",
            message: "Failed to fetch. Please try again later.",
          });
        }

        const data = await response.json();
        applyData(data);
      } catch (error) {
        setError(error.message || "Something went wrong");
      } finally {
        dispatch(searchActions.setIsLoading({ isLoading: false }));
      }
    },
    [dispatch]
  );

  return { setError, sendRequest };
};

export default useHttp;
