import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity, Image, ScrollView } from 'react-native';
import Navbar from '../../components/Navbar';
import Icon from 'react-native-vector-icons/Entypo';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { replaceCartItems, setCartItems } from '../redux/features/profile/profileSlice';

export default function Cart() {
    const profile = useSelector((state) => state.profile);
    const cartItems = profile.cartItems;
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const [totalPrice, setTotalPrice] = useState(0);

    useEffect(() => {
        const totalPrice = cartItems.reduce((accumulator, item) => {
            return accumulator += item.price
        }, 0);
        setTotalPrice(totalPrice)

    }, [handleIncrement, handleDecrement, handleDelete])

    console.log(cartItems);
    const handleDelete = (currentItem) => {
        console.log(currentItem);
        const updatedCartItems = cartItems.filter(item => item._id !== currentItem._id);
        dispatch(replaceCartItems(updatedCartItems));

    }

    const handleIncrement = (item) => {
        dispatch(setCartItems(item))
    };

    const handleDecrement = (item) => {
        dispatch(setCartItems(item));

    };

    const renderItem = ({ item }) => (
        <ScrollView>
            <View style={styles.card}>
                <Image source={{ uri: item.backgroundImage }} style={styles.image} />
                <Text style={styles.itemName}>{item.name}</Text>
                <View style={styles.innercontainer}>
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity style={styles.button} onPress={() => handleDecrement(item)}>
                            <Text style={styles.buttonText}>-</Text>
                        </TouchableOpacity>
                        <Text style={styles.text}>{item.quantity}</Text>
                        <TouchableOpacity style={styles.button} onPress={() => handleIncrement(item)}>
                            <Text style={styles.buttonText}>+</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <Text style={styles.cardPrice}>₹ {item.price}</Text>
                <Text onPress={() => handleDelete(item)} style={styles.delete}>
                    <Icon name="cross" size={24} style={styles.icon} />
                </Text>
            </View>
        </ScrollView>
    );

    return (
        <View style={styles.container}>
            <Navbar styles={styles.navbar} firstIconName="arrowleft" lastIconName="questioncircleo" labelName="Your Order" leftHandle={() => navigation.goBack()} />
            <FlatList
                data={cartItems}
                renderItem={renderItem}
                keyExtractor={item => item._id}
                contentContainerStyle={styles.listContainer}
            />
            <View style={[styles.bottomCard, { height: cartItems.length ? "27%" : "15%" }]}>
                {cartItems.length > 0 &&
                    <>
                        <View style={styles.priceContainer}>
                            <Text style={styles.totalPrice}>Total Price</Text>
                            <Text style={styles.itemPrice}>₹  {totalPrice}</Text>
                        </View>
                        <View style={styles.infoContainer}>
                            <Text style={styles.infoText}>( Delivery fee not included ) </Text>
                        </View>
                    </>
                }
                <View style={styles.CheckoutContainer}>
                    <TouchableOpacity onPress={() => navigation.navigate("BottomTabNavigator")} style={styles.addItemButton} >
                        <Text style={styles.AddItemButtonText}>Add Items</Text>
                    </TouchableOpacity>
                    {cartItems.length > 0 &&
                        <TouchableOpacity onPress={() => {/* Handle checkout */ }} style={styles.checkoutButton} >
                            <Text style={styles.checkoutButtonText}>Checkout</Text>
                        </TouchableOpacity>
                    }
                </View>
            </View>

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8f8f8',
    },
    navbar: {
        fontFamily: 'Poppins-Regular',
    },
    listContainer: {
        gap: 10,
        paddingHorizontal: 14,
        paddingBottom: 80,
        // backgroundColor: "#F0E68C",
    },
    card: {
        flex: 1,
        alignItems: "center",
        height: 110,
        flexDirection: 'row',
        justifyContent: "space-between",
        backgroundColor: '#fff',
        borderRadius: 10,
        elevation: 5,
        position: 'relative',
        padding: 5
    },
    image: {
        width: 70,
        height: 70,
        borderRadius: 8
    },
    cardContent: {
        flex: 1,
        padding: 12,
    },
    itemName: {
        fontFamily: "Baloo Bhaijaan 2",
        fontSize: 20,
        fontWeight: 'bold',
        color: '#333',
    },
    itemPrice: {
        paddingTop: 10,
        fontWeight: 'bold',
        fontSize: 20,
        color: 'black',
    },
    cardPrice: {
        marginRight: 25,
        fontWeight: 'bold',
        fontSize: 20,
        color: 'black',
    },
    infoContainer: {

        flexDirection: "row-reverse"
    },
    infoText: {
        fontSize: 16,
        color: 'grey',
    },
    totalPrice: {
        paddingTop: 10,
        fontWeight: 'bold',
        fontSize: 18,
        color: 'black',
    },
    delete: {
        position: 'absolute',
        right: 5,
        top: 0,
        backgroundColor: 'rgba(255,255,255,0.7)',
        paddingTop: 5
    },
    icon: {
        color: 'red',
    },
    checkoutButton: {
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
    innercontainercontainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: "space-between",
    },
    buttonContainer: {
        flexDirection: "row",
        backgroundColor: "orange",
        borderRadius: 15
    },
    button: {
        backgroundColor: "orange",
        paddingHorizontal: 6,
        paddingVertical: 2,
        borderRadius: 15,
    },
    buttonText: {
        fontSize: 20,
        fontWeight: 'bold',

    },
    text: {
        fontSize: 24,
        marginHorizontal: 10,
        color: "white"
    },
    bottomCard: {
        borderTopLeftRadius: 15,
        borderRadius: 12,
        elevation: 2,
    },

    priceContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        paddingTop: 25,
        paddingHorizontal: 25,
        paddingBottom: 0,
    },
    CheckoutContainer: {
        marginTop: 18,
        alignItems: "center",
        gap: 10
    }


});
