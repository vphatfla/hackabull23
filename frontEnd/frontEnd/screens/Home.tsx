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
} from 'react-native';
import { useNavigation } from '@react-navigation/native'
import LinearGradient from 'react-native-linear-gradient';
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { HomeTabParamList } from '../props/RootStackParam';
import useLocation from '../useLocation';

type mainScreenProp = NativeStackScreenProps<HomeTabParamList, 'Home'>;
function Home() {
    const {
        requestPermission
    } = useLocation();
    const navigation = useNavigation<mainScreenProp['navigation']>();

    const onPressHandler = () => {
        requestPermission(isGranted => {
            if (isGranted) {
                navigation.navigate('Main');
            }
        })

    }
    return (
        <View style={styles.body}>
            <LinearGradient
                colors={['#ECEEA1', '#48AF7E', '#2EACB4', '#2EA7EB']}
                start={{ x: 0, y: 0 }}
                end={{ x: 0, y: 1 }}
                style={styles.linearGradient}
            >
                <Text style={styles.sectionTitle}> Red </Text>
                <Text style={styles.title1}>
                    push
                </Text>
                <View style={styles.view1}>
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
        fontSize: 100,
        fontFamily: 'Pacifico-Regular',
        color: '#E63946',
        textAlign: 'center',
    },
    title1: {
        fontSize: 100,
        color: '#E63946',
        textAlign: 'center',
        fontFamily: 'Aclonica-Regular'
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
        justifyContent: 'flex-end',
    },

});


export default Home;
