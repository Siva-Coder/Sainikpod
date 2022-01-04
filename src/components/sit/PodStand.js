import * as React from "react";
import { ScrollView, Linking, View, useColorScheme, ActivityIndicator, TouchableOpacity, SafeAreaView, StyleSheet, StatusBar } from "react-native";
import { Card, Button, Image, Text, ListItem } from "react-native-elements";
import { Colors } from "react-native/Libraries/NewAppScreen";
import { AuthContext, getData, getObject, removeObject } from "../../constants/Auth";
import colors from "../../theme/colors";
import Ionicons from 'react-native-vector-icons/Ionicons';
import axios from "axios";

export const PodStand = ({ navigation, route }) => {
    const [loading, setLoading] = React.useState(false);
    const [OTP, setOtp] = React.useState(null);

    const [countDown, setCountDown] = React.useState(0);
    const [runTimer, setRunTimer] = React.useState(false);

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
            headerShadowVisible: false,
        });
    }, [navigation, route]);

    React.useEffect(() => {
        setOtp(3245);
        setRunTimer(true);
    }, []);


    const seconds = String(countDown % 60).padStart(2, 0);
    const minutes = String(Math.floor(countDown / 60)).padStart(2, 0);

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar animated={false} barStyle='light-content' backgroundColor={colors.primary} showHideTransition="none" />
            <View style={{ flex: 1, backgroundColor: colors.white, alignItems: 'center', textAlign: 'center' }}>

                <View style={{
                    flex: 1,
                    width: '100%',
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: colors.primary,
                }}>
                    <Text h3 style={{ color: colors.light }}>{minutes}:{seconds}</Text>
                    <Image
                        source={require('../../assets/img/qr.png')}
                        style={{ height: 250, width: 250, alignSelf: 'center', marginTop: 20, borderRadius: 150, borderWidth: 8, borderColor: colors.dark }}
                    />
                    <Text h3 style={{ color: colors.light, marginTop: 10 }}>OTP: {OTP}</Text>
                </View>

                <View style={{ backgroundColor: colors.dark, width: '100%', padding: 25 }}>
                    <Text h5 style={{ color: colors.light }}>Sainik srinivasan
                        <Text style={{
                            color: colors.secondary,
                        }}> served 20yrs in indian army 9th maratha infantary </Text>
                        will be with you
                    </Text>
                </View>

                <TouchableOpacity
                    style={{
                        backgroundColor: colors.white,
                        borderRadius: 0,
                        padding: 25,
                        width: '100%',
                        textAlign: 'center'
                    }}>
                    {loading ? <ActivityIndicator size="large" color={colors.primary} /> : (<Text h4 style={{
                        color: colors.primary,
                        textAlign: 'center',
                        fontWeight: 'bold',
                        fontSize: 20,
                    }}>Directions to Podstand</Text>)
                    }

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