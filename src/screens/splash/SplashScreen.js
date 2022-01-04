import * as React from 'react';
import { ActivityIndicator, Image, SafeAreaView, StatusBar, View } from "react-native";
import { Text } from 'react-native-elements';
import colors from '../../theme/colors';

const SplashScreen = () => {
    return (
        <SafeAreaView style={{
            flex: 1,
        }}>
            <StatusBar barStyle='dark-content' backgroundColor={colors.white} animated={false} showHideTransition="none" />
            <View style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
            }}><Image
                    style={{ width: '50%', maxWidth: 300, maxHeight: 200, height: 200, }}
                    source={require('../../assets/img/logo.png')}
                />
                <View style={{ marginTop: 20 }}>
                    <ActivityIndicator size="large" color={colors.primary} />
                </View>
            </View>
        </SafeAreaView>
    );
}

export default SplashScreen;