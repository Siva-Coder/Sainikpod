/* eslint-disable prettier/prettier */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * https://github.com/nysamnang/react-native-raw-bottom-sheet
 * https://www.npmjs.com/package/react-native-svg#android-pre-rn-060
 * https://github.com/react-native-svg/react-native-svg/issues/834
 * https://stackoverflow.com/questions/45822318/how-do-i-request-permission-for-android-device-location-in-react-native-at-run-t?rq=1
 * https://www.npmjs.com/package/react-native-geolocation-service
 * https://pretagteam.com/question/angular-get-latitude-and-longitude-from-place-id-in-google-maps-component
 * https://dev.to/mosoakinyemi/how-to-create-a-google-autocomplete-form-in-react-native-4ffb
 * https://www.sitepoint.com/replace-redux-react-hooks-context-api/
 * https://aboutreact.com/react-native-asyncstorage/
 *
 * @format
 * @flow strict-local
 */

import * as React from 'react';
// import axios from './src/axios-base';
import { Alert, AsyncStorage, BackHandler, FlatList } from 'react-native';

import { Node } from 'react';
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

import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

import {
    DebugInstructions,
    Header,
    LearnMoreLinks,
    ReloadInstructions,
    Colors
} from 'react-native/Libraries/NewAppScreen';

import colors from '../../theme/colors';
import { getData } from '../../constants/Auth';

import { Button, Card, Chip, Icon, Image, Input, Text } from 'react-native-elements';
import axios from 'axios';
import RBSheet from "react-native-raw-bottom-sheet";

const DATA = [
    {
        id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
        title: 'SAFETY',
        description: 'sainik driven',
    },
    {
        id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
        title: 'CONVENIENCE',
        description: 'doorstep pickup',
    },
    {
        id: '58694a0f-3da1-471f-bd96-145571e29d72',
        title: 'CLIMATE IMPACT',
        description: 'electric cars only'
    },
    {
        id: '58694a0f-3da1-471f-bd96-145571e29d73',
        title: 'VALUE',
        description: 'customized subscriptions'
    },
    {
        id: '58694a0f-3da1-471f-bd96-145571e29d74',
        title: 'CONTRIBUTE',
        description: 'resettlement of sainiks'
    },
    {
        id: '58694a0f-3da1-471f-bd96-145571e29d75',
        title: 'SECURITY',
        description: 'sate-of-art sainik control rooms'
    },
];

function BuyCard({ navigation, route }) {
    const [access_key, setAccess_key] = React.useState(null);
    const [card, setCard] = React.useState(null);
    const [recharge, setRecharge] = React.useState(null);
    const { user, key } = route.params.data;
    const [loading, setLoading] = React.useState(false);
    const [order, setOrder] = React.useState([]);

    const refRBSheet = React.useRef();

    React.useEffect(() => {
        const backHandler = BackHandler.addEventListener('hardwareBackPress', () => true)
        return () => backHandler.remove()
    }, [])

    React.useLayoutEffect(() => {
        async function getData() {
            if (key) {
                console.log("Hola");
                setAccess_key(key);
                try {
                    let config = {
                        headers: { 'Authorization': 'Zoho-oauthtoken ' + key }
                    }
                    const response = await axios.get(`https://creator.zoho.in/api/v2/ashish_motherpod/sainikpod-2nd-generation-beta/report/All_Cards`, config)
                    if (response.status == 200) {
                        if (response.data.code == 3000) {
                            console.log(response.data.data[0]);
                            setCard(response.data.data[0]);
                        }
                    }
                } catch (error) {
                    if (error.message === 'Request failed with status code 401' || error.message != '') {
                        console.log(error);
                        Alert.alert('Something went wrong', 'Please try again',)
                    }
                }

            }
        }
        getData();
    }, []);

    const Item = ({ title, description }) => (
        <View style={{
            padding: 0,
            width: '45%'
        }}>
            <Text style={{
                color: colors.secondary,
                fontWeight: 'bold',
                fontSize: 18,
            }}>{title}</Text>
            <Text>{description}</Text>
        </View>
    );

    const renderItem = ({ item }) => (
        <Item title={item.title} description={item.description} style={{
            width: '100%',
        }} />
    );

    const handleCheckout = async () => {

        if (!recharge) {
            return Alert.alert("Recharge", "Please select recharge")
        }

        setLoading(true);
        const data = [
            {
                title: 'New card purchase',
                price: parseInt(card?.Card_Price)
            }, {
                title: 'Recharge',
                price: parseInt(recharge)
            }, {
                title: 'Tax',
                price: parseInt(card?.Tax)
            }
        ]
        await setOrder(data);
        await setLoading(false);
        await refRBSheet.current.close();
        await navigation.push('Checkout', { card: card, order: data ? data : order, user: user, key: key });
    }

    /*     React.useEffect(() => {
            console.log(recharge);
        }, [recharge]);
    
        React.useEffect(() => {
            console.log(order);
        }, [order]); */

    return (
        <View style={{
            alignItems: 'center',
            flex: 1,
            width: '100%',
            backgroundColor: "#fff"
        }}>
            <StatusBar barStyle='light-content' backgroundColor={colors.secondary} animated={false} showHideTransition="none" />
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
                            }}>Get your sainikpod card</Text>
                        </View>

                        <View style={{ flex: 1 }}>
                            <ScrollView>
                                <Card containerStyle={{
                                    borderRadius: 20,
                                    backgroundColor: colors.primary,
                                    minWidth: 200,
                                    width: 270,
                                    maxWidth: 350,
                                    marginVertical: 40,
                                    alignSelf: 'center',
                                }}>
                                    <Card.Title style={{
                                        color: colors.secondary
                                    }}>SAINIKPOD</Card.Title>
                                    <View style={{
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                    }}>
                                        <Image
                                            containerStyle={{
                                                marginVertical: 80
                                            }}
                                            style={{ width: 150, maxWidth: 300, maxHeight: 200, height: 130, textAlign: 'center' }}
                                            source={require('../../assets/img/logo.png')}
                                        />
                                    </View>
                                    <Card.Title style={{
                                        color: colors.secondary
                                    }}>MEMBER</Card.Title>
                                </Card>

                                <FlatList
                                    data={DATA}
                                    renderItem={renderItem}
                                    numColumns={2}
                                    keyExtractor={item => item.id}
                                    style={{
                                        marginVertical: 20,
                                    }}
                                    columnWrapperStyle={{
                                        justifyContent: 'space-between',
                                        marginVertical: 10
                                    }}
                                />
                            </ScrollView>
                        </View>

                        <TouchableOpacity
                            style={{
                                backgroundColor: colors.primary,
                                borderRadius: 0,
                                padding: 25,
                                width: '100%',
                                textAlign: 'center'
                            }}
                            onPress={() => refRBSheet.current.open()}>
                            <Text h4 style={{
                                color: '#fff',
                                textAlign: 'center'
                            }}>Buy Card {'₹' + parseInt(card?.Card_Price)}</Text>
                        </TouchableOpacity>

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
                            height={200}
                        >
                            <View>
                                <Text h4 style={{
                                    textAlign: 'center',
                                    color: colors.secondary,
                                    marginBottom: 20
                                }}>Recharge you card</Text>
                                <ScrollView horizontal={true}>
                                    {
                                        card?.Recharges.map((item, index) => (
                                            <Chip
                                                key={index}
                                                title={"₹ " + parseInt(item.display_value)}
                                                type={parseInt(item.display_value) == recharge ? "solid" : "outline"}
                                                containerStyle={{
                                                    marginHorizontal: 10,
                                                }}
                                                buttonStyle={{
                                                    paddingHorizontal: 20,
                                                    backgroundColor: parseInt(item.display_value) == recharge ? colors.primary : 'white',
                                                    borderColor: parseInt(item.display_value) == recharge ? colors.primary : colors.primary,
                                                }}
                                                titleStyle={{
                                                    color: parseInt(item.display_value) == recharge ? 'white' : colors.primary,
                                                }}
                                                onPress={() => setRecharge(parseInt(item.display_value))}
                                            />
                                        ))
                                    }
                                </ScrollView>
                                <View style={{
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    marginVertical: 20
                                }}>
                                    <Button
                                        title="Proceed"
                                        containerStyle={{
                                            width: '50%',
                                            borderRadius: 30,
                                        }}
                                        buttonStyle={{
                                            backgroundColor: colors.primary,
                                            padding: 15,
                                        }}
                                        loading={loading}
                                        disabled={loading}
                                        onPress={() => handleCheckout()}
                                    />
                                </View>
                            </View>
                        </RBSheet>
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

export default BuyCard;

const styles = StyleSheet.create({
    logo: {
        width: '70%',
        maxWidth: 300,
        maxHeight: 200
    },
    sectionContainer: {
        marginTop: 32,
        paddingHorizontal: 24,
    },
    sectionTitle: {
        fontSize: 24,
        fontWeight: '600',
    },
    sectionDescription: {
        marginTop: 8,
        fontSize: 18,
        fontWeight: '400',
    },
    highlight: {
        fontWeight: '700',
    },
});
