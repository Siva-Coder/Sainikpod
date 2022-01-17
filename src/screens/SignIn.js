import axios from 'axios';
import * as React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Dimensions, ScrollView, Alert, Platform, KeyboardAvoidingView, Keyboard, TouchableWithoutFeedback, SafeAreaView } from 'react-native';
import { Button, Input } from 'react-native-elements';
import { AuthContext, getData, getObject, storeData, storeObject, _storeData } from '../constants/Auth';
import colors from '../theme/colors';

function SignInScreen({ navigation }) {
    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [phone, setPhone] = React.useState('');
    const [key, setKey] = React.useState(null);
    const [loading, setLoading] = React.useState(false);
    const [sixDigit, setSixDigit] = React.useState(null);
    const [OTP, setOTP] = React.useState('');
    const [btnText, setBtnText] = React.useState('Get OTP');

    const { signIn } = React.useContext(AuthContext);

    /* React.useEffect(() => {
        async function setKey() {
            try {
                const user = await getObject("user");
                const key = await getData('access_key');
                if (user && key) return signIn({ user, key });
                const res = await axios.get('https://sainikpod.herokuapp.com/key')

                if (res.status == 200 && res.data.length > 0) {

                    await storeData('access_key', res.data[0].key);
                }

            } catch (error) {
                console.log(error);
                throw error;
            }
        }
        setKey()
    }, [navigation]); */

    const handleSignIn = async () => {
        try {
            if (phone.length < 10) {
                return Alert.alert("Sainikpod", "Enter valid mobile number")
            } else {
                if (sixDigit == null) {
                    setLoading(true);
                    const sixDigit = Math.floor(1000 + Math.random() * 9000);
                    console.log(sixDigit);
                    const res = await axios.get(`https://2factor.in/API/V1/a0b45fa2-1ce6-11ea-9fa5-0200cd936042/SMS/${phone.trim()}/${sixDigit}/RIDER%20OTP%20SAINIKPOD`)

                    if (res.status == 200 && res.data.Status == 'Success') {
                        console.log(res.data);
                        setSixDigit(sixDigit);
                        setLoading(false);
                        setBtnText('Verify OTP');
                    }
                } else {

                    if (parseInt(OTP) !== sixDigit) {
                        console.log(typeof sixDigit);
                        return Alert.alert("Incorrect OTP", "Please enter correct OTP");
                    }
                    setLoading(true);
                    const key = await getData('access_key');

                    let number = '+91' + phone.trim();
                    let config = {
                        headers: { 'Authorization': 'Zoho-oauthtoken ' + key },
                        params: {
                            criteria: `Mobile_No=="${number}"`
                        },
                    }
                    console.log("Key", key);
                    const response = await axios.get('https://creator.zoho.in/api/v2/ashish_motherpod/sainikpod-2nd-generation-beta/report/S08_Passenger_Report', config)
                    if (response.status == 200) {
                        if (response.data.code == 3000) {
                            const user = await response.data.data[0];
                            console.log(user);
                            if (user) {
                                await storeObject("user", user);
                                setPhone('');
                                setOTP('');
                                setSixDigit(null);
                                setBtnText('Get OTP');
                                return signIn({ user, key })
                            }

                        }
                    }


                }
            }

        } catch (error) {
            console.log(error.message);
            if (error.message === 'Request failed with status code 401') {
                setLoading(false);
                return Alert.alert("Login", "Something went wrong!! please try again later")
            } else if (error.message === 'Request failed with status code 404') {
                setLoading(false);
                _storeData('Phone', phone);
                return navigation.navigate("Member")
            } else {
                setLoading(false);
                return Alert.alert("Sainikpod", "Something went wrong!! please try again later")
            }
        }
        // navigation.navigate('Member')
    }

    return (
        <SafeAreaView style={{
            flex: 1,
            backgroundColor: "#fff",
            justifyContent: "center",
        }}>
            <KeyboardAvoidingView style={{
                flex: 1,
                alignItems: 'center'
            }}
                keyboardVerticalOffset={-100}
                behavior={Platform.OS === "ios" ? "padding" : "position"}>
                {/* <ScrollView style={{ flex: 1 }}> */}
                <TouchableWithoutFeedback onPress={Keyboard.dismiss} style={{
                    alignItems: 'center',
                    flex: 1,
                    width: Dimensions.get('window').width,
                }}>
                    <View style={{
                        alignItems: 'center',
                        flex: 1,
                        width: Dimensions.get('window').width - 20,
                    }}>
                        <Image
                            style={{ width: '50%', maxWidth: 300, maxHeight: 200, height: 170, marginTop: 100 }}
                            source={require('../assets/img/logo.png')}
                        />
                        <Text style={{
                            fontSize: 25,
                            paddingVertical: 10,
                            color: colors.dark,
                            fontFamily: 'URWGeometric-Regular'
                        }}>
                            Let's Move Together
                        </Text>

                        <Input
                            placeholder='Mobile Number'
                            containerStyle={{
                                marginTop: 50,
                            }}
                            inputContainerStyle={{
                                borderRadius: 40,
                                borderBottomWidth: 0,
                                backgroundColor: colors.light,
                                padding: 5,
                                paddingHorizontal: 20
                            }}
                            maxLength={10}
                            keyboardType={Platform.OS == "android" ? "phone-pad" : "number-pad"}
                            onChangeText={value => setPhone(value)}
                        /* errorStyle={{ color: 'red' }}
                        errorMessage='ENTER A VALID NUMBER HERE' */
                        />

                        {sixDigit && <Input
                            placeholder='Enter 4 Digits OTP'
                            inputContainerStyle={{
                                borderRadius: 40,
                                borderBottomWidth: 0,
                                backgroundColor: colors.light,
                                padding: 5,
                                paddingHorizontal: 20
                            }}
                            maxLength={4}
                            keyboardType={Platform.OS == "android" ? "phone-pad" : "number-pad"}
                            onChangeText={value => setOTP(value)}
                        /* errorStyle={{ color: 'red' }}
                        errorMessage='ENTER A VALID NUMBER HERE' */
                        />}

                        <Button
                            title={btnText}
                            containerStyle={{
                                width: '50%',
                                textAlign: 'center'
                            }}
                            buttonStyle={{
                                backgroundColor: colors.primary,
                                borderRadius: 40,
                                padding: 10
                            }}
                            onPress={handleSignIn}
                            loading={loading}
                        />
                    </View>
                </TouchableWithoutFeedback>
                {/* </ScrollView> */}
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}

export default SignInScreen;