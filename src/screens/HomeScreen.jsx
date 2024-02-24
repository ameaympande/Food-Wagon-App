import React, { useState } from 'react';
import { FlatList, SafeAreaView, StyleSheet, Text, TextInput, View, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import Navbar from '../../components/Navbar';

const data = [
    { id: 1, name: "Meals" },
    { id: 2, name: "Sides" },
    { id: 3, name: "Snacks" },
    { id: 4, name: "Drinks" },
    { id: 5, name: "Salads" }
];

const HomeScreen = () => {
    const [selectedItem, setSelectedItem] = useState(null);

    const renderItem = ({ item }) => (
        <TouchableOpacity
            style={[
                styles.card,
                selectedItem === item.id && styles.selectedCard
            ]}
            onPress={() => setSelectedItem(item.id)}
        >
            <Text style={styles.cardText}>{item.name}</Text>
        </TouchableOpacity>
    );

    return (
        <SafeAreaView style={styles.container}>
            <Navbar firstIconName="menu" lastIconName="shopping-cart" />
            <View style={styles.content}>
                <Text style={styles.title}>What would you like to <Text style={styles.orangeText}>eat?</Text></Text>
                <View style={styles.inputContainer}>
                    <TextInput style={styles.input} placeholder='Enter a dish name E.g Pizza' />
                    <View style={styles.searchIconContainer}>
                        <Icon style={styles.searchIcon} name="search1" size={38} />
                    </View>
                </View>
                <View style={styles.breakline} />
            </View>
            <View style={styles.bottomContentContainer}>
                <FlatList
                    data={data}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.id.toString()}
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                />
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    content: {
        alignItems: 'center',
        padding: 30,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    title: {
        fontFamily: "Poppins-Bold",
        fontSize: 30,
        color: "black",
        marginBottom: 20,
    },
    orangeText: {
        color: "orange",
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderRadius: 20,
        paddingHorizontal: 10,
        paddingTop: 5,
        height: 60,
        backgroundColor: 'white',
    },
    input: {
        flex: 1,
        fontFamily: "Baloo Bhaijaan 2",
        fontSize: 20,
    },
    searchIconContainer: {
        borderRadius: 50,
        padding: 5,
    },
    searchIcon: {
        color: 'orange',
    },
    breakline: {
        marginTop: 25,
        width: "150%",
        height: 3,
        backgroundColor: "grey"
    },
    bottomContentContainer: {
        backgroundColor: 'white',
        justifyContent: 'flex-start',
        paddingHorizontal: 20,
        maxHeight: 250
    },
    card: {
        marginRight: 10,
        padding: 6,
        backgroundColor: "white",
        borderRadius: 15,
        elevation: 6,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 2,
        shadowRadius: 5.84,
    },
    selectedCard: {
        backgroundColor: "orange",
    },
    cardText: {
        fontSize: 17,
        padding: 3,
        fontFamily: "Poppins-Regular",
        fontWeight: "bold",
    }
});

export default HomeScreen;
