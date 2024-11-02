import { ScrollView, StyleSheet, Text, View, TextInput, Pressable, ImageBackground, Dimensions } from 'react-native'
import React, { useState } from 'react'
import AntDesign from '@expo/vector-icons/AntDesign';
import Feather from '@expo/vector-icons/Feather';
import { useNavigation, useRoute } from '@react-navigation/native';
import Entypo from '@expo/vector-icons/Entypo';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../Redux/CartReducer';


const ProductinfoScreen = () => {
    const route = useRoute();

    const { width } = Dimensions.get("window");

    const navigation = useNavigation();

    const height = (width * 100) / 100;

    const dispatch = useDispatch();
    const [addedToCart, setAddedToCart] = useState(false);

    const addItemToCart = (item) => {
        setAddedToCart(true);
        dispatch(addToCart(item));
        setTimeout(() => {
            setAddedToCart(false)
        }, 60000);
    }
    const cart = useSelector((state) => state.cart.cart);
    console.log("array", cart);
    return (
        <ScrollView style={styles.scroll}>
            <View style={styles.View1}>
                <Pressable style={styles.Press1}>
                    <AntDesign style={{ paddingLeft: 10 }} name="search1" size={22} color="black" />
                    <TextInput placeholder='search Shopizone.in' />
                </Pressable>

                <Feather name="mic" size={24} color="black" />
            </View>

            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {
                    route.params.carouselImages.map((item, index) => (
                        <ImageBackground style={{ width, height, marginTop: 25, resizeMode: "contain" }} source={{ uri: item }} key={index}>
                            <View style={styles.ImageBackgroundView}>
                                <View style={styles.offview}>
                                    <Text style={styles.offtext}>20% Off</Text>
                                </View>

                                <View style={styles.offview}>
                                    <Entypo name="share" size={24} color="white" />
                                </View>

                            </View>

                            <View style={styles.heartview}>
                                <AntDesign name="hearto" size={24} color="black" />
                            </View>

                        </ImageBackground>
                    ))
                }
            </ScrollView>
            <View style={{ padding: 10 }}>
                <Text style={{ fontSize: 15, fontWeight: "500" }}>{route?.params?.title}</Text>

                <Text style={{ fontSize: 18, fontWeight: "bold", marginTop: 6 }}>Rs {route?.params?.price}</Text>

            </View>
            <Text style={{ height: 1, borderColor: '#D0D0D0', borderWidth: 1 }} />

            <View style={{ padding: 10, flexDirection: 'row', alignItems: 'center' }}>
                <Text style={{ fontSize: 15 }}>Color:</Text>
                <Text style={{ fontSize: 15, fontWeight: "bold" }}>{route?.params?.color}</Text>
            </View>

            <View style={{ padding: 10, flexDirection: 'row', alignItems: 'center' }}>
                <Text style={{ fontSize: 15 }}>Size:</Text>
                <Text style={{ fontSize: 15, fontWeight: "bold" }}>{route?.params?.size}</Text>
            </View>

            <Text style={{ height: 1, borderColor: '#D0D0D0', borderWidth: 1 }} />

            <View style={{ padding: 10 }}>
                <Text style={{ fontSize: 15, fontWeight: 'bold' }}>Total: Rs {route?.params?.price}</Text>

                <View style={{ flexDirection: 'row', marginVertical: 5, gap: 5, alignItems: 'center' }}>
                    <Entypo name="location-pin" size={24} color="black" />
                    <Text>Deliver to -User JoharTown Lahore 473000</Text>
                </View>
            </View>
            <Text style={{ color: 'green', marginHorizontal: 10, fontSize: 15, fontWeight: 'bold' }}>In Stock</Text>

            <Pressable
                onPress={() => addItemToCart(route?.params?.item)}
                style={styles.addtocartpress}>
                {addedToCart ? (
                    <View>
                        <Text>Added to Cart</Text>
                    </View>

                ) : (
                    <Text>Add to Cart</Text>
                )}

            </Pressable>
            <Pressable style={styles.addtocartpress}>
                <Text>Buy Now</Text>
            </Pressable>
        </ScrollView>

    )
}

export default ProductinfoScreen

const styles = StyleSheet.create({
    addtocartpress: {
        padding: 10,
        backgroundColor: '#FFC72C',
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 10,
        marginVertical: 10
    },
    scroll: {
        backgroundColor: 'white',
        marginTop: 45,
        flex: 1
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
    ImageBackground: {
        marginTop: 25,
        resizeMode: 'contain'
    },
    offview: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#C60C30',
        justifyContent: 'center',
        alignItems: "center",
        flexDirection: "row"

    },
    offtext: {
        color: 'white',
        fontSize: 12,
        textAlign: 'center',
        fontWeight: 'bold'
    },
    ImageBackgroundView: {
        padding: 20,
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row'
    },
    heartview: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#E0E0E0',
        justifyContent: 'center',
        alignItems: "center",
        flexDirection: "row",
        marginTop: 'auto',
        marginLeft: 20,
        marginBottom: 20
    }
})