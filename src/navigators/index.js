import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import {
    CheckInScreen,
    CheckOutScreen
} from "../screen";

const Stack = createStackNavigator();

const Navigators = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="CheckIn">
                <Stack.Screen name="QUÉT VÀO CỔNG" component={CheckInScreen} />
                <Stack.Screen name="QUÉT RA CỔNG" component={CheckOutScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default Navigators;