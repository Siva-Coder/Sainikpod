import * as React from "react";
import { ScrollView, Linking, View, useColorScheme, ActivityIndicator, TouchableOpacity, KeyboardAvoidingView, StyleSheet, StatusBar } from "react-native";
import { Card, Button, Image, Text, Input } from "react-native-elements";
import { SafeAreaView } from "react-native-safe-area-context";
import { Colors } from "react-native/Libraries/NewAppScreen";
import { AuthContext, getData, getObject, removeObject } from "../../constants/Auth";
import colors from "../../theme/colors";
import Ionicons from 'react-native-vector-icons/Ionicons';
import DatePicker from 'react-native-datepicker';

export const UnlimitedOrder = ({ navigation, route }) => {
    const [loading, setLoading] = React.useState(false);
    const [car, setCar] = React.useState({});

    const [pickUpLocation, setPickUpLocation] = React.useState("");
    const [hours, setHours] = React.useState("");
    const [date, setDate] = React.useState("");

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

    React.useEffect(() => {
        const { type, price, name, image, description, duration } = route.params;
        setCar({
            type: type,
            price: price,
            name: name,
            image: image,
            description: description,
            duration: duration
        });
    }, []);

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <StatusBar barStyle='dark-content' backgroundColor={colors.white} animated={false} showHideTransition="none" />
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

                <KeyboardAvoidingView style={{
                    flex: 1,
                    width: '100%',
                }}>
                    <ScrollView style={{
                        flex: 1,
                        width: '100%',
                    }}
                        contentContainerStyle={{
                            paddingVertical: 25,
                            alignItems: 'center',
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
                                source={car?.image ? car.image : require('../../assets/img/car1.png')}
                                style={{ height: 100, width: 170, alignSelf: 'center', marginTop: 40 }}
                            />
                            <Card.FeaturedTitle style={{ marginBottom: 20, textAlign: 'center', color: colors.primary }}>
                                {car?.description ? car.description : 'Loading...'}
                            </Card.FeaturedTitle>
                        </Card>

                        <View style={{
                            width: '80%',
                        }}>
                            <Input
                                value={hours}
                                placeholder='Number of Hours'
                                inputContainerStyle={{
                                    borderRadius: 40,
                                    borderBottomWidth: 0,
                                    backgroundColor: colors.light,
                                    padding: 5,
                                    paddingHorizontal: 20
                                }}
                                keyboardType="number-pad"
                                onChangeText={value => setHours(value)}
                            />
                            <Input
                                value={pickUpLocation}
                                placeholder='Pickup Location'
                                inputContainerStyle={{
                                    borderRadius: 40,
                                    borderBottomWidth: 0,
                                    backgroundColor: colors.light,
                                    padding: 5,
                                    paddingHorizontal: 20
                                }}
                                onChangeText={value => setPickUpLocation(value)}
                            />
                            <View style={{
                                paddingHorizontal: 10,
                            }}>
                                <DatePicker
                                    style={styles.datePickerStyle}
                                    date={date} // Initial date from state
                                    mode="date" // The enum of date, datetime and time
                                    placeholder="Pickup Time"
                                    format="DD-MM-YYYY"
                                    minDate="01-01-2021"
                                    maxDate="01-01-2030"
                                    confirmBtnText="Confirm"
                                    cancelBtnText="Cancel"
                                    customStyles={{
                                        dateIcon: {
                                            // display: 'none',
                                            position: 'absolute',
                                            left: 0,
                                            top: 4,
                                            marginLeft: 0,
                                        },
                                        dateInput: {
                                            borderWidth: 0,
                                            padding: 0,
                                            // paddingVertical: 28,
                                            // marginLeft: 36,
                                        },
                                    }}
                                    onDateChange={(date) => {
                                        setDate(date);
                                    }}
                                />
                            </View>
                        </View>

                    </ScrollView>

                    <TouchableOpacity
                        style={{
                            backgroundColor: colors.primary,
                            borderRadius: 0,
                            padding: 25,
                            width: '100%',
                            textAlign: 'center'
                        }}
                        onPress={() => navigation.push("UnlimitedBooking")}>
                        <Text h4 style={{
                            color: '#fff',
                            textAlign: 'center'
                        }}>{loading ? <ActivityIndicator size="large" color={colors.white} /> : car?.price ? 'Pay Now ₹' + car.price : 'Pay'}</Text>
                    </TouchableOpacity>

                </KeyboardAvoidingView>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    datePickerStyle: {
        width: '100%',
        paddingVertical: 10,
        backgroundColor: colors.light,
        borderRadius: 40,
        paddingHorizontal: 20,
        textAlign: 'left'
    },
})