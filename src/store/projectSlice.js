import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	landinPageData: {
		origin: "",
		departure: "",
		return: "",
		budget: "",
	},
	pureData: {
		dcityCode: "",
		dcityName: "",
		ocityCode: "",
		ocityName: "",
	},
	hotlesList: [],
	flightList: [],
};

export const projectSlice = createSlice({
	name: "project",
	initialState,
	reducers: {
		setLandingPageInfo: (state, action) => {
			if (action.payload.landinPageData === null) {
				state.landinPageData = null;
			} else {
				state.landinPageData = action.payload.landinPageData;
			}
		},
		setPuredata: (state, action) => {
			if (action.payload.pureData === null) {
				state.pureData = null;
			} else {
				state.pureData = action.payload.pureData;
			}
		},
		setHotleList: (state, action) => {
			if (action.payload.hotlesList === null) {
				state.hotlesList = null;
			} else {
				state.hotlesList = action.payload.hotlesList;
			}
		},
		setFlightList: (state, action) => {
			if (action.payload.flightList === null) {
				state.flightList = null;
			} else {
				state.flightList = action.payload.flightList;
			}
		},
	},
});

export const { setLandingPageInfo, setPuredata, setFlightList, setHotleList } =
	projectSlice.actions;

export default projectSlice.reducer;
