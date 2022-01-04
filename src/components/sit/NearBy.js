import * as React from "react";
import { ScrollView, Linking, View, useColorScheme, ActivityIndicator, TouchableOpacity, SafeAreaView, StyleSheet, StatusBar, FlatList } from "react-native";
import { Card, Button, Image, Text, ListItem } from "react-native-elements";
import { Colors } from "react-native/Libraries/NewAppScreen";
import { AuthContext, getData, getObject, removeObject, _retrieveData } from "../../constants/Auth";
import colors from "../../theme/colors";
import style from "../../theme/styles";
import Ionicons from 'react-native-vector-icons/Ionicons';
import axios from "axios";
import { T } from "../../constants/T";

export const NearBy = ({ navigation, route }) => {
    const [loading, setLoading] = React.useState(false);
    const [stands, setStands] = React.useState(null);
    const [location, setLocation] = React.useState([]);

    //This function takes in latitude and longitude of two location and returns the distance between them as the crow flies (in km)
    function calcCrow(lat1, lon1, lat2, lon2) {
        var R = 6371; // km
        var dLat = toRad(lat2 - lat1);
        var dLon = toRad(lon2 - lon1);
        var lat1 = toRad(lat1);
        var lat2 = toRad(lat2);

        var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        var d = R * c;
        return d;
    }

    // Converts numeric degrees to radians
    function toRad(Value) {
        return Value * Math.PI / 180;
    }

    React.useEffect(() => {
        async function fetchData() {
            try {
                setLoading(true);
                const key = await getData('access_key');

                if (key) {
                    let config = {
                        headers: { 'Authorization': 'Zoho-oauthtoken ' + key }
                    }

                    const response = await axios.get('https://creator.zoho.in/api/v2/ashish_motherpod/sainikpod-2nd-generation-beta/report/S09_Podstand_Report', config)
                    if (response.status == 200) {
                        if (response.data.code == 3000) {
                            const stands = await response.data.data;
                            const location = await _retrieveData('location');
                            if (location) {
                                // console.log(stands);
                                stands.map(stand => {
                                    console.log(calcCrow(location.coords.latitude, location.coords.longitude, stand.Station_Latitude, stand.Station_Longitude).toFixed(1));
                                })
                                await setLocation(location);
                                const filteredStands = await stands.sort((a, b) => (calcCrow(location.coords.latitude, location.coords.longitude, a.Station_Latitude, a.Station_Longitude).toFixed(1) > calcCrow(location.coords.latitude, location.coords.longitude, b.Station_Latitude, b.Station_Longitude).toFixed(1)) ? 1 : -1);
                                // const filteredStands = stands.filter(stand => stand.Station_Latitude === location);
                                setStands(await filteredStands);
                            }

                        }
                    }
                }
            } catch (error) {
                console.log(error);
            }

        }
        fetchData()
    }, [])

    React.useLayoutEffect(() => {
        navigation.setOptions({
            title: '',
            headerLeft: () => (
                <TouchableOpacity onPress={() => navigation.push("Account")}>
                    <Ionicons name="person-circle-outline" color={colors.primary} size={35}></Ionicons>
                </TouchableOpacity>),
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

    const Item = ({ title, parking, ID, Station_Latitude, Station_Longitude }) => (
        <ListItem bottomDivider topDivider >
            {/* <Avatar title={item.name[0]} source={item.avatar_url && { uri: item.avatar_url }} /> */}
            <ListItem.Content>
                <ListItem.Title style={{ fontFamily: 'URWGeometric-Regular', color: colors.secondary }}>{title}</ListItem.Title>
                <ListItem.Subtitle style={{ fontFamily: 'URWGeometric-Regular' }}>{calcCrow(location.coords.latitude, location.coords.longitude, Station_Latitude, Station_Longitude).toFixed(1)} KMS</ListItem.Subtitle>
                <ListItem.Subtitle style={{ fontFamily: 'URWGeometric-Regular' }}>{parking} CAR</ListItem.Subtitle>
            </ListItem.Content>
            <Button title="Direction" buttonStyle={{
                backgroundColor: colors.dark,
                paddingHorizontal: 30,
            }}
                style={{
                    fontFamily: 'URWGeometric-Regular'
                }}
                onPress={() => navigation.push("PodStand")} />
        </ListItem>
    );
    const renderItem = ({ item }) => (
        <Item title={item.Name} parking={item.Number_of_Parking} ID={item.ID} Station_Latitude={item.Station_Latitude} Station_Longitude={item.Station_Longitude} />
    );

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar animated={false} barStyle='dark-content' backgroundColor={colors.white} showHideTransition="none" />
            <View style={{ flex: 1, backgroundColor: colors.white, alignItems: 'center', textAlign: 'center' }}>
                <View style={{ alignItems: 'center' }}>
                    <Image
                        source={require('../../assets/icons/sit&go-icon.png')}
                        style={{ height: 100, width: 170, alignSelf: 'center', marginTop: 10 }}
                    />
                    <View style={{
                        justifyContent: 'center', alignItems: 'center', flexDirection: 'row', paddingBottom: 20
                    }}>
                        <T description="Sainikpod" size={style.h2} color={colors.secondary} />
                        <Text>&nbsp; &nbsp;</Text>
                        <T description="Sit&Go" size={style.h2} color={colors.primary} />
                    </View>
                </View>
                <View style={{
                    backgroundColor: colors.primary,
                    width: '100%',
                    padding: 25
                }}>
                    <T description="Podstands Near You" size={style.h3} weight={true} color={colors.white} textAlign="center" />
                    {/* <Text h3 style={{
                        textAlign: 'center',
                        color: '#fff'
                    }}></Text> */}
                </View>
                <View style={{
                    flex: 1,
                    width: '100%',
                    justifyContent: 'center',
                }}>
                    {stands ? (<FlatList
                        data={stands}
                        renderItem={renderItem}
                        keyExtractor={item => item.ID}
                    />)
                        :
                        (
                            <View style={{
                                flex: 1,
                                justifyContent: 'center',
                                alignItems: 'center'
                            }}>
                                <ActivityIndicator size="large" color={colors.primary} />
                            </View>
                        )
                    }
                </View>

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