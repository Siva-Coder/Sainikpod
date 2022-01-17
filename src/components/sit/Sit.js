import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as React from "react";
import { ScrollView, Linking, View, useColorScheme, ActivityIndicator, TouchableOpacity, StatusBar, SafeAreaView, StyleSheet, Text, Alert } from "react-native";
import { Card, Button, Image } from "react-native-elements";
// import { SafeAreaView } from "react-native-safe-area-context";
import { Colors } from "react-native/Libraries/NewAppScreen";
import { AuthContext, getData, getObject, removeObject, _retrieveData } from "../../constants/Auth";
import colors from "../../theme/colors";
import style from "../../theme/styles";
import { NearBy } from "./NearBy";
import Ionicons from 'react-native-vector-icons/Ionicons';
import { PodStand } from "./PodStand";
import axios from "axios";

import QRCode from "react-qr-code";
import { io } from "socket.io-client";
import metrics from "../../theme/metrics";
import { T } from "../../constants/T";
import { DropLocation } from "./DropLocation";
import { BookingContext } from "../../context/booking";


const SitStack = createNativeStackNavigator();

const TakeStand = ({ navigation, route }) => {
    const [state, dispatch] = React.useContext(BookingContext);

    const [loading, setLoading] = React.useState(false);
    const [OTP, setOtp] = React.useState(null);

    const [countDown, setCountDown] = React.useState(0);
    const [runTimer, setRunTimer] = React.useState(false);
    const [user, setUser] = React.useState(null);

    // Take user to card subscription
    /* React.useEffect(() => {
        const unsubscribe = navigation.addListener('focus', async () => {
            const user = await getObject("user");
            const key = await getData('access_key');
            if (user && key) {
                setUser(user)
                if (user.Membership_Type == "Non Member") {
                    navigation.navigate("BuyCard", {
                        data: {
                            user: user, key: key
                        }
                    })
                }
            }
        });

        // Return the function to unsubscribe from the event so it gets removed on unmount
        return unsubscribe;
    }, [navigation]); */

    React.useEffect(() => {
        const getData = async () => {
            const userData = await getObject("user");
            const location = await _retrieveData("location");
            console.log(location);
            userData && setUser(userData);
        }

        getData();
    }, []);

    React.useLayoutEffect(() => {
        navigation.setOptions({
            title: '',
            headerLeft: () => (
                <TouchableOpacity onPress={() => navigation.push("Account")}>
                    <Ionicons name="person-circle-outline" color={colors.white} size={35}></Ionicons>
                </TouchableOpacity>
            ),
            headerRight: () => (<></>),
            headerStyle: {
                backgroundColor: colors.primary,
                elevation: 0,
                shadowOpacity: 0,
                borderBottomWidth: 0,
            },
            headerTintColor: colors.white,
            headerShadowVisible: false,
        });
    }, [navigation, route]);

    /* React.useEffect(() => {
        let timerId;

        if (runTimer) {
            setCountDown(60 * 5);
            timerId = setInterval(() => {
                setCountDown((countDown) => countDown - 1);
            }, 1000);
        } else {
            clearInterval(timerId);
        }

        return () => clearInterval(timerId);
    }, [runTimer]);

    React.useEffect(() => {
        if (countDown < 0 && runTimer) {
            console.log("expired");
            setRunTimer(false);
            setCountDown(0);
        }
    }, [countDown, runTimer]); */

    /* const syncBookings = (ID, key) => {
        if (ID) {
            let headers = { 'Authorization': 'Zoho-oauthtoken ' + key }
            var timesRun = 0;
            var interval = setInterval(async function () {
                const res = await axios.get(`https://creator.zoho.in/api/v2/ashish_motherpod/sainikpod-2nd-generation-beta/report/S05_Booking_Report/${ID}`, { headers: headers })
                if (res.status == 200) {
                    if (res.data.code == 3000) {
                        if (res.data.data.Booking_Status != "Scheduled") {
                            clearInterval(interval);
                            dispatch({ type: 'ADD_CURRENT_BOOKING', payload: res.data.data });
                            console.log("Completed");
                            navigation.navigate("DropLocation")
                        } console.log(res.data.data);
                    }
                }
                timesRun += 1;
                console.log(timesRun);
                //do whatever here..
            }, 10000);

        }
    } */

    const sendOtp = async () => {
        setLoading(true);
        const key = await getData('access_key');
        console.log(key);
        if (user?.ID && key) {
            let headers = { 'Authorization': 'Zoho-oauthtoken ' + key }
            let data = {
                "data": {
                    "S08_Passenger": user.ID,
                    "Passenger_Name": user.Passenger_Name,
                    "Passenger_Mobile": user.Mobile_No,
                    "S06_Product": "87212000001835061",
                    "Booking_Status": "Scheduled"
                }
            }
            dispatch({ type: 'ADD_KEY', payload: key });
            const response = await axios.post('https://creator.zoho.in/api/v2/ashish_motherpod/sainikpod-2nd-generation-beta/form/S05_Booking', data, { headers: headers })
            if (response.status == 200) {
                console.log(response.data);
                if (response.data.code == 3000) {
                    let OTPRecord = response.data.data.ID;
                    console.log(OTPRecord);
                    const res = await axios.get(`https://creator.zoho.in/api/v2/ashish_motherpod/sainikpod-2nd-generation-beta/report/S05_Booking_Report/${OTPRecord}`, { headers: headers })
                    if (res.status == 200) {
                        if (res.data.code == 3000) {
                            console.log(res.data.data);
                            const OTPRecordData = await res.data.data;
                            dispatch({ type: 'ADD_CURRENT_BOOKING', payload: OTPRecordData });
                            // syncBookings(OTPRecord, key);
                            const { Booking_Start_OTP } = await OTPRecordData;
                            setOtp(Booking_Start_OTP);
                            setRunTimer(true);
                            setLoading(false);
                        }
                    }
                } else if (response.data.code == 4000) {
                    setLoading(false);
                    Alert.alert("Booking Failed", response.data.message);
                }
            }
        }
        /* setOtp(3245);
        setRunTimer(true); */
    }

    const TripStarted = async () => {
        await navigation.navigate("DropLocation");
        await setOtp(null);
    }

    const createNewBooking = async () => {
        try {
            const key = await getData('access_key');
            if (state.currentBooking?.ID && key) {
                let headers = { 'Authorization': 'Zoho-oauthtoken ' + key }
                const res = await axios.get(`https://creator.zoho.in/api/v2/ashish_motherpod/sainikpod-2nd-generation-beta/report/S05_Booking_Report/${state.currentBooking.ID}`, { headers: headers })
                if (res.status == 200) {
                    if (res.data.code == 3000) {
                        console.log(res.data.data);
                        const latestBooking = await res.data.data;
                        if (latestBooking.Booking_Status == "Completed") {
                            Alert.alert("Ride Completed", "You have completed your ride. Created a new ride for you.");
                            dispatch({ type: 'ADD_CURRENT_BOOKING', payload: latestBooking });
                            sendOtp();
                        } else {
                            Alert.alert("Sainikpod", "Ride not completed yet");
                        }
                    }
                }
            }
        } catch (error) {
            Alert.alert("Something went wrong", "Please try again later");
        }

    }

    // const togglerTimer = () => setRunTimer((t) => !t);

    const seconds = String(countDown % 60).padStart(2, 0);
    const minutes = String(Math.floor(countDown / 60)).padStart(2, 0);

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle='light-content' backgroundColor={colors.primary} animated={false} showHideTransition="none" />
            <View style={{ flex: 1 }}>
                <View style={{ flex: 1, backgroundColor: colors.primary, alignItems: 'center', textAlign: 'center' }}>
                    <Image
                        source={require('../../assets/icons/logo-icon.png')}
                        style={{ height: 100, width: 170, alignSelf: 'center', marginTop: 40 }}
                    />
                    <View style={{
                        justifyContent: 'center', alignItems: 'center', flexDirection: 'row'
                    }}>
                        <T description="Sainikpod" size={style.h2} color={colors.secondary} />
                        <Text>&nbsp; &nbsp;</Text>
                        <T description="Sit&Go" size={style.h2} color={colors.white} />

                        {/* <Text h2 style={{ color: colors.white, fontFamily: 'URWGeometric-Regular', fontSize: style.h2 }}></Text> */}
                    </View>
                    <View style={{
                        flex: 1,
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}>
                        <View style={{ paddingVertical: 30, paddingHorizontal: 40 }}>
                            <T description="Take a sainik driven electric car from any of our podstands" textAlign="center" size={style.h3} color={colors.white} />
                        </View>
                        {/* {user ? <QRCode value={user?.ID} size={metrics.screenHeight - 700} /> : <ActivityIndicator size="large" color={colors.white} />} */}

                    </View>
                    {/* {OTP && (
                        <Button
                            title="Trip Started ?"
                            containerStyle={{
                                width: '50%',
                                textAlign: 'center'
                            }}
                            buttonStyle={{
                                backgroundColor: colors.secondary,
                                padding: 10
                            }}
                            onPress={TripStarted}
                        />
                    )} */}

                    <View style={{ padding: 25 }}>
                        <T textAlign="center" color={colors.white} size={style.h3} description="₹15 per km" />
                        <T textAlign="center" color={colors.secondary} size={style.h3} description="Members only" />
                    </View>

                    {/* <Button
                        title="Take a stand"
                        containerStyle={{
                            width: '80%',
                            textAlign: 'center',
                            marginVertical: 30,
                        }}
                        buttonStyle={{
                            backgroundColor: colors.secondary,
                            padding: 20,
                        }}
                        titleStyle={{
                            fontSize: 20,
                            fontFamily: 'URWGeometric-Regular',
                        }}
                        onPress={() => navigation.push('NearBy')}
                    /> */}

                </View>
                {OTP ? (
                    <TouchableOpacity
                        style={{
                            backgroundColor: colors.white,
                            borderRadius: 0,
                            padding: 25,
                            width: '100%',
                            textAlign: 'center'
                        }} onPress={createNewBooking}>
                        <Text h4 style={{
                            color: colors.primary,
                            textAlign: 'center',
                            fontWeight: 'bold',
                            fontSize: 20,
                        }}>{loading ? <ActivityIndicator size="large" color={colors.white} /> : <>
                            <Text>OTP: {OTP}</Text>
                        </>}</Text>

                        {!loading && <Text style={{
                            color: colors.primary,
                            textAlign: 'center',
                            fontWeight: 'bold',
                            fontSize: 20,
                            marginTop: 10
                        }}>GENERATE NEW OTP</Text>}
                        {/* <Text h4 style={{
                            color: colors.primary,
                            textAlign: 'center',
                            fontWeight: 'bold',
                            fontSize: 20,
                        }}>{minutes}:{seconds}</Text> */}
                    </TouchableOpacity>
                ) : (<TouchableOpacity
                    onPress={() => sendOtp()}
                    style={{
                        backgroundColor: colors.white,
                        borderRadius: 0,
                        padding: 25,
                        width: '100%',
                        textAlign: 'center'
                    }}>
                    <Text style={{
                        color: colors.primary,
                        textAlign: 'center',
                        fontWeight: 'bold',
                        fontSize: 20,
                        fontFamily: 'URWGeometric-Regular',
                    }}>{loading ? <ActivityIndicator size="large" color={colors.primary} /> : 'GENERATE OTP'}</Text>
                </TouchableOpacity>
                )}
                {/* <TouchableOpacity
                    onPress={() => navigation.push('DropLocation')}
                    style={{
                        backgroundColor: colors.primary,
                        borderRadius: 0,
                        padding: 25,
                        width: '100%',
                        textAlign: 'center'
                    }}>
                    <T textAlign="center" color={colors.white} size={style.h3} description="Find a podstand near you" />

                </TouchableOpacity> */}
            </View>
        </SafeAreaView>
    )
}
export const Sit = ({ navigation, route }) => {

    React.useLayoutEffect(() => {
        navigation.setOptions({
            tabBarStyle: {
                display: 'none',
            }
        });
    }, [navigation, route]);

    return (
        <SitStack.Navigator>
            <SitStack.Screen name="TakeStand" component={TakeStand} options={{
                headerShown: false,
            }} />
            <SitStack.Screen name="DropLocation" component={DropLocation} options={{
                headerShown: false,
            }} />
            <SitStack.Screen name="NearBy" component={NearBy} options={{
                headerShown: false,
            }} />
            <SitStack.Screen name="PodStand" component={PodStand} options={{
                headerShown: false,
            }} />
        </SitStack.Navigator>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
    },
});