import * as React from "react";
import { ScrollView, Linking, View, useColorScheme, ActivityIndicator, TouchableOpacity, StatusBar, SafeAreaView, StyleSheet, Text } from "react-native";
import { Card, Button, Image } from "react-native-elements";
// import { SafeAreaView } from "react-native-safe-area-context";
import { Colors } from "react-native/Libraries/NewAppScreen";
import { AuthContext, getData, getObject, removeObject, _retrieveData } from "../../constants/Auth";
import colors from "../../theme/colors";
import style from "../../theme/styles";
import Ionicons from 'react-native-vector-icons/Ionicons';
import axios from "axios";
import { T } from "../../constants/T";

export const DropLocation = ({ navigation, route }) => {
    const [loading, setLoading] = React.useState(false);
    const [user, setUser] = React.useState(null);
    const [address, setAddress] = React.useState("Karle Zenith Residency Rd DadaMastan Layout, Manayata Tech, Park Nagavara, Bengaluru, Karnataka 560024");

    React.useEffect(() => {
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
    }, [navigation]);

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


    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle='light-content' backgroundColor={colors.primary} animated={false} showHideTransition="none" />
            <View style={{ flex: 1 }}>
                <View style={{ flex: 1, backgroundColor: colors.primary, alignItems: 'center', textAlign: 'center', justifyContent: 'center', paddingHorizontal: 30 }}>
                    <T description="Drop Location" size={style.h3} textAlign="center" weight="bold" color={colors.white} />
                    <T description={address} size={style.h4} textAlign="center" color={colors.white} />
                    <Button
                        title="UPDATE"
                        containerStyle={{
                            textAlign: 'center',
                            marginVertical: 30,
                        }}
                        buttonStyle={{
                            backgroundColor: colors.secondary,
                            paddingHorizontal: 60,
                            paddingVertical: 15
                        }}
                        titleStyle={{
                            fontSize: 20,
                            fontFamily: 'URWGeometric-Regular',
                        }}
                        onPress={() => navigation.push('NearBy')}
                    />

                </View>
                <View style={{ backgroundColor: colors.dark, flexDirection: 'row', alignItems: 'center', padding: 15 }}>
                    <Text style={{ flex: 1, fontFamily: 'URWGeometric-Regular', fontSize: style.h4 }}>You are driving with <Text style={{ color: colors.secondary }}>Sainik Srinivas 20yrs in Indian Army 9th Maratha Infantary</Text></Text>
                    <View>
                        <Image
                            source={require('../../assets/icons/logo-icon.png')}
                            style={{ height: 70, width: 170, alignSelf: 'center' }}
                        />
                        <T description="KA12-23-2123" textAlign="center" color={colors.white} />
                    </View>
                </View>
                <TouchableOpacity
                    onPress={() => navigation.push('NearBy')}
                    style={{
                        backgroundColor: colors.white,
                        borderRadius: 0,
                        padding: 25,
                        width: '100%',
                        textAlign: 'center'
                    }}>
                    <T textAlign="center" color={colors.primary} size={style.h3} description="Trip Started" />

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