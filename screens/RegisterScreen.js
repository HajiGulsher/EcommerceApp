import { StyleSheet, Text, View, SafeAreaView, Image, KeyboardAvoidingView, TextInput, Pressable, Alert } from 'react-native'
import React, { useState } from 'react';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import AntDesign from '@expo/vector-icons/AntDesign';
import { useNavigation } from '@react-navigation/native';
import Ionicons from '@expo/vector-icons/Ionicons';
import axios from 'axios';

const RegisterScreen = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const navigation = useNavigation();
    // const handleRegister = () => {
    //     const user = {
    //         name: name,
    //         email: email,
    //         password: password,
    //     };
    //     //send a post request to the backend Api
    //     axios.post("http://192.168.100.55:8081/register", user).then((response) => {
    //         console.log(response);
    //         Alert.alert("Registration Successfull", "You have Registered Successfully");
    //         setName("");
    //         setEmail("");
    //         setPassword("");
    //     }).catch((error) => {
    //         Alert.alert("Registration Error", "Error Occured during Registration");
    //         console.log("Registration Failed", error)
    //     })

    // }
    const handleRegister = async () => {
        if (!name || !email || !password) {
            Alert.alert("Input Error", "All fields are required.");
            return;
        }
    
        const user = { name, email, password };
        try {
            const response = await axios.post("http://192.168.100.55:8081/register", user);
            console.log(response);
            Alert.alert("Registration Successful", "You have Registered Successfully");
            navigation.navigate('LoginScreen'); // Adjust as necessary
            setName("");
            setEmail("");
            setPassword("");
        } catch (error) {
            const errorMessage = error.response?.data?.message || "Error Occurred during Registration";
            Alert.alert("Registration Error", errorMessage);
            console.log("Registration Failed", error);
        }
    }
    
    return (
        <SafeAreaView style={styles.safe}>
            <View>
                <Image style={styles.logo} source={require('../assets/logo.png')} />
            </View>

            <KeyboardAvoidingView>
                <View style={{ alignItems: 'center' }}>
                    <Text style={styles.logotext}>Register in to your Account</Text>
                </View>

                <View style={{ marginTop: 70 }}>
                    <View style={styles.v1}>
                        <Ionicons name="person-sharp" size={24} color="gray" />
                        <TextInput value={name}
                            onChangeText={(text) => setName(text)}
                            style={styles.inputemail} placeholder="enter your Name" />
                    </View>
                </View>

                <View style={{ marginTop: 10 }}>
                    <View style={styles.v1}>
                        <MaterialIcons name="email" size={24} color="gray" />
                        <TextInput value={email}
                            onChangeText={(text) => setEmail(text)}
                            style={styles.inputemail} placeholder="enter your email" />
                    </View>
                </View>

                <View style={{ marginTop: 10 }}>
                    <View style={styles.v1}>
                        <AntDesign name="lock" size={24} color="gray" />
                        <TextInput
                            value={password}
                            onChangeText={(text) => setPassword(text)}
                            secureTextEntry={true}
                            style={styles.inputemail} placeholder="enter your Password" />
                    </View>
                </View>

                <View style={styles.v2}>
                    <Text>Keep me Logged in</Text>

                    <Text style={{ color: '#007fff', fontWeight: "500" }}>Forgot Password</Text>
                </View>

                <View style={{ marginTop: 80 }} />

                <Pressable
                    onPress={handleRegister}
                    style={styles.Pressable}>
                    <Text style={styles.login}>Register</Text>
                </Pressable>

                <Pressable onPress={() => navigation.goBack()} style={{ marginTop: 15 }}>
                    <Text style={styles.signup}>Already have a Account? Sign In</Text>
                </Pressable>


            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}

export default RegisterScreen


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
})


