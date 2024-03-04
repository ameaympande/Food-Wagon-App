import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, ImageBackground, TextInput, TouchableOpacity, Alert, ActivityIndicator, SafeAreaView } from 'react-native';
import bg from "../public/loginbg.jpg";
import { useNavigation } from '@react-navigation/native';
import { LoginAPI } from '../api/LoginAPI';
import Icon from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch, useSelector } from 'react-redux';
import { setEmail, setUserId } from '../redux/features/profile/profileSlice';
import { getData } from '../helper/getData';

const Login = () => {
    const profile = useSelector((state) => state.profile);
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const [credentials, setCredentials] = useState({ email: '', password: '' });
    const [errors, setErrors] = useState({ email: '', password: '' });
    const [loading, setLoading] = useState(false);
    const [response, setResponse] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    useEffect(() => {
        getAData();
    }, []);

    const getAData = async () => {
        try {
            const token = await AsyncStorage.getItem("token")
            if (token) {
                navigation.replace("drawer");
            }
        } catch (error) {
            console.log(error);
        }
    }

    const handleChange = (key, value) => {
        setResponse("")
        setCredentials({ ...credentials, [key]: value });
        setErrors({ ...errors, [key]: '' });
    };

    const handleTogglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleLogin = async () => {
        setLoading(true);

        let formIsValid = true;
        const newErrors = { email: '', password: '' };

        if (!credentials.email) {
            newErrors.email = "Email is required.";
            formIsValid = false;
        } else if (!/\S+@\S+\.\S+/.test(credentials.email)) {
            newErrors.email = "Invalid email address";
            formIsValid = false;
        }

        if (!credentials.password) {
            newErrors.password = "Password is required.";
            formIsValid = false;
        } else if (credentials.password.length < 7) {
            newErrors.password = "Password must be at least 7 characters.";
            formIsValid = false;
        }

        if (!formIsValid) {
            setErrors(newErrors);
            setLoading(false);
            return;
        }

        try {
            const response = await LoginAPI(credentials);
            console.log(response.data);
            if (response) setLoading(false);
            if (response.data.error) setResponse(response.data.error);
            if (response.data.token) {
                if (response.data.userId) dispatch(setUserId(response.data.userId));
                dispatch(setEmail(credentials.email));
                await AsyncStorage.setItem("token", response.data.token)
                navigation.replace("BottomTabNavigator");
            }
        } catch (error) {
            console.error("Login failed:", error);
            Alert.alert("An error occurred. Please try again later.");
            setLoading(false);
        } finally {
            setLoading(false);
        }
    };

    return (
        <SafeAreaView style={styles.maincontainer}>
            <ImageBackground source={bg} style={styles.background}>
                <View style={styles.container}>
                    <Text style={styles.mainlabel}>Login</Text>

                    <TextInput
                        style={styles.input}
                        placeholder="Email"
                        placeholderTextColor="#000"
                        value={credentials.email}
                        onChangeText={text => handleChange('email', text)}
                    />
                    {errors.email ? <Text style={styles.error}>{errors.email}</Text> : null}

                    <View style={styles.passwordInputContainer}>
                        <TextInput
                            style={styles.passwordInput}
                            placeholder="Password"
                            placeholderTextColor="#000"
                            secureTextEntry={!showPassword}
                            value={credentials.password}
                            onChangeText={text => handleChange('password', text)}
                        />
                        <TouchableOpacity onPress={handleTogglePasswordVisibility} style={styles.passwordIcon}>
                            <Icon name={showPassword ? 'eye' : 'eye-slash'} size={18} color="black" />
                        </TouchableOpacity>
                    </View>
                    {errors.password ? <Text style={styles.error}>{errors.password}</Text> : null}

                    {response ? <Text style={styles.error}>{response}</Text> : null}

                    <TouchableOpacity onPress={() => navigation.navigate("Signup")}>
                        <Text style={styles.accountlabel}>Don't have an account? <Text style={styles.accountlabelSignup}>Sign up</Text></Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
                        <Text style={styles.loginButtonText}>Login</Text>
                    </TouchableOpacity>

                    {loading && (
                        <View style={styles.loading}>
                            <ActivityIndicator size="large" color="#fa6a41" />
                        </View>
                    )}
                </View>
            </ImageBackground>
        </SafeAreaView>
    );
};

export default Login;

const styles = StyleSheet.create({
    maincontainer: {
        flex: 1,
    },
    background: {
        flex: 1,
        resizeMode: "cover",
        justifyContent: "center",
        alignItems: "center"
    },
    container: {
        width: "80%",
        backgroundColor: "rgba(255,255,255,0.4)",
        padding: 20,
        borderRadius: 10,
        alignItems: "center"
    },
    input: {
        color: "black",
        width: "100%",
        height: 40,
        marginBottom: 15,
        backgroundColor: "#fff",
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 5,
        paddingHorizontal: 10
    },
    loginButton: {
        backgroundColor: "#fa6a41",
        padding: 10,
        borderRadius: 5,
        width: "100%",
        alignItems: "center"
    },
    loginButtonText: {
        fontSize: 16,
        color: "#fff",
        fontWeight: "bold"
    },
    mainlabel: {
        color: "black",
        fontWeight: "bold",
        marginBottom: 20,
        fontSize: 24,
    },
    passwordInputContainer: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 5,
        backgroundColor: "#fff",
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 5,
    },
    passwordInput: {
        color: "black",
        flex: 1,
        height: 40,
        paddingHorizontal: 10,
    },
    passwordIcon: {
        padding: 10,
    },
    loading: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        justifyContent: 'center',
        alignItems: 'center',
    },
    error: {
        color: "red",
        fontWeight: "bold",
        marginBottom: 10,
    },
    accountlabel: {
        fontSize: 14,
        padding: 10,
        color: "black"
    },
    accountlabelSignup: {
        fontWeight: "bold",
        fontSize: 14,
        padding: 10,
        color: "#fa6a41"
    },
});
