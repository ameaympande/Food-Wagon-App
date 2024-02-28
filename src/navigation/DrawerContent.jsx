import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Avatar } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { DrawerContentScrollView } from '@react-navigation/drawer';
import { useSelector } from 'react-redux';
import Icon from 'react-native-vector-icons/AntDesign';
import AsyncStorage from '@react-native-async-storage/async-storage';

const DrawerList = [
    { icon: "home", name: "Home", navigateTo: "Home" },
    { icon: "shoppingcart", name: "My Orders", navigateTo: "Orders" },
    { icon: "Safety", name: "Privacy Policy", navigateTo: "PrivacyPolicy" },
    { icon: "setting", name: "Settings", navigateTo: "Settings" },
    { icon: "questioncircleo", name: "Help", navigateTo: "Help" },
    { icon: "logout", name: "Sign Out", navigateTo: "Logout" }
];

clearAsyncStorage = async () => {
    AsyncStorage.clear();
}

const DrawerContent = () => {
    const navigation = useNavigation();
    const profile = useSelector((state) => state.profile);

    console.log(profile)

    const handleNavigation = async (navigateTo) => {
        if (navigateTo === "Logout") {
            await clearAsyncStorage();
            navigation.navigate("Login");

        }
        navigation.navigate(navigateTo);
    };

    return (
        <View style={styles.container}>
            <DrawerContentScrollView>
                <View style={styles.profileContainer}>
                    <TouchableOpacity activeOpacity={0.8}>
                        <View style={styles.userInfoSection}>
                            <Avatar.Image source={{ uri: "https://static.vecteezy.com/system/resources/previews/008/302/458/original/eps10-orange-user-solid-icon-or-logo-in-simple-flat-trendy-modern-style-isolated-on-white-background-free-vector.jpg" }} size={120} style={{ marginTop: 100 }} />
                            <Text style={styles.nameText}>{profile.name}</Text>
                            <Text style={styles.emailText}>{profile.email}</Text>
                        </View>
                    </TouchableOpacity>
                    <View style={styles.menuContainer}>
                        {DrawerList.map((item, index) => (
                            <TouchableOpacity
                                key={index}
                                style={styles.drawerItem}
                                onPress={() => handleNavigation(item.navigateTo)}>
                                <Icon name={item.icon} size={34} color="white" />
                                <Text style={styles.drawerItemText}>{item.name}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>
            </DrawerContentScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f07229",
        paddingHorizontal: 20,
    },
    menuContainer: {
        marginTop: 30,
        padding: 10
    },
    drawerItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 30,
    },
    drawerItemText: {
        marginLeft: 25,
        fontFamily: "Poppins-Regular",
        color: "white",
        fontSize: 20,
    },
    userInfoSection: {
        alignItems: "center",
    },
    nameText: {
        marginTop: 10,
        fontFamily: "Poppins-Bold",
        color: "white",
        fontSize: 24,
    },
    emailText: {
        fontFamily: "Poppins-Bold",
        color: "white",
        fontSize: 12,
    },
});

export default DrawerContent;
