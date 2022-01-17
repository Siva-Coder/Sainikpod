import * as React from "react";
import { View, TouchableOpacity, StatusBar, SafeAreaView, StyleSheet, Text, BackHandler } from "react-native";
import { Card, Button, Image } from "react-native-elements";
import { Colors } from "react-native/Libraries/NewAppScreen";
import { AuthContext, getData, getObject, removeObject, _retrieveData } from "../constants/Auth";
import colors from "../theme/colors";
import style from "../theme/styles";
import Ionicons from 'react-native-vector-icons/Ionicons';
import { T } from "../constants/T";

export const Welcome = ({ navigation, route }) => {
    const [loading, setLoading] = React.useState(false);
    const [user, setUser] = React.useState(null);
    const { signIn } = React.useContext(AuthContext);

    React.useEffect(() => {
        const backHandler = BackHandler.addEventListener('hardwareBackPress', () => true)
        return () => backHandler.remove()
    }, [])

    function goToSitScreen() {
        const { user, key } = route.params;
        if (user && key) {
            return navigation.navigate("MemberCode", { user: user, key: key });
            // signIn({ user, key });
        }
    }

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
            <View style={{ flex: 1, backgroundColor: colors.primary, alignItems: 'center', justifyContent: 'center' }}>
                <Image
                    source={require('../assets/icons/logo-icon.png')}
                    style={{ height: 80, width: 170, alignSelf: 'center' }}
                />
                <View style={{
                    justifyContent: 'center', alignItems: 'center', flexDirection: 'row'
                }}>
                    <T description="Sainikpod" size={style.h2} color={colors.secondary} />
                    <Text>&nbsp; &nbsp;</Text>
                    <T description="Sit&Go" size={style.h2} color={colors.white} />
                </View>
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                    <T description="Welcome to Sainikpod Membership" size={style.h3} textAlign="center" weight="bold" color={colors.white} />
                </View>
                <TouchableOpacity
                    onPress={() => goToSitScreen()}
                    style={{
                        backgroundColor: colors.white,
                        borderRadius: 0,
                        padding: 25,
                        width: '100%',
                        textAlign: 'center'
                    }}>
                    <T textAlign="center" color={colors.primary} size={style.h3} description="START" />

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