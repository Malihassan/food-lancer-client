import axios from "axios";

export const axiosInstance = axios.create({
	// baseURL: "https://food-lancer.herokuapp.com/",
	baseURL: "http://localhost:3000/",
});

// Add a request interceptor
axiosInstance.interceptors.request.use(
	function (config) {
		// Do something before request is sent
		// console.log(config);
		config.headers["token"] =
			"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyTmFtZSI6Ik1hbGlIYXNzYW4iLCJpZCI6IjYyMGMxYzVlMWVlZmZlODhjYzUxOTJkNiIsImlhdCI6MTY0ODAzOTQ4OSwiZXhwIjoxNjQ4MTI1ODg5fQ.PPZyzSxCq6t24npCYN21jWVkyXvSnjh0dEEETpfa_Sk";
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
