import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import bg from "../../src/public/homebg.jpg"

export default function SpecialOfferSection() {
    return (
        <View style={styles.card}>
            <View style={styles.cardContent}>
                <View style={styles.imgContainer}>
                    <Image style={styles.image} source={bg} />
                </View>
                <View style={styles.textContainer}>
                    <Text style={styles.nameText}>Yummies Special Bowl</Text>
                    <Text style={{ marginTop: 15, color: 'black', fontSize: 16, fontWeight: "bold" }}>Now</Text>
                    <Text style={styles.priceText}>₹ 120</Text>
                    <Text style={{ color: 'red', fontSize: 14, fontWeight: "bold" }}>(10% OFF)</Text>
                    <TouchableOpacity style={styles.addtoCartBtn}>
                        <Text style={styles.cartText}>Add to Cart</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    card: {
        borderRadius: 20,
        borderWidth: 2,
        flexDirection: "column",
        width: "100%",
    },
    cardContent: {
        flexDirection: "row",

    },
    textContainer: {
        paddingLeft: 20,
        paddingTop: 10,
        flexDirection: "column",
        borderTopRightRadius: 20,
        borderBottomRightRadius: 20,
        alignItems: "center",
    },
    image: {
        borderTopLeftRadius: 20,
        borderBottomLeftRadius: 20,
        height: 230,
        width: 180,
    },
    nameText: {
        color: "black",
        marginTop: 5,
        fontSize: 15,
        fontFamily: "Poppins-Bold"
    },
    priceText: {
        marginTop: 5,
        color: "black",
        fontSize: 30,
        fontFamily: "Poppins-Bold"
    },
    addtoCartBtn: {
        borderColor: "orange",
        marginTop: 12,
        borderRadius: 15,
        borderWidth: 3,
        padding: 10,
        paddingLeft: 30,
        paddingRight: 30
    },
    cartText: {
        fontFamily: "Poppins-Bold",
        color: "orange",
        fontSize: 16
    }

})