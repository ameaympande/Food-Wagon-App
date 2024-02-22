import { SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { getData } from '../helper/getData';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Navbar from '../../components/Navbar';

const HomeScreen = () => {
    return (
        <SafeAreaView>
            <Navbar firstIconName="menu" lastIconName="shopping-cart" />
        </SafeAreaView>
    )
}

export default HomeScreen

const styles = StyleSheet.create({})