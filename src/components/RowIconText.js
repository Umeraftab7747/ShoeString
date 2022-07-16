import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Entypo } from "@expo/vector-icons";
import { w, h } from "react-native-responsiveness";
const RowIconText = ({
	iconName,
	isbold,
	color,
	textcolor,
	text,
	fontSizeSmall,
}) => {
	const styles = StyleSheet.create({
		rowflex: {
			width: "100%",
			display: "flex",
			alignItems: "flex-start",
			justifyContent: "flex-start",
			flexDirection: "row",
			marginBottom: h("0.5%"),
		},
		textstyles: {
			fontWeight: isbold ? "600" : "normal",
			fontSize: fontSizeSmall ? h("2.3%") : h("2.7%"),
			color: textcolor,
			marginLeft: 5,
		},
	});

	return (
		<View style={styles.rowflex}>
			<Entypo
				name={iconName}
				size={fontSizeSmall ? h("2.5%") : h("3%")}
				color={color}
			/>
			<Text style={styles.textstyles}>{text}</Text>
		</View>
	);
};

export default RowIconText;
