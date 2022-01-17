import React, { useEffect } from 'react';
import { Image, Text, View } from 'react-native';
import { Button } from 'react-native-elements';
import colors from '../theme/colors';

function BecomeMember({ navigation, route }) {

    return (
        <View style={{
            alignItems: 'center',
            flex: 1,
            width: '100%',
            paddingHorizontal: 20,
            backgroundColor: "#fff"
        }}>
            <Image
                style={{ width: '50%', maxWidth: 300, maxHeight: 200, height: 170, marginTop: 100 }}
                source={require('../assets/img/logo.png')}
            />
            <Text style={{
                fontSize: 20,
                paddingVertical: 10,
                color: colors.dark,
                fontFamily: 'URWGeometric-Regular'
            }}>
                Let's Move Together
            </Text>

            <Text style={{
                marginVertical: 30,
                color: colors.dark,
                fontFamily: 'URWGeometric-Regular'
            }}>Your currently not a sainikpod member</Text>

            <Button
                title="Become a Member"
                containerStyle={{
                    width: '50%',
                    textAlign: 'center'
                }}
                buttonStyle={{
                    backgroundColor: colors.primary,
                    borderRadius: 40,
                    padding: 10
                }}
                onPress={() => navigation.navigate('Terms')}
            />
            {/* <Button title="Sign in" onPress={() => signIn({ username, password })} /> */}
        </View>
    );
}

export default BecomeMember;