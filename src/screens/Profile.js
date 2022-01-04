import * as React from "react";
import { ActivityIndicator, Alert, KeyboardAvoidingView, Platform, SafeAreaView, ScrollView, StatusBar, StyleSheet, TouchableOpacity, View } from "react-native";
import { Card, Button, Text, ListItem, Avatar, Input } from "react-native-elements";
import { AuthContext, getData, getObject, removeObject, storeObject } from "../constants/Auth";
import colors from "../theme/colors";
import Ionicons from 'react-native-vector-icons/Ionicons';
import axios from "axios";
// import { onSignOut } from "../constants/Auth";

export const Profile = ({ navigation, route }) => {

    const [user, setUser] = React.useState(null);
    const [loading, setLoading] = React.useState(false);

    const [name, setName] = React.useState(null)
    const [number, setNumber] = React.useState(null)
    const [emergencyName, setEmergencyName] = React.useState(null)
    const [emergencyNumber, setEmergencyNumber] = React.useState(null)
    const [email, setEmail] = React.useState('')

    React.useEffect(() => {
        const unsubscribe = navigation.addListener('focus', async () => {
            const user = await getObject("user");
            const key = await getData('access_key');
            if (user && key) {
                setUser(user);
                setName(user.Passenger_Name);
                setNumber(user.Mobile_No);
                setEmergencyName(user.Emergency_Name);
                setEmergencyNumber(user.Emergency_Contact);
                setEmail(user.Email);
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
    }, [navigation]);

    React.useLayoutEffect(() => {
        navigation.setOptions({
            title: '',
            headerStyle: {
                elevation: 0,
                shadowOpacity: 0,
                borderBottomWidth: 0,
            },
            headerShadowVisible: false,
        });
    }, [navigation, route]);

    const handleUpdate = async () => {
        setLoading(true)
        const user = await getObject("user");
        const key = await getData('access_key');
        if (user?.ID && key) {
            // alert(JSON.stringify(user));
            try {
                let headers = { 'Authorization': 'Zoho-oauthtoken ' + key }
                let data = {
                    "data": {
                        "Passenger_Name": name,
                        "Mobile_No": number,
                        "Emergency_Name": emergencyName,
                        "Emergency_Contact": emergencyNumber,
                        "Email": email
                    }
                }
                const response = await axios.patch('https://creator.zoho.in/api/v2/ashish_motherpod/sainikpod-2nd-generation-beta/report/S08_Passenger_Report/' + user.ID, data, { headers: headers })
                if (response.status == 200) {
                    setLoading(false);
                    if (response.data.code == 3000) {
                        alert(JSON.stringify(response.data));
                        await storeObject('user', { ...user, Passenger_Name: name, Mobile_No: number, Emergency_Name: emergencyName, Emergency_Contact: emergencyNumber, Email: email });
                        Alert.alert('Success', 'Profile updated successful', [{ text: 'OK', onPress: () => navigation.pop() }])
                    } else {
                        Alert.alert('Error', 'Update Failed', [{ text: 'OK' }])
                    }

                }
            } catch (error) {
                setLoading(false);
                console.log(error);
                Alert.alert('Error', 'Update Failed', [{ text: 'OK' }])
            }
        }
    }

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar animated={false} barStyle='dark-content' backgroundColor={colors.white} showHideTransition="none" />
            <View style={{
                backgroundColor: colors.primary,
                width: '100%',
                padding: 25
            }}>
                <Text h3 style={{
                    textAlign: 'center',
                    color: '#fff'
                }}>Profile</Text>
            </View>

            <KeyboardAvoidingView style={{
                flex: 1,
            }}
                behavior={Platform.OS === "ios" ? "padding" : "height"}>

                <ScrollView contentContainerStyle={{
                    width: '100%',
                    backgroundColor: "#fff",
                    paddingVertical: 25,
                }}
                >

                    {/* <ScrollView> */}
                    <View flex={1} style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        flexDirection: 'column',
                        width: '100%',
                        paddingHorizontal: 30
                    }}>
                        <View style={{
                            width: '100%',
                        }}>
                            <Text h4 style={{
                                textAlign: 'left',
                                paddingStart: 10,
                                color: colors.secondary
                            }}>Your Details</Text>
                            <Input
                                value={name}
                                placeholder='Name'
                                containerStyle={{
                                    marginTop: 30,
                                }}
                                inputContainerStyle={{
                                    borderRadius: 40,
                                    borderBottomWidth: 0,
                                    backgroundColor: colors.light,
                                    padding: 5,
                                    paddingHorizontal: 20
                                }}
                                onChangeText={value => setName(value)}
                            />
                            <Input
                                value={number}
                                placeholder='Number'
                                inputContainerStyle={{
                                    borderRadius: 40,
                                    borderBottomWidth: 0,
                                    backgroundColor: colors.light,
                                    padding: 5,
                                    paddingHorizontal: 20
                                }}
                                keyboardType={Platform.OS == "android" ? "phone-pad" : "number-pad"}
                                onChangeText={value => setNumber(value)}
                            />
                            <Input
                                value={email}
                                placeholder='Email'
                                inputContainerStyle={{
                                    borderRadius: 40,
                                    borderBottomWidth: 0,
                                    backgroundColor: colors.light,
                                    padding: 5,
                                    paddingHorizontal: 20
                                }}
                                keyboardType="email-address"
                                onChangeText={value => setEmail(value)}
                            />
                        </View>

                        <View style={{
                            width: '100%',
                            marginTop: 20,
                        }}>
                            <Text h4 style={{
                                textAlign: 'left',
                                paddingStart: 10,
                                color: colors.secondary
                            }}>Emergency Contacts</Text>
                            <Input
                                value={emergencyName}
                                placeholder='Name'
                                containerStyle={{
                                    marginTop: 30,
                                }}
                                inputContainerStyle={{
                                    borderRadius: 40,
                                    borderBottomWidth: 0,
                                    backgroundColor: colors.light,
                                    padding: 5,
                                    paddingHorizontal: 20
                                }}
                                onChangeText={value => setEmergencyName(value)}
                            />
                            <Input
                                value={emergencyNumber}
                                placeholder='Number'
                                inputContainerStyle={{
                                    borderRadius: 40,
                                    borderBottomWidth: 0,
                                    backgroundColor: colors.light,
                                    padding: 5,
                                    paddingHorizontal: 20
                                }}
                                keyboardType={Platform.OS == "android" ? "phone-pad" : "number-pad"}
                                onChangeText={value => setEmergencyNumber(value)}
                            />
                        </View>
                    </View>
                    {/* </ScrollView> */}

                </ScrollView>
                <TouchableOpacity
                    onPress={handleUpdate}
                    style={{
                        backgroundColor: colors.primary,
                        borderRadius: 0,
                        padding: 25,
                        width: '100%',
                        textAlign: 'center'
                    }}>
                    <Text h4 style={{
                        color: colors.white,
                        textAlign: 'center',
                        fontWeight: 'bold',
                        fontSize: 20,
                    }}>{loading ? <ActivityIndicator size="large" color={colors.white} /> : 'UPDATE'}</Text>
                </TouchableOpacity>
            </KeyboardAvoidingView>

        </SafeAreaView>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white,
    },
    subtitleView: {
        flexDirection: 'row',
        paddingTop: 5
    },
    ratingText: {
        color: 'grey'
    }
});