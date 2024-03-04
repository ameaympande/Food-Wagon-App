import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

export default function BottomNavigationBar() {
    return (
        <View style={styles.container}>
            <Text>BottomNavigationBar</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        borderWidth: 2,
    }
})