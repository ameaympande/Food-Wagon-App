import React, { useEffect, useState } from 'react';
import { FlatList, SafeAreaView, StyleSheet, Text, TextInput, View, TouchableOpacity, ActivityIndicator, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import Navbar from '../../components/Navbar';
import PopularItem from '../../components/sections/PopularItem';
import { GetMenuAPI } from '../api/GetMenuAPI';
import SpecialOfferSection from '../../components/sections/SpecialOfferSection';

const data = [
    { id: 1, name: "Meals" },
    { id: 2, name: "Sides" },
    { id: 3, name: "Snacks" },
    { id: 4, name: "Drinks" },
    { id: 5, name: "Salads" }
];

const HomeScreen = () => {
    const [selectedItem, setSelectedItem] = useState(data[0]?.id);
    const [popularItemData, setPopularItemData] = useState(null)


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

    useEffect(() => {
        getRestaurantData();
    }, []);

    async function getRestaurantData() {
        try {
            const response = await GetMenuAPI();
            if (response) {
                setPopularItemData(response);
            } else {
                console.error("Invalid response from API:", response);
            }
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    }


    return (
        <SafeAreaView style={styles.container}>
            <ScrollView alwaysBounceVertical={true} automaticallyAdjustKeyboardInsets={true} keyboardDismissMode="on-drag">
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
                <View>
                    <Text style={styles.mainLabel}>Today's Special Offer</Text>
                    <View style={{ alignItems: "center", padding: 10, }}>
                        <SpecialOfferSection />
                    </View>
                </View>
                <View style={styles.pcontainer}>
                    <Text style={styles.mainLabel}>Popular Items</Text>
                    <Text style={styles.Label}>SEE FULL MENU </Text>
                </View >
                {popularItemData ?
                    <PopularItem data={popularItemData} /> : <ActivityIndicator size="large" />
                }
            </ScrollView>
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
        padding: 20,
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
        color: "black",
        fontSize: 17,
        padding: 3,
        fontFamily: "Poppins-Regular",
        fontWeight: "bold",
    },
    pcontainer: {
        flexDirection: "row",
        justifyContent: "space-between"

    },
    mainLabel: {
        marginTop: 10,
        fontFamily: "Poppins-Bold",
        fontSize: 20,
        padding: 15,
        color: "black"
    },
    Label: {
        marginTop: 15,
        fontFamily: "Poppins-Regular",
        fontSize: 16,
        padding: 15,
        color: "orange"
    },
});

export default HomeScreen;
