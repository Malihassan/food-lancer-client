import axios from "axios";

export const axiosInstance = axios.create({
	baseURL: "https://food-lancer.herokuapp.com/",
	// baseURL:"http://localhost:3300/"
});
export function getCookie(cName) {
	const name = cName + "=";
	const cDecoded = decodeURIComponent(document.cookie); //to be careful
	const cArr = cDecoded.split("; ");
	let res;
	cArr.forEach((val) => {
		if (val.indexOf(name) === 0) res = val.substring(name.length);
	});
	return res;
}
//Add a request interceptor
axiosInstance.interceptors.request.use(
	function (config) {
		const token = getCookie("token");

		config.headers["token"] = token;

		return config;
	},
	function (error) {
		if (axios.isAxiosError(error)) {
			if (error.response) {
				if (error.response.status === 401) {
					window.location.reload();
				}
			}
		}

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
