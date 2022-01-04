import * as React from 'react';
import { PermissionsAndroid } from 'react-native';
import { AuthContext, _storeData } from './Auth';
import { getLocation } from './getLocation';

export async function requestLocationPermission(grantLocation) {

    const checkLocationPermission = await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION);

    // if (checkLocationPermission === PermissionsAndroid.RESULTS.GRANTED) {
    if (checkLocationPermission === true) {
        console.log("Already Granted");
        getLocation.then(result => {
            grantLocation(true);
        }, error => {
            console.log("Error", error);
        })

    } else {
        try {
            const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
                {
                    'title': 'Sainikpod App required Location permission',
                    'message': 'We required Location permission in order to get device location ' +
                        'Please grant us.'
                }
            )
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                console.log("Granted");
                await _storeData('locationPermission', true);
                getLocation.then(result => {
                    grantLocation(true);
                }, error => {
                    console.log("Error", error);
                })
            } else {
                alert("You don't have access for the location");
            }
        } catch (err) {
            alert(err)
        }
    }
    /* try {
        const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION)
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            console.log("You can use the location")
            alert("You can use the location");
        } else {
            console.log("location permission denied")
            alert("Location permission denied");
        }
    } catch (err) {
        console.warn(err)
    } */
}