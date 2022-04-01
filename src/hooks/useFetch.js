import { useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useH } from "react-router-dom";
import { axiosInstance, deleteCookie } from "../network/axiosConfig";
import { authActions } from "../store/AuthSlice";
import { loadActions } from "../store/LoadingSlice";

const useFetch = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
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
            requestConfig.body ? requestConfig.body : {},
            requestConfig.headers ? requestConfig.headers : {}
          );
          break;
        case "DELETE":
          respose = await axiosInstance.delete(requestConfig.url);
          break;
      }
      redirectionHandler(respose);
    } catch (error) {
      if (error.message === "Request failed with status code 401") {
        dispatch(authActions.logout())
      }
    }
    // setIsLoading(false);
    dispatch(loadActions.toggelLoader());
  }, []);
  return {
    hasError,
    isLoading,
    sendRequest,
  };
};

export default useFetch;
