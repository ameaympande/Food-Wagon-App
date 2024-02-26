import { FlatList, Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'


const renderItem = ({ item }) => (
    <View style={styles.card}>
        <View style={styles.cardContent}>
            <Image source={{ uri: item.backgroundImage }} style={styles.image} />
            <Text style={styles.nameText}> {item.name}</Text>
            <Text style={styles.priceText}>₹ {item.price}</Text>
        </View>
    </View>
);
export default function PopularItem({ data }) {
    return (
        <>
            <FlatList
                data={data}
                renderItem={renderItem}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
            />
        </>
    )
}

const styles = StyleSheet.create({
    card: {
        borderRadius: 20,
        marginLeft: 10,
        borderWidth: 1.5,
        flexDirection: "column",
        width: 230,
        height: 230,
        justifyContent: "center",
        alignItems: "center"

    },
    cardContent: {
        justifyContent: "center",
        alignItems: "center"
    },
    image: {
        borderRadius: 120,
        height: 150,
        width: 150
    },
    nameText: {
        color: "black",
        marginTop: 5,
        fontSize: 18,
        fontFamily: "Poppins-Bold"
    },
    priceText: {
        color: "black",
        fontSize: 18,
        fontFamily: "Poppins-Bold"
    }

})