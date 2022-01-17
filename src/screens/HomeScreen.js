import React, { useReducer, createContext } from "react";
import { ScrollView, Linking, View, useColorScheme, ActivityIndicator, TouchableOpacity } from "react-native";
import { Card, Button, Image, Text } from "react-native-elements";
import { SafeAreaView } from "react-native-safe-area-context";
import { Colors } from "react-native/Libraries/NewAppScreen";
import { AuthContext, getData, getObject, removeObject } from "../constants/Auth";
import colors from "../theme/colors";

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Sit } from "../components/sit/Sit";
import { UnlimitedMenu } from "../components/unlimited/UnlimitedMenu";
import { BookingContextProvider } from "../context/booking";

const Tab = createBottomTabNavigator();

const Bookings = () => {

    return (
        <Text>Bookings Screen</Text>
    )
}
function HomeScreen({ navigation, route }) {
    const isDarkMode = useColorScheme() === 'dark';


    {/* <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <Text>Profile Screen</Text> */}
    {/* <Text>Profile</Text>
            <Button title="Sign out" onPress={handleSignOut} buttonStyle={{
                backgroundColor: colors.secondary
            }} /> */}

    return (
        <BookingContextProvider>
            <Tab.Navigator
                screenOptions={({ route }) => ({
                    tabBarIcon: ({ focused, color, size }) => {
                        let iconName;

                        if (route.name === 'Sit') {
                            iconName = focused
                                ? <Image
                                    source={require('../assets/icons/sit&go-icon-active.png')}
                                    style={{ height: 76, width: 74, marginBottom: 10 }}
                                />
                                : <Image
                                    source={require('../assets/icons/sit&go-icon.png')}
                                    style={{ height: 76, width: 74, marginBottom: 10 }}
                                />;
                        } else if (route.name === 'Unlimited') {
                            iconName = focused ? <Image
                                source={require('../assets/icons/unlimited-icon-active.png')}
                                style={{ height: 76, width: 74, marginBottom: 10 }}
                            /> : <Image
                                source={require('../assets/icons/unlimited-icon.png')}
                                style={{ height: 76, width: 74, marginBottom: 10 }}
                            />;
                        } else if (route.name === 'Bookings') {
                            iconName = focused ? <Image
                                source={require('../assets/icons/booking-icon-active.png')}
                                style={{ height: 26, width: 44, marginBottom: 10 }}
                            /> : <Image
                                source={require('../assets/icons/booking-icon.png')}
                                style={{ height: 26, width: 44, marginBottom: 10 }}
                            />;
                        }

                        // You can return any component that you like here!
                        return iconName;
                        // return <Ionicons name={iconName} size={size} color={color} />;
                    },
                    tabBarActiveTintColor: 'white',
                    tabBarInactiveTintColor: colors.primary,
                    tabBarStyle: {
                        height: 80,
                    },
                })}

                tabBarOptions={{
                    tabStyle: {
                        height: 80,
                        backgroundColor: colors.secondary,
                        fontSize: 20,
                        paddingTop: 20,
                        paddingBottom: 10,
                    },
                    labelStyle: {
                        fontSize: 15,
                    },
                }}
            >
                <Tab.Screen name="Sit" component={Sit} options={{
                    headerShown: false,
                }} />
                <Tab.Screen name="Unlimited" component={UnlimitedMenu} options={{
                    headerShown: false,
                }} />
                <Tab.Screen name="Bookings" component={Bookings} options={{
                    headerShown: false,
                }} />
            </Tab.Navigator>
        </BookingContextProvider>

    );
}

export default HomeScreen;