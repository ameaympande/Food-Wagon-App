import React, { useState } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity, Image } from 'react-native';
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
    const [count, setCount] = useState(0);

    const handleDelete = (currentItem) => {
        console.log(currentItem);
        const updatedCartItems = cartItems.filter(item => item._id !== currentItem._id);
        dispatch(replaceCartItems(updatedCartItems));

    }

    const handleIncrement = () => {
        setCount(prevCount => prevCount + 1);
        dispatch(setCartItems(item));
    };

    const handleDecrement = () => {
        console.log(count);
        if (count <= 0) return;
        setCount(prevCount => prevCount - 1);
    };
    const renderItem = ({ item }) => (
        <View style={styles.card}>
            <Image source={{ uri: item.backgroundImage }} style={styles.image} />
            <Text style={styles.itemName}>{item.name}</Text>
            <View style={styles.innercontainer}>
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
            <Text style={styles.itemPrice}>₹ {item.price}</Text>
            <Text onPress={() => handleDelete(item)} style={styles.delete}>
                <Icon name="cross" size={24} style={styles.icon} />
            </Text>
        </View>
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
            <TouchableOpacity onPress={() => {/* Handle checkout */ }} style={styles.checkoutButton} >
                <Text style={styles.checkoutButtonText}>Checkout</Text>
            </TouchableOpacity>

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
        paddingHorizontal: 16,
        paddingBottom: 80,
    },
    card: {
        flex: 1,
        alignItems: "center",
        height: 100,
        flexDirection: 'row',
        justifyContent: "space-between",
        backgroundColor: '#fff',
        borderRadius: 8,
        marginBottom: 18,
        elevation: 2,
        position: 'relative',
        padding: 8
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
        fontSize: 20,
        fontWeight: 'bold',
        color: '#333',
    },
    itemPrice: {
        padding: 10,
        fontWeight: 'bold',
        fontSize: 20,
        color: 'black',
    },
    delete: {
        position: 'absolute',
        right: 5,
        top: 2,
        backgroundColor: 'rgba(255,255,255,0.7)',
        borderRadius: 20,
        padding: 8,
    },
    icon: {
        color: '#e53935',
    },

    checkoutButton: {
        position: 'absolute',
        bottom: 60,
        left: '50%',
        transform: [{ translateX: -80 }],
        backgroundColor: '#e53935',
        paddingHorizontal: 40,
        paddingVertical: 16,
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



});
