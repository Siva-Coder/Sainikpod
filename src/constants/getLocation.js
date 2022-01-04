import Geolocation from 'react-native-geolocation-service';
import { _storeData } from './Auth';

export const getLocation = new Promise(function (resolve, reject) {
    // not taking our time to do the job
    Geolocation.getCurrentPosition(
        (position) => {
            _storeData("location", position);
            // console.log(position);
            resolve(position);
        },
        (error) => {
            // See error code charts below.
            console.log(error.code, error.message);
            reject(error);
        },
        { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
    );
});
/* export async function getLocation() {
    const hasLocationPermission = true;
    if (hasLocationPermission) {
        await Geolocation.getCurrentPosition(
            (position) => {
                // console.log(position);
                return position;
            },
            (error) => {
                // See error code charts below.
                console.log(error.code, error.message);
                return error;
            },
            { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
        );
    }
    // Geolocation.getCurrentPosition(info => console.log(info));
}; */
