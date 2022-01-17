import * as React from "react";
import { ScrollView, Linking, View, useColorScheme, ActivityIndicator, TouchableOpacity, StatusBar, SafeAreaView, StyleSheet, Text, TextInput, FlatList, KeyboardAvoidingView, Alert, BackHandler } from "react-native";
import { Card, Button, Image, BottomSheet } from "react-native-elements";
// import { SafeAreaView } from "react-native-safe-area-context";
import { Colors } from "react-native/Libraries/NewAppScreen";
import { AuthContext, getData, getObject, removeObject, _retrieveData } from "../../constants/Auth";
import colors from "../../theme/colors";
import metrics from "../../theme/metrics";
import style from "../../theme/styles";
import Ionicons from 'react-native-vector-icons/Ionicons';
import axios from "axios";
import { T } from "../../constants/T";
import GooglePlacesInput from "../maps/GooglePlacesInput";
import RBSheet from "react-native-raw-bottom-sheet";
import { BookingContext } from "../../context/booking";

export const DropLocation = ({ navigation, route }) => {
    const refRBSheet = React.useRef();

    const [state, dispatch] = React.useContext(BookingContext);

    const [loading, setLoading] = React.useState(false);
    const [user, setUser] = React.useState(null);
    const [address, setAddress] = React.useState(null);
    const [isVisible, setIsVisible] = React.useState(true);

    const [searchKeyword, setSearchKeyword] = React.useState("");
    const [searchResults, setSearchResults] = React.useState(
        []);
    const [isShowingResults, setIsShowingResults] = React.useState(true);

    React.useEffect(() => {
        const backHandler = BackHandler.addEventListener('hardwareBackPress', () => true)
        return () => backHandler.remove()
    }, [])

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

    const searchLocation = async (text) => {
        setSearchKeyword(text);
        axios
            .request({
                method: 'post',
                url: `https://maps.googleapis.com/maps/api/place/autocomplete/json?key=AIzaSyB5xEVK86_GHlYJRFz9G3WgsiIwPFWSw8Y&input=${searchKeyword}`,
            })
            .then((response) => {
                console.log(JSON.stringify(response.data));
                setSearchResults(response.data.predictions);
                setIsShowingResults(true);
            })
            .catch((e) => {
                console.log(e.response);
            });
    };

    const updateBooking = async (place_id, dropLocation) => {

        const key = await getData('access_key');
        await axios
            .request({
                method: 'post',
                url: `https://maps.googleapis.com/maps/api/geocode/json?place_id=${place_id}&key=AIzaSyB5xEVK86_GHlYJRFz9G3WgsiIwPFWSw8Y`,
            })
            .then((response) => {
                if (response.data.status === "OK") {
                    const location = response.data.results[0].geometry.location;
                    const { lat, lng } = location;
                    console.log(lat, lng)
                    console.log(state.currentBooking);
                    console.log(key);
                    if (state.currentBooking && key) {
                        let data = {
                            "data": {
                                "Drop_Location": dropLocation,
                                "Drop_Lat": lat,
                                "Drop_Long": lng
                            }
                        }
                        let headers = { 'Authorization': 'Zoho-oauthtoken ' + key }
                        axios.patch(`https://creator.zoho.in/api/v2/ashish_motherpod/sainikpod-2nd-generation-beta/report/S05_Booking_Report/${state.currentBooking.ID}`, data, { headers: headers })
                            .then((response) => {
                                console.log(JSON.stringify(response));
                            })
                            .catch((e) => {
                                console.log(e.response);
                            });
                    }

                }
                console.log(JSON.stringify(response.data));
            })
            .catch((e) => {
                console.log(e.response);
            });
    }

    const updateLocation = (place_id, description) => {
        console.log(place_id);
        console.log(state.currentBooking);
        setSearchKeyword(description);
        setIsShowingResults(false);
        // refRBSheet.current.close();
        dispatch({ type: "ADD_ADDRESS", payload: description });
        updateBooking(place_id, description);
    }

    const TripEnded = async () => {
        console.log(state.currentBooking);
        const key = await getData('access_key');
        if (state.currentBooking?.ID && key) {
            let headers = { 'Authorization': 'Zoho-oauthtoken ' + key }
            const res = await axios.get(`https://creator.zoho.in/api/v2/ashish_motherpod/sainikpod-2nd-generation-beta/report/S05_Booking_Report/${state.currentBooking.ID}`, { headers: headers })
            if (res.status == 200) {
                if (res.data.code == 3000) {
                    console.log(res.data.data);
                    const latestBooking = await res.data.data;
                    if (latestBooking.Booking_Status == "Completed") {
                        dispatch({ type: 'ADD_CURRENT_BOOKING', payload: latestBooking });
                        navigation.pop();
                    } else {
                        Alert.alert("Sainikpod", "Ride not completed yet");
                    }
                }
            }
        }
    }

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle='light-content' backgroundColor={colors.primary} animated={false} showHideTransition="none" />
            <View style={{ flex: 1 }}>
                <View style={{ flex: 1, backgroundColor: colors.primary, alignItems: 'center', textAlign: 'center', justifyContent: 'center', paddingHorizontal: 30 }}>
                    <T description="Drop Location" size={style.h3} textAlign="center" weight="bold" color={colors.white} />
                    {state.address && <T description={state.address} size={style.h4} textAlign="center" color={colors.white} />}
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
                        onPress={() => Alert.alert("Sainikpod", "Coming Soon!", [{ text: "OK" }])}
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
                    onPress={TripEnded}
                    style={{
                        backgroundColor: colors.white,
                        borderRadius: 0,
                        padding: 25,
                        width: '100%',
                        textAlign: 'center'
                    }}>
                    <T textAlign="center" color={colors.primary} size={style.h3} description="Trip Completed?" />

                </TouchableOpacity>
            </View>

            <RBSheet
                ref={refRBSheet}
                closeOnDragDown={true}
                closeOnPressMask={true}
                customStyles={{
                    wrapper: {
                        backgroundColor: colors.modal
                    },
                    draggableIcon: {
                        backgroundColor: colors.gray6
                    }
                }}
                height={metrics.screenHeight - 100}>
                <KeyboardAvoidingView style={{ flex: 1 }} keyboardVerticalOffset={30} behavior="padding" enabled>
                    <View style={{
                        flex: 1,
                        zIndex: 1,
                        height: '100%',
                        backgroundColor: colors.white,
                        paddingHorizontal: 20,
                    }}>
                        <Card
                            containerStyle={{
                                padding: 0,
                                margin: 0,
                                borderRadius: 30,
                            }}>
                            <TextInput
                                placeholder="Search for an address"
                                placeholderTextColor="#000"
                                style={styles.searchBox}
                                onChangeText={(text) => searchLocation(text)}
                                value={searchKeyword}
                            />
                        </Card>

                        {
                            isShowingResults && (
                                <FlatList
                                    ItemSeparatorComponent={() => (
                                        <View style={{ height: 1, width: '94%', backgroundColor: '#ccc', marginLeft: '16%' }} />
                                    )}
                                    data={searchResults}
                                    renderItem={({ item, index }) => {
                                        return (
                                            <TouchableOpacity
                                                style={styles.resultItem}
                                                onPress={() => {
                                                    setSearchKeyword(item.description);
                                                    setIsShowingResults(false);
                                                    // refRBSheet.current.close();
                                                    dispatch({ type: "ADD_ADDRESS", payload: item.description });
                                                    updateBooking(item.place_id, item.description);
                                                }}>
                                                <Ionicons name="location-outline" size={20} color={colors.dark} style={{
                                                    backgroundColor: colors.gray2,
                                                    padding: 10,
                                                    borderRadius: 30,
                                                }} />
                                                <Text style={{ color: '#5d5d5d', paddingLeft: 20 }}>{item.description}</Text>
                                            </TouchableOpacity>
                                        );
                                    }}
                                    keyExtractor={(item) => item.id}
                                    style={styles.searchResultsContainer}
                                />
                            )
                        }
                        <GooglePlacesInput updateLocation={updateLocation} />
                    </View>
                </KeyboardAvoidingView>
            </RBSheet>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
    },

    searchResultsContainer: {
        width: '100%',
        height: 200,
        backgroundColor: '#fff',
    },
    searchBox: {
        width: '100%',
        height: 50,
        fontSize: 18,
        borderRadius: 30,
        color: '#000',
        backgroundColor: '#fff',
        borderWidth: 0,
        paddingLeft: 15,
    },
    resultItem: {
        alignItems: 'center',
        justifyContent: 'flex-start',
        flexDirection: 'row',
        width: '100%',
        height: 60,
    },
});