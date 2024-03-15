import React, { useState } from 'react';
import { StyleSheet, Text, View, FlatList, Button, Image } from 'react-native';
import Navbar from '../../components/Navbar';
import Icon from 'react-native-vector-icons/AntDesign';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { replaceCartItems } from '../redux/features/profile/profileSlice';

export default function Cart() {
    const profile = useSelector((state) => state.profile);
    const cartItems = profile.cartItems;
    const navigation = useNavigation();
    const dispatch = useDispatch();

    const handleDelete = (currentItem) => {
        console.log(currentItem);
        const updatedCartItems = cartItems.filter(item => item._id !== currentItem._id);
        dispatch(replaceCartItems(updatedCartItems));

    }
    const renderItem = ({ item }) => (
        <View style={styles.card}>
            <Image source={{ uri: item.backgroundImage }} style={styles.image} />
            <View style={styles.cardContent}>
                <Text style={styles.itemName}>{item.name}</Text>
                <Text style={styles.itemPrice}>₹ {item.price}</Text>
            </View>
            <Text onPress={() => handleDelete(item)} style={styles.delete}>
                <Icon name="delete" size={24} style={styles.icon} />
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
            <Button title="Checkout" onPress={() => {/* Handle checkout */ }} style={styles.checkoutButton} />
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
        flexDirection: 'row',
        backgroundColor: '#fff',
        borderRadius: 8,
        marginBottom: 16,
        elevation: 2,
        position: 'relative',
    },
    image: {
        width: 100,
        height: 100,
        borderTopLeftRadius: 8,
        borderBottomLeftRadius: 8,
    },
    cardContent: {
        flex: 1,
        padding: 12,
    },
    itemName: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
    },
    itemPrice: {
        fontSize: 16,
        color: '#777',
    },
    delete: {
        position: 'absolute',
        bottom: 0,
        right: 8,
        backgroundColor: 'rgba(255,255,255,0.7)',
        borderRadius: 20,
        padding: 8,
    },
    icon: {
        color: '#e53935',
    },
    checkoutButton: {
        position: 'absolute',
        bottom: 20,
        left: '50%',
        transform: [{ translateX: -50 }],
        backgroundColor: '#e53935',
        paddingHorizontal: 30,
        paddingVertical: 12,
        borderRadius: 30,
        elevation: 3,
    },
});
