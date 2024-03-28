// DeliveryDetails.js

import React from 'react';
import { Text, View, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import CountryPicker from 'react-native-country-picker-modal';
import CustomRadioBtn from './CustomRadioBtn';

const DeliveryDetails = ({ form, setForm, selectedValue, setSelectedValue, handleRadioClick, handleNextStep }) => {
    return (
        <View style={styles.stepContent}>
            <Text style={styles.deliveryText}>Enter Delivery Address</Text>
            <View style={styles.labelContainer}>
                <Text style={styles.labelText}>Name* :</Text>
                <TextInput style={styles.input} value={form.name} onChangeText={(text) => setForm({ ...form, name: text })} />
            </View>
            <View style={styles.labelContainer}>
                <Text style={styles.labelText}>Address* :</Text>
                <TextInput style={styles.input} placeholder='' value={form.address} onChangeText={(text) => setForm({ ...form, address: text })} />
            </View>
            <View style={styles.labelContainer}>
                <Text style={styles.labelText}>City* :</Text>
                <TextInput style={styles.input} placeholder='' value={form.city} onChangeText={(text) => setForm({ ...form, city: text })} />
            </View>
            <View style={styles.labelContainer}>
                <Text style={styles.labelText}>Phone* :</Text>
                <View style={styles.phoneInputContainer}>
                    <CountryPicker
                        countryCode={form.countryCode}
                        onSelect={(country) => setForm({ ...form, countryCode: country.cca2 })}
                    />
                    <TextInput
                        style={styles.input}
                        value={form.phoneNumber}
                        onChangeText={(text) => setForm({ ...form, phoneNumber: text })}
                    />
                </View>
            </View>

            <View style={styles.breakLineContainer}>
                <View style={styles.breakline} />
                <Text style={styles.breaklineText}>OR</Text>
                <View style={styles.breakline} />
            </View>
            <View style={styles.profilecontainer}>
                <Text style={styles.profileText}>Use my Profile Details</Text>
                <CustomRadioBtn
                    selectedValue={selectedValue}
                    setSelectedValue={setSelectedValue}
                    handleRadioClick={handleRadioClick}
                />
            </View>

            <View style={styles.proceedContainer}>
                <TouchableOpacity onPress={handleNextStep} style={styles.prceedBtn} >
                    <Text style={styles.buttonText}>Proceed</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    stepContent: {
        flex: 1,
        justifyContent: 'center',
    },
    deliveryText: {
        padding: 10,
        fontSize: 20,
        fontWeight: "800",
        color: "black",
    },
    labelContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        paddingTop: 15,
        marginBottom: 10,
        paddingHorizontal: 10,
    },
    labelText: {
        fontSize: 18,
        color: "black",
        fontWeight: "500",
        paddingRight: 10,
    },
    input: {
        justifyContent: "flex-end",
        width: 250,
        height: 40,
        borderWidth: 1,
        borderRadius: 10,
        paddingHorizontal: 10,
        backgroundColor: 'white',
        fontSize: 16,
        fontWeight: "bold"
    },
    breakLineContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        marginTop: 15,
        marginBottom: 15,
    },
    breakline: {
        marginTop: "10%",
        width: "50%",
        height: 1,
        backgroundColor: "grey",
    },
    breaklineText: {
        marginTop: "10%",
        paddingHorizontal: 10,
        fontSize: 20,
        color: "black",
        fontWeight: "bold"
    },
    profilecontainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 20,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        margin: 10,
    },
    profileText: {
        paddingHorizontal: 10,
        fontSize: 16,
        color: "black",
        fontWeight: "bold"
    },
    prceedBtn: {
        width: "75%",
        backgroundColor: "orange",
        paddingHorizontal: 40,
        paddingVertical: 12,
        borderRadius: 50,
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 2, height: 2 },
        shadowOpacity: 0.5,
        shadowRadius: 4,
        alignItems: 'center',
        justifyContent: 'center',
    },
    proceedContainer: {
        marginTop: "40%",
        alignItems: "center",
        gap: 10
    },
    phoneInputContainer: {
        flexDirection: "row"
    },
    buttonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default DeliveryDetails;
