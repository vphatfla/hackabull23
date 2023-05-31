/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
    Alert,
    Button,
    StyleSheet,
    Text,
    View,
    LogBox,
} from 'react-native';
import MapView, { PROVIDER_GOOGLE, Marker, Region } from 'react-native-maps';
import * as Location from 'expo-location';
import { BottomSheetModal, BottomSheetModalProvider } from '@gorhom/bottom-sheet';

// {
//     "SampleDate_t": "Mar 20 2023 ",
//     "LOCATION": "Okaloosa Island Pier",
//     "LATITUDE": 30.3904,
//     "LONGITUDE": -86.59337,
//     "Abundance": "not present/background (0-1,000)",
//     "Source": "FWC-FWRI HAB Database",
//     "County": "Okaloosa",
//     "Distance": -1
// },
interface MainMarkerINFO {
    SampleDate_t?: string,
    LOCATION?: string,
    LATITUDE?: number,
    LONGITUDE?: number,
    Abundance?: string,
    Source?: string,
    County?: string,
    Distance?: number,
}
function Main() {
    const [region, setRegion] = useState<Region>(
        {
            latitude: 27,
            longitude: -82,
            latitudeDelta: 0,
            longitudeDelta: 0,
        }
    );
    const [markers, setMarkers] = useState([])
    const bottomSheetModalRef = useRef<BottomSheetModal>(null);
    const snapPoints = useMemo(() => ['25%', '50%'], []);
    const [curMarkerInfo, setCurMakerInfo] = useState<MainMarkerINFO>({})

    useEffect(() => {
        (async () => {
          try {
            // request user permission for location
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
              Alert.alert('Permission to access location was denied');
              return;
            }
      
            let curLocation = await Location.getCurrentPositionAsync({})
            if (curLocation){
              onRegionChange({
                longitude: curLocation.coords.longitude,
                latitude: curLocation.coords.latitude,
                latitudeDelta: 0,
                longitudeDelta: 0,
              })
            }

            // get data and display meter markers
            // Note: need to replace url that has local ip address
            await fetch("http://192.168.0.26:9000/api", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        "lat": curLocation.coords.latitude.toFixed(2),
                        "long": curLocation.coords.longitude.toFixed(2),
                    }),
                })
                .then((response) => response.json())
                .then((data) => {
                    setMarkers(data.slice(0, 75));
                })
                .catch((error) => {
                    console.error("Error: something went wrong", error);
                });

          } catch (error){
            console.log(error)
          }
        })();
      }, []);
    

    const onRegionChange = (region: Region) => {
        setRegion(
            region
        )
    }
    // callbacks
    const handlePresentModalPress = useCallback((marker: any) => {
        try {
            bottomSheetModalRef.current?.present();
            setCurMakerInfo(marker)
        } catch (e) {
            console.log("FAILED TO CALLED", e)
        }
    }, []);

    const handleSheetChanges = useCallback((index: number) => {
        console.log('handleSheetChanges', index);
      }, []);
    
    function DotMarker({ marker }: any) {
        
        const markerColor: any = {
            "not present/background (0-1,000)": "grey",
            "very low (1,000-10,000)": "white",
            "low (>10,000-100,000)": "yellow",
            "medium (>100,000-1,000,000)": "orange",
            "high (>1,000,000)": "red"
        }
        return (<Marker
            onPress={() => handlePresentModalPress(marker)}
            coordinate={{
                latitude: marker.LATITUDE,
                longitude: marker.LONGITUDE,
            }}>
            <View style={{
                width: 13,
                height: 13,
                borderRadius: 100,
                borderWidth: 1,
                borderColor: 'black',
                backgroundColor: markerColor[marker.Abundance]
            }}>

            </View>
        </Marker>)

    }
    function Legend() {
        const markerColor: any = {
            "not present/background (0-1,000)": "grey",
            "very low (1,000-10,000)": "white",
            "low (>10,000-100,000)": "yellow",
            "medium (>100,000-1,000,000)": "orange",
            "high (>1,000,000)": "red"
        }
        return (
            <View style={styles.legend}>
                {Object.keys(markerColor).map((key: any, index: any) => (
                    <View key={index} style={{ flexDirection: 'row' }}>
                        <View style={{ margin: 2, height: 10, width: 10, backgroundColor: markerColor[key], borderRadius: 100, borderWidth: 1, borderColor: 'black' }}></View>
                        <Text>{key}</Text>
                    </View>
                ))}

            </View>
        )
    }
    function MarkerInfoModal() {
        return (
            <BottomSheetModal
                ref={bottomSheetModalRef}
                index={0}
                snapPoints={snapPoints}
                onChange={handleSheetChanges}
            >
                <View style={styles.contentContainer}>
                    <Text>{`Location: ${curMarkerInfo.LOCATION}`}</Text>
                    <Text>{`Reported Date: ${curMarkerInfo.SampleDate_t}`}</Text>
                    <Text>{`Latitude: ${curMarkerInfo.LATITUDE}`}</Text>
                    <Text>{`Longitude: ${curMarkerInfo.LONGITUDE}`}</Text>
                    <Text>{`Adbundance: ${curMarkerInfo.Abundance}`}</Text>
                    <Text>{`Distance from you: ${curMarkerInfo.Distance}`}</Text>

                </View>
            </BottomSheetModal>
        )
    }
    return (
        <BottomSheetModalProvider>
            <View style={styles.body}>

                <MapView
                    provider={PROVIDER_GOOGLE}
                    style={{ flex: 1 }}
                    region={region}
                >
                    {markers.map((marker: any, index: number) => (
                        <DotMarker marker={marker} key={index} />
                    ))}

                    <Marker
                        coordinate={{
                            longitude: region.longitude,
                            latitude: region.latitude
                        }}
                        title="You are here"
                    />
                    <MarkerInfoModal />
                </MapView>
                <Legend />
            </View>
        </BottomSheetModalProvider>
    );
}

const styles = StyleSheet.create({
    body: {
        flex: 1,
        alignItems: 'stretch',
        justifycontent: 'center',
    },
    dotMarker: {
        width: 10,
        height: 10,
        borderRadius: 100,
    },
    legend: {
        bottom: 10,
        right: 10,
        position: 'absolute',
        width: 200,
        height: 150,
        backgroundColor: '#ffff'
    },
    contentContainer: {
        height: 200,
        justifyContent: 'center',
        alignItems: 'center',
    },
    myMarker: {
        width: 10,
        height: 10,
    }

});


export default Main;