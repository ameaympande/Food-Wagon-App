import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Navbar from '../../components/Navbar'
import { useNavigation } from '@react-navigation/native'

export default function Cart() {
    const navigate = useNavigation();
    return (
        <View>
            <Navbar styles={styles.navbar} firstIconName="arrowleft" lastIconName="questioncircleo" labelName="Your Order" leftHandle={() => navigate.goBack()} />
        </View>
    )
}

const styles = StyleSheet.create({
    navbar: {
        fontFamily: "Poppins-Regular"
    }
})