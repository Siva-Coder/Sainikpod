import axios from 'axios';
import * as React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Dimensions, ScrollView, Alert, Platform, KeyboardAvoidingView, Keyboard, TouchableWithoutFeedback, SafeAreaView, StatusBar } from 'react-native';
import { Button, Input } from 'react-native-elements';
import { AuthContext, getData, getObject, storeData, storeObject, _storeData } from '../constants/Auth';
import { T } from '../constants/T';
import colors from '../theme/colors';
import style from '../theme/styles';

function MemberCode({ navigation, route }) {
    const [btnText, setBtnText] = React.useState('Submit Code');
    const [code, setCode] = React.useState('');

    const { signIn } = React.useContext(AuthContext);

    const submitCode = async () => {

        if (code.toUpperCase() !== "SNKPOD9132") {
            return Alert.alert("Sainikpod", "Incorrect Code");
        }
        const { user, key } = route.params;
        if (user && key) {
            signIn({ user, key });
        }
    }

    return (
        <SafeAreaView style={{
            flex: 1,
            backgroundColor: "#fff",
            justifyContent: "center",
        }}>
            <StatusBar barStyle='light-content' backgroundColor={colors.secondary} animated={false} showHideTransition="none" />
            <View style={{
                backgroundColor: colors.secondary,
                width: '100%',
                paddingVertical: 25,
                paddingHorizontal: 15,
            }}>
                <Text style={{
                    fontSize: 23,
                    color: colors.white,
                    fontWeight: 'bold',
                    textAlign: 'center',
                    fontFamily: 'URWGeometric-Regular'
                }}>Start your sainikpod Membership</Text>
            </View>
            <KeyboardAvoidingView style={{
                flex: 1,
                alignItems: 'center'
            }}
                keyboardVerticalOffset={0}
                behavior={Platform.OS === "ios" ? "padding" : "height"}>
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
                        justifyContent: 'center',
                    }}>

                        <Input
                            placeholder='Coupon Code'
                            inputContainerStyle={{
                                borderRadius: 40,
                                borderBottomWidth: 0,
                                backgroundColor: colors.light,
                                padding: 5,
                                paddingHorizontal: 20
                            }}
                            maxLength={10}
                            onChangeText={value => setCode(value)}
                            value={code}
                            autoCapitalize="characters"
                        /* errorStyle={{ color: 'red' }}
                        errorMessage='ENTER A VALID NUMBER HERE' */
                        />

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
                            onPress={submitCode}
                        />
                    </View>
                </TouchableWithoutFeedback>
                {/* </ScrollView> */}
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}

export default MemberCode;