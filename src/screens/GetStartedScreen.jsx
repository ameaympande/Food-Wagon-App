import { ImageBackground, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect } from 'react'
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from "@react-native-async-storage/async-storage";
import bg from "../public/homebg.jpg";

const GetStartedScreen = () => {
    const navigation = useNavigation();

    // useEffect(() => {
    //     checkFirstTime()
    // }, [])

    // const checkFirstTime = async () => {
    //     const firstTime = await AsyncStorage.getItem('firstTime');
    //     if (firstTime === "false") {
    //         navigation.replace('Login');
    //     }
    // }

    const handleGetStarted = async () => {
        try {
            await AsyncStorage.setItem('firstTime', "false");
            navigation.replace('Login');
        } catch (error) {
            console.error('Error setting firstTime flag:', error);
        }
    };

    return (
        <SafeAreaView style={styles.maincontainer}>
            <ImageBackground source={bg} style={styles.background}>
                <View style={styles.overlay} >
                    <Text style={styles.mainlabel}>FoodWagon</Text>
                    <Text style={styles.secondarylabel}>Within a few clicks, find meals that are accessible near you.</Text>
                    <TouchableOpacity style={styles.loginButton} onPress={handleGetStarted} >
                        <Text style={styles.loginButtonText}>Get Started</Text>
                    </TouchableOpacity>
                </View>
            </ImageBackground>
        </SafeAreaView>
    );
};

export default GetStartedScreen;

const styles = StyleSheet.create({
    maincontainer: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#ECF0F1',

    },
    background: {
        flex: 1,
        resizeMode: "cover",
        justifyContent: "center",
        alignItems: "center",

    },
    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        justifyContent: 'center',
        alignItems: "center",
        padding: 20,
    },
    mainlabel: {
        color: "white",
        fontWeight: "bold",
        marginBottom: 20,
        marginTop: 180,
        letterSpacing: 8,
        fontSize: 50,
        textAlign: 'center',
    },
    secondarylabel: {
        color: "white",
        fontWeight: "bold",
        marginBottom: 30,
        fontSize: 22,
        textAlign: 'center',
    },
    loginButton: {
        backgroundColor: "#fa6a41",
        backgroundColor: "red",
        padding: 15,
        borderRadius: 15,
        width: "70%",
        alignItems: "center"
    },
    loginButtonText: {
        fontSize: 18,
        color: "#fff",
        fontWeight: "bold"
    },
});
