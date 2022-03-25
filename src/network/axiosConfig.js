import axios from "axios";

export const axiosInstance = axios.create({
	// baseURL: "https://food-lancer.herokuapp.com/",
	baseURL:"http://localhost:3300/"
});

// Add a request interceptor		
axiosInstance.interceptors.request.use(
	function (config) {
		// Do something before request is sent
		// console.log(config);
		config.headers["token"] = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyTmFtZSI6Ik1vbWVuIiwiaWQiOiI2MjBiYmFlNjI5MGZmNjU3NjFmMDhiZWMiLCJpYXQiOjE2NDgyMTU0OTUsImV4cCI6MTY0ODMwMTg5NX0.sSqRtOIkgULHbu-s4y8R2yoMPBuqLD98n1t0rMcl-S8";
		// config.params["test"] = "test";
		return config;
	},
	function (error) {
		// Do something with request error
		return Promise.reject(error);
	}
);

// // Add a response interceptor
// axiosInstance.interceptors.response.use(
// 	function (response) {
// 		// Any status code that lie within the range of 2xx cause this function to trigger
// 		// Do something with response data
// 		console.log(response);
// 		return response;
// 	},
// 	function (error) {
// 		// Any status codes that falls outside the range of 2xx cause this function to trigger
// 		// Do something with response error
// 		// Show ERROR Handler Message
// 		return Promise.reject(error);
// 	}
// );
