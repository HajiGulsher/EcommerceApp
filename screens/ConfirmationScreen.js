import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios';
import { UserType } from '../UserContext';
import Entypo from '@expo/vector-icons/Entypo';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { cleanCart } from '../Redux/CartReducer';


const ConfirmationScreen = () => {
    const steps = [
        { title: "Address", content: "Address Form" },
        { title: "Delivery", content: "Delivery Options" },
        { title: "Payment", content: "Payment Details" },
        { title: "Place Order", content: "Order Summary" },
    ];

    const [addresses, setAddresses] = useState([]);
    const { userId, setUserId } = useContext(UserType);

    const [currentStep, setCurrentStep] = useState(0);
    const cart = useSelector((state) => state.cart.cart);

    const total = cart?.map((item) => item.price * item.quantity).reduce((curr, prev) => curr + prev, 0);

    useEffect(() => {
        fetchAddresses();
    }, []);

    const fetchAddresses = async () => {
        try {
            const response = await axios.get(`http://192.168.100.149:8081/api/users/addresses/${userId}`)
            const { addresses } = response.data;

            setAddresses(addresses);
        } catch (error) {
            console.log("error", error)
        }
    }
    const [selectedAddress, setSelectedAddress] = useState("");
    const [option, setOption] = useState(false);
    const [selectedOption, setSlectedOption] = useState("");
    const navigation = useNavigation();
    const dispatch = useDispatch();

   
    const handlePlaceOrder = async () => {
        try {
            const orderData = {
                userId: userId,
                cartItems: cart,
                totalPrice: total,
                shippingAddress: selectedAddress,
                paymentMethod: selectedOption
            };
    
            // Log to confirm orderData is as expected before sending
            console.log("Order data being sent:", orderData);
    
            // Ensure headers are explicitly set
            const response = await axios.post(
                "http://192.168.100.149:8081/api/orders",
                orderData,
                {
                    headers: { 'Content-Type': 'application/json' }
                }
            );
    
            if (response.status === 200) {
                navigation.navigate("Order");
                dispatch(cleanCart());
                console.log("Order created successfully", response.data.order);
            } else {
                console.log("Error creating order", response.data);
            }
        } catch (error) {
            if (error.response) {
                console.log("Server error:", error.response.data);
            } else if (error.request) {
                console.log("No response received:", error.request);
            } else {
                console.log("Error setting up request:", error.message);
            }
        }
    };
    

    return (
        <ScrollView style={{ marginTop: 50 }}>
            <View style={{ flex: 1, paddingHorizontal: 20, paddingTop: 40 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 20, justifyContent: 'space-between' }}>
                    {steps?.map((step, index) => (
                        <View key={index} style={{ justifyContent: 'center', alignItems: 'center' }}>
                            {
                                index > 0 && (
                                    <View style={[{ flex: 1, height: 2, backgroundColor: 'green' },
                                    index <= currentStep && { backgroundColor: 'green' }]} />
                                )
                            }
                            <View style={[
                                {
                                    width: 30,
                                    height: 30,
                                    borderRadius: 15,
                                    backgroundColor: '#ccc',
                                    justifyContent: 'center',
                                    alignItems: 'center'
                                },
                                index < currentStep && { backgroundColor: 'green' }
                            ]}>
                                {
                                    index < currentStep ? (
                                        <Text style={{ fontSize: 16, fontWeight: 'bold', color: 'white' }}>&#10003;</Text>
                                    ) : (
                                        <Text style={{ fontSize: 16, fontWeight: 'bold', color: 'white' }}>{index + 1}</Text>
                                    )
                                }
                            </View>

                            <Text style={{ marginTop: 8, alignItems: 'center' }}>{step.title}</Text>



                        </View>
                    ))}
                </View>
            </View>

            {currentStep == 0 && (
                <View style={{ marginHorizontal: 20 }}>
                    <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Select Delivery Address</Text>
                    <Pressable>
                        {addresses?.map((item, index) => (
                            <Pressable style={{
                                borderWidth: 1,
                                borderColor: '#D0D0D0',
                                padding: 10,
                                flexDirection: 'row',
                                gap: 5,
                                paddingBottom: 10,
                                marginVertical: 7,
                                alignItems: 'center',
                                borderRadius: 8
                            }}
                                key={index}>
                                {/* condition for circle or selected address  */}
                                {selectedAddress && selectedAddress._id === item?._id ? (
                                    <FontAwesome6 name="dot-circle" size={24} color="#008397" />
                                ) : (
                                    <Entypo onPress={() => setSelectedAddress(item)} name="circle" size={24} color="gray" />
                                )}


                                <View style={{ marginLeft: 5 }}>
                                    <View style={styles.addressesview}>
                                        <Text style={{ fontSize: 15, fontWeight: 'bold' }}>{item?.name}</Text>
                                        <Entypo name="location-pin" size={24} color="red" />
                                    </View>
                                    <Text style={{ fontSize: 15, color: '#181818' }}>{item?.houseno},{item?.landmark}</Text>

                                    <Text style={{ fontSize: 15, color: '#181818' }}>{item?.street}</Text>

                                    <Text style={{ fontSize: 15, color: '#181818' }}>{item?.mobileno}</Text>

                                    <Text style={{ fontSize: 15, color: '#181818' }}>{item?.postalcode}</Text>

                                    <View style={{ flexDirection: 'row', gap: 10, marginTop: 7, alignItems: 'center' }}>
                                        <Pressable style={styles.edit}>
                                            <Text>Edit</Text>
                                        </Pressable>
                                        <Pressable style={styles.edit}>
                                            <Text>Remove</Text>
                                        </Pressable>
                                        <Pressable style={styles.edit}>
                                            <Text>Set as Default</Text>
                                        </Pressable>

                                    </View>

                                    <View>
                                        {selectedAddress && selectedAddress._id === item?._id && (
                                            <Pressable
                                                onPress={() => setCurrentStep(1)}
                                                style={{ backgroundColor: '#008397', padding: 10, borderRadius: 20, justifyContent: 'center', alignItems: 'center', marginTop: 10 }}>
                                                <Text style={{ textAlign: 'center', color: 'white' }}>Deliver to this Address</Text>
                                            </Pressable>
                                        )}
                                    </View>

                                </View>
                            </Pressable>

                        ))}
                    </Pressable>
                </View>
            )}




            {currentStep == 1 && (
                <View style={{ marginHorizontal: 20 }}>
                    <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Choose the delivery option</Text>

                    <View style={{
                        flexDirection: 'row', alignItems: 'center',
                        backgroundColor: 'white', padding: 8, gap: 7, borderColor: '#D0D0D0', borderWidth: 1, marginTop: 10
                    }}>

                        {option ? (
                            <FontAwesome6 name="dot-circle" size={24} color="#008397" />
                        ) : (
                            <Entypo onPress={() => setOption(!option)} name="circle" size={24} color="gray" />
                        )}


                        <Text style={{ flex: 1 }}>
                            <Text style={{ color: 'green', fontWeight: '500' }}>Tomorrow 10 pm</Text>{""}
                            - Free delivery with your prime membership
                        </Text>
                    </View>

                    <Pressable
                        onPress={() => setCurrentStep(2)}
                        style={{
                            backgroundColor: '#FFC72C', padding: 10, borderRadius: 20,
                            justifyContent: 'center', alignItems: 'center', marginTop: 15
                        }}>
                        <Text>Continue</Text>
                    </Pressable>
                </View>
            )}



            {currentStep == 2 && (
                <View style={{ marginHorizontal: 20 }}>
                    <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Select Payment Method</Text>

                    <View style={{
                        flexDirection: 'row', alignItems: 'center',
                        backgroundColor: 'white', padding: 8, gap: 7, borderColor: '#D0D0D0', borderWidth: 1, marginTop: 10
                    }}>

                        {selectedOption == "cash" ? (
                            <FontAwesome6 name="dot-circle" size={20} color="#008397" />
                        ) : (
                            <Entypo onPress={() => setSlectedOption("cash")} name="circle" size={20} color="gray" />
                        )}

                        <Text>Cash on Delivery</Text>
                    </View>

                    <View style={{
                        flexDirection: 'row', alignItems: 'center',
                        backgroundColor: 'white', padding: 8, gap: 7, borderColor: '#D0D0D0', borderWidth: 1, marginTop: 10
                    }}>

                        {
                            selectedOption == "card" ? (
                                <FontAwesome6 name="dot-circle" size={20} color="#008397" />
                            ) : (
                                <Entypo onPress={() => setSlectedOption("card")} name="circle" size={20} color="gray" />
                            )
                        }


                        <Text>JazzCash/ EasyPaisa / Card</Text>
                    </View>
                    <Pressable
                        onPress={() => setCurrentStep(3)}
                        style={{
                            backgroundColor: '#FFC72C', padding: 10, borderRadius: 20,
                            justifyContent: 'center', alignItems: 'center', marginTop: 15
                        }}>
                        <Text>Continue</Text>
                    </Pressable>

                </View>
            )}


            {currentStep === 3 && selectedOption === "cash" && (
                <View style={{ marginHorizontal: 20 }}>
                    <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Order Now</Text>
                    <View
                        style={{
                            flexDirection: "row",
                            alignItems: "center",
                            justifyContent: "space-between",
                            gap: 8,
                            backgroundColor: "white",
                            padding: 8,
                            borderColor: "#D0D0D0",
                            borderWidth: 1,
                            marginTop: 10,
                        }}
                    >
                        <View>
                            <Text style={{ fontSize: 17, fontWeight: "bold" }}>
                                Save 5% and never run out
                            </Text>
                            <Text style={{ fontSize: 15, color: "gray", marginTop: 5 }}>
                                Turn on auto deliveries
                            </Text>
                        </View>

                        <MaterialIcons
                            name="keyboard-arrow-right"
                            size={24}
                            color="black"
                        />
                    </View>

                    <View style={{

                        backgroundColor: "white",
                        padding: 8,
                        borderColor: "#D0D0D0",
                        borderWidth: 1,
                        marginTop: 10,
                    }}>
                        <Text>Shipping to {selectedAddress?.name}</Text>
                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                            <Text style={{ fontSize: 16, fontWeight: '500', color: 'gray' }}>Items</Text>
                            <Text style={{ fontSize: 16, color: 'gray' }}>RS {total}</Text>

                        </View>

                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                            <Text style={{ fontSize: 16, fontWeight: '500', color: 'gray' }}>Delivery</Text>
                            <Text style={{ fontSize: 16, color: 'gray' }}>RS 0</Text>

                        </View>

                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                            <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Order Total</Text>
                            <Text style={{ fontSize: 17, color: '#C60C30', fontWeight: 'bold' }}>RS {total}</Text>

                        </View>


                    </View>

                    <View style={{

                        backgroundColor: "white",
                        padding: 8,
                        borderColor: "#D0D0D0",
                        borderWidth: 1,
                        marginTop: 10,
                    }}>
                        <Text style={{ fontSize: 16, color: 'gray' }}>Pay With</Text>
                        <Text style={{ fontSize: 16, fontWeight: '500' }}>Pay on Delivery (Cash)</Text>

                    </View>

                    <Pressable
                        onPress={handlePlaceOrder}

                        style={{
                            backgroundColor: '#FFC72C', padding: 10, borderRadius: 20,
                            justifyContent: 'center', alignItems: 'center', marginTop: 15
                        }}>
                        <Text>Place Your Order</Text>
                    </Pressable>
                </View>

            )}
        </ScrollView>
    )
}

export default ConfirmationScreen

const styles = StyleSheet.create({
    View1: {
        backgroundColor: '#00CDE1',
        flexDirection: 'row',
        padding: 10,
        alignItems: 'center'
    },
    Press1: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'white',
        marginHorizontal: 17,
        gap: 10,
        height: 38,
        borderRadius: 4,
        flex: 1
    },
    AddAddress: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10,
        borderColor: '#D0D0D0',
        alignItems: 'center',
        borderWidth: 1,
        borderLeftWidth: 0,
        borderRightWidth: 0,
        paddingVertical: 7,
        paddingHorizontal: 5
    },
    addresses: {
        borderWidth: 1,
        borderColor: '#D0D0D0',
        padding: 10,
        flexDirection: 'column',
        gap: 5,
        marginVertical: 10,
    },
    addressesview: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 3
    },
    edit: {
        backgroundColor: '#F5F5F5',
        paddingHorizontal: 10,
        paddingVertical: 6,
        borderRadius: 5,
        borderWidth: 0.9,
        borderColor: '#D0D0D0 '
    }
})