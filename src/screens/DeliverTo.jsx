import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import ProgressBar from '../../components/ProgressBar';

const DeliverTo = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.deliveryText}>Enter Delivery Address</Text>
            <View style={styles.stepContent}>
                <Text style={styles.stepText}>Step 1: This is the content within step 1!</Text>
            </View>
            {/* <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.checkoutButton} >
                    <Text style={styles.checkoutButtonText}>Proceed</Text>
                </TouchableOpacity>
            </View> */}
        </View>
    )
}

export default DeliverTo;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8f8f8',
    },
    stepContent: {
        flex: 1,
        alignItems: 'center',
        width: "100%",
        justifyContent: 'center',
        paddingHorizontal: 20,
    },
    stepText: {
        fontSize: 18,
        textAlign: 'center',
        color: 'black',
    },
    deliveryText: {
        fontSize: 18,
        fontWeight: "bold",
        color: "black",
        padding: 5
    }

});
