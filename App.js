import "react-native-gesture-handler";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import LandingPage from "./src/components/LandingPage";
import Results from "./src/components/Results";
import Login from "./src/components/Login";
import Details from "./src/components/Details";
import Register from "./src/components/Register";
const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Results" component={Results} />
        <Stack.Screen name="LandingPage" component={LandingPage} />

        <Stack.Screen name="Details" component={Details} />
        <Stack.Screen name="Register" component={Register} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
