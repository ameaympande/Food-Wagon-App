import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import Icon from 'react-native-vector-icons/Entypo';
import React, { useState } from 'react'
import Logoimg from "../src/public/Logoimg.png"
import { useNavigation } from '@react-navigation/native';

export default function Navbar({ firstIconName, labelName, lastIconName }) {
    const navigation = useNavigation();
    const [cartCount, setCartCount] = useState(0);

    const toggleDrawer = () => {
        console.log(navigation.toggleDrawer())
    };
    return (
        <>
            <View className="flex-row justify-between p-4 pt-5">
                <TouchableOpacity style={styles.iconContainer} onPress={toggleDrawer}>
                    <Icon name={firstIconName} size={38} style={styles.icon} />
                </TouchableOpacity>
                {labelName ? <Text className='text-black text-2xl font-bold  p-1'>{labelName}</Text> :
                    <Image source={Logoimg} className='h-11' />
                }
                <TouchableOpacity style={styles.iconContainer} onPress={() => { }}>
                    <Icon name={lastIconName} size={32} style={styles.icon} />
                    {cartCount > 0 && (
                        <View style={styles.badge}>
                            <Text style={styles.badgeText}>{cartCount}</Text>
                        </View>
                    )}
                </TouchableOpacity>

            </View>
        </>
    )
}

const styles = StyleSheet.create({
    iconContainer: {
        padding: 4,
    },
    icon: {
        color: 'black',
    },
    badge: {
        position: 'absolute',
        top: 0,
        right: 0,
        backgroundColor: 'red',
        borderRadius: 10,
        width: 20,
        height: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    badgeText: {
        color: 'white',
        fontSize: 12,
        fontWeight: 'bold',
    },
})
