// import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native'
// import React, { useContext, useEffect, useState } from 'react'
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import jwt_decode from "jwt-decode";
// import { UserType } from '../UserContext';


// const AddressScreen = () => {
//     const [name, setName] = useState("");
//     const [mobileno, setMobileNo] = useState("");
//     const [houseno, setHouseNo] = useState("");
//     const [street, setStreet] = useState("");
//     const [landmark, setLandMark] = useState("");
//     const [postalcode, setPostalCode] = useState("");
//     const {userId,setUserId} =useContext(UserType);


//     useEffect(() => {
//     const fetchUser = async () => {
//         console.log("line1");
//         const token = await AsyncStorage.getItem("authToken");
//         console.log("Retrieved token:", token); 

//         if (!token) {
//             console.log("No authToken found in AsyncStorage"); 
//             // Redirect to login or handle as needed
//             return;
//         }

//         try {
//             console.log("line2");
//             const decodedToken = jwt_decode(token);
//             console.log("3");
//             const userId = decodedToken.id; // Use the `id` field based on your token's payload
//             console.log("4");
//             setUserId(userId);
//         } catch (error) {
//             console.error("Error decoding token:", error); // Log decoding errors
//         }
//     };
//     fetchUser();
// }, []);
    

    
    
//     console.log(userId);
//     const handleAddAddress=()=>{
        
//     }
//     return (
//         <ScrollView style={styles.Scroll}>
//             <View style={{ height: 50, backgroundColor: '#00CED1' }} />
//             <View style={{ padding: 10 }}>
//                 <Text style={{ fontSize: 17, fontWeight: 'bold' }}>Add a new Address</Text>

//                 <TextInput placeholder='Pakistan' placeholderTextColor={'black'}
//                     style={{ padding: 10, borderColor: '#D0D0D0', marginTop: 10, borderRadius: 5, borderWidth: 1 }}
//                 />

//                 <View style={{ marginVertical: 10 }}>
//                     <Text style={{ fontSize: 15, fontWeight: 'bold' }}>Fullname (First and Last name)</Text>

//                     <TextInput
//                         value={name}
//                         onChangeText={(text) => setName(text)}
//                         placeholder='Enter Your name' placeholderTextColor={'black'}
//                         style={{ padding: 10, borderColor: '#D0D0D0', marginTop: 10, borderRadius: 5, borderWidth: 1 }}
//                     />
//                 </View>

//                 <View>
//                     <Text style={{ fontSize: 15, fontWeight: 'bold' }}>Mobile Number</Text>

//                     <TextInput
//                         value={mobileno}
//                         onChangeText={(text) => setMobileNo(text)}
//                         placeholder='Mobile No' placeholderTextColor={'black'}
//                         style={{ padding: 10, borderColor: '#D0D0D0', marginTop: 10, borderRadius: 5, borderWidth: 1 }}
//                     />
//                 </View>

//                 <View style={{ marginVertical: 10 }}>
//                     <Text style={{ fontSize: 15, fontWeight: 'bold' }}>Flat, House No, Building, Company</Text>

//                     <TextInput
//                         value={houseno}
//                         onChangeText={(text) => setHouseNo(text)}
//                         placeholder='' placeholderTextColor={'black'}
//                         style={{ padding: 10, borderColor: '#D0D0D0', marginTop: 10, borderRadius: 5, borderWidth: 1 }}
//                     />
//                 </View>

//                 <View style={{ marginVertical: 10 }}>
//                     <Text style={{ fontSize: 15, fontWeight: 'bold' }}>Area, Street, City</Text>

//                     <TextInput
//                         value={street}
//                         onChangeText={(text) => setStreet(text)}
//                         placeholder='' placeholderTextColor={'black'}
//                         style={{ padding: 10, borderColor: '#D0D0D0', marginTop: 10, borderRadius: 5, borderWidth: 1 }}
//                     />
//                 </View>

//                 <View style={{ marginVertical: 10 }}>
//                     <Text style={{ fontSize: 15, fontWeight: 'bold' }}>Landmark</Text>

//                     <TextInput
//                         value={landmark}
//                         onChangeText={(text) => setLandMark(text)}
//                         placeholder='' placeholderTextColor={'black'}
//                         style={{ padding: 10, borderColor: '#D0D0D0', marginTop: 10, borderRadius: 5, borderWidth: 1 }}
//                     />
//                 </View>

//                 <View style={{ marginVertical: 10 }}>
//                     <Text style={{ fontSize: 15, fontWeight: 'bold' }}>PinCode</Text>

//                     <TextInput
//                         value={postalcode}
//                         onChangeText={(text) => setPostalCode(text)}
//                         placeholder='Enter PinCode' placeholderTextColor={'black'}
//                         style={{ padding: 10, borderColor: '#D0D0D0', marginTop: 10, borderRadius: 5, borderWidth: 1 }}
//                     />
//                 </View>
//                 <Pressable
//                 onPress={handleAddAddress}
//                     style={{
//                         backgroundColor: '#FFC72C', borderRadius: 6, justifyContent: 'center',
//                         alignItems: 'center', padding: 10
//                     }}>
//                     <Text style={{ fontWeight: 'bold' }}>Add Address</Text>
//                 </Pressable>

//             </View>

//         </ScrollView>
//     )
// }

// export default AddressScreen

// const styles = StyleSheet.create({
//     Scroll: {
//         marginTop: 50
//     }
// })


import { Alert, Pressable, ScrollView, StyleSheet, Text, TextInput, View} from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { UserType } from '../UserContext';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';

// Custom function to decode JWT
// Custom function to decode JWT with URL-safe Base64 encoding
const decodeJWT = (token) => {
    try {
        const base64Url = token.split(".")[1];
        let base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
        
        // Add padding if necessary
        while (base64.length % 4 !== 0) {
            base64 += "=";
        }
        
        const jsonPayload = decodeURIComponent(
            atob(base64)
                .split("")
                .map(c => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
                .join("")
        );
        
        return JSON.parse(jsonPayload);
    } catch (error) {
        console.error("Error decoding JWT:", error);
        return null;
    }
};


const AddressScreen = () => {

    const navigation=useNavigation();
    const [name, setName] = useState("");
    const [mobileno, setMobileNo] = useState("");
    const [houseno, setHouseNo] = useState("");
    const [street, setStreet] = useState("");
    const [landmark, setLandMark] = useState("");
    const [postalcode, setPostalCode] = useState("");
    const { userId, setUserId } = useContext(UserType);

    useEffect(() => {
        const fetchUser = async () => {
            console.log("line1");
            const token = await AsyncStorage.getItem("authToken");
            console.log("Retrieved token:", token);

            if (!token) {
                console.log("No authToken found in AsyncStorage");
                // Redirect to login or handle as needed
                return;
            }

            try {
                console.log("line2");
                const decodedToken = decodeJWT(token);
                console.log("3");
                const userId = decodedToken?.id; // Use the `id` field based on your token's payload
                console.log("4", userId);
                setUserId(userId);
            } catch (error) {
                console.error("Error decoding token:", error); // Log decoding errors
            }
        };
        fetchUser();
    }, []);

    console.log(userId);
    const handleAddAddress = () => {
       const address={
        name,
        mobileno,
        houseno,
        street,
        landmark,
        postalcode
       }
       axios.post("http://192.168.100.149:8081/api/users/addresses",{userId,address}).then ((response)=>{
        Alert.alert("Success","Address added successfully")
        setName("");
        setMobileNo("");
        setHouseNo("");
        setStreet("");
        setLandMark("");
        setPostalCode("");

        setTimeout(() => {
            navigation.goBack();
        },500);
       }).catch((error)=>{
        Alert.alert("error","failed to add address");
        console.log("error",error)
       })
    };

    return (
        <ScrollView style={styles.Scroll}>
            <View style={{ height: 50, backgroundColor: '#00CED1' }} />
            <View style={{ padding: 10 }}>
                <Text style={{ fontSize: 17, fontWeight: 'bold' }}>Add a new Address</Text>

                <TextInput
                    placeholder='Pakistan'
                    placeholderTextColor={'black'}
                    style={{ padding: 10, borderColor: '#D0D0D0', marginTop: 10, borderRadius: 5, borderWidth: 1 }}
                />

                <View style={{ marginVertical: 10 }}>
                    <Text style={{ fontSize: 15, fontWeight: 'bold' }}>Fullname (First and Last name)</Text>

                    <TextInput
                        value={name}
                        onChangeText={(text) => setName(text)}
                        placeholder='Enter Your name'
                        placeholderTextColor={'black'}
                        style={{ padding: 10, borderColor: '#D0D0D0', marginTop: 10, borderRadius: 5, borderWidth: 1 }}
                    />
                </View>

                <View>
                    <Text style={{ fontSize: 15, fontWeight: 'bold' }}>Mobile Number</Text>

                    <TextInput
                        value={mobileno}
                        onChangeText={(text) => setMobileNo(text)}
                        placeholder='Mobile No'
                        placeholderTextColor={'black'}
                        style={{ padding: 10, borderColor: '#D0D0D0', marginTop: 10, borderRadius: 5, borderWidth: 1 }}
                    />
                </View>

                <View style={{ marginVertical: 10 }}>
                    <Text style={{ fontSize: 15, fontWeight: 'bold' }}>Flat, House No, Building, Company</Text>

                    <TextInput
                        value={houseno}
                        onChangeText={(text) => setHouseNo(text)}
                        placeholder=''
                        placeholderTextColor={'black'}
                        style={{ padding: 10, borderColor: '#D0D0D0', marginTop: 10, borderRadius: 5, borderWidth: 1 }}
                    />
                </View>

                <View style={{ marginVertical: 10 }}>
                    <Text style={{ fontSize: 15, fontWeight: 'bold' }}>Area, Street, City</Text>

                    <TextInput
                        value={street}
                        onChangeText={(text) => setStreet(text)}
                        placeholder=''
                        placeholderTextColor={'black'}
                        style={{ padding: 10, borderColor: '#D0D0D0', marginTop: 10, borderRadius: 5, borderWidth: 1 }}
                    />
                </View>

                <View style={{ marginVertical: 10 }}>
                    <Text style={{ fontSize: 15, fontWeight: 'bold' }}>Landmark</Text>

                    <TextInput
                        value={landmark}
                        onChangeText={(text) => setLandMark(text)}
                        placeholder=''
                        placeholderTextColor={'black'}
                        style={{ padding: 10, borderColor: '#D0D0D0', marginTop: 10, borderRadius: 5, borderWidth: 1 }}
                    />
                </View>

                <View style={{ marginVertical: 10 }}>
                    <Text style={{ fontSize: 15, fontWeight: 'bold' }}>PinCode</Text>

                    <TextInput
                        value={postalcode}
                        onChangeText={(text) => setPostalCode(text)}
                        placeholder='Enter PinCode'
                        placeholderTextColor={'black'}
                        style={{ padding: 10, borderColor: '#D0D0D0', marginTop: 10, borderRadius: 5, borderWidth: 1 }}
                    />
                </View>
                <Pressable
                    onPress={handleAddAddress}
                    style={{
                        backgroundColor: '#FFC72C',
                        borderRadius: 6,
                        justifyContent: 'center',
                        alignItems: 'center',
                        padding: 10
                    }}
                >
                    <Text style={{ fontWeight: 'bold' }}>Add Address</Text>
                </Pressable>
            </View>
        </ScrollView>
    );
};

export default AddressScreen;

const styles = StyleSheet.create({
    Scroll: {
        marginTop: 50
    }
});
