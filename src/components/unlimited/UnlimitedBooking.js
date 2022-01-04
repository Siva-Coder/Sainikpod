import * as React from "react";
import { ScrollView, Linking, View, useColorScheme, ActivityIndicator, TouchableOpacity, KeyboardAvoidingView, StyleSheet, StatusBar } from "react-native";
import { Card, Button, Image, Text, Input } from "react-native-elements";
import { SafeAreaView } from "react-native-safe-area-context";
import { Colors } from "react-native/Libraries/NewAppScreen";
import { AuthContext, getData, getObject, removeObject } from "../../constants/Auth";
import colors from "../../theme/colors";
import Ionicons from 'react-native-vector-icons/Ionicons';
import DatePicker from 'react-native-datepicker';

export const UnlimitedBooking = ({ navigation, route }) => {
    const [loading, setLoading] = React.useState(false);
    const [car, setCar] = React.useState({});

    const [pickUpLocation, setPickUpLocation] = React.useState("");
    const [hours, setHours] = React.useState("");
    const [date, setDate] = React.useState("");
    const [OTP, setOtp] = React.useState(null);

    const [countDown, setCountDown] = React.useState(0);
    const [runTimer, setRunTimer] = React.useState(false);

    React.useLayoutEffect(() => {
        navigation.setOptions({
            title: '',
            headerLeft: () => (
                <Text h4 style={{
                    color: colors.white
                }}>₹900</Text>
            ),
            headerRight: () => (
                <TouchableOpacity onPress={() => navigation.push("Account")}>
                    <Ionicons name="person-circle-outline" color={colors.white} size={35}></Ionicons>
                </TouchableOpacity>
            ),
            headerStyle: {
                backgroundColor: colors.primary,
                elevation: 0,
                shadowOpacity: 0,
                borderBottomWidth: 0,
            },
            headerTintColor: colors.primary,
            headerShadowVisible: false,
        });
    }, [navigation, route]);



    React.useEffect(() => {
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
    }, [countDown, runTimer]);

    const sendOtp = () => {
        setOtp(3245);
        setRunTimer(true);
    }

    React.useEffect(() => {
        sendOtp();
    }, [])

    // const togglerTimer = () => setRunTimer((t) => !t);

    const seconds = String(countDown % 60).padStart(2, 0);
    const minutes = String(Math.floor(countDown / 60)).padStart(2, 0);

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle='light-content' backgroundColor={colors.primary} animated={false} showHideTransition="none" />
            <View style={{ flex: 1 }}>
                <View style={{ flex: 1, backgroundColor: colors.primary, alignItems: 'center', textAlign: 'center' }}>
                    <Image
                        source={require('../../assets/icons/unlimited1.png')}
                        style={{ height: 100, width: 170, alignSelf: 'center', marginTop: 40 }}
                    />
                    <View style={{
                        justifyContent: 'center', alignItems: 'center', flexDirection: 'row'
                    }}>
                        <Text h2 style={{ color: colors.secondary }}>Sainikpod</Text>
                        <Text>&nbsp; &nbsp;</Text>
                        <Text h2 style={{ color: colors.white }}>Unlimited</Text>
                    </View>
                    <View style={{
                        flex: 1,
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}>
                        <Image
                            source={require('../../assets/img/qr.png')}
                            style={{ height: 250, width: 250, alignSelf: 'center', marginTop: 20, borderRadius: 150, borderWidth: 8, borderColor: colors.dark, marginBottom: 10 }}
                        />
                        <Text h2 style={{ color: colors.white }}>OTP: {OTP}</Text>
                        <Text h2 style={{ color: colors.white }}>ETA {minutes}:{seconds}</Text>
                    </View>
                    {/* <Text h2 style={{ color: colors.white }}>Take a stand</Text> */}

                </View>

                <TouchableOpacity
                    style={{
                        backgroundColor: colors.white,
                        borderRadius: 0,
                        padding: 25,
                        width: '100%',
                        textAlign: 'center'
                    }}>
                    <Text h4 style={{
                        color: colors.primary,
                        textAlign: 'center',
                        fontWeight: 'bold',
                        fontSize: 20,
                    }}>Your sainikpod is on the way</Text>
                    <Text h5 style={{
                        color: colors.primary,
                        textAlign: 'center',
                        fontSize: 20,
                    }}>track your sainikpod</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
    },
});