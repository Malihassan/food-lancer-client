import { useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import { axiosInstance } from "../network/axiosConfig";
import { authActions } from "../store/AuthSlice";
import { loadActions } from "../store/LoadingSlice";

const useFetch = () => {
  const dispatch = useDispatch();
  const [hasError, setHasError] = useState(null);

  const sendRequest = useCallback(async (requestConfig, redirectionHandler) => {
    setHasError(null);
    dispatch(loadActions.toggelLoader());
    try {
      let respose;
      switch (requestConfig.method) {
        case "GET":
          respose = await axiosInstance
            .get(requestConfig.url, {
              params: requestConfig.params ? requestConfig.params : {},
            })
            .catch((error) => {
              setHasError(error.response.data);
            });
          break;
        case "POST":
          respose = await axiosInstance
            .post(
              requestConfig.url,
              requestConfig.body ? requestConfig.body : null
            )
            .catch((error) => {
              setHasError(error.response.data);
            });
          break;
        case "PATCH":
          respose = await axiosInstance
            .patch(
              requestConfig.url,
              requestConfig.body ? requestConfig.body : {},
              requestConfig.headers ? requestConfig.headers : {}
            )
            .catch((error) => {
              setHasError(error.response.data);
            });
          break;
        case "DELETE":
          respose = await axiosInstance
            .delete(requestConfig.url, {
              data: {
                id: requestConfig.body.id ? requestConfig.body.id : {},
              },
            })
            .catch((error) => {
              setHasError(error.response.data);
            });
          break;
        default:
          break;
      }
      redirectionHandler(respose);
    } catch (error) {
      if (error.message === "Request failed with status code 401") {
        return dispatch(authActions.logout());
      }
    }
    dispatch(loadActions.toggelLoader());
  }, []);
  return {
    hasError,
    sendRequest,
  };
};

export default useFetch;
/**
 * , {
								data: {
									id: requestConfig.body.id
										? requestConfig.body.id
										: {},
								},
							}
 */
