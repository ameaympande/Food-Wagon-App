import React from 'react';
import { View, StyleSheet } from 'react-native';
import { RadioButton } from 'react-native-paper';

const styles = StyleSheet.create({
    radioButton: {
        flexDirection: 'row',
        alignItems: 'center',
        width: 30,
        height: 30
    },
});

const CustomRadioBtn = ({ selectedValue, setSelectedValue, handleRadioClick }) => {

    const toggleRadioButton = () => {
        const newValue = selectedValue === 'option1' ? 'option2' : 'option1';
        setSelectedValue(newValue);
        handleRadioClick();
    };

    return (
        <View style={styles.radioButton}>
            <RadioButton
                value="option1"
                status={selectedValue === 'option1' ? 'checked' : 'unchecked'}
                onPress={toggleRadioButton}
                color="orange"
            />
        </View>
    );
};

export default CustomRadioBtn;
