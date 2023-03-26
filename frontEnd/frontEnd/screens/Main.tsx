/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useEffect, useState } from 'react';
import {
    Alert,
    Button,
    StyleSheet,
    Text,
    View,
    LogBox,
} from 'react-native';
import MapView, { PROVIDER_GOOGLE, Marker, Region } from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import axios from 'axios'
LogBox.ignoreAllLogs(); //Ignore all log notifications
function Main() {
    const custom_pins = '../assets/image/pngwing.com.png';
    const [region, setRegion] = useState({
        latitude: 0,
        longitude: 0,
        latitudeDelta: 1,
        longitudeDelta: 1
    });
    const [markers, setMarkers] = useState([])
    // const [position, setPosition] = useState({
    //     lat: 0,
    //     long: 0,
    // });
    useEffect(() => {
        getCurrentPosition()
        const getData = async () =>{
                
            await fetch("http://10.245.49.99:9000/api/", {
                method: "POST", // or 'PUT',
                body: JSON.stringify({
                    lat: 27,
                    long: -82
                }),
            headers: {
            "Content-Type": "application/json",
            },
            })
            .then((response) => response.json())
            .then((data) => {
            console.log("Success:", data);
            })
            .catch((error) => {
            console.error("Error:", error);
            });
            // await axios.post("http://localhost:9000/api/example")
            //   .then(function (response) {
            //     console.log(response);
            //   })
            //   .catch(function (error) {
            //     console.log(error);
            //   });
        }
        getData()
    }, [])
    const onRegionChange = (region: Region) => {
        setRegion(
            region
        )
    }
    const getCurrentPosition = () => {
        Geolocation.getCurrentPosition(
            (pos) => {
                //setPosition(JSON.stringify(pos));
                onRegionChange({
                    latitude: pos.coords.latitude,
                    longitude: pos.coords.longitude,
                    latitudeDelta: 1,
                    longitudeDelta: 1
                })
            },
            (error) => Alert.alert('GetCurrentPosition Error', JSON.stringify(error)),
            { enableHighAccuracy: true }
        );
    };
    return (
        <View style={styles.body}>

            <MapView
                provider={PROVIDER_GOOGLE}
                style={{ flex: 1 }}
                region={region}
            >
                <Marker
                    coordinate={region}
                >
                    <View style={styles.imageStyle}>

                    </View>
                </Marker>
            </MapView>
        </View>

    );
}

const styles = StyleSheet.create({
    body: {
        flex: 1,
        alignItems: 'stretch',
        justifycontent: 'center',
    },
    imageStyle: {
        backgroundColor: 'red',
        borderRadius: 100,
    },
    marker: {

    }

});


export default Main;
