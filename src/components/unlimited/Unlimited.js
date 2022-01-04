import * as React from "react";
import { ScrollView, Linking, View, useColorScheme, ActivityIndicator, TouchableOpacity } from "react-native";
import { Card, Button, Image, Text } from "react-native-elements";
import { SafeAreaView } from "react-native-safe-area-context";
import { Colors } from "react-native/Libraries/NewAppScreen";
import { AuthContext, getData, getObject, removeObject } from "../../constants/Auth";
import colors from "../../theme/colors";
import Ionicons from 'react-native-vector-icons/Ionicons';

export const Unlimited = ({ navigation, route }) => {
    const [loading, setLoading] = React.useState(false);

    React.useLayoutEffect(() => {
        navigation.setOptions({
            title: '',
            headerLeft: () => (
                <Text h4 style={{
                    color: colors.primary
                }}>₹900</Text>
            ),
            headerRight: () => (
                <TouchableOpacity onPress={() => navigation.push("Account")}>
                    <Ionicons name="person-circle-outline" color={colors.primary} size={35}></Ionicons>
                </TouchableOpacity>
            ),
            headerStyle: {
                backgroundColor: colors.white,
                elevation: 0,
                shadowOpacity: 0,
                borderBottomWidth: 0,
            },
            headerTintColor: colors.primary,
            headerShadowVisible: false,
        });
    }, [navigation, route]);

    return (
        <View style={{ flex: 1 }}>
            <View style={{ flex: 1, backgroundColor: colors.white, alignItems: 'center', textAlign: 'center' }}>
                <View style={{
                    backgroundColor: colors.secondary,
                    width: '100%',
                    padding: 25
                }}>
                    <Text h3 style={{
                        textAlign: 'center',
                        color: '#fff'
                    }}><Text h3 style={{ color: colors.primary }}>Sainikpod</Text> Unlimited</Text>
                </View>
                <View style={{
                    flex: 1, justifyContent: 'space-evenly', alignItems: 'center', flexDirection: 'row',
                }}>
                    <Card containerStyle={{
                        backgroundColor: 'transparent',
                        borderWidth: 0,
                        borderColor: 'transparent',
                        shadowColor: 'transparent',
                    }}
                        wrapperStyle={{
                            borderWidth: 0,
                            borderColor: 'transparent',
                        }}>
                        <Image
                            source={require('../../assets/img/car1.png')}
                            style={{ height: 100, width: 170, alignSelf: 'center', marginTop: 40 }}
                        />
                        <Card.FeaturedTitle style={{ marginBottom: 20, textAlign: 'center', color: colors.primary }}>
                            259 per/hour
                        </Card.FeaturedTitle>
                        <Button
                            buttonStyle={{ borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0, backgroundColor: colors.primary }}
                            title='BOOK'
                            onPress={() => navigation.push("UnlimitedOrder", {
                                type: 'car',
                                price: 259,
                                name: 'Sainikpod Unlimited',
                                image: require('../../assets/img/car1.png'),
                                description: '259 per/hour',
                                duration: '1 hour',
                            })} />
                    </Card>

                    <Card containerStyle={{
                        backgroundColor: 'transparent',
                        borderWidth: 0,
                        borderColor: 'transparent',
                        shadowColor: 'transparent',
                    }}
                        wrapperStyle={{
                            borderWidth: 0,
                            borderColor: 'transparent',
                        }}>
                        <Image
                            source={require('../../assets/img/nano.png')}
                            style={{ height: 100, width: 170, alignSelf: 'center', marginTop: 40 }}
                        />
                        <Card.FeaturedTitle style={{ marginBottom: 20, textAlign: 'center', color: colors.primary }}>
                            259 per/hour
                        </Card.FeaturedTitle>
                        <Button
                            buttonStyle={{ borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0, backgroundColor: colors.primary }}
                            title='BOOK' />
                    </Card>
                </View>

                <View style={{ backgroundColor: colors.dark, width: '100%', padding: 25 }}>
                    <Text h4 style={{ color: colors.light }}>Sainik driven electric cars with unlimited km's</Text>
                </View>

            </View>
        </View>
    )
}