import AsyncStorage from "@react-native-async-storage/async-storage";

export default checkToken = async() =>{
    const token = await AsyncStorage.getItem('token');
    console.log(token)
    if (token) {
        return false;
    }else{
        return true
    }
}