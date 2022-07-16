import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { w, h } from "react-native-responsiveness";
import COLOURS from "../consts/colours";
const Pricediv = ({ text }) => {
	return (
		<View style={styles.pricediv}>
			<Text style={styles.pricetxt}>{text}</Text>
		</View>
	);
};

export default Pricediv;

const styles = StyleSheet.create({
	pricediv: {
		width: "100%",
		height: h("7%"),
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
		flexDirection: "row",
		backgroundColor: COLOURS.orange,
		marginVertical: h("1.2%"),
	},
	pricetxt: {
		fontWeight: "bold",
		fontSize: h("2.5%"),
		color: COLOURS.white,
	},
});
