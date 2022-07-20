import {
	SafeAreaView,
	StyleSheet,
	StatusBar,
	Text,
	View,
	Image,
	TextInput,
	FlatList,
	TouchableOpacity,
	ActivityIndicator,
} from "react-native";
import React, { useState, useEffect } from "react";
import COLOURS from "../consts/colours";
import { w, h } from "react-native-responsiveness";
import { fetchcity, fetchHotles } from "../api";
import { useDispatch, useSelector } from "react-redux";
import { setPuredata } from "../store/projectSlice";
const DestinationScreen = ({ navigation }) => {
	const { pureData } = useSelector((state) => state.project);
	const [mydata, setmydata] = useState([]);
	const [citynameInput, setcitynameInput] = useState(pureData.ocityName);
	const [citynameInput2, setcitynameInput2] = useState(pureData.dcityName);
	const [formPuredata, setformPuredata] = useState(pureData);

	const [showBtn, setshowBtn] = useState(false);
	console.log(formPuredata);
	const dispatch = useDispatch();

	const [loading, setloading] = useState(false);
	const [selectedCityCode, setselectedCityCode] = useState("");
	const [flatlist1, setflatlist1] = useState("");
	const getAllCity = async () => {
		setloading(true);
		try {
			const myresp = await fetchcity(citynameInput);
			if (myresp.data.data.data.length > 0) {
				setmydata(myresp.data.data.data);
				setloading(false);
			}
		} catch (error) {
			console.log(error.message);
			setloading(false);
		}
	};
	const getAllCity2 = async () => {
		setloading(true);
		try {
			const myresp = await fetchcity(citynameInput2);
			if (myresp.data.data.data.length > 0) {
				setmydata(myresp.data.data.data);
				setloading(false);
			}
		} catch (error) {
			console.log(error.message);
			setloading(false);
		}
	};
	useEffect(() => {
		if (citynameInput.length > 2 && flatlist1 === "1") {
			getAllCity();
		} else if (citynameInput2.length > 2 && flatlist1 === "2") {
			getAllCity2();
		} else {
			setmydata([]);
		}
	}, [citynameInput, citynameInput2, flatlist1]);
	useEffect(() => {
		if (
			formPuredata.dcityCode.length > 0 &&
			formPuredata.ocityCode.length > 0 &&
			formPuredata.dcityName.length > 0 &&
			formPuredata.ocityName.length > 0
		) {
			setshowBtn(true);
		}
	}, [formPuredata]);

	console.log(selectedCityCode);
	const formSubmitFun = async () => {
		await dispatch(setPuredata({ pureData: formPuredata }));
		navigation.navigate("Details");
	};
	return (
		<SafeAreaView style={styles.fillbg}>
			<StatusBar translucent={false} backgroundColor={COLOURS.orange} />
			<Image
				style={styles.logo}
				resizeMode='contain'
				source={require("../images/shoestring_logo.png")}
			/>
			<TextInput
				style={styles.inputContainer}
				placeholder='Enter Your Origin'
				value={citynameInput}
				onFocus={() => setflatlist1("1")}
				onChangeText={(text) => {
					setcitynameInput(text);
				}}
			/>
			<TextInput
				style={styles.inputContainer}
				placeholder='Enter Your Destination'
				value={citynameInput2}
				onFocus={() => setflatlist1("2")}
				onChangeText={(text) => {
					setcitynameInput2(text);
				}}
			/>
			{loading ? (
				<View style={styles.errorDiv}>
					<ActivityIndicator color={COLOURS.orange} size={"large"} />
				</View>
			) : (
				<FlatList
					data={mydata}
					contentContainerStyle={{ paddingTop: 10 }}
					renderItem={({ item, index }) => (
						<TouchableOpacity
							onPress={() => {
								if (flatlist1 === "1") {
									setformPuredata({
										...formPuredata,
										ocityCode: item.address.cityCode,
										ocityName: item.address.cityName,
									});
									setcitynameInput(item.address.cityName);
								} else if (flatlist1 === "2") {
									setformPuredata({
										...formPuredata,
										dcityCode: item.address.cityCode,
										dcityName: item.address.cityName,
									});
									setcitynameInput2(item.address.cityName);
								}
								setflatlist1("");
							}}
							style={styles.cityitem}>
							<Text>
								{item.address.cityName} - {item.address.cityCode}
							</Text>
						</TouchableOpacity>
					)}
					keyExtractor={(item, index) => index}
					ListEmptyComponent={
						<View style={styles.errorDiv}>
							<Text style={styles.errortxt}>
								Please Enter Valid{"\n"}Destination
							</Text>
						</View>
					}
					ListFooterComponent={
						showBtn ? (
							<TouchableOpacity
								style={{ ...styles.btn, marginTop: 30 }}
								activeOpacity={0.8}
								onPress={formSubmitFun}>
								<Image
									style={styles.symbol}
									resizeMode='contain'
									source={require("../images/shoestring_symbol.png")}
								/>
								<Text
									style={{
										fontWeight: "bold",
										color: COLOURS.white,
										fontSize: 16,
									}}>
									SHOESTRING ME SOMETHING!
								</Text>
							</TouchableOpacity>
						) : null
					}
				/>
			)}
		</SafeAreaView>
	);
};

export default DestinationScreen;

const styles = StyleSheet.create({
	fillbg: {
		width: "100%",
		height: "100%",
	},
	logo: {
		maxWidth: w("90%"),
		height: h("8%"),
		marginTop: h("2%"),
	},
	inputContainer: {
		height: h("7%"),
		width: "90%",
		backgroundColor: COLOURS.white,
		borderRadius: 10,
		borderColor: COLOURS.orange,
		borderWidth: 2,
		marginTop: 15,
		alignSelf: "center",
		paddingHorizontal: 10,
	},
	errorDiv: {
		width: "100%",
		height: h("50%"),
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
	},
	errortxt: {
		fontSize: h("3%"),
		color: COLOURS.grey,
		textAlign: "center",
	},
	cityitem: {
		width: "90%",
		alignSelf: "center",
		height: h("6%"),
		marginBottom: h("1%"),
		display: "flex",
		alignItems: "flex-start",
		justifyContent: "center",
		paddingHorizontal: 10,
		shadowColor: COLOURS.dark,
		shadowOffset: {
			width: 0,
			height: 1,
		},
		shadowOpacity: 0.22,
		shadowRadius: 2.22,

		elevation: 3,
	},

	btn: {
		height: 50,
		width: "90%",
		backgroundColor: COLOURS.orange,
		borderRadius: 10,
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "center",
		alignSelf: "center",
	},

	symbol: {
		width: 50,
		height: 30,
		marginRight: 20,
		tintColor: COLOURS.white,
	},
});
