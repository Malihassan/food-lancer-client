import axios from "axios";

export const axiosInstance = axios.create({
	//   withCredentials: true,
	baseURL: "https://food-lancer.herokuapp.com/",
	// baseURL: "http://localhost:3300/",
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
export function deleteCookie(name, path, domain) {
	if (getCookie(name)) {
		document.cookie =
			name +
			"=" +
			(path ? ";path=" + path : "") +
			(domain ? ";domain=" + domain : "") +
			";expires=Thu, 01 Jan 1970 00:00:01 GMT";
	}
}
//Add a request interceptor
axiosInstance.interceptors.request.use(
	function (config) {
		const token = getCookie("token");

		config.headers["token"] = token;

		return config;
	},
	function (error) {
		// console.log("error==================");
		// if (axios.isAxiosError(error)) {
		//   if (error.response) {
		//     if (error.response.status === 401) {
		//       //   window.location.reload();
		//       console.log(error.response,"============ error");
		//       deleteCookie("token");
		//       deleteCookie("userType");
		//       window.location.replace("./home");
		//     }
		//   }
		// }

		// Do something with request error
		return Promise.reject(error);
	}
);

// Add a response interceptor
axiosInstance.interceptors.response.use(
	function (response) {
		// Any status code that lie within the range of 2xx cause this function to trigger
		// Do something with response data
		return response;
	},
	function (error) {
		if (axios.isAxiosError(error)) {
			if (error.response) {
				if (error.response.status === 401) {
					deleteCookie("token");
					deleteCookie("userType");
					deleteCookie("id");
					window.location.replace("/login");
				}
			}
		}
		return Promise.reject(error);
	}
);
