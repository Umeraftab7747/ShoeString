import { Alert } from "react-native";
import qs from "qs";
const axios = require("axios");
export const axiosInstance = axios.create({});
export const baseUrl = "https://hotlin1234.herokuapp.com";
// const newbaseUrl = "";
export const fetchcity = async (data) => {
	const responce = await axiosInstance.post(
		`${baseUrl}/dataFetch/search-location`,
		{
			keyword: data,
		}
	);
	return responce;
};
// export const fetchHotles = async (data) => {
// 	const responce = await axios({
// 		method: "get",
// 		url: `${newbaseUrl}/dataFetch/city-hotels`,
// 		params: {
// 			cityCode: data,
// 		},
// 	});

// 	return responce;
// };
export const fetchToken = async () => {
	const data = {
		client_id: "i24KGXU1HIiDQ6ZfSrzL15nk5OJ1B4Ow",
		client_secret: "tvxQGVDjWkyjNpag",
		grant_type: "client_credentials",
	};
	const url = `https://test.api.amadeus.com/v1/security/oauth2/token`;

	const options = {
		method: "POST",
		headers: { "content-type": "application/x-www-form-urlencoded" },
		data: qs.stringify(data),
		url,
	};
	const respoince = await axios(options);
	return respoince;
};
export const fetchHotles = async (cityCode) => {
	//  {
	//   "chainCode": "AK",
	//   "iataCode": "NYC",
	//   "dupeId": 700003309,
	//   "name": "THE LEXINGTON NEW YORK CITY",
	//   "hotelId": "AKNYCLXA",
	//   "geoCode": {
	//     "latitude": 40.75251,
	//     "longitude": -73.9731
	//   },
	//   "address": {
	//     "countryCode": "US"
	//   }
	// },
	const { data } = await fetchToken();
	const url = `https://test.api.amadeus.com/v1/reference-data/locations/hotels/by-city?cityCode=${cityCode}&hotelSource=ALL`;

	const options = {
		method: "GET",
		headers: { Authorization: `${data.token_type} ${data.access_token}` },
		url,
	};
	const respoince = await axios(options);
	return respoince;
};
export const fetchFlights = async (origin, destination, from, to, adults) => {
	const { data } = await fetchToken();
	const url = `https://test.api.amadeus.com/v2/shopping/flight-offers?originLocationCode=${origin}&destinationLocationCode=${destination}&departureDate=${from}&adults=${adults}&nonStop=false&returnDate=${to}`;

	const options = {
		method: "GET",
		headers: { Authorization: `${data.token_type} ${data.access_token}` },
		url,
	};
	const respoince = await axios(options);
	return respoince;
};
