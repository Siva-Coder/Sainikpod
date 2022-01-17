import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import Ionicons from 'react-native-vector-icons/Ionicons';
import colors from '../../theme/colors';

const GooglePlacesInput = ({ updateLocation }) => {
    return (
        <GooglePlacesAutocomplete
            placeholder='Search Drop Location'
            // autoFocus={true}
            onPress={(data, details = null) => {
                console.log("Abcd");
                // 'details' is provided when fetchDetails = true
                console.log(data, details);
            }}
            renderRow={(rowData, idex) => (
                <TouchableOpacity style={{
                    alignItems: 'center',
                    justifyContent: 'flex-start',
                    flexDirection: 'row',
                    width: '100%',
                    height: 40,
                    paddingLeft: 0
                }}
                    onPress={() => updateLocation(rowData.place_id, rowData.description)}
                >
                    <Ionicons name="location-outline" size={20} color="black" style={{
                        backgroundColor: colors.gray2,
                        padding: 7,
                        borderRadius: 30,
                    }} />
                    <Text style={{ color: '#5d5d5d', paddingLeft: 20 }}>{rowData.description}</Text>
                </TouchableOpacity>
            )}
            fetchDetails={true}
            styles={{
                textInput: {
                    fontWeight: '600',
                    marginBottom: 0,
                    color: '#5d5d5d',
                    borderColor: '#ccc',
                    borderWidth: 1,
                    borderRadius: 30,
                    paddingHorizontal: 20
                },
                textInputContainer: {
                    paddingHorizontal: 7
                },
                listView: {
                },
                container: {
                },
                row: {
                    paddingVertical: 10,
                    paddingHorizontal: 0,
                },
                description: {
                    color: '#5d5d5d',
                }
            }}
            textInputProps={{
                placeholderTextColor: '#c1c1c1',
                onFocus: () => console.log("Focused"),
                onChange: (change) => console.log("change"),
                onBlur: () => console.log("Blurred"),
                enablesReturnKeyAutomatically: false,
            }}
            listViewDisplayed="auto"

            contentContainerStyle={{
                backgroundColor: 'white',
                borderColor: '#ccc',
                borderWidth: 0.5,
                borderRadius: 12,
                color: "#000",
                padding: 10,
                margin: 10,

            }}
            // suppressDefaultStyles={true}
            query={{
                key: 'AIzaSyB5xEVK86_GHlYJRFz9G3WgsiIwPFWSw8Y',
                language: 'en',
            }}
        />
    );
};

export default GooglePlacesInput;
