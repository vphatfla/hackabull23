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
import { Icon } from 'react-native-elements';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { useNavigation } from '@react-navigation/native';

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

function GooglePlacesInput({ onLocationSelected }) {
    return (
      <GooglePlacesAutocomplete
        placeholder='Search'
        fetchDetails={true}
        onPress={(data, details = null) => {
          if (details && details.geometry) {
            onLocationSelected(details.geometry.location);
          }
        }}
        query={{
          key: 'AIzaSyD_3OQoiAhfN1Y_RyLgQJpNhQpM4mqKeBk',
          language: 'en',
        }}
        styles={{
          textInputContainer: styles.textInputContainer,
          textInput: [styles.textInput, { height: 50 }],
        }}
      />
    );
  }
  

function Main() {
  const [region, setRegion] = useState<Region>({
    latitude: 27,
    longitude: -82,
    latitudeDelta: 0.0922 * 5,
    longitudeDelta: 0.0421 * 5,
  });

  const navigation = useNavigation(); // Access the navigation object

  const onLocationSelected = (location) => {
    setRegion({
      latitude: location.lat,
      longitude: location.lng,
      latitudeDelta: 0.0922 * 5,
      longitudeDelta: 0.0421 * 5,
    });
  };

  const [markers, setMarkers] = useState([]);
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const snapPoints = useMemo(() => ['25%', '50%'], []);
  const [curMarkerInfo, setCurMakerInfo] = useState<MainMarkerINFO>({});

  const onZoomIn = () => {
    setRegion((prevRegion) => ({
      ...prevRegion,
      latitudeDelta: prevRegion.latitudeDelta / 2,
      longitudeDelta: prevRegion.longitudeDelta / 2,
    }));
  };

  const onZoomOut = () => {
    setRegion((prevRegion) => ({
      ...prevRegion,
      latitudeDelta: prevRegion.latitudeDelta * 2,
      longitudeDelta: prevRegion.longitudeDelta * 2,
    }));
  };

  useEffect(() => {
    (async () => {
      try {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          Alert.alert('Permission to access location was denied');
          return;
        }

        let curLocation = await Location.getCurrentPositionAsync({});
        if (curLocation) {
          onRegionChange({
            longitude: curLocation.coords.longitude,
            latitude: curLocation.coords.latitude,
            latitudeDelta: 0.0922 * 5,
            longitudeDelta: 0.0421 * 5,
          });
        }

        await fetch('http://192.168.50.7:9000/api', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            lat: curLocation.coords.latitude.toFixed(2),
            long: curLocation.coords.longitude.toFixed(2),
          }),
        })
          .then((response) => response.json())
          .then((data) => {
            setMarkers(data.slice(0, 75));
          })
          .catch((error) => {
            console.error('Error: something went wrong', error);
          });
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  const onRegionChange = (region: Region) => {
    setRegion(region);
  };

  const handlePresentModalPress = useCallback((marker: any) => {
    try {
      bottomSheetModalRef.current?.present();
      setCurMakerInfo(marker);
    } catch (e) {
      console.log('FAILED TO CALLED', e);
    }
  }, []);

  const handleSheetChanges = useCallback((index: number) => {
    console.log('handleSheetChanges', index);
  }, []);

  const DotMarker = ({ marker }: any) => {
    const markerColor: any = {
      'not present/background (0-1,000)': 'grey',
      'very low (1,000-10,000)': 'white',
      'low (>10,000-100,000)': 'yellow',
      'medium (>100,000-1,000,000)': 'orange',
      'high (>1,000,000)': 'red',
    };

    return (
      <Marker
        onPress={() => handlePresentModalPress(marker)}
        coordinate={{
          latitude: marker.LATITUDE,
          longitude: marker.LONGITUDE,
        }}
      >
        <View
          style={{
            width: 13,
            height: 13,
            borderRadius: 100,
            borderWidth: 1,
            borderColor: 'black',
            backgroundColor: markerColor[marker.Abundance],
          }}
        ></View>
      </Marker>
    );
  };

  const Legend = () => {
    const markerColor: any = {
      'not present/background (0-1,000)': 'grey',
      'very low (1,000-10,000)': 'white',
      'low (>10,000-100,000)': 'yellow',
      'medium (>100,000-1,000,000)': 'orange',
      'high (>1,000,000)': 'red',
    };

    return (
      <View style={styles.legend}>
        {Object.keys(markerColor).map((key: any, index: any) => (
          <View key={index} style={{ flexDirection: 'row' }}>
            <View
              style={{
                margin: 2,
                height: 10,
                width: 10,
                backgroundColor: markerColor[key],
                borderRadius: 100,
                borderWidth: 1,
                borderColor: 'black',
              }}
            ></View>
            <Text>{key}</Text>
          </View>
        ))}
      </View>
    );
  };

  const MarkerInfoModal = () => {
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
          <Text>{`Abundance: ${curMarkerInfo.Abundance}`}</Text>
          <Text>{`Distance from you: ${curMarkerInfo.Distance}`}</Text>
        </View>
      </BottomSheetModal>
    );
  };

  return (
    <BottomSheetModalProvider>
      <View style={styles.container}>
        <Legend />
        <View style={styles.mapContainer}>
          <MapView provider={PROVIDER_GOOGLE} style={styles.map} region={region}>
            {markers.map((marker: any, index: number) => (
              <DotMarker marker={marker} key={index} />
            ))}

            <Marker
              coordinate={{
                longitude: region.longitude,
                latitude: region.latitude,
              }}
              title="You are here"
            />
            <MarkerInfoModal />
          </MapView>
          <GooglePlacesInput onLocationSelected={onLocationSelected} />
        </View>
        <View style={styles.zoomButtons}>
          <Icon name="zoom-in" type="material" color="red" onPress={onZoomIn} size={40} />
          <Icon name="zoom-out" type="material" color="red" onPress={onZoomOut} size={40} />
        </View>
      </View>
      <View style={styles.navbar}>
        <Icon name="home" type="material" color="#FF0000" onPress={() => navigation.navigate('Home')} size={40} />
        <Icon name="info" type="material" color="#FF0000" onPress={() => navigation.navigate('Info')} size={40} />
      </View>
    </BottomSheetModalProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  mapContainer: {
    flex: 1,
    marginTop: 10,
    marginBottom: -300,
  },
  map: {
    flex: 1,
  },
  zoomButtons: {
    position: 'absolute',
    top: 170,
    right: 10,
    flexDirection: 'column',
    justifyContent: 'space-between',
    width: 100,
    height: 100,
  },
  legend: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    width: 200,
    height: 150,
    backgroundColor: '#ffff',
    padding: 10,
    borderRadius: 10,
    elevation: 5,
  },
  contentContainer: {
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textInputContainer: {
    backgroundColor: 'rgba(0,0,0,0)',
    borderTopWidth: 0,
    borderBottomWidth: 0,
  },
  textInput: {
    marginLeft: 0,
    marginRight: 0,
    height: 38,
    color: '#5d5d5d',
    fontSize: 16,
  },
  navbar: {
    position: 'absolute',
    top: 50,
    right: 10,
    flexDirection: 'column',
    justifyContent: 'space-between',
    width: 100,
    height: 100,
  },
});

export default Main;
