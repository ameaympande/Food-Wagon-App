import { Image, StyleSheet, Text, View } from 'react-native'
import Icon from 'react-native-vector-icons/Entypo';
import React from 'react'
import Logoimg from "../src/public/Logoimg.png"

export default function Navbar({ firstIconName, labelName, lastIconName }) {
    return (
        <>
            <View className="flex-row justify-between p-4 pt-5 bg-yellow-400 ">
                <Icon className="text-black" name={firstIconName} size={38} />
                {labelName ? <Text className='text-black text-2xl font-bold ml-8 p-2'>{labelName}</Text> :
                    <Image source={Logoimg} className='h-11' />
                }
                <Icon className="text-white" name={lastIconName} size={34} />
            </View>
        </>
    )
}
