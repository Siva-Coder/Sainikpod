import * as React from "react";
import { AsyncStorage } from "react-native";

export const USER_KEY = "auth-demo-key";

export const onSignIn = () => AsyncStorage.setItem(USER_KEY, "true");

export const onSignOut = () => AsyncStorage.removeItem(USER_KEY);

export const isSignedIn = () => {
    return new Promise((resolve, reject) => {
        AsyncStorage.getItem(USER_KEY)
            .then(res => {
                if (res !== null) {
                    resolve(true);
                } else {
                    resolve(false);
                }
            })
            .catch(err => reject(err));
    });
};

export const storeData = async (storageKey, value) => {
    try {
        return await AsyncStorage.setItem(storageKey, value)
    } catch (e) {
        // saving error
    }
}

export const storeObject = async (storageKey, value) => {
    try {
        const jsonValue = JSON.stringify(value)
        return await AsyncStorage.setItem(storageKey, jsonValue)
    } catch (e) {
        // saving error
    }
}

export const getData = async (storageKey) => {
    return await AsyncStorage.getItem(storageKey);
}

export const getObject = async (storageKey) => {
    try {
        const jsonValue = await AsyncStorage.getItem(storageKey)
        return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
        // error reading value
    }
}

export const removeObject = async (storageKey) => {
    try {
        await AsyncStorage.removeItem(storageKey)
        return true;
    } catch (e) {
        // remove error
    }

    console.log('Done.')
}

export const _storeData = async (storageKey, value) => {
    try {
        await AsyncStorage.setItem(
            JSON.stringify(storageKey),
            JSON.stringify(value)
        );
    } catch (error) {
        console.log(error);
        // Error saving data
    }
};

export const _retrieveData = async (storageKey) => {
    try {
        const value = await AsyncStorage.getItem(JSON.stringify(storageKey));
        if (value !== null) {
            // We have data!!
            console.log(value);
            return JSON.parse(value);
        }
    } catch (error) {
        // Error retrieving data
        console.log(error);
    }
};

export const AuthContext = React.createContext();