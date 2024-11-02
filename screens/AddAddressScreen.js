import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useEffect, useState, useContext, useCallback } from 'react';
import AntDesign from '@expo/vector-icons/AntDesign';
import Feather from '@expo/vector-icons/Feather';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { UserType } from '../UserContext';
import Entypo from '@expo/vector-icons/Entypo';

const AddAddressScreen = () => {
    const navigation = useNavigation();
    const [addresses, setAddresses] = useState([]);
    const { userId, setUserId } = useContext(UserType);


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
    // refesh the addresses when the component is focused
    useFocusEffect(
        useCallback(()=>{
            fetchAddresses();
        })
    )
    console.log("addresses get", addresses)

    return (
        <ScrollView showsVerticalScrollIndicator={false} style={{ marginTop: 50 }}>
            <View style={styles.View1}>
                <Pressable style={styles.Press1}>
                    <AntDesign style={{ paddingLeft: 10 }} name="search1" size={22} color="black" />
                    <TextInput placeholder='search Shopizone.in' />
                </Pressable>

                <Feather name="mic" size={24} color="black" />
            </View>
            <View style={{ padding: 10 }}>
                <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Your Address</Text>
                <Pressable
                    onPress={() => navigation.navigate('Add')}
                    style={styles.AddAddress}
                >
                    <Text>Add a new Address</Text>
                    <MaterialIcons name="keyboard-arrow-right" size={24} color="black" />
                </Pressable>

                <Pressable>
                    {/* All the added addresses */}
                    {addresses?.map((item, index) => (
                        <Pressable key={index} style={styles.addresses}>
                            <View style={styles.addressesview}>
                                <Text style={{fontSize:15,fontWeight:'bold'}}>{item?.name}</Text>
                                <Entypo name="location-pin" size={24} color="red" />
                            </View>
                            <Text style={{fontSize:15,color:'#181818'}}>{item?.houseno},{item?.landmark}</Text>

                            <Text style={{fontSize:15,color:'#181818'}}>{item?.street}</Text>

                            <Text style={{fontSize:15,color:'#181818'}}>{item?.mobileno}</Text>

                            <Text style={{fontSize:15,color:'#181818'}}>{item?.postalcode}</Text>

                            <View style={{flexDirection:'row',gap:10,marginTop:7,alignItems:'center'}}>
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

                        </Pressable>
                    ))}
                </Pressable>
            </View>
        </ScrollView>
    )
}

export default AddAddressScreen

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
    addressesview:{
        flexDirection:'row',
        alignItems:'center',
        gap:3
    },
    edit:{
        backgroundColor:'#F5F5F5',
        paddingHorizontal:10,
        paddingVertical:6,
        borderRadius:5,
        borderWidth:0.9,
        borderColor:'#D0D0D0 '
    }
})