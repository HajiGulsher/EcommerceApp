import { StyleSheet, Text, View, Pressable, Image } from 'react-native'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addToCart } from '../Redux/CartReducer';

const ProductItem = ({ item }) => {
    const [addedToCart, setAddedToCart] = useState(false);
    const dispatch = useDispatch();
    const addItemToCart = (item) => {
        setAddedToCart(true);
        dispatch(addToCart(item));
        setTimeout(() => {
            setAddedToCart(false)
        }, 60000);
    }
    return (
        <Pressable style={styles.press1}>
            <Image style={styles.image} source={{ uri: item?.image }} />
            <Text style={styles.text1} numberOfLines={1}>{item?.title}</Text>
            <View style={styles.viewprice}>
                <Text numberOfLines={1}>Price : {item?.price} </Text>
                <Text style={styles.rating}>{item?.rating?.rate} Rating</Text>
            </View>

            <Pressable
                onPress={() => addItemToCart(item)}
                style={styles.addtocart}>
                {addedToCart ? (
                    <View>
                        <Text>Added to Cart</Text>
                    </View>

                ) : (
                    <Text>Add to Cart</Text>
                )}
            </Pressable>
            {/* <Text>{item?.category} </Text> */}
        </Pressable>
    )
}

export default ProductItem

const styles = StyleSheet.create({
    image: {
        width: 150,
        height: 150,
        resizeMode: "contain"
    },
    press1: {
        marginHorizontal: 20,
        marginVertical: 25
    },
    text1: {
        width: 150,
        marginTop: 10
    },
    price: {
        width: 150,
        marginTop: 3,
        fontWeight: '600'
    },
    viewprice: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 5
    },
    rating: {
        color: '#FFC72C',
        fontWeight: '500'
    },
    addtocart: {
        backgroundColor: '#FFC72C',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
        marginHorizontal: 20,
        marginTop: 10,
        borderRadius: 20
    }
})