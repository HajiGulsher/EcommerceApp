import { StyleSheet, Text, View, SafeAreaView, Image, KeyboardAvoidingView, TextInput, Pressable, Alert } from 'react-native';
import React, { useEffect, useState } from 'react';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import AntDesign from '@expo/vector-icons/AntDesign';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginScreen = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigation = useNavigation();
    // useEffect(()=>{
    //     const checkLoginStatus=async()=>{
    //     try{
    //         const token= await AsyncStorage.getItem("JWT_SECRET");
    //         if (token){
    //             navigation.replace("Main")
    //         }

    //     }catch(error){
    //         console.log("error Message login",error)
    //     }};
    //     checkLoginStatus();
    // },[])


    // Function to handle login
    const handleLogin = async () => {
        try {
            const response = await axios.post('http://192.168.100.149:8081/api/users/login', {
                email,
                password
            });

            if (response.status === 200) {
                 await AsyncStorage.setItem("authToken",response.data.token);
                 console.log(response.data);

                // Login successful, navigate to Home
                navigation.replace("Main");
            } else {
                Alert.alert("Login Failed", response.data.message);
            }
        } catch (error) {
            Alert.alert("Error", error.response?.data?.message || "Something went wrong");
        }
    };

    return (
        <SafeAreaView style={styles.safe}>
            <View>
                <Image style={styles.logo} source={require('../assets/logo.png')} />
            </View>

            <KeyboardAvoidingView>
                <View style={{ alignItems: 'center' }}>
                    <Text style={styles.logotext}>Login In To Your Account</Text>
                </View>

                <View style={{ marginTop: 70 }}>
                    <View style={styles.v1}>
                        <MaterialIcons name="email" size={24} color="gray" />
                        <TextInput
                            value={email}
                            onChangeText={(text) => setEmail(text)}
                            style={styles.inputemail}
                            placeholder="enter your email"
                        />
                    </View>
                </View>

                <View style={{ marginTop: 10 }}>
                    <View style={styles.v1}>
                        <AntDesign name="lock" size={24} color="gray" />
                        <TextInput
                            value={password}
                            onChangeText={(text) => setPassword(text)}
                            secureTextEntry={true}
                            style={styles.inputemail}
                            placeholder="enter your Password"
                        />
                    </View>
                </View>

                <View style={styles.v2}>
                    <Text>Keep me Logged in</Text>
                    <Text style={{ color: '#007fff', fontWeight: "500" }}>Forgot Password</Text>
                </View>

                <View style={{ marginTop: 80 }} />

                <Pressable style={styles.Pressable}
                // onPress={()=>navigation.navigate('Main')}
                onPress={handleLogin}
                >
                    <Text style={styles.login}>Login</Text>
                </Pressable>

                <Pressable onPress={() => navigation.navigate("Register")} style={{ marginTop: 15 }}>
                    <Text style={styles.signup}>Don't have a Account? Sign Up</Text>
                </Pressable>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};

export default LoginScreen;

const styles = StyleSheet.create({
    safe: {
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center'
    },
    logo: {
        width: 250,
        height: 200
    },
    logotext: {
        fontSize: 17,
        fontWeight: 'bold',
        marginTop: 5,
        color: '#041E42'
    },
    v1: {
        flexDirection: 'row',
        backgroundColor: '#D0D0D0',
        gap: 5,
        alignItems: 'center',
        padding: 5,
        borderRadius: 10,
        marginTop: 30
    },
    inputemail: {
        marginVertical: 5,
        color: 'gray',
        width: 300,
        fontSize: 16
    },
    v2: {
        marginTop: 12,
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row'
    },
    Pressable: {
        width: 200,
        backgroundColor: '#FEBE10',
        borderRadius: 10,
        padding: 15,
        marginLeft: 'auto',
        marginRight: 'auto'
    },
    login: {
        color: 'white', textAlign: 'center', fontSize: 17, fontWeight: 'bold'
    },
    signup: {
        textAlign: 'center', fontSize: 15, color: 'gray'
    }
});
