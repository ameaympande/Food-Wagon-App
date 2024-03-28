// ProgressBar.js

import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { ProgressSteps, ProgressStep } from 'react-native-progress-steps';
import { useDispatch, useSelector } from 'react-redux';
import { setProfile } from '../src/redux/features/profile/profileSlice';
import Toast from 'react-native-toast-message';
import DeliveryDetails from './DeliveryDetails';
import OrderSummary from './OrderSummary';
import PaymentDetails from './PaymentDetails';

const ProgressBar = () => {
    const profile = useSelector((state) => state.profile);
    const [selectedValue, setSelectedValue] = useState("option2");
    const dispatch = useDispatch();
    const [currentStep, setCurrentStep] = useState(0);
    const [form, setForm] = useState({
        name: "",
        address: "",
        city: "",
        phoneNumber: "",
        countryCode: "IN"
    });

    useEffect(() => {
        if (selectedValue === "option1" && profile) {
            setForm({
                name: profile.firstName + ' ' + profile.lastName,
                address: profile.address,
                city: profile.city,
                phoneNumber: profile.phoneNumber,
                countryCode: "IN"
            });
        } else {
            setForm({
                name: '',
                address: '',
                city: '',
                phoneNumber: '',
                countryCode: "IN"
            })
        }
    }, [selectedValue, profile]);

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
        if (!form.name || !form.address || !form.city || !form.phoneNumber || !profile) {
            Toast.show({
                type: 'error',
                text1: 'Please fill in all required fields or provide profile data.',
            });
            return;
        }
        dispatch(setProfile({
            firstName: form.name,
            address: form.address,
            city: form.city,
            phoneNumber: form.phoneNumber,
        }));
        setCurrentStep(currentStep + 1);
    };

    return (
        <View style={styles.container}>
            <ProgressSteps activeStep={currentStep} labelFontFamily="">
                <ProgressStep removeBtnRow={true}>
                    <DeliveryDetails
                        form={form}
                        setForm={setForm}
                        selectedValue={selectedValue}
                        setSelectedValue={setSelectedValue}
                        handleRadioClick={handleRadioClick}
                        handleNextStep={handleNextStep1}
                    />
                </ProgressStep>
                <ProgressStep removeBtnRow={true}>
                    <View style={styles.stepContent}>
                        <OrderSummary currentStep={currentStep} setCurrentStep={setCurrentStep} profile={profile} />
                    </View>
                </ProgressStep>
                <ProgressStep removeBtnRow={true}>
                    <View style={styles.stepContent}>
                        <PaymentDetails
                            form={form} setForm={setForm} selectedValue={selectedValue} setSelectedValue={setSelectedValue} handleRadioClick={handleRadioClick} profile={profile} />
                    </View>
                </ProgressStep>
            </ProgressSteps>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 20,
    },
    stepContent: {
        flex: 1,
        justifyContent: 'center',
    },
});

export default ProgressBar;
