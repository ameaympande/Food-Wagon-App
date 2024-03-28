import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet, TextInput, TouchableOpacity, Image } from 'react-native';
import CustomRadioBtn from './CustomRadioBtn';
import { RadioButton } from 'react-native-paper';
import DatePicker from '@react-native-community/datetimepicker';
import Toast from 'react-native-toast-message';

const PaymentDetails = () => {
    const [open, setOpen] = useState(false)
    const [form, setForm] = useState({
        option: "",
        cardNumber: "",
        NameOnCard: "",
        expDate: new Date(),
        cvv: "",
    });
    const [payDelivery, setPayDelivery] = useState("option2");

    useEffect(() => {

        if (payDelivery === "option1") {
            setForm({
                option: "",
                cardNumber: "",
                NameOnCard: "",
                expDate: new Date(),
                cvv: "",

            });
        }
    }, [payDelivery])

    const handleOrderClick = async () => {
        console.log(form);
        if (payDelivery === "option2") {
            if (!form.option || !form.cardNumber || !form.cardNumber.length === 19 || !form.NameOnCard || !form.expDate || !form.cvv) {
                Toast.show({
                    type: "error",
                    text1: "Please Fill all the Details"
                });
            }
        } else {

        }

    }

    const toggleRadioButton = (option) => {
        const newOption = form.option === option ? "" : option;
        console.log(newOption);
        setForm({ ...form, option: newOption });
    };

    const onChangeDate = (event, selectedDate) => {
        const currentDate = selectedDate || form.expDate;
        setOpen(false);

    };

    const formatCardNumber = (text) => {
        let formattedText = text.replace(/\D/g, '');
        const groups = formattedText.match(/.{1,4}/g);

        if (groups) {
            formattedText = groups.join('-');
        }
        setForm({ ...form, cardNumber: formattedText });
    };


    return (
        <View style={styles.stepContent}>
            <Text style={styles.deliveryText}>Choose your payment method </Text>
            <View style={styles.ordercard}>
                <View style={styles.labelContainer}>
                    <View style={styles.paymentcontainer}>
                        <RadioButton
                            value="visa"
                            status={form.option === 'visa' ? 'checked' : 'unchecked'}
                            onPress={() => toggleRadioButton("visa")}
                            color="orange"
                        />
                        <Image source={{ uri: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/Old_Visa_Logo.svg/2560px-Old_Visa_Logo.svg.png" }} style={styles.image} />
                    </View>
                    <View style={styles.paymentcontainer}>
                        <RadioButton
                            value="mastercard"
                            status={form.option === 'mastercard' ? 'checked' : 'unchecked'}
                            onPress={() => toggleRadioButton("mastercard")}
                            color="orange"
                        />
                        <Image source={{ uri: "https://pngimg.com/uploads/mastercard/mastercard_PNG23.png" }} style={styles.image} />
                    </View>
                    <View style={styles.paymentcontainer}>
                        <RadioButton
                            value="paypal"
                            status={form.option === 'paypal' ? 'checked' : 'unchecked'}
                            onPress={() => toggleRadioButton("paypal")}
                            color="orange"
                        />
                        <Image source={{ uri: "https://w7.pngwing.com/pngs/294/895/png-transparent-donation-logo-pinballz-paypal-paypal-icon-blue-donation-logo-thumbnail.png" }} style={styles.image} />
                    </View>
                </View>
                <View style={styles.cardcontainer}>
                    <Text style={styles.labelText}>CARD NUMBER</Text>
                    <TextInput style={styles.input} maxLength={19} placeholder='' value={form.cardNumber} onChangeText={formatCardNumber} />
                </View>
                <View style={styles.cardcontainer}>
                    <Text style={styles.labelText}>NAME ON CARD</Text>
                    <TextInput style={styles.input} placeholder='' value={form.NameOnCard} onChangeText={(text) => setForm({ ...form, NameOnCard: text })} />
                </View>
                <View style={styles.expiraycontainer}>
                    <View>
                        <Text style={styles.labelText}>EXPIRY DATE</Text>
                        <TouchableOpacity onPress={() => setOpen(true)}>
                            <TextInput
                                style={[styles.input, { width: "120%" }]}
                                editable={false}
                                value={form.expDate.toDateString()}
                            />
                        </TouchableOpacity>
                        {open && (
                            <DatePicker
                                mode="date"
                                value={form.expDate}
                                onChange={onChangeDate}
                                style={{ color: 'black' }}
                            />
                        )}
                    </View>
                    <View>
                        <Text style={styles.labelText}>SECURITY CODE</Text>
                        <TextInput
                            maxLength={3}
                            style={[styles.input, { width: "100%" }]}
                            value={form.cvv}
                            onChangeText={(text) => setForm({ ...form, cvv: text })}
                        />
                    </View>
                </View>

            </View>

            <View style={styles.breakLineContainer}>
                <View style={styles.breakline} />
                <Text style={styles.breaklineText}>OR</Text>
                <View style={styles.breakline} />
            </View>
            <View style={styles.profilecontainer}>
                <View>
                    <Text style={styles.profileText}>Pay on delivery</Text>
                    <Text style={styles.deliveryPosText}>(Pay with cash or POS on delivery)</Text>

                </View>
                <CustomRadioBtn
                    selectedValue={payDelivery}
                    setSelectedValue={setPayDelivery}

                />
            </View>

            <View style={styles.proceedContainer}>
                <TouchableOpacity style={styles.prceedBtn} onPress={handleOrderClick} >
                    <Text style={styles.buttonText}>Complete Order</Text>
                </TouchableOpacity>
            </View>
        </View >

    );
};

const styles = StyleSheet.create({
    ordercard: {
        backgroundColor: '#fff',
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        padding: 10,
    },
    stepContent: {
        flex: 1,
    },
    image: {
        width: 70,
        height: 50,
        borderRadius: 8
    },
    deliveryText: {
        padding: 10,
        fontSize: 18,
        fontWeight: "800",
        color: "black",
    },
    labelContainer: {
        flexDirection: 'row',
        paddingTop: 10,
        justifyContent: "space-evenly"
    },
    cardcontainer: {
        paddingTop: 10,
        paddingHorizontal: 10,
        justifyContent: "space-evenly"
    },
    expiraycontainer: {
        gap: 50,
        flexDirection: 'row',
        paddingTop: 10,
        paddingHorizontal: 10,
    },
    paymentcontainer: {
        flexDirection: "row",
        gap: 10,
        alignItems: 'center',

    },
    labelText: {
        fontSize: 18,
        color: "black",
        fontWeight: "400",
        paddingRight: 10,
    },
    deliveryPosText: {
        fontSize: 14,
        paddingRight: 10,
    },
    input: {
        marginTop: 3,
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
        marginTop: "30%",
        alignItems: "center",
        gap: 10
    },
    buttonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default PaymentDetails;
