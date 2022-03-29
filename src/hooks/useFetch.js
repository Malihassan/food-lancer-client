import { useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import { axiosInstance } from "../network/axiosConfig";
import { loadActions } from "../store/LoadingSlice";

const useFetch = () => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(null);

  const sendRequest = useCallback(async (requestConfig, redirectionHandler) => {
    setIsLoading(true);
    setHasError(null);
    dispatch(loadActions.toggelLoader());
    try {
      let respose;
      switch (requestConfig.method) {
        case "GET":
          respose = await axiosInstance.get(requestConfig.url, {
            params: requestConfig.params ? requestConfig.params : null,
          });
          break;
        case "POST":
          respose = await axiosInstance.post(
            requestConfig.url,
            requestConfig.body ? requestConfig.body : null
          );
          break;
        case "PATCH":
          respose = await axiosInstance.patch(
            requestConfig.url,
            requestConfig.body ? requestConfig.body : null
          );
          break;
        case "DELETE":
          respose = await axiosInstance.delete(requestConfig.url);
          break;
      }
      redirectionHandler(respose);
      //   console.log("===>", respose);
    } catch (error) {
      setHasError(error.message);
    }
    setIsLoading(false);
    dispatch(loadActions.toggelLoader());
  }, []);
  return {
    hasError,
    isLoading,
    sendRequest,
  };
};

export default useFetch;
