import React, { useState } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    Button,
    TouchableWithoutFeedback
} from 'react-native';
import { useNavigation, } from '@react-navigation/native'
import LinearGradient from 'react-native-linear-gradient';
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { HomeTabParamList } from '../props/RootStackParam';

type mainScreenProp = NativeStackScreenProps<HomeTabParamList, 'Info'>;

function Info() {
    const navigation = useNavigation<mainScreenProp['navigation']>()
    const [isOpen, setIsOpen] = useState(false);
    const [isOpen2, setIsOpen2] = useState(false);
    const [isOpen3, setIsOpen3] = useState(false);
    const [isOpen4, setIsOpen4] = useState(false);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };
    const toggleDropdown2 = () => {
        setIsOpen2(!isOpen2);
    };
    const toggleDropdown3 = () => {
        setIsOpen3(!isOpen3);
    };
    const toggleDropdown4 = () => {
        setIsOpen4(!isOpen4);
    };
    return (
        <View style={styles.body}>
            <LinearGradient
                colors={['#ECEEA1', '#48AF7E', '#2EACB4', '#2EA7EB']}
                start={{ x: 0, y: 0 }}
                end={{ x: 0, y: 1 }}
                style={styles.linearGradient}
            >
                <Image style= {styles.imageStyle} source = {require('../assets/image/TidesGuardLogo.png')} resizeMode = "stretch" />
                <TouchableWithoutFeedback
                    onPress={toggleDropdown}
                >
                    <View style={styles.dropDownStyle}>
                        <Text style={styles.buttonText}>What is a Red Tide? *TAP HERE*</Text>
                    </View>
                </TouchableWithoutFeedback>
                {isOpen && (
                    <View style={styles.descriptionBody}>
                        <Text style={styles.text}>{`Karenia brevis is a naturally occurring, single-celled organism belonging to a group of algae called dinoflagellates. Large concentrations can discolor water red to brown, causing blooms to be called "red tides."
                        
            Karenia brevis occurs in marine and estuarine waters of Florida and typically blooms in the late summer or early fall. The dinoflagellates produce a toxin that can be fatal to fish, shellfish, birds and manatees. Most of the time with red tide, the most obvious evidence tends to be massive amounts of fish and other life washing up on shore dead.`}</Text>
                    </View>)}
                <TouchableWithoutFeedback
                    onPress={toggleDropdown2}
                >
                    <View style={styles.dropDownStyle}>
                        <Text style={styles.buttonText}>What causes Red Tide?</Text>
                    </View>
                </TouchableWithoutFeedback>
                {isOpen2 && (
                    <View style={styles.descriptionBody}>
                        <Text style={styles.text}>{`Red tide is caused by a combination of environmental factors, including warm water temperatures, high nutrient levels, and calm seas. These conditions can allow the algae to reproduce and thrive, leading to a bloom.`}</Text>
                    </View>)}
                <TouchableWithoutFeedback
                    onPress={toggleDropdown3}
                >
                    <View style={styles.dropDownStyle}>
                        <Text style={styles.buttonText}>Can Red Tide be prevented or controlled?</Text>
                    </View>
                </TouchableWithoutFeedback>
                {isOpen3 && (
                    <View style={styles.descriptionBody}>
                        <Text style={styles.text}>{` Red tide cannot be prevented or controlled, but monitoring and early warning systems can help to minimize its impact. Additionally, reducing nutrient pollution from human activities such as agriculture and sewage discharge can help to reduce the frequency and severity of harmful algal blooms.`}</Text>
                    </View>)}
                <TouchableWithoutFeedback
                    onPress={toggleDropdown4}
                >
                    <View style={styles.dropDownStyle}>
                        <Text style={styles.buttonText}>How does Red Tide affect humans?</Text>
                    </View>
                </TouchableWithoutFeedback>
                {isOpen4 && (
                    <View style={styles.descriptionBody}>
                        <Text style={styles.text}>{`Red tide can cause respiratory irritation in humans who inhale the toxins produced by the algae. This can lead to symptoms such as coughing, sneezing, and wheezing, and can be particularly harmful for people with asthma or other respiratory conditions. Ingesting shellfish contaminated with red tide toxins can also cause gastrointestinal illness.`}</Text>
                    </View>)}

            <Button onPress={navigation.goBack} title='Go Back'color = {"#d4a373"}/> 
            </LinearGradient>
        </View>
    )

};
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
    text: {
        fontSize: 14,
        color: "#fff",
        textAlign: 'center',
        margin: 10,
    },
    descriptionBody: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    title1: {
        fontSize: 80,
        color: '#0077b6',
        textAlign: 'center',
        fontFamily: 'Pacifico-Regular',

    },
    buttonText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: "#000"
    },
    linearGradient: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    view1: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-end',
    },
    imageStyle: {
        height: 140,
        width: 140,
        borderRadius: 100,
        marginBottom: 50,
    },
    dropDownStyle: {
        backgroundColor: "#fff",
        margin: 10,
        padding: 5,
    },

});
export default Info