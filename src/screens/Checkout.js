/* eslint-disable prettier/prettier */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * https://github.com/nysamnang/react-native-raw-bottom-sheet
 *
 * @format
 * @flow strict-local
 */

import * as React from 'react';
// import axios from './src/axios-base';
import { Alert, AsyncStorage, FlatList } from 'react-native';
import {
    ScrollView,
    StatusBar,
    StyleSheet,
    useColorScheme,
    View,
    TouchableOpacity,
    KeyboardAvoidingView,
    Platform,
    ActivityIndicator
} from 'react-native';

import colors from '../theme/colors';
import { getData, storeObject } from '../constants/Auth';

import { Button, Card, Chip, Icon, Image, Input, ListItem, Text } from 'react-native-elements';
import axios from 'axios';
import { StackActions } from '@react-navigation/routers';

function Checkout({ navigation, route }) {
    const { card, order, user, key } = route.params;
    const [loading, setLoading] = React.useState(false);
    const [total, setTotal] = React.useState(0);

    React.useEffect(() => {
        console.log(user);
        let total = 0;
        order.map(item => {
            total += item.price;
        })
        return setTotal(total);
    }, [order])

    const calTotal = () => {
        let total = 0;
        order.map(item => {
            total += item.price;
        })
        return total;
    }

    const handlePayment = async () => {
        setLoading(true);
        if (key && user.ID) {
            try {
                let headers = { 'Authorization': 'Zoho-oauthtoken ' + key }
                let data = {
                    "data": {
                        "Membership_Type": "SainikPod Member"
                    }
                }
                const response = await axios.patch('https://creator.zoho.in/api/v2/ashish_motherpod/sainikpod-2nd-generation-beta/report/S08_Passenger_Report/' + user.ID, data, { headers: headers })
                if (response.status == 200) {
                    setLoading(false);
                    if (response.data.code == 3000) {
                        await storeObject('user', { ...user, Membership_Type: 'SainikPod Member' });
                        Alert.alert('Success', 'Payment Successful', [{ text: 'OK', onPress: () => navigation.dispatch(StackActions.popToTop()) }])
                    } else {
                        Alert.alert('Error', 'Payment Failed', [{ text: 'OK' }])
                    }

                }
            } catch (error) {
                setLoading(false);
                console.log(error);
                Alert.alert('Error', 'Payment Failed', [{ text: 'OK' }])
            }

        }
    }

    return (
        <View style={{
            alignItems: 'center',
            flex: 1,
            width: '100%',
            backgroundColor: "#fff"
        }}>
            {
                card ? (
                    <>
                        <View style={{
                            backgroundColor: colors.secondary,
                            width: '100%',
                            padding: 25
                        }}>
                            <Text h4 style={{
                                textAlign: 'center',
                                color: '#fff'
                            }}>Payment Details</Text>
                        </View>

                        <View style={{
                            flex: 1,
                            width: '100%',
                        }}>
                            {
                                order?.map((l, i) => (
                                    <ListItem key={i} bottomDivider style={{
                                        paddingHorizontal: 10
                                    }}>
                                        <ListItem.Content>
                                            <ListItem.Title>{l.title}</ListItem.Title>
                                        </ListItem.Content>
                                        <ListItem.Title>₹{l.price}</ListItem.Title>
                                    </ListItem>
                                ))
                            }
                            <ListItem style={{
                                paddingHorizontal: 10
                            }}>
                                <ListItem.Content>
                                    <ListItem.Title style={{ fontWeight: 'bold' }}>Total</ListItem.Title>
                                </ListItem.Content>
                                <ListItem.Title style={{ fontWeight: 'bold' }}>₹{total}</ListItem.Title>
                            </ListItem>
                        </View>

                        <TouchableOpacity
                            style={{
                                backgroundColor: colors.primary,
                                borderRadius: 0,
                                padding: 25,
                                width: '100%',
                                textAlign: 'center'
                            }}
                            onPress={handlePayment}>
                            <Text h4 style={{
                                color: '#fff',
                                textAlign: 'center'
                            }}>{loading ? <ActivityIndicator size="large" color={colors.white} /> : 'Pay Now'}</Text>
                        </TouchableOpacity>
                    </>
                )
                    :
                    (
                        <View style={{
                            flex: 1,
                            alignItems: 'center',
                            justifyContent: 'center',
                            height: '100%',
                            width: '100%',
                        }}>
                            <ActivityIndicator size="large" color={colors.secondary} />
                        </View>
                    )
            }

            {/* <Button title="Sign in" onPress={() => signIn({ username, password })} /> */}
        </View>
    );
}

export default Checkout;