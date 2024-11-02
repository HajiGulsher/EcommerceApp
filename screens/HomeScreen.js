import {
    Pressable, SafeAreaView, ScrollView,
    StyleSheet, Text, TextInput, View, Image, Dimensions
} from 'react-native'
import React, { useEffect, useState, useCallback, useContext } from 'react'
import AntDesign from '@expo/vector-icons/AntDesign';
import Feather from '@expo/vector-icons/Feather';
import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import axios from 'axios';
import ProductItem from '../components/productItem';
import DropDownPicker from "react-native-dropdown-picker";
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { BottomModal, ModalContent, SlideAnimation } from 'react-native-modals';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { UserType } from '../UserContext';
import Entypo from '@expo/vector-icons/Entypo';



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



// import { SliderBox } from 'react-native-image-slider-box';
const { width } = Dimensions.get('window');
const HomeScreen = () => {
    const list = [
        {
            id: "0",
            image: "https://m.media-amazon.com/images/I/41EcYoIZhIL._AC_SY400_.jpg",
            name: "Home",
        },
        {
            id: "1",
            image:
                "https://m.media-amazon.com/images/G/31/img20/Events/Jup21dealsgrid/blockbuster.jpg",
            name: "Deals",
        },
        {
            id: "3",
            image:
                "https://images-eu.ssl-images-amazon.com/images/I/31dXEvtxidL._AC_SX368_.jpg",
            name: "Electronics",
        },
        {
            id: "4",
            image:
                "https://m.media-amazon.com/images/G/31/img20/Events/Jup21dealsgrid/All_Icons_Template_1_icons_01.jpg",
            name: "Mobiles",
        },
        {
            id: "5",
            image:
                "https://m.media-amazon.com/images/G/31/img20/Events/Jup21dealsgrid/music.jpg",
            name: "Music",
        },
        {
            id: "6",
            image: "https://m.media-amazon.com/images/I/51dZ19miAbL._AC_SY350_.jpg",
            name: "Fashion",
        },
    ];
    const images = [
        "https://img.etimg.com/thumb/msid-93051525,width-1070,height-580,imgsize-2243475,overlay-economictimes/photo.jpg",
        "https://images-eu.ssl-images-amazon.com/images/G/31/img22/Wireless/devjyoti/PD23/Launches/Updated_ingress1242x550_3.gif",
        "https://images-eu.ssl-images-amazon.com/images/G/31/img23/Books/BB/JULY/1242x550_Header-BB-Jul23.jpg",
    ];
    const deals = [
        {
            id: "20",
            title: "OnePlus Nord CE 3 Lite 5G (Pastel Lime, 8GB RAM, 128GB Storage)",
            oldPrice: 25000,
            price: 19000,
            image:
                "https://images-eu.ssl-images-amazon.com/images/G/31/wireless_products/ssserene/weblab_wf/xcm_banners_2022_in_bau_wireless_dec_580x800_once3l_v2_580x800_in-en.jpg",
            carouselImages: [
                "https://m.media-amazon.com/images/I/61QRgOgBx0L._SX679_.jpg",
                "https://m.media-amazon.com/images/I/61uaJPLIdML._SX679_.jpg",
                "https://m.media-amazon.com/images/I/510YZx4v3wL._SX679_.jpg",
                "https://m.media-amazon.com/images/I/61J6s1tkwpL._SX679_.jpg",
            ],
            color: "Stellar Green",
            size: "6 GB RAM 128GB Storage",
        },
        {
            id: "30",
            title:
                "Samsung Galaxy S20 FE 5G (Cloud Navy, 8GB RAM, 128GB Storage) with No Cost EMI & Additional Exchange Offers",
            oldPrice: 74000,
            price: 26000,
            image:
                "https://images-eu.ssl-images-amazon.com/images/G/31/img23/Wireless/Samsung/SamsungBAU/S20FE/GW/June23/BAU-27thJune/xcm_banners_2022_in_bau_wireless_dec_s20fe-rv51_580x800_in-en.jpg",
            carouselImages: [
                "https://m.media-amazon.com/images/I/81vDZyJQ-4L._SY879_.jpg",
                "https://m.media-amazon.com/images/I/61vN1isnThL._SX679_.jpg",
                "https://m.media-amazon.com/images/I/71yzyH-ohgL._SX679_.jpg",
                "https://m.media-amazon.com/images/I/61vN1isnThL._SX679_.jpg",
            ],
            color: "Cloud Navy",
            size: "8 GB RAM 128GB Storage",
        },
        {
            id: "40",
            title:
                "Samsung Galaxy M14 5G (ICY Silver, 4GB, 128GB Storage) | 50MP Triple Cam | 6000 mAh Battery | 5nm Octa-Core Processor | Android 13 | Without Charger",
            oldPrice: 16000,
            price: 14000,
            image:
                "https://images-eu.ssl-images-amazon.com/images/G/31/img23/Wireless/Samsung/CatPage/Tiles/June/xcm_banners_m14_5g_rv1_580x800_in-en.jpg",
            carouselImages: [
                "https://m.media-amazon.com/images/I/817WWpaFo1L._SX679_.jpg",
                "https://m.media-amazon.com/images/I/81KkF-GngHL._SX679_.jpg",
                "https://m.media-amazon.com/images/I/61IrdBaOhbL._SX679_.jpg",
            ],
            color: "Icy Silver",
            size: "6 GB RAM 64GB Storage",
        },
        {
            id: "40",
            title:
                "realme narzo N55 (Prime Blue, 4GB+64GB) 33W Segment Fastest Charging | Super High-res 64MP Primary AI Camera",
            oldPrice: 12999,
            price: 10999,
            image:
                "https://images-eu.ssl-images-amazon.com/images/G/31/tiyesum/N55/June/xcm_banners_2022_in_bau_wireless_dec_580x800_v1-n55-marchv2-mayv3-v4_580x800_in-en.jpg",
            carouselImages: [
                "https://m.media-amazon.com/images/I/41Iyj5moShL._SX300_SY300_QL70_FMwebp_.jpg",
                "https://m.media-amazon.com/images/I/61og60CnGlL._SX679_.jpg",
                "https://m.media-amazon.com/images/I/61twx1OjYdL._SX679_.jpg",
            ],
        },
    ];
    const offers = [
        {
            id: "0",
            title:
                "Oppo Enco Air3 Pro True Wireless in Ear Earbuds with Industry First Composite Bamboo Fiber, 49dB ANC, 30H Playtime, 47ms Ultra Low Latency,Fast Charge,BT 5.3 (Green)",
            offer: "72% off",
            oldPrice: 7500,
            price: 4500,
            image:
                "https://m.media-amazon.com/images/I/61a2y1FCAJL._AC_UL640_FMwebp_QL65_.jpg",
            carouselImages: [
                "https://m.media-amazon.com/images/I/61a2y1FCAJL._SX679_.jpg",
                "https://m.media-amazon.com/images/I/71DOcYgHWFL._SX679_.jpg",
                "https://m.media-amazon.com/images/I/71LhLZGHrlL._SX679_.jpg",
                "https://m.media-amazon.com/images/I/61Rgefy4ndL._SX679_.jpg",
            ],
            color: "Green",
            size: "Normal",
        },
        {
            id: "1",
            title:
                "Fastrack Limitless FS1 Pro Smart Watch|1.96 Super AMOLED Arched Display with 410x502 Pixel Resolution|SingleSync BT Calling|NitroFast Charging|110+ Sports Modes|200+ Watchfaces|Upto 7 Days Battery",
            offer: "40%",
            oldPrice: 7955,
            price: 3495,
            image: "https://m.media-amazon.com/images/I/41mQKmbkVWL._AC_SY400_.jpg",
            carouselImages: [
                "https://m.media-amazon.com/images/I/71h2K2OQSIL._SX679_.jpg",
                "https://m.media-amazon.com/images/I/71BlkyWYupL._SX679_.jpg",
                "https://m.media-amazon.com/images/I/71c1tSIZxhL._SX679_.jpg",
            ],
            color: "black",
            size: "Normal",
        },
        {
            id: "2",
            title: "Aishwariya System On Ear Wireless On Ear Bluetooth Headphones",
            offer: "40%",
            oldPrice: 7955,
            price: 3495,
            image: "https://m.media-amazon.com/images/I/41t7Wa+kxPL._AC_SY400_.jpg",
            carouselImages: ["https://m.media-amazon.com/images/I/41t7Wa+kxPL.jpg"],
            color: "black",
            size: "Normal",
        },
        {
            id: "3",
            title:
                "Fastrack Limitless FS1 Pro Smart Watch|1.96 Super AMOLED Arched Display with 410x502 Pixel Resolution|SingleSync BT Calling|NitroFast Charging|110+ Sports Modes|200+ Watchfaces|Upto 7 Days Battery",
            offer: "40%",
            oldPrice: 24999,
            price: 19999,
            image: "https://m.media-amazon.com/images/I/71k3gOik46L._AC_SY400_.jpg",
            carouselImages: [
                "https://m.media-amazon.com/images/I/41bLD50sZSL._SX300_SY300_QL70_FMwebp_.jpg",
                "https://m.media-amazon.com/images/I/616pTr2KJEL._SX679_.jpg",
                "https://m.media-amazon.com/images/I/71wSGO0CwQL._SX679_.jpg",
            ],
            color: "Norway Blue",
            size: "8GB RAM, 128GB Storage",
        },
    ];
    const [product, setProduct] = useState([]);

    const [open, setOpen] = useState(false);

    const navigation = useNavigation();

    const [addresses, setAddresses] = useState([]);
    const [selectedAddress, setSelectedAddress] = useState("");
    console.log("hereee is address", selectedAddress)
    const { userId, setUserId } = useContext(UserType);


    const [category, setCategory] = useState("jewelery");

    const [items, setItems] = useState([
        { label: "Men's clothing", value: "men's clothing" },
        { label: "jewelery", value: "jewelery" },
        { label: "electronics", value: "electronics" },
        { label: "women's clothing", value: "women's clothing" },
    ]);

    useEffect(() => {
        const fetchdata = async () => {
            try {
                const response = await axios.get("https://fakestoreapi.com/products");
                setProduct(response.data);
            } catch (error) {
                console.log("error", error)
            }
        }
        fetchdata();
    }, [])
    const onGenderOpen = useCallback(() => {
        setCompanyOpen(false);
    }, []);

    const cart = useSelector((state) => state.cart.cart);
    // console.log("array", cart);
    const [modalVisible, setModalVisible] = useState(false);
    // token code
    useEffect(() => {
        if (userId) {
            fetchAddresses();
        }
    }, [userId, modalVisible])

    const fetchAddresses = async () => {
        try {
            const response = await axios.get(`http://192.168.100.149:8081/api/users/addresses/${userId}`)
            const { addresses } = response.data;

            setAddresses(addresses);
        } catch (error) {
            console.log("error", error)
        }
    }

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

    console.log("addresses", addresses);

    return (
        <>
            <SafeAreaView style={styles.SafeAreaView}>
                <ScrollView>
                    <View style={styles.View1}>
                        <Pressable style={styles.Press1}>
                            <AntDesign style={{ paddingLeft: 10 }} name="search1" size={22} color="black" />
                            <TextInput placeholder='search Shopizone.in' />
                        </Pressable>

                        <Feather name="mic" size={24} color="black" />
                    </View>

                    <Pressable
                        onPress={() => setModalVisible(!modalVisible)}
                        style={styles.View2}>
                        <Ionicons name="location-outline" size={24} color="black" />
                        <Pressable>
                            {selectedAddress?(
                                <Text>Deliver to {selectedAddress?.name},{selectedAddress?.street}</Text>
                            ):(
                                <Text style={{fontSize:13,fontWeight:'500'}}>Sdd a Address</Text>
                            )}
                        </Pressable>
                        <MaterialIcons name="keyboard-arrow-down" size={24} color="black" />
                    </Pressable>

                    <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.scrollhorizotal} >
                        {
                            list.map((item, index) => (
                                <Pressable key={index} style={styles.press2}>
                                    <Image style={styles.images} source={{ uri: item.image }} />
                                    <Text style={styles.name}>{item.name}</Text>
                                </Pressable>

                            ))
                        }
                    </ScrollView>
                    <ScrollView
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        style={styles.scrollHorizontal}
                        pagingEnabled
                    >
                        {images.map((item, index) => (
                            <View key={index} style={styles.imageContainer}>
                                <Image source={{ uri: item }} style={styles.image} />
                            </View>
                        ))}
                    </ScrollView>
                    {/* <SliderBox images={images} autoPlay circleLoop dotColor={"#13274F"} inactiveDotColor="#90A4AE" ImageComponentStyle={{width:"100"}}/> */}
                    <Text style={{ padding: 10, fontSize: 18, fontWeight: "bold" }}>Trending Deals Of The Week</Text>

                    <View style={styles.dealsview}>
                        {
                            deals.map((item, index) => (
                                <Pressable
                                    onPress={() =>
                                        navigation.navigate("Info", {
                                            id: item.id,
                                            title: item.title,
                                            price: item?.price,
                                            carouselImages: item.carouselImages,
                                            color: item?.color,
                                            size: item?.size,
                                            oldPrice: item?.oldPrice,
                                            item: item,
                                        })
                                    }
                                    style={styles.dealspress} key={index}>
                                    <Image style={styles.dealsimage} source={{ uri: item?.image }} />
                                </Pressable>
                            ))
                        }
                    </View>
                    <Text style={{ height: 1, borderColor: "#D0D0D0", borderWidth: 2, marginTop: 15 }} />
                    <Text style={{ fontSize: 18, fontWeight: 'bold', padding: 10 }}>Today's Deals</Text>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                        {
                            offers.map((item, index) => (
                                <Pressable
                                    onPress={() =>
                                        navigation.navigate("Info", {
                                            id: item.id,
                                            title: item.title,
                                            price: item?.price,
                                            carouselImages: item.carouselImages,
                                            color: item?.color,
                                            size: item?.size,
                                            oldPrice: item?.oldPrice,
                                            item: item,
                                        })
                                    }
                                    style={styles.offerspress} key={index}>
                                    <Image style={styles.offersimage} source={{ uri: item.image }} />
                                    <View style={styles.offerview}>
                                        <Text style={styles.offertext}>Up to{item?.offer}</Text>
                                    </View>
                                </Pressable>

                            ))
                        }
                    </ScrollView>
                    <Text style={{ height: 1, borderColor: "#D0D0D0", borderWidth: 2, marginTop: 15 }} />

                    <View
                        style={{
                            marginHorizontal: 10,
                            marginTop: 20,
                            width: "45%",
                            marginBottom: open ? 50 : 15,
                        }}
                    >
                        <DropDownPicker
                            style={{
                                borderColor: "#B7B7B7",
                                height: 30,
                                marginTop: 20,
                                marginBottom: open ? 120 : 15,
                            }}
                            open={open}
                            value={category} //genderValue
                            items={items}
                            setOpen={setOpen}
                            setValue={setCategory}
                            setItems={setItems}
                            placeholder="choose category"
                            placeholderStyle={styles.placeholderStyles}
                            onOpen={onGenderOpen}
                            // onChangeValue={onChange}
                            zIndex={3000}
                            zIndexInverse={1000}
                        />
                    </View>

                    <View style={{ flexDirection: 'row', alignItems: 'center', flexWrap: "wrap" }}>
                        {product?.filter((item) => item.category === category).map((item, index) => (
                            <ProductItem item={item} key={index} />
                        ))}

                    </View>


                </ScrollView>


            </SafeAreaView>

            <BottomModal
                onBackdropPress={() => setModalVisible(!modalVisible)}
                swipeDirection={["up", "down"]}
                swipeThreshold={200}
                modalAnimation={
                    new SlideAnimation({
                        slideFrom: "bottom"
                    })
                }
                onHardwareBackPress={() => setModalVisible(!modalVisible)}
                visible={modalVisible}
                onTouchOutside={() => setModalVisible(!modalVisible)}
            >
                <ModalContent style={styles.location}>
                    <View style={{ marginBottom: 8 }}>
                        <Text style={{ fontSize: 16, fontWeight: "500" }}>Choose your location</Text>
                        <Text style={{ fontSize: 16, marginTop: 5, color: 'gray' }}>Select the Delivery location to see the product avaibility and Delivery Options</Text>
                    </View>

                    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                        {/* already addresses add by user  */}
                        {addresses?.map((item, index) => (
                            <Pressable
                                onPress={() => setSelectedAddress(item)}
                                key={index} style={{
                                    width: 140, height: 140,
                                    justifyContent: 'center', borderColor: '#D0D0D0',
                                    borderWidth: 1, padding: 10, alignItems: 'center', gap: 3, marginRight: 15,
                                    backgroundColor:selectedAddress=== item? "#FBCEB1":"white"
                                }}>
                                <View style={styles.addressesview}>
                                    <Text style={{ fontSize: 15, fontWeight: 'bold' }}>{item?.name}</Text>
                                    <Entypo name="location-pin" size={24} color="red" />
                                </View>
                                <Text numberOfLines={1} style={{ width: 130, textAlign: 'center', fontSize: 13 }}>{item?.houseno},{item?.landmark}</Text>
                                <Text numberOfLines={1} style={{ width: 130, textAlign: 'center', fontSize: 13 }}>{item?.street}</Text>

                            </Pressable>
                        ))}

                        <Pressable
                            onPress={() => {
                                setModalVisible(false);
                                navigation.navigate("Address");
                            }}
                            style={styles.Addpick}>
                            <Text style={{ color: '#0066b2', textAlign: 'center', fontWeight: '500' }}>Add Address or Pick-up Point</Text>
                        </Pressable>
                    </ScrollView>
                    <View style={{ flexDirection: 'column', marginBottom: 30, gap: 7 }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5 }}>
                            <Ionicons name="location-outline" size={24} color="#0066b2" />
                            <Text style={{ color: '#0066b2', fontWeight: '400' }}>Enter PinCode</Text>
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5 }}>
                            <Ionicons name="locate-sharp" size={24} color="#0066b2" />
                            <Text style={{ color: '#0066b2', fontWeight: '400' }}>Enter PinCode</Text>
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5 }}>
                            <AntDesign name="earth" size={22} color="#0066b2" />
                            <Text style={{ color: '#0066b2', fontWeight: '400' }}>Enter PinCode</Text>
                        </View>
                    </View>

                </ModalContent>
            </BottomModal>



        </>


    )
}

export default HomeScreen

const styles = StyleSheet.create({
    SafeAreaView: {
        paddingTop: 40,
        flex: 1,
        backgroundColor: '#FAFAFA'
    },
    location: {
        width: "100%",
        height: 400
    },
    Addpick: {
        width: 140,
        height: 140,
        borderColor: '#D0D0D0',
        borderWidth: 1,
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center'
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
    View2: {
        padding: 10,
        backgroundColor: '#80DEEA',
        flexDirection: 'row',
        gap: 5
    },
    images: {
        width: 50,
        height: 50,
        resizeMode: "contain",
        borderRadius: 40
    },
    scrollhorizotal: {
        padding: 10,
        gap: 20
    },
    name: {
        fontSize: 12,
        fontWeight: '500',
        textAlign: 'center',
        marginTop: 5
    },
    press2: {
        margin: 10,
        justifyContent: 'center',
        alignItems: 'center'
    },
    slider: {
        width: 100
    },
    scrollhorizotal2: {
        padding: 10,

    },

    scrollHorizontal: {
        marginVertical: 10,
    },
    imageContainer: {
        width: width,  // To ensure the image takes up the entire screen width
    },
    image: {
        width: '100%',   // Full width of the container
        height: 250,     // Adjust height as per your needs
        resizeMode: 'cover', // Ensures the image scales properly
    },
    dealsimage: {
        width: 190,
        height: 190,
        resizeMode: "contain"
    },
    dealsview: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'center'
    },
    dealspress: {
        marginVertical: 10,
        alignItems: 'center',
        flexDirection: 'row'
    },
    offersimage: {
        width: 150,
        height: 150,
        resizeMode: 'contain',
        borderRadius: 30
    },
    offerspress: {
        marginVertical: 10,
        alignItems: 'center',
        justifyContent: 'center'
    },
    offerview: {
        backgroundColor: '#E31837',
        paddingVertical: 5,
        width: 130,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 10,
        borderRadius: 4
    },
    offertext: {
        textAlign: 'center',
        fontSize: 13,
        color: 'white',
        fontWeight: 'bold'
    },
    addressesview: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 3
    },
})