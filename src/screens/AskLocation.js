import * as React from 'react';
import { AsyncStorage, SafeAreaView, StatusBar, View } from 'react-native';
import { Button, Text } from 'react-native-elements';
import { Icon } from 'react-native-elements/dist/icons/Icon';
import { AuthContext, storeData } from '../constants/Auth';
import { requestLocationPermission } from '../constants/requestLocation';
import colors from "../theme/colors";

function AskLocation() {

    const { grantLocation } = React.useContext(AuthContext);
    return (
        <SafeAreaView style={{
            flex: 1,
        }}>
            <StatusBar barStyle='dark-content' backgroundColor={colors.white} animated={false} showHideTransition="none" />

            <View style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
                paddingHorizontal: 40,
            }}>
                <View style={{
                    paddingVertical: 50,
                }}>
                    <View elevation={20} style={{
                        backgroundColor: colors.primary,
                        borderRadius: 100,
                        width: 100,
                        height: 100,
                        justifyContent: 'center',
                        alignItems: 'center',
                        shadowColor: colors.primary,
                        shadowOffset: {
                            width: 0,
                            height: 3
                        },
                        shadowRadius: 5,
                        shadowOpacity: 1.0,
                    }}>
                        <Icon name="location-on" type="material" color={colors.white} size={50} />
                    </View>
                </View>
                <Text h3 style={{
                    color: colors.primary,
                    marginVertical: 20,
                }}>Need Your Location</Text>
                <Text style={{
                    color: colors.gray,
                    fontSize: 16,
                    textAlign: 'center',
                }}>Please enable location access so we could provide you accurate results of nearest podstands</Text>
            </View>
            <View style={{
                paddingHorizontal: 20,
            }}>
                <Button
                    title="Allow Location"
                    loading={false}
                    loadingProps={{ size: 'small', color: 'white' }}
                    buttonStyle={{
                        backgroundColor: colors.primary,
                        padding: 15,
                        borderRadius: 15
                    }}
                    titleStyle={{ fontSize: 23 }}
                    containerStyle={{
                        width: '100%',
                        marginVertical: 30,
                    }}
                    onPress={() => requestLocationPermission(grantLocation)} />
            </View>

        </SafeAreaView>
    )
}

export default AskLocation
