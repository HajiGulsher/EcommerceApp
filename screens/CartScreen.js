import { ScrollView, StyleSheet, Text, View, Pressable, TextInput, Image } from 'react-native'
import React from 'react'
import AntDesign from '@expo/vector-icons/AntDesign';
import Feather from '@expo/vector-icons/Feather';
import { useDispatch, useSelector } from 'react-redux';
import { decrementQuantity, incrementQuantity, removeFromCart } from '../Redux/CartReducer';
import { useNavigation } from '@react-navigation/native';

const CartScreen = () => {
    const cart = useSelector((state) => state.cart.cart);
    console.log("in cart", cart);
    const total = cart?.map((item) => item.price * item.quantity).reduce((curr, prev) => curr + prev, 0);
    const dispatch = useDispatch();

    const navigation=useNavigation();


    const increaseQuantity = (item) => {
        dispatch(incrementQuantity(item))
    }

    const decreaseQuantity = (item) => {
        dispatch(decrementQuantity(item))
    }

    const deleteItem = (item) => {
        dispatch(removeFromCart(item))
    }


    return (
        <ScrollView style={styles.mainscroll}>
            <View style={styles.View1}>
                <Pressable style={styles.Press1}>
                    <AntDesign style={{ paddingLeft: 10 }} name="search1" size={22} color="black" />
                    <TextInput placeholder='search Shopizone.in' />
                </Pressable>

                <Feather name="mic" size={24} color="black" />
            </View>

            <View style={styles.viewtotal}>
                <Text style={{ fontSize: 18, fontWeight: '500' }}>Subtotal : </Text>
                <Text style={{ fontSize: 20, fontWeight: 'bold' }}>{total}</Text>
            </View>

            <Text style={{ marginHorizontal: 15 }}>EMI details</Text>
            <Pressable
            onPress={()=>navigation.navigate('Confirmation')}
            style={{ backgroundColor: '#FFC72C', borderRadius: 5, padding: 10, justifyContent: 'center', alignItems: 'center', marginHorizontal: 10, marginTop: 10 }}>
                <Text>Proceed to Buy ({cart.length}) items</Text>
            </Pressable>

            <Text style={{ height: 1, borderColor: '#D0D0D0', borderWidth: 1, marginTop: 16 }} />

            <View style={{ marginHorizontal: 10 }}>
                {cart?.map((item, index) => (
                    <View style={styles.view2} key={index}>
                        <Pressable style={{ marginVertical: 10, flexDirection: 'row', justifyContent: 'space-around' }}>
                            <View>
                                <Image style={styles.image} source={{ uri: item?.image }} />
                            </View>

                            <View>
                                <Text numberOfLines={4} style={{ width: 150, marginTop: 10 }}>{item?.title}</Text>
                                <Text style={{ fontSize: 20, fontWeight: 'bold', marginTop: 6 }}>Rs {item?.price}</Text>
                                {/* <Text>{item?.quantity}</Text> */}
                            </View>
                        </Pressable>

                        <Pressable style={{ marginTop: 15, flexDirection: 'row', alignItems: 'center', gap: 10 }}>
                            <View style={styles.view3}>

                                {item?.quantity > 1 ? ( 
                                      <Pressable
                                      onPress={()=>decreaseQuantity(item)}
                                      style={{ backgroundColor: '#D0D0D0', padding: 7, borderTopLeftRadius: 6, borderBottomLeftRadius: 6 }}>
                                      <AntDesign name="minus" size={24} color="black" />
                                  </Pressable>
                                ): (
                                    <Pressable 
                                    onPress={()=>deleteItem(item)}
                                    style={{ backgroundColor: '#D0D0D0', padding: 7, borderTopLeftRadius: 6, borderBottomLeftRadius: 6 }}>
                                    <AntDesign name="delete" size={24} color="black" />
                                </Pressable>
                                )}


                                <Pressable style={{ backgroundColor: 'white', paddingHorizontal: 18, paddingVertical: 6 }}>
                                    <Text>{item?.quantity}</Text>
                                </Pressable>

                                <Pressable
                                    onPress={() => increaseQuantity(item)}
                                    style={styles.plus}>
                                    <AntDesign name="plus" size={24} color="black" />
                                </Pressable>
                            </View>
                            <Pressable
                            onPress={()=>deleteItem(item)} 
                            style={styles.DelSavSee}>
                                <Text>Delete</Text>
                            </Pressable>
                        </Pressable>

                        <Pressable style={{ flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 15, marginTop: 15 }}>
                            <Pressable style={styles.DelSavSee}>
                                <Text>Save for Later</Text>
                            </Pressable>
                            <Pressable style={styles.DelSavSee}>
                                <Text>See more like this</Text>
                            </Pressable>
                        </Pressable>
                    </View>
                ))}
            </View>

        </ScrollView>
    )
}

export default CartScreen

const styles = StyleSheet.create({
    mainscroll: {
        marginTop: 50,
        flex: 1,
        backgroundColor: 'white'
    },
    plus: {
        backgroundColor: '#D0D0D0', padding: 7, borderTopLeftRadius: 6, borderBottomLeftRadius: 6
    },
    DelSavSee: {
        backgroundColor: 'white',
        paddingHorizontal: 8,
        paddingVertical: 10,
        borderRadius: 5,
        borderColor: '#C0C0C0',
        borderWidth: 0.6
    },
    image: {
        width: 140,
        height: 140,
        resizeMode: 'contain'
    },
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
    viewtotal: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10
    },
    view2: {
        backgroundColor: 'white',
        marginVertical: 10,
        borderBottomColor: '#F0F0F0',
        borderWidth: 2,
        borderTopWidth: 0,
        borderLeftWidth: 0,
        borderRightWidth: 0
    },
    view3: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 7
    }
})