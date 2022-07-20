import "react-native-gesture-handler";
import React, { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import LandingPage from "./src/components/LandingPage";
import Results from "./src/components/Results";
import Login from "./src/components/Login";
import Details from "./src/components/Details";
import Register from "./src/components/Register";
import DestinationScreen from "./src/components/DestinationScreen";
import { LogBox, StatusBar } from "react-native";
import { fetchToken } from "./src/api";
import { Provider } from "react-redux";
import { store } from "./src/store/index";
const Stack = createStackNavigator();

const App = () => {
	LogBox.ignoreLogs([
		"Deprecation warning: value provided is not in a recognized RFC2822 or ISO format.",
	]);
	return (
		<Provider store={store}>
			<NavigationContainer>
				<Stack.Navigator screenOptions={{ headerShown: false }}>
					<Stack.Screen name='Login' component={Login} />
					<Stack.Screen name='LandingPage' component={LandingPage} />
					<Stack.Screen
						name='DestinationScreen'
						component={DestinationScreen}
					/>
					<Stack.Screen name='Results' component={Results} />
					<Stack.Screen name='Details' component={Details} />

					<Stack.Screen name='Register' component={Register} />
				</Stack.Navigator>
			</NavigationContainer>
		</Provider>
	);
};

export default App;
