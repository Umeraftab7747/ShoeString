import React, { useState, useEffect } from "react";
import {
	SafeAreaView,
	ScrollView,
	StatusBar,
	StyleSheet,
	View,
	Text,
	TextInput,
	ImageBackground,
	FlatList,
	Dimensions,
	TouchableOpacity,
	Image,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import FontAwesomeIcon from "react-native-vector-icons/FontAwesome";
import WavyBackground from "react-native-wavy-background";
import COLOURS from "../consts/colours";
import RowIconText from "./RowIconText";
import { w, h } from "react-native-responsiveness";
import Pricediv from "./Pricediv";
import { useSelector, useDispatch } from "react-redux";
import { fetchHotles, fetchFlights } from "../api";
import { setHotleList } from "../store/projectSlice";
import HotleCard from "./HotleCard";
const listTab = [
	{
		status: "Hotel",
	},
	{
		status: "Flight",
	},
	{
		status: "Famous Spots",
	},
];

const data = [
	{
		name: "Tokyo 5-Stars",
		address: "123 address, Tokyo, Japan",
		status: "Hotel",
	},
	{
		name: "ANA 3000",
		status: "Flight",
	},
];

const Details = ({ navigation }) => {
	const [status, setStatus] = useState("Hotel");
	const dispatch = useDispatch();
	const [datalist, setDatalist] = useState(data);
	const setStatusFilter = (status) => {
		setDatalist([...data.filter((e) => e.status === status)]);

		setStatus(status);
	};
	const checking = async () => {
		try {
			const respoince = await fetchFlights(
				pureData.ocityCode,
				pureData.dcityCode,
				"2022-07-20",
				"2022-07-27",
				2
			);
			console.log("======================================");
			console.log(respoince.data.data[0]);
			console.log("***********");
		} catch (e) {
			console.log(e.message);
		}
	};
	const hotleList = async () => {
		try {
			const respoince = await fetchHotles(pureData.dcityCode);
			dispatch(setHotleList({ hotlesList: respoince.data.data }));

			console.log("***********", respoince.data.data.length);
		} catch (e) {
			console.log(e.message);
		}
	};
	useEffect(() => {
		hotleList();
		checking();
	}, []);

	const { pureData, hotlesList } = useSelector((state) => state.project);
	const renderItem = ({ item, index }) => {
		return (
			<View key={index}>
				<View>
					<Text>{item.name}</Text>
					<Text>{item.address}</Text>
				</View>
			</View>
		);
	};

	function renderHeader() {
		return (
			<View
				style={{
					flexDirection: "row",
					paddingHorizontal: 20,
					paddingVertical: 20,
					alignItems: "center",
				}}>
				<TouchableOpacity
					styles={{
						width: 45,
						height: 45,
						alignItems: "center",
						justifyContent: "center",
					}}
					onPress={() => navigation.goBack()}>
					<Icon
						style={{ color: COLOURS.orange }}
						name='arrow-back-ios'
						size={28}
					/>
				</TouchableOpacity>

				<View
					style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
					<Text style={{ color: COLOURS.black, fontWeight: "bold" }}>
						{pureData.dcityName}
					</Text>
				</View>

				<TouchableOpacity
					styles={{
						alignItems: "center",
						justifyContent: "center",
					}}
					onPress={() => navigation.navigate("Login")}>
					<FontAwesomeIcon
						style={{ color: COLOURS.orange }}
						name='user'
						size={25}
					/>
				</TouchableOpacity>
			</View>
		);
	}

	return (
		<SafeAreaView style={{ flex: 1, backgroundColor: COLOURS.white }}>
			{renderHeader()}
			<View style={style.listTab}>
				{listTab.map((e) => (
					<TouchableOpacity
						style={[style.btnTab, status === e.status && style.btnTabActive]}
						onPress={() => setStatusFilter(e.status)}>
						<Text
							style={[
								style.textTab,
								status === e.status && style.textTabActive,
							]}>
							{e.status}
						</Text>
					</TouchableOpacity>
				))}
			</View>
			<View style={style.content}>
				{status === "Hotel" ? (
					<>
						<FlatList
							data={hotlesList}
							keyExtractor={(item) => item.hotelId}
							renderItem={({ item, index }) => (
								<HotleCard
									name={index + 1 + ". " + item.name}
									id={item.hotelId}
								/>
							)}
						/>
					</>
				) : (
					<>
						<Image
							style={style.imagestyles}
							source={{
								uri: "data:image/jpeg;base64,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",
							}}
						/>
						<Text style={style.hotlename}>Airline Name</Text>
						<RowIconText
							iconName={"location-pin"}
							text={"Destination"}
							isbold={true}
							color={COLOURS.orange}
							textcolor={COLOURS.dark}
						/>

						<Pricediv text={"500$"} />
						<RowIconText
							iconName={"globe"}
							text={"www.myweb.com"}
							color={COLOURS.orange}
							textcolor={COLOURS.dark}
							fontSizeSmall
						/>
						<RowIconText
							iconName={"mail"}
							text={"email@support.com"}
							color={COLOURS.orange}
							textcolor={COLOURS.dark}
							fontSizeSmall
						/>
						<RowIconText
							iconName={"phone"}
							text={"92123239283"}
							color={COLOURS.orange}
							textcolor={COLOURS.dark}
							fontSizeSmall
						/>
						<Text style={style.headingtxt}>What we offer</Text>
						<RowIconText
							iconName={"dot-single"}
							text={"Nice Staff"}
							color={COLOURS.dark}
							textcolor={COLOURS.dark}
							fontSizeSmall
						/>
						<RowIconText
							iconName={"dot-single"}
							text={"Nice Envirement"}
							color={COLOURS.dark}
							textcolor={COLOURS.dark}
							fontSizeSmall
						/>
						<RowIconText
							iconName={"dot-single"}
							text={"Comfortable sEATS"}
							color={COLOURS.dark}
							textcolor={COLOURS.dark}
							fontSizeSmall
						/>
					</>
				)}
			</View>
		</SafeAreaView>
	);
};

const style = StyleSheet.create({
	listTab: {
		backgroundColor: COLOURS.white,
		marginLeft: 20,
		flexDirection: "row",
	},

	btnTab: {
		width: Dimensions.get("window").width / 3.5,
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
		flexDirection: "row",
		borderWidth: 0.5,
		borderColor: COLOURS.orange,
		padding: 10,
		justifyContent: "center",
		borderTopLeftRadius: 10,
		borderTopRightRadius: 10,
	},

	textTab: {
		fontSize: h("2%"),
		textAlign: "center",
	},

	btnTabActive: {
		backgroundColor: COLOURS.orange,
	},

	textTabActive: {
		color: COLOURS.white,
		fontWeight: "bold",
	},

	content: {
		padding: 20,
		marginHorizontal: 20,
		borderWidth: 1,
		borderColor: COLOURS.orange,
		flex: 1,
		borderTopRightRadius: 10,
		borderBottomLeftRadius: 10,
		borderBottomRightRadius: 10,
		marginBottom: 10,
	},
	imagestyles: {
		width: "100%",
		height: 200,
		resizeMode: "cover",
	},
	hotlename: {
		color: COLOURS.blue,
		fontSize: h("3%"),
		fontWeight: "700",
		marginVertical: h("1%"),
	},
	headingtxt: {
		fontSize: h("2.9%"),
		marginBottom: h("1%"),
		fontWeight: "700",
	},
});

export default Details;
