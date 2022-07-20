import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";
import { w, h } from "react-native-responsiveness";
import COLOURS from "../consts/colours";
const HotleCard = ({ name, id }) => {
	return (
		<TouchableOpacity
			style={styles.hotlecard}
			onPress={() => console.log("hotle Name", name, id)}>
			<Text style={styles.hotleName}>{name}</Text>
		</TouchableOpacity>
	);
};

export default HotleCard;

const styles = StyleSheet.create({
	hotlecard: {
		width: w("79%"),
		height: h("10%"),
		marginBottom: 10,
		backgroundColor: COLOURS.white,
		display: "flex",
		alignItems: "center",
		justifyContent: "space-evenly",
		flexDirection: "column",
		shadowColor: COLOURS.dark,
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.25,
		shadowRadius: 3.84,

		elevation: 5,
	},
	hotleName: {
		fontSize: h("2.2%"),
		width: "90%",
		fontWeight: "bold",
		color: COLOURS.orange,
	},
});
