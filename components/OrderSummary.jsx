import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useMemo, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import bg from "../src/public/bowl.png"

const OrderSummary = ({ currentStep, setCurrentStep, data }) => {
    const navigation = useNavigation();
    const [deliveryFee, setDeliveryFee] = useState(0);
    console.log(data);

    const subtotal = useMemo(() => {
        return data.reduce((acc, item) => {
            return acc + (item.quantity * item.price);
        }, 0);
    }, [data]);

    return (
        <>
            <View style={styles.ordercard}>
                <Text style={styles.orderText}>Order Details</Text>
                {data && data.map((item, index) => (
                    <View key={index}>
                        <View style={styles.itemcontainer}>
                            <View style={styles.descontainer}>
                                <Image source={{ uri: item.backgroundImage }} style={styles.image} />
                                <View style={{ marginLeft: 15, paddingTop: 5, gap: 5 }}>
                                    <Text style={styles.itemNameText}>{item.name}</Text>
                                    <Text style={styles.priceqtyText}>{item.price} X {item.quantity}</Text>
                                </View>
                            </View>
                            <View style={styles.pricecontainer}>
                                <Text style={styles.priceText}>₹ {item.price * item.quantity}</Text>
                            </View>
                        </View>
                        <View style={styles.breakline} />

                    </View>
                ))}
                <View style={styles.itemcontainer}>
                    <Text style={styles.priceTotalText}>Sub total :</Text>
                    <Text style={styles.priceTotalText}>₹ {subtotal}</Text>
                </View>
                <View style={[styles.itemcontainer, { paddingTop: 10 }]}>
                    <Text style={styles.priceTotalText}>Delivery fee :</Text>
                    <Text style={styles.priceTotalText}>₹ {deliveryFee}</Text>
                </View>
                <View style={[styles.itemcontainer, { paddingTop: 25 }]}>
                    <Text style={styles.priceText}>Amount Payable :</Text>
                    <Text style={styles.priceText}>₹ {subtotal + deliveryFee}</Text>
                </View>
            </View>

            <View style={[styles.ordercard, { marginTop: 10, padding: 15 }]} >
                <Text style={styles.priceText}>Delivery Address</Text>
                <View style={[styles.itemcontainer, { paddingTop: 10 }]}>
                    <Text style={styles.priceTotalText}>Delivery fee :</Text>
                    <Text style={styles.priceTotalText}>₹ {deliveryFee}</Text>
                </View>

            </View>


            <View style={styles.bottomCard}>
                <View style={styles.CheckoutContainer}>
                    <TouchableOpacity onPress={() => navigation.navigate("Cart")} style={styles.addItemButton} >
                        <Text style={styles.AddItemButtonText}>Edit Order</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.checkoutButton} onPress={() => setCurrentStep(currentStep + 1)}  >
                        <Text style={styles.checkoutButtonText}>Proceed to Checkout</Text>
                    </TouchableOpacity>

                </View>
            </View>
        </>
    )
}

export default OrderSummary

const styles = StyleSheet.create({
    ordercard: {
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
        padding: 10,
    },
    orderText: {
        fontSize: 15,
        color: "black",
        fontWeight: "bold"
    },
    itemcontainer: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-between",
        padding: 5,
        paddingTop: 20,
    },
    itemNameText: {
        fontSize: 14,
        color: "black",
    },
    priceqtyText: {
        fontSize: 16,
        color: "black",
        fontWeight: "bold"
    },
    priceTotalText: {
        fontSize: 16,
        color: "black",
        fontWeight: "400"

    },
    priceText: {
        fontSize: 18,
        color: "black",
        fontWeight: "bold"
    },
    descontainer: {
        flexDirection: "row",

    },
    image: {
        width: 50,
        height: 50,
        borderRadius: 8
    },
    pricecontainer: {
        flexDirection: "column-reverse"
    },
    breakline: {
        width: "100%",
        height: 2,
        backgroundColor: "grey",
    },


    bottomCard: {
        flex: 1,
        height: "27%",
        // marginTop: "105%",
        borderTopLeftRadius: 15,
        borderRadius: 12,
        // elevation: 2,
    },

    checkoutButton: {
        width: "75%",
        backgroundColor: 'orange',
        borderColor: "orange",
        borderWidth: 3,
        paddingHorizontal: 40,
        paddingVertical: 10,
        borderRadius: 50,
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.5,
        shadowRadius: 4,
        alignItems: 'center',
        justifyContent: 'center',
    },
    addItemButton: {
        width: "75%",
        backgroundColor: '#fff',
        borderColor: "orange",
        borderWidth: 3,
        paddingHorizontal: 40,
        paddingVertical: 10,
        borderRadius: 50,
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.5,
        shadowRadius: 4,
        alignItems: 'center',
        justifyContent: 'center',
    },
    AddItemButtonText: {
        color: 'orange',
        fontSize: 18,
        fontWeight: 'bold',
    },
    checkoutButtonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    CheckoutContainer: {
        marginTop: 18,
        alignItems: "center",
        gap: 10
    }
})