import React from "react";
import { SafeAreaView, StatusBar, StyleSheet, TouchableOpacity, View } from "react-native";
import { Card, Button, Text, ListItem, Avatar } from "react-native-elements";
import { AuthContext, getData, getObject, removeObject, _retrieveData } from "../constants/Auth";
import colors from "../theme/colors";
import Ionicons from 'react-native-vector-icons/Ionicons';
// import { onSignOut } from "../constants/Auth";

export const Account = ({ navigation, route }) => {

    const [user, setUser] = React.useState(null)
    const { signOut } = React.useContext(AuthContext);
    const list = [
        {
            title: 'Profile',
            icon: 'person-outline',
            route: 'Profile',
        },
        {
            title: 'Card',
            icon: 'card-outline',
            route: 'Card',
        }
    ]

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

    React.useLayoutEffect(() => {
        navigation.setOptions({
            title: '',
            headerRight: () => (
                <TouchableOpacity onPress={() => navigation.push("Profile")} style={{
                    marginRight: 10,
                }}>
                    <Ionicons name="pencil-outline" color={colors.dark} size={20}></Ionicons>
                </TouchableOpacity>
            ),
            headerStyle: {
                elevation: 0,
                shadowOpacity: 0,
                borderBottomWidth: 0,
            },
            headerShadowVisible: false,
        });
    }, [navigation, route]);

    const handleSignOut = async () => {
        await removeObject("user")
        signOut()
    }

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar animated={false} barStyle='dark-content' backgroundColor={colors.white} showHideTransition="none" />

            <View>
                <ListItem>
                    <Avatar rounded title="MD" size="large" activeOpacity={0.7}
                        overlayContainerStyle={{ backgroundColor: colors.gray6 }} />
                    <ListItem.Content>
                        <ListItem.Title style={{ color: colors.primary, fontFamily: 'URWGeometric-Regular' }}>{user?.Passenger_Name ? user.Passenger_Name : 'No Name'}</ListItem.Title>
                        <View style={styles.subtitleView}>
                            <Text style={styles.ratingText}>{user?.Mobile_No ? user.Mobile_No : 'No Number'}</Text>
                        </View>
                    </ListItem.Content>
                </ListItem>

                <View style={{
                    backgroundColor: colors.secondary
                }}>
                    <ListItem containerStyle={{
                        paddingTop: 0,
                        paddingBottom: 5,
                        paddingHorizontal: 15,
                    }}>
                        <Ionicons name='call-outline' size={20} color={colors.primary} style={{
                            paddingLeft: 10,
                        }} />
                        <ListItem.Content>
                            <ListItem.Title style={{ color: colors.primary, fontFamily: 'URWGeometric-Regular' }}>{user?.Emergency_Contact ? user.Emergency_Contact : 'No Emergency Contact'}</ListItem.Title>
                        </ListItem.Content>
                    </ListItem>
                    <ListItem bottomDivider containerStyle={{
                        paddingBottom: 20,
                        paddingHorizontal: 15,
                    }}>
                        <Ionicons name='mail-outline' size={20} color={colors.primary} style={{
                            paddingLeft: 10,
                        }} />
                        <ListItem.Content>
                            <ListItem.Title style={{ color: colors.primary, fontFamily: 'URWGeometric-Regular' }}>{user?.Email ? user.Email : "No Email"}</ListItem.Title>
                        </ListItem.Content>
                    </ListItem>
                </View>

            </View>

            <View>
                {
                    list.map((item, i) => (
                        <ListItem key={i} bottomDivider={false} topDivider={false} onPress={() => navigation.push(item.route)}>
                            <Ionicons name={item.icon} size={20} color={item.color ? item.color : colors.primary} style={{
                                paddingLeft: 10,
                            }} />
                            <ListItem.Content>
                                <ListItem.Title style={{ color: item.color ? item.color : colors.primary, fontFamily: 'URWGeometric-Regular' }}>{item.title}</ListItem.Title>
                            </ListItem.Content>
                            <ListItem.Chevron />
                        </ListItem>
                    ))
                }
            </View>
            <View>
                <ListItem topDivider onPress={handleSignOut}>
                    <Ionicons name='power-outline' size={20} color={colors.red} style={{
                        paddingLeft: 10,
                    }} />
                    <ListItem.Content>
                        <ListItem.Title style={{ color: colors.red, fontFamily: 'URWGeometric-Regular' }}>Log out</ListItem.Title>
                    </ListItem.Content>
                    <ListItem.Chevron />
                </ListItem>
            </View>
            {/* <View
                style={{
                    backgroundColor: "#bcbec1",
                    alignItems: "center",
                    justifyContent: "center",
                    width: 80,
                    height: 80,
                    borderRadius: 40,
                    alignSelf: "center",
                    marginBottom: 20
                }}
            >
                <Text style={{ color: "white", fontSize: 28 }}>JD</Text>
            </View> */}
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
        color: 'grey',
        fontFamily: 'URWGeometric-Regular',
    }
});