import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { getData } from '../helper/getData';
import AsyncStorage from '@react-native-async-storage/async-storage';

const HomeScreen = () => {

    useEffect(() => {
        const getAData = async () => {
            try {
                const token = await AsyncStorage.getItem("token")
            } catch (error) {
                console.log(error);
            }
        }
        getAData();

    }, [])

    return (
        <View>
            <Text>HomeScreen</Text>
        </View>
    )
}

export default HomeScreen

const styles = StyleSheet.create({})