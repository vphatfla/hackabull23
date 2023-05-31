/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    Pressable,
    Image
} from 'react-native';
import { useNavigation } from '@react-navigation/native'
// import LinearGradient from 'react-native-linear-gradient';
import { LinearGradient } from 'expo-linear-gradient';
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { HomeTabParamList } from '../props/RootStackParam';
// import useLocation from '../useLocation';

type mainScreenProp = NativeStackScreenProps<HomeTabParamList, 'Home'>;
function Home() {
    const navigation = useNavigation<mainScreenProp['navigation']>();
    const onPressHandler = () => {
        navigation.navigate('Main');
    }

    const onPressHandlerInfo = () => {
        navigation.navigate('Info')
    }
    return (
        <View style={styles.body}>
            <LinearGradient
                colors={['#ECEEA1', '#48AF7E', '#2EACB4', '#2EA7EB']}
                start={{ x: 0, y: 0 }}
                end={{ x: 0, y: 1}}
                style={styles.linearGradient}
            >
                <View style={styles.view1}>
                    <Text style={styles.sectionTitle}> {`Tides Guard`} </Text>
                    <Image style={styles.imageStyle} source={require('../assets/image/TidesGuardLogo.png')} resizeMode="stretch" />
                </View>

                <View style={styles.view2}>
                    <Pressable
                        onPress={onPressHandlerInfo}
                        hitSlop={{ top: 10, bottom: 10, right: 10, left: 10 }}
                        android_ripple={{ color: "#00f" }}
                        style={({ pressed }) => [
                            { backgroundColor: pressed ? '#fff' : '#90e0ef' },
                            styles.button
                        ]}
                    >
                        <Text style={styles.buttonText} >
                            INFO
                        </Text>
                    </Pressable>
                    <Pressable
                        onPress={onPressHandler}
                        hitSlop={{ top: 10, bottom: 10, right: 10, left: 10 }}
                        android_ripple={{ color: "#00f" }}
                        style={({ pressed }) => [
                            { backgroundColor: pressed ? '#fff' : '#90e0ef' },
                            styles.button
                        ]}
                    >
                        <Text style={styles.buttonText} >
                            GET STARTED
                        </Text>
                    </Pressable>
                </View>

            </LinearGradient>

        </View>
    );
}

const styles = StyleSheet.create({
    body: {
        flex: 1,
        alignItems: 'stretch',
        justifycontent: 'center',
    },
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        width: 120,
        height: 40,
        borderRadius: 20,
        margin: 50,
        alignSelf: 'center'
    },
    sectionTitle: {
        fontSize: 70,
        fontFamily: 'Pacifico-Regular',
        color: '#0077b6',
        textAlign: 'center',
    },
    title1: {
        fontSize: 80,
        color: '#0077b6',
        textAlign: 'center',
        fontFamily: 'Pacifico-Regular',

    },
    buttonText: {
        fontSize: 12,
        fontWeight: 'bold',
        color: "#000"
    },
    linearGradient: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    descriptionBody: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    view1: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    view2: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    imageStyle: {
        height: 190,
        width: 190,
        borderRadius: 200
    }

});


export default Home;