import React, { useEffect, useState } from 'react';
import { FlatList, SafeAreaView, StyleSheet, Text, TextInput, View, TouchableOpacity, ActivityIndicator, ScrollView, StatusBar, RefreshControl, Vibration } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import Navbar from '../../components/Navbar';
import PopularItem from '../../components/sections/PopularItem';
import { GetMenuAPI } from '../api/GetMenuAPI';
import SpecialOfferSection from '../../components/sections/SpecialOfferSection';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useSelector } from 'react-redux';
import Toast from 'react-native-toast-message';

const data = [
    { id: 1, name: "Meals" },
    { id: 2, name: "Sides" },
    { id: 3, name: "Snacks" },
    { id: 4, name: "Drinks" },
    { id: 5, name: "Salads" }
];
const toastConfig = {
    success: ({ text1, text2, ...rest }) => (
        <SafeAreaView style={styles.toastContainer}>
            <Text style={styles.toastText1}>{text1}</Text>
            <Text style={styles.toastText2}>{text2}</Text>
        </SafeAreaView>
    ),
    error: () => { },
};

const HomeScreen = () => {
    const profile = useSelector((state) => state.profile)
    const navigation = useNavigation();
    const [selectedItem, setSelectedItem] = useState(data[0]?.id);
    const [popularItemData, setPopularItemData] = useState(null);
    const [refreshing, setRefreshing] = useState(false);



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
        getData()
    }, []);

    const getData = async () => {
        const data = await AsyncStorage.getItem("reduxState");
        console.log("data", data);
        console.log("profile", profile);
    }

    async function getRestaurantData() {
        try {
            const data = await Promise.race([GetMenuAPI(), new Promise((_, reject) => setTimeout(() => reject("Timeout"), 7000))]);
            if (data) {
                console.log("Data:", data);
                setPopularItemData(data);

            } else {
                console.error("API request timed out");
                Toast.show({
                    type: 'error',
                    text1: 'Error while fetching data',
                    text2: 'Please make sure you are connected to internet.'
                });
            }
        } catch (error) {
            console.error("Error fetching data:", error);
            Toast.show({
                type: 'error',
                text1: 'Error while fetching data',
                text2: error
            });
        }
    }

    const onRefresh = () => {
        setRefreshing(true);
        getRestaurantData();
        setRefreshing(false);
        Vibration.vibrate();
    };
    return (
        <SafeAreaView style={styles.container}>
            <ScrollView
                alwaysBounceVertical={true}
                automaticallyAdjustKeyboardInsets={true}
                keyboardDismissMode="on-drag"
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                    />
                }>
                <Navbar firstIconName="bars" lastIconName="shoppingcart" cartCount={profile.cartItems.length} leftHandle={() => navigation.toggleDrawer()} />
                <View style={styles.content}>
                    <Text style={styles.title}>What would you like to <Text style={styles.orangeText}>eat?</Text></Text>
                    <View style={styles.inputContainer}>
                        <TextInput style={styles.input} placeholder='Enter a dish name E.g Pizza' />
                        <View style={styles.searchIconContainer}>
                            <Icon style={styles.searchIcon} name="search1" size={32} />
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
                    <View style={{ alignItems: "center", paddingHorizontal: 10, }}>
                        <SpecialOfferSection />
                    </View>
                </View>
                <View style={styles.pcontainer}>
                    <Text style={styles.mainLabel}>Popular Items</Text>
                    <Text style={styles.Label}>SEE FULL MENU </Text>
                </View >
                {popularItemData ?
                    <PopularItem data={popularItemData} navigation={navigation} /> : <ActivityIndicator size="large" />
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
        paddingHorizontal: 8,
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
        marginBottom: 10,
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
        height: 50,
        backgroundColor: 'white',
    },
    input: {
        padding: 10,
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
        marginTop: "3%",
        width: "150%",
        height: 3,
        backgroundColor: "grey",
        marginBottom: 5
    },
    bottomContentContainer: {
        backgroundColor: 'white',
        justifyContent: 'flex-start',
        paddingHorizontal: 10,
    },
    card: {
        marginRight: 10,
        padding: 5,
        paddingHorizontal: 10,
        backgroundColor: "white",
        borderRadius: 15,
        elevation: 6,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 7 },
        shadowOpacity: 8,
        shadowRadius: 8,
        marginBottom: 5,
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
        justifyContent: "space-between",
        marginTop: 5,

    },
    mainLabel: {
        fontFamily: "Poppins-Bold",
        fontSize: 20,
        paddingTop: 10,
        paddingHorizontal: 15,
        color: "black"
    },
    Label: {
        fontFamily: "Poppins-Regular",
        fontSize: 16,
        padding: 15,
        color: "orange"
    },
});

export default HomeScreen;
