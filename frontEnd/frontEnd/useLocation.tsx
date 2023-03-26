
import { PermissionsAndroid, Platform } from 'react-native';
import DeviceInfo from 'react-native-device-info';
import { PERMISSIONS, requestMultiple } from 'react-native-permissions';


type PermissionCallback = (result: boolean) => void;

interface LocationAPI {
    requestPermission(callback: PermissionCallback): Promise<void>;
}


function useLocation(): LocationAPI {
    const requestPermission = async (callback: PermissionCallback) => {
        if (Platform.OS === "android") {
            const apilevel = await DeviceInfo.getApiLevel();
            if (apilevel < 31) {
                const grantedStatus = await PermissionsAndroid.request(
                    PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
                    {
                        title: "Location Permission",
                        message: "Map Needs Location Permission",
                        buttonNegative: 'Cancel',
                        buttonPositive: 'Okay',
                        buttonNeutral: 'Maybe Later',
                    },
                );
                callback(grantedStatus === PermissionsAndroid.RESULTS.GRANTED);
            } else {
                const result = await requestMultiple([
                    PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
                ]);
                const isGranted =
                    result['android.permission.ACCESS_FINE_LOCATION'] === PermissionsAndroid.RESULTS.GRANTED;
                callback(isGranted);
            }
        }
        else {
            callback(true)
        }
    };



    return {
        requestPermission
    };
}

export default useLocation;