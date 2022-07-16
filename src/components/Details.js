import React, { useState } from "react";
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
const listTab = [
	{
		status: "Hotel",
	},
	{
		status: "Flight",
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
	const [datalist, setDatalist] = useState(data);
	const setStatusFilter = (status) => {
		setDatalist([...data.filter((e) => e.status === status)]);

		setStatus(status);
	};
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
					onPress={() => navigation.navigate("LandingPage")}>
					<Icon
						style={{ color: COLOURS.orange }}
						name='arrow-back-ios'
						size={28}
					/>
				</TouchableOpacity>

				<View
					style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
					<Text style={{ color: COLOURS.black, fontWeight: "bold" }}>
						JAPAN
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
						<Image
							style={style.imagestyles}
							source={{
								uri: "data:image/jpeg;base64,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",
							}}
						/>
						<Text style={style.hotlename}>Hotel Name</Text>
						<RowIconText
							iconName={"location-pin"}
							text={"Address"}
							isbold={true}
							color={COLOURS.orange}
							textcolor={COLOURS.dark}
						/>

						<Pricediv text={"1000$"} />
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
							text={"Parking"}
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
							text={"Privacy"}
							color={COLOURS.dark}
							textcolor={COLOURS.dark}
							fontSizeSmall
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
		flexDirection: "row",
		borderWidth: 0.5,
		borderColor: COLOURS.orange,
		padding: 10,
		justifyContent: "center",
		borderTopLeftRadius: 10,
		borderTopRightRadius: 10,
	},

	textTab: {
		fontSize: 16,
	},

	btnTabActive: {
		backgroundColor: COLOURS.orange,
	},

	textTabActive: {
		color: COLOURS.white,
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
