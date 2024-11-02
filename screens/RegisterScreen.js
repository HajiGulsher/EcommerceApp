import { StyleSheet, Text, View, SafeAreaView, Image, KeyboardAvoidingView, TextInput, Pressable, Alert } from 'react-native';
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
    // axios.defaults.proxy = false;

    const handleRegister = async () => {
        
        // Validate input fields
        if (!name || !email || !password) {
            Alert.alert("Input Error", "All fields are required.");
            return;
        }
    
        const user = { name, email, password };
        console.log("User data to send:", user); // Log user data
    
        try {
            // Send POST request to register the user
            console.log("line1")
            const response = await axios.post("http://192.168.100.149:8081/api/users/register", user);
            console.log("Response from server:", response); // Log the response
    
            // Show success message and clear input fields
            Alert.alert("Registration Successful", "You have registered successfully. Please verify your email.");
            // navigation.navigate('Login'); // Uncomment if you want to navigate to login
            setName("");
            setEmail("");
            setPassword("");
        } catch (error) {
            // Log the error details for debugging
            JSON.stringify(error, null,2,"111111111111111111111111111111111111")
            console.error("Error details:", error); // Log the error details
            
            // Check if the error has a response and extract the message
            const errorMessage = error.response?.data?.message || "Error occurred during registration";
            
            // Handle specific cases based on status code
            if (error.response) {
                const statusCode = error.response.status;
                console.error("Status Code:", statusCode); // Log the status code
                
                if (statusCode === 400) {
                    console.error("Client Error (400):", error.response.data); // Log 400 error details
                } else if (statusCode === 500) {
                    console.error("Server Error (500):", error.response.data); // Log 500 error details
                }
            }
    
            // Show alert with the error message
            Alert.alert("Registration Error", errorMessage);
        }
    };
    
    return (
        <SafeAreaView style={styles.safe}>
            <View>
                <Image style={styles.logo} source={require('../assets/logo.png')} />
            </View>

            <KeyboardAvoidingView>
                <View style={{ alignItems: 'center' }}>
                    <Text style={styles.logotext}>Register into your Account</Text>
                </View>

                <View style={{ marginTop: 70 }}>
                    <View style={styles.v1}>
                        <Ionicons name="person-sharp" size={24} color="gray" />
                        <TextInput
                            value={name}
                            onChangeText={(text) => setName(text)}
                            style={styles.inputemail}
                            placeholder="Enter your Name"
                        />
                    </View>
                </View>

                <View style={{ marginTop: 10 }}>
                    <View style={styles.v1}>
                        <MaterialIcons name="email" size={24} color="gray" />
                        <TextInput
                            value={email}
                            onChangeText={(text) => setEmail(text)}
                            style={styles.inputemail}
                            placeholder="Enter your Email"
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
                            placeholder="Enter your Password"
                        />
                    </View>
                </View>

                <View style={styles.v2}>
                    <Text>Keep me Logged in</Text>
                    <Text style={{ color: '#007fff', fontWeight: "500" }}>Forgot Password</Text>
                </View>

                <View style={{ marginTop: 80 }} />

                <Pressable onPress={handleRegister} style={styles.Pressable}>
                    <Text style={styles.login}>Register</Text>
                </Pressable>

                <Pressable onPress={() => navigation.goBack()} style={{ marginTop: 15 }}>
                    <Text style={styles.signup}>Already have an account? Sign In</Text>
                </Pressable>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};

export default RegisterScreen;

const styles = StyleSheet.create({
    safe: {
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
    },
    logo: {
        width: 250,
        height: 200,
    },
    logotext: {
        fontSize: 17,
        fontWeight: 'bold',
        marginTop: 5,
        color: '#041E42',
    },
    v1: {
        flexDirection: 'row',
        backgroundColor: '#D0D0D0',
        gap: 5,
        alignItems: 'center',
        padding: 5,
        borderRadius: 10,
        marginTop: 30,
    },
    inputemail: {
        marginVertical: 5,
        color: 'gray',
        width: 300,
        fontSize: 16,
    },
    v2: {
        marginTop: 12,
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row',
    },
    Pressable: {
        width: 200,
        backgroundColor: '#FEBE10',
        borderRadius: 10,
        padding: 15,
        marginLeft: 'auto',
        marginRight: 'auto',
    },
    login: {
        color: 'white',
        textAlign: 'center',
        fontSize: 17,
        fontWeight: 'bold',
    },
    signup: {
        textAlign: 'center',
        fontSize: 15,
        color: 'gray',
    },
});
