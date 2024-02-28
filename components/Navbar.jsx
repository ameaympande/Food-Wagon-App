import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import Icon from 'react-native-vector-icons/AntDesign';
import Logoimg from "../src/public/Logoimg.png"
import { useNavigation } from '@react-navigation/native';

export default function Navbar({ firstIconName, labelName, lastIconName, leftHandle, cartCount = 0 }) {
    const navigation = useNavigation();

    return (
        <>
            <View className="flex-row justify-between p-2 pt-2">
                <TouchableOpacity style={styles.iconContainer} onPress={leftHandle}>
                    <Icon name={firstIconName} size={30} style={styles.icon} />
                </TouchableOpacity>
                {labelName ? <Text style={styles.labelText}>{labelName}</Text> :
                    <Image source={Logoimg} className='h-11' />
                }
                <TouchableOpacity style={styles.iconContainer} onPress={() => { navigation.navigate("Cart") }}>
                    <Icon name={lastIconName} size={30} style={styles.icon} />
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
    labelText: {
        color: "black",
        fontSize: 25,
        marginTop: 5,
        fontFamily: "Poppins-SemiBold",
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
