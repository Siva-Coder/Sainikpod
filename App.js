/* eslint-disable prettier/prettier */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * https://aboutreact.com/react-native-datepicker/
 * npm install react-native-datepicker --save
 *
 * @format
 * @flow strict-local
 */

import * as React from 'react';
// import axios from './src/axios-base';
import { ACCESS_KEY } from '@env';
import { Alert, AsyncStorage, Dimensions, PermissionsAndroid } from 'react-native';

import { Node } from 'react';
import {
  ScrollView,
  StatusBar,
  StyleSheet,
  useColorScheme,
  View,
  Image,
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

import colors from './src/theme/colors'

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Logo from './src/assets/img/logo.png';
import metrics from './src/theme/metrics';
import useWindowDimensions from 'react-native/Libraries/Utilities/useWindowDimensions';

import { Button, Input, Text } from 'react-native-elements';
import axios from 'axios';
import { io } from "socket.io-client";

import BuyCard from './src/screens/buyCard/BuyCard'
import { AuthContext, _retrieveData } from './src/constants/Auth';
import SignInScreen from './src/screens/SignIn';
import HomeScreen from './src/screens/HomeScreen';
import BecomeMember from './src/screens/Member';
import Checkout from './src/screens/Checkout';
import { Account } from './src/screens/Account';
import { Profile } from './src/screens/Profile';
import SplashScreen from './src/screens/splash/SplashScreen';
import AskLocation from './src/screens/AskLocation';

const Stack = createNativeStackNavigator();



const storeData = async (storageKey, value) => {
  try {
    return await AsyncStorage.setItem(storageKey, value)
  } catch (e) {
    // saving error
  }
}

const storeObject = async (storageKey, value) => {
  try {
    const jsonValue = JSON.stringify(value)
    return await AsyncStorage.setItem(storageKey, jsonValue)
  } catch (e) {
    // saving error
  }
}

const getData = async (storageKey) => {
  return await AsyncStorage.getItem(storageKey);
}

const getObject = async (storageKey) => {
  try {
    const jsonValue = await AsyncStorage.getItem(storageKey)
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    // error reading value
  }
}

const removeObject = async (storageKey) => {
  try {
    await AsyncStorage.removeItem(storageKey)
    return true;
  } catch (e) {
    // remove error
  }

  console.log('Done.')
}

function Terms({ navigation }) {

  return (
    <View style={{
      alignItems: 'center',
      flex: 1,
      width: '100%',
      backgroundColor: "#fff"
    }}>
      <Image
        style={{ width: '30%', maxWidth: 300, maxHeight: 200, height: 100, marginTop: 10 }}
        source={require('./src/assets/img/logo.png')}
      />
      <Text style={{
        fontSize: 15,
        paddingVertical: 10,
      }}>
        Let's Move Together
      </Text>


      <View style={{
        backgroundColor: colors.secondary,
        width: '100%',
        padding: 25
      }}>
        <Text h4 style={{
          textAlign: 'center',
          color: '#fff'
        }}>Terms & Conditions</Text>
      </View>

      <ScrollView>
        <Text style={{
          padding: 20,
          fontSize: 17,
          lineHeight: 23
        }}>
          It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).
        </Text>
        <Text style={{
          padding: 20,
          fontSize: 17,
          lineHeight: 23
        }}>
          Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.        </Text>
      </ScrollView>

      <TouchableOpacity
        style={{
          backgroundColor: colors.primary,
          borderRadius: 0,
          padding: 25,
          width: '100%',
          textAlign: 'center'
        }}
        onPress={() => navigation.navigate('Signup')}>
        <Text h4 style={{
          color: '#fff',
          textAlign: 'center'
        }}>Accept</Text>
      </TouchableOpacity>
      {/* <Button title="Sign in" onPress={() => signIn({ username, password })} /> */}
    </View>
  );
}

function Signup({ route, navigation }) {

  const [name, setName] = React.useState(null)
  const [number, setNumber] = React.useState(null)
  const [emergencyName, setEmergencyName] = React.useState(null)
  const [emergencyNumber, setEmergencyNumber] = React.useState(null)
  const [email, setEmail] = React.useState(null)
  const [loading, setLoading] = React.useState(false);


  const { signIn } = React.useContext(AuthContext);

  React.useEffect(() => {
    const checkPhone = async () => {
      const phone = await _retrieveData("Phone");
      phone && setNumber(phone);
    }

    checkPhone();
  }, []);

  const handleSignUp = async () => {
    console.log(name);
    console.log(number);
    console.log(emergencyNumber);
    console.log(emergencyName);
    try {
      if (name == null && number == null && emergencyName == null && emergencyNumber == null) {
        return Alert.alert("Sainikpod", "Enter valid Information")
      } else {
        setLoading(true);
        const key = await getData('access_key');
        console.log(key);

        let headers = { 'Authorization': 'Zoho-oauthtoken ' + key }
        let data = {
          "data": {
            "Passenger_Name": name,
            "Mobile_No": '+91' + number,
            "Emergency_Name": emergencyName,
            "Emergency_Contact": '+91' + emergencyNumber,
            "Email": email,
            "Membership_Type": "Non Member"
          }
        }

        const response = await axios.post('https://creator.zoho.in/api/v2/ashish_motherpod/sainikpod-2nd-generation-beta/form/S08_Passenger', data, { headers: headers })
        if (response.status == 200) {
          console.log(response.data);
          if (response.data.code == 3000) {
            const { ID } = await response.data.data;
            const res = await axios.get('https://creator.zoho.in/api/v2/ashish_motherpod/sainikpod-2nd-generation-beta/report/S08_Passenger_Report/' + ID, { headers: headers })
            if (res.status == 200) {

              if (res.data.code == 3000) {
                const user = res.data.data;
                console.log(user);
                setLoading(false);
                await storeObject("user", user);
                return signIn({ user, key });
              } else {
                Alert.alert('Error', 'Something went wrong!', [{ text: 'OK' }])
              }

            }
            /* console.log(user);
            setLoading(false);
            await storeObject("user", user);
            return signIn({ user, key }); */
            // return navigation.navigate("SignIn")
          }
        }
      }

    } catch (error) {
      setLoading(false)
      console.log(error.message);
      return navigation.navigate("Member")
    }
    // navigation.navigate('Member')
  }

  return (
    <SafeAreaView style={{
      flex: 1,
      backgroundColor: "#fff",
      justifyContent: "center",
    }}>
      <StatusBar barStyle='dark-content' backgroundColor={colors.white} animated={false} showHideTransition="none" />

      <ScrollView style={{
        flex: 1,
      }} contentContainerStyle={{
        flexGrow: 1,
      }}>
        <KeyboardAvoidingView style={{
          alignItems: 'center',
          flex: 1,
        }}
          keyboardVerticalOffset={-100}
          behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
          <View style={{
            alignItems: 'center',
            flex: 1,
            width: Dimensions.get('window').width,
          }}>
            <View style={{
              backgroundColor: colors.secondary,
              width: '100%',
              padding: 25
            }}>
              <Text h4 style={{
                textAlign: 'center',
                color: '#fff'
              }}>Add member details</Text>
            </View>
            <View style={{
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'column',
              width: Dimensions.get('window').width,
              paddingHorizontal: 30
            }}>
              <View style={{
                width: '100%',
              }}>
                <Text h4 style={{
                  textAlign: 'left',
                  paddingStart: 10
                }}>Your Details</Text>
                <Input
                  value={name}
                  placeholder='Name'
                  containerStyle={{
                    marginTop: 30,
                  }}
                  inputContainerStyle={{
                    borderRadius: 40,
                    borderBottomWidth: 0,
                    backgroundColor: colors.light,
                    padding: 5,
                    paddingHorizontal: 20
                  }}
                  onChangeText={value => setName(value)}
                />
                <Input
                  value={number}
                  placeholder='Number'
                  inputContainerStyle={{
                    borderRadius: 40,
                    borderBottomWidth: 0,
                    backgroundColor: colors.light,
                    padding: 5,
                    paddingHorizontal: 20
                  }}
                  maxLength={10}
                  keyboardType={Platform.OS === "android" ? "phone-pad" : "number-pad"}
                  onChangeText={value => setNumber(value)}
                />
                <Input
                  value={email}
                  placeholder='Email'
                  inputContainerStyle={{
                    borderRadius: 40,
                    borderBottomWidth: 0,
                    backgroundColor: colors.light,
                    padding: 5,
                    paddingHorizontal: 20
                  }}
                  keyboardType="email-address"
                  onChangeText={value => setEmail(value)}
                />
              </View>

              <View style={{
                width: '100%',
                marginTop: 20,
              }}>
                <Text h4 style={{
                  textAlign: 'left',
                  paddingStart: 10
                }}>Emergency Contacts</Text>
                <Input
                  value={emergencyName}
                  placeholder='Name'
                  containerStyle={{
                    marginTop: 30,
                  }}
                  inputContainerStyle={{
                    borderRadius: 40,
                    borderBottomWidth: 0,
                    backgroundColor: colors.light,
                    padding: 5,
                    paddingHorizontal: 20
                  }}
                  onChangeText={value => setEmergencyName(value)}
                />
                <Input
                  placeholder='Number'
                  value={emergencyNumber}
                  inputContainerStyle={{
                    borderRadius: 40,
                    borderBottomWidth: 0,
                    backgroundColor: colors.light,
                    padding: 5,
                    paddingHorizontal: 20
                  }}
                  maxLength={10}
                  keyboardType={Platform.OS == "android" ? "phone-pad" : "number-pad"}
                  onChangeText={value => setEmergencyNumber(value)}
                />
              </View>

            </View>
          </View>
        </KeyboardAvoidingView>
      </ScrollView>

      <TouchableOpacity
        style={{
          backgroundColor: colors.primary,
          borderRadius: 0,
          padding: 25,
          width: '100%',
          textAlign: 'center'
        }}
        onPress={handleSignUp}>
        {
          loading ? <ActivityIndicator size="small" color="#fff" /> : <Text h4 style={{
            color: '#fff',
            textAlign: 'center'
          }}>Add Card</Text>
        }


      </TouchableOpacity>
      {/* <Button title="Sign in" onPress={() => signIn({ username, password })} /> */}
    </SafeAreaView>
  );
}


export default function App({ navigation }) {

  // const socket = io("wss://sainikpod.herokuapp.com/");
  const socket = io("https://sainikpod.herokuapp.com/");

  React.useEffect(() => {
    async function getData() {
      socket.on("connect", () => {
        console.log("Socket connected");
        console.log(socket.id); // x8WIv7-mJelg7on_ALbx
      });

      socket.on("key", (response) => {
        if (response.status == 200) {
          // console.log("key", response.data.key);
          storeData('access_key', response.data.key);
        }
      });
    }
    return () => getData();
  }), [socket];


  const [state, dispatch] = React.useReducer(
    (prevState, action) => {
      switch (action.type) {
        case 'RESTORE_TOKEN':
          return {
            ...prevState,
            userToken: action.token,
            isLoading: false,
          };
        case 'SIGN_IN':
          return {
            ...prevState,
            isSignout: false,
            userToken: action.data.key,
          };
        case 'SIGN_OUT':
          return {
            ...prevState,
            isSignout: true,
            userToken: null,
          };
        case 'LOCATION_GRANTED':
          return {
            ...prevState,
            locationGranted: action.data,
          };
      }
    },
    {
      isLoading: true,
      isSignout: false,
      userToken: null,
      locationGranted: false,
    }
  );

  React.useEffect(() => {
    // Fetch the token from storage then navigate to our appropriate place
    const bootstrapAsync = async () => {

      try {
        const checkLocationPermission = await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION);
        console.log(_retrieveData("locationPermission"));
        if (checkLocationPermission === true) {
          dispatch({ type: 'LOCATION_GRANTED', data: checkLocationPermission });
        }
      } catch (e) {
        console.log(e);
      }

      // After retrieving the token, we may want to validate it and let the user know if its invalid
      // console.log(userToken);

      // console.log(userToken);
    };

    bootstrapAsync();
  }, []);

  React.useEffect(() => {
    async function bootstrapAsync() {
      let userToken;
      try {
        const user = await getObject("user");
        // const key = await getData('access_key');
        if (user) {
          const res = await axios.get('https://sainikpod.herokuapp.com/key')

          if (res.status == 200 && res.data.length > 0) {
            let key = res.data[0].key;
            console.log("key", res.data[0].key);
            await storeData('access_key', res.data[0].key);
            await dispatch({ type: 'RESTORE_TOKEN', token: res.data[0].key });
            return dispatch({ type: 'SIGN_IN', data: { user, key } });
          }

        }
        else {
          const res = await axios.get('https://sainikpod.herokuapp.com/key')

          if (res.status == 200 && res.data.length > 0) {
            console.log("key", res.data[0].key);
            await storeData('access_key', res.data[0].key);
            return dispatch({ type: 'RESTORE_TOKEN', token: userToken });
          }
        }

      } catch (error) {
        console.log(error);
        if (error.message === 'Request failed with status code 401') {
          return Alert.alert("Sainikpod", "Something went wrong!! please try again later")
        } else {
          return Alert.alert("Login", "Something went wrong!! please try again later")
        }
      }
    }
    bootstrapAsync()
  }, []);
  /* React.useEffect(() => {
    // Fetch the token from storage then navigate to our appropriate place
    const bootstrapAsync = async () => {
      console.disableYellowBox = true;
      let userToken;

      try {
        // Restore token stored in `SecureStore` or any other encrypted storage
        // userToken = await SecureStore.getItemAsync('userToken');
      } catch (e) {
        // Restoring token failed
      }

      // After restoring token, we may need to validate it in production apps

      // This will switch to the App screen or Auth screen and this loading
      // screen will be unmounted and thrown away.
      dispatch({ type: 'RESTORE_TOKEN', token: userToken });
    };

    bootstrapAsync();
  }, []); */

  const authContext = React.useMemo(
    () => ({
      signIn: async (data) => {
        // In a production app, we need to send some data (usually username, password) to server and get a token
        // We will also need to handle errors if sign in failed
        // After getting token, we need to persist the token using `SecureStore` or any other encrypted storage
        // In the example, we'll use a dummy token

        /* if (user.Membership_Type === "Non Member") {
          return navigation.navigate("BuyCard")
        } */
        dispatch({ type: 'SIGN_IN', data: data });
      },
      signOut: () => dispatch({ type: 'SIGN_OUT' }),
      signUp: async (data) => {
        // In a production app, we need to send user data to server and get a token
        // We will also need to handle errors if sign up failed
        // After getting token, we need to persist the token using `SecureStore` or any other encrypted storage
        // In the example, we'll use a dummy token

        dispatch({ type: 'SIGN_IN', token: 'dummy-auth-token' });
      },
      grantLocation: async (data) => {

        dispatch({ type: 'LOCATION_GRANTED', data: data });
      },
    }),
    []
  );
  console.disableYellowBox = true;
  return (
    <AuthContext.Provider value={authContext}>
      <SafeAreaProvider>
        <NavigationContainer>
          <Stack.Navigator>
            {state.isLoading ? (
              // We haven't finished checking for the token yet
              <Stack.Screen name="Splash" component={SplashScreen} options={{
                headerShown: false
              }} />
            ) : !state.locationGranted ? (
              <Stack.Screen name="AskLocation" component={AskLocation}
                options={{
                  headerShown: false
                }} />
            ) : state.userToken == null ? (
              // No token found, user isn't signed in
              <>
                <Stack.Screen
                  name="SignIn"
                  component={SignInScreen}
                  options={{
                    title: 'Sign in',
                    headerShown: false,
                    // When logging out, a pop animation feels intuitive
                    animationTypeForReplace: state.isSignout ? 'pop' : 'push',
                  }}
                />
                <Stack.Screen name="Signup" component={Signup}
                  options={{
                    headerShown: false
                  }} />
                <Stack.Screen name="Terms" component={Terms}
                  options={{
                    headerShown: false
                  }} />

                <Stack.Screen name="Member" component={BecomeMember}
                  options={{
                    headerShown: false
                  }} />
              </>
            ) : (
              // User is signed in
              <>
                <Stack.Screen name="Home" component={HomeScreen} options={{
                  headerShown: false
                }} />
                <Stack.Screen name="BuyCard" component={BuyCard} options={{
                  headerShown: false
                }} />
                <Stack.Screen name="Checkout" component={Checkout} options={{
                  headerShown: false
                }} />
                <Stack.Screen name="Account" component={Account} />
                <Stack.Screen name="Profile" component={Profile} />
              </>
            )}
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaProvider>
    </AuthContext.Provider>
  );
}

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
