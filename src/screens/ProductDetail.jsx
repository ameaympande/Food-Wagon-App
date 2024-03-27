import { Image, ScrollView, StyleSheet, Text, View, Button, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import Navbar from '../../components/Navbar';
import StarRating from '../../components/StartRating';
import { useNavigation } from '@react-navigation/native';
import { decrementCartItem, setCartItems } from '../redux/features/profile/profileSlice';
import { useDispatch, useSelector } from 'react-redux';
import Toast from 'react-native-toast-message';

export default function ProductDetail({ route }) {
    const profile = useSelector((state) => state.profile);
    const cartItems = profile.cartItems;
    const dispatch = useDispatch()
    const navigation = useNavigation()
    const { item } = route.params;
    const [count, setCount] = useState(0);

    useEffect(() => {
        const filterItem = cartItems.find((rec) => item._id === rec._id)
        console.log("filterItem", filterItem);
        console.log("cartItems", cartItems);
        if (filterItem) setCount(filterItem.quantity)
    }, [cartItems])

    const handleIncrement = () => {
        setCount(prevCount => prevCount + 1);
        dispatch(setCartItems(item))
        Toast.show({
            type: 'success',
            text1: 'Item added to Cart',
        });
    };

    const handleDecrement = () => {
        if (count <= 0) return;
        setCount(prevCount => prevCount - 1);
        dispatch(decrementCartItem(item._id))
    };


    return (
        <View style={{ flex: 1 }}>
            <ScrollView alwaysBounceVertical={true} automaticallyAdjustKeyboardInsets={true} keyboardDismissMode="on-drag">
                <Navbar styles={styles.navbar} firstIconName="arrowleft" lastIconName="questioncircleo" labelName="  " leftHandle={() => navigation.goBack()} />
                <View style={styles.breakline} />
                <View style={styles.imgContainer}>
                    <Image source={{ uri: item.backgroundImage }} style={styles.image} />
                </View>
                <View style={styles.productInfoContainer}>
                    <Text style={styles.mainLabel}>{item.name}</Text>
                    <View style={{ marginLeft: 20 }}>
                        <StarRating rating={3.5} style={styles.starRating} />
                    </View>
                </View>
                <View style={styles.container}>
                    <Text style={styles.priceLabel}>₹ {item.price}</Text>
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity style={styles.button} onPress={handleDecrement}>
                            <Text style={styles.buttonText}>-</Text>
                        </TouchableOpacity>
                        <Text style={styles.text}>{count}</Text>
                        <TouchableOpacity style={styles.button} onPress={handleIncrement}>
                            <Text style={styles.buttonText}>+</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.descriptionContainer}>
                    <Text style={styles.descriptionLabel}>Description</Text>
                    <Text style={styles.descriptionBody}>{item.description}</Text>
                </View>
            </ScrollView>
            {count > 0 && (
                <TouchableOpacity onPress={() => navigation.navigate("Cart")} style={styles.checkoutButton}>
                    <Text style={styles.checkoutButtonText}>Go to Cart</Text>
                </TouchableOpacity>
            )}
        </View>
    );

}

const styles = StyleSheet.create({
    breakline: {
        width: "150%",
        height: 3,
        backgroundColor: "grey"
    },
    imgContainer: {
        // height: 250,
    },
    image: {
        marginTop: 3,
        height: 300,
    },
    productInfoContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 15,
        marginLeft: 10,
    },
    mainLabel: {
        fontFamily: "Poppins-bold",
        fontSize: 26,
        fontWeight: "bold",
        color: "black"
    },
    priceLabel: {
        marginLeft: 25,
        fontFamily: "Poppins-bold",
        fontSize: 26,
        fontWeight: "bold",
        color: "black"
    },
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: "space-between",
        marginVertical: 20,
    },
    buttonContainer: {
        paddingVertical: 5,
        flexDirection: "row",
        marginRight: 10,
        backgroundColor: "orange",
        borderRadius: 15
    },
    button: {
        backgroundColor: "orange",
        padding: 5,
        borderRadius: 5,
        marginHorizontal: 10,
    },
    buttonText: {
        fontSize: 20,
        fontWeight: 'bold',

    },
    text: {
        fontSize: 24,
        marginHorizontal: 20,
        color: "white"
    },
    descriptionLabel: {
        marginLeft: 25,
        fontFamily: "Poppins-bold",
        fontSize: 20,
        fontWeight: "bold",
        color: "black"
    },
    descriptionBody: {
        marginTop: 10,
        marginLeft: 25,
        fontFamily: "Poppins-bold",
        fontSize: 16,
        fontWeight: "bold",
        color: "black"
    },
    checkoutContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 0,
    },
    checkoutButton: {
        marginHorizontal: "15%",
        marginBottom: 20,
        backgroundColor: "orange",
        paddingHorizontal: 10,
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
    checkoutButtonText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'white',
    },
});
