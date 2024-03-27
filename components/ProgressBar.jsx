import React, { useState } from 'react';
import { Text, View, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { ProgressSteps, ProgressStep } from 'react-native-progress-steps';
import CustomRadioBtn from './CustomRadioBtn';
import { useDispatch, useSelector } from 'react-redux';
import { setProfile } from '../src/redux/features/profile/profileSlice';
import CountryPicker from 'react-native-country-picker-modal'

const ProgressBar = () => {
    const profile = useSelector((state) => state.profile);
    const [selectedValue, setSelectedValue] = useState("option2")
    const dispatch = useDispatch();
    const [currentStep, setCurrentStep] = useState(0);
    const [form, setForm] = useState({
        name: "",
        address: "",
        city: "",
        phoneNumber: "",
        countryCode: "IN"
    });

    console.log("dispatched", selectedValue);
    const handleRadioClick = () => {
        if (profile) {
            setForm({
                name: profile.firstName + ' ' + profile.lastName,
                address: profile.address,
                city: profile.city,
                phoneNumber: profile.phoneNumber,
                countryCode: "IN"
            });
        }
    };
    const handleNextStep1 = () => {
        dispatch(setProfile({
            firstName: form.name,
            address: form.address,
            city: form.city,
            phoneNumber: form.phoneNumber,
        }));
        console.log("dispatched", profile);
        setCurrentStep(currentStep + 1);
        setForm({
            name: '',
            address: '',
            city: '',
            phoneNumber: '',
            countryCode: "IN"
        })
    };
    return (
        <View style={styles.container}>
            <ProgressSteps activeStep={currentStep} labelFontFamily="">
                <ProgressStep
                    label="Step 1"
                    removeBtnRow={true}

                >
                    <View style={styles.stepContent}>
                        <Text style={styles.deliveryText}>Enter Delivery Address</Text>
                        <View style={styles.labelContainer}>
                            <Text style={styles.labelText}>Name :</Text>
                            <TextInput style={styles.input} value={form.name} onChangeText={(text) => setForm({ ...form, name: text })} />
                        </View>
                        <View style={styles.labelContainer}>
                            <Text style={styles.labelText}>Address :</Text>
                            <TextInput style={styles.input} placeholder='' value={form.address} onChangeText={(text) => setForm({ ...form, address: text })} />
                        </View>
                        <View style={styles.labelContainer}>
                            <Text style={styles.labelText}>City :</Text>
                            <TextInput style={styles.input} placeholder='' value={form.city} onChangeText={(text) => setForm({ ...form, city: text })} />
                        </View>
                        <View style={styles.labelContainer}>
                            <Text style={styles.labelText}>Phone :</Text>
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
                            <TouchableOpacity onPress={handleNextStep1} style={styles.prceedBtn} >
                                <Text style={styles.buttonText}>Proceed</Text>
                            </TouchableOpacity>

                        </View>
                    </View>
                </ProgressStep>

                <ProgressStep
                    label="Step 2"
                    nextBtnTextStyle={styles.buttonText}
                    nextBtnStyle={styles.button}
                    previousBtnStyle={styles.previousBtnStyle}
                    previousBtnTextStyle={styles.buttonText}
                >
                    <View style={styles.stepContent}>
                        <Text style={styles.stepText}>This is the content within step 2!</Text>
                    </View>
                </ProgressStep>
                <ProgressStep
                    label="Step 3"
                    nextBtnTextStyle={styles.buttonText}
                    nextBtnStyle={styles.button}
                    previousBtnStyle={styles.previousBtnStyle}
                    previousBtnTextStyle={styles.buttonText}
                >
                    <View style={styles.stepContent}>
                        <View style={styles.inputContainer}>
                            <Text style={styles.stepText}></Text>
                        </View>
                    </View>
                </ProgressStep>
            </ProgressSteps>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 20,
    },
    stepContent: {
        flex: 1,
        justifyContent: 'center',
    },
    stepText: {
        fontSize: 18,
        textAlign: 'center',
        color: 'black',
    },
    btncontainer: {
        justifyContent: "center"
    },
    button: {
        width: "75%",
        backgroundColor: "orange",
        paddingHorizontal: 40,
        paddingVertical: 12,
        borderRadius: 50,
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.5,
        shadowRadius: 4,
        alignItems: 'center',
        justifyContent: 'center',

    },
    previousBtnStyle: {
        backgroundColor: 'orange',
        paddingHorizontal: 20,
        paddingVertical: 12,
        borderRadius: 50,
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.5,
        shadowRadius: 4,
        alignItems: 'center',
        justifyContent: 'center',

    },
    buttonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
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

    breakline: {
        marginTop: "10%",
        width: "50%",
        height: 1,
        backgroundColor: "grey",

    },
    breakLineContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        marginTop: 15,
        marginBottom: 15,
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
    }

});

export default ProgressBar;
