import React, { useState } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    Button,
    TouchableOpacity,
    ScrollView,
} from 'react-native';
import { useNavigation, } from '@react-navigation/native'
import { LinearGradient } from 'expo-linear-gradient';
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
        <View style={styles.container}>
            <LinearGradient
                colors={['#ECEEA1', '#48AF7E', '#2EACB4', '#2EA7EB']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.linearGradient}
            >
                <ScrollView showsVerticalScrollIndicator={false}>     
                <Image style= {styles.imageStyle} source = {require('../assets/image/TidesGuardLogo.png')} resizeMode = "contain" />

                <TouchableOpacity style={styles.dropdown} onPress={toggleDropdown}>
                    <Text style={styles.dropdownTitle}>What is a Red Tide?</Text>
                </TouchableOpacity>
                {isOpen && <Text style={styles.dropdownContent}>Karenia brevis is a naturally occurring, single-celled organism belonging to a group of algae called dinoflagellates. 
                Large concentrations can discolor water red to brown, causing blooms to be called "red tides.
                Karenia brevis occurs in marine and estuarine waters of Florida and typically blooms in the late summer or early fall. The dinoflagellates produce a toxin that can be fatal to fish, shellfish, birds and manatees.
                 Most of the time with red tide, the most obvious evidence tends to be massive amounts of fish and other life washing up on shore dead.
                </Text>}

                <TouchableOpacity style={styles.dropdown} onPress={toggleDropdown2}>
                    <Text style={styles.dropdownTitle}>What causes Red Tide?</Text>
                </TouchableOpacity>
                {isOpen2 && <Text style={styles.dropdownContent}>Red tide is caused by a combination of environmental factors, including warm water temperatures, high nutrient levels, and calm seas.
                 These conditions can allow the algae to reproduce and thrive, leading to a bloom.</Text>}

                <TouchableOpacity style={styles.dropdown} onPress={toggleDropdown3}>
                    <Text style={styles.dropdownTitle}>Can Red Tide be prevented or controlled?</Text>
                </TouchableOpacity>
                {isOpen3 && <Text style={styles.dropdownContent}>Red tide cannot be prevented or controlled, but monitoring and early warning systems can help to minimize its impact.
                 Additionally, reducing nutrient pollution from human activities such as agriculture and sewage discharge can help to reduce the frequency and severity of harmful algal blooms.</Text>}

                <TouchableOpacity style={styles.dropdown} onPress={toggleDropdown4}>
                    <Text style={styles.dropdownTitle}>How does Red Tide affect humans?</Text>
                </TouchableOpacity>
                {isOpen4 && <Text style={styles.dropdownContent}>Red tide can cause respiratory irritation in humans who inhale the toxins produced by the algae. 
                This can lead to symptoms such as coughing, sneezing, and wheezing, and can be particularly harmful for people with asthma or other respiratory conditions. 
                Ingesting shellfish contaminated with red tide toxins can also cause gastrointestinal illness.</Text>}

                <Button style={styles.button} onPress={navigation.goBack} title='Go Back' color = "#d4a373"/> 
                </ScrollView>

            </LinearGradient>
            
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    linearGradient: {
        flex: 1,
        padding: 20,
        alignItems: 'center',
    },
    imageStyle: {
        height: 140,
        width: 140,
        borderRadius: 70,
        marginBottom: 30,
    },
    dropdown: {
        width: '100%',
        padding: 10,
        backgroundColor: '#ffffffaa',
        borderRadius: 10,
        marginBottom: 10,
    },
    dropdownTitle: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    dropdownContent: {
        fontSize: 14,
        color: "#000",
        marginBottom: 10,
        marginTop: -10,
        padding: 10,
        backgroundColor: '#ffffffaa',
        borderRadius: 10,
    },
    button: {
        marginTop: 20,
    },
});

export default Info;
