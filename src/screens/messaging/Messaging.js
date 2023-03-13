import React, { useLayoutEffect, useState } from "react";
import { View, TextInput, Text, FlatList, Pressable, useWindowDimensions } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import MessageComponent from "../../components/MessageComponent";
import { styles } from "../../utils/styles";
import Ionicons from '@expo/vector-icons/Ionicons'
import { useNavigation } from "@react-navigation/native";

const Messaging = ({ route, navigation }) => {
    const [chatMessages, setChatMessages] = useState([
        {
            id: "1",
            text: "Hello guys, welcome!",
            time: "07:50",
            user: "Tomer",
        },
        {
            id: "2",
            text: "Hi Tomer, thank you! 😇",
            time: "08:50",
            user: "David",
        },
    ]);
    const [message, setMessage] = useState("");
    const [user, setUser] = useState("");
    const {width, height} = useWindowDimensions();
    // const navigation = useNavigation();

    //👇🏻 Access the chatroom's name and id
    // const { name, id } = route.params;
    const {name, id} = {
        id: "1",
        text: "Hello guys, welcome!",
        time: "07:50",
        user: "Tomer",
    }

//👇🏻 This function gets the username saved on AsyncStorage
    const getUsername = async () => {
        // try {
        //     const value = await AsyncStorage.getItem("username");
        //     if (value !== null) {
        //         setUser(value);
        //     }
        // } catch (e) {
        //     console.error("Error while loading username!");
        // }
        return "Mudiaga"
    };

    //👇🏻 Sets the header title to the name chatroom's name
    useLayoutEffect(() => {
        navigation.setOptions({ title: name });
        getUsername()
    }, []);

    /*👇🏻 
        This function gets the time the user sends a message, then 
        logs the username, message, and the timestamp to the console.
     */
    const handleNewMessage = () => {
        const hour =
            new Date().getHours() < 10
                ? `0${new Date().getHours()}`
                : `${new Date().getHours()}`;

        const mins =
            new Date().getMinutes() < 10
                ? `0${new Date().getMinutes()}`
                : `${new Date().getMinutes()}`;

        console.log({
            message,
            user,
            timestamp: { hour, mins },
        });
    };

    return (
        <View style={styles.messagingscreen}>
            <View
                style={[
                    styles.messagingscreen,
                    { paddingBottom: 15, paddingHorizontal: 10 },
                ]}
            >
                <View style={{height: 50, 
                    backgroundColor: '#ffffff',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    paddingHorizontal: 20,
                    width:width,
                    flexDirection: 'row',
                    marginLeft: -10,
                    elevation: 2,
                    marginBottom: 30}}>
                    <Ionicons onPress={() => navigation.goBack()} name="arrow-back" size={30} color="green" />
                    <Text style={{fontSize: 20, color: 'green', fontWeight:'700'}}>Mudiaga Obriki</Text>
                    <Ionicons name="person-circle-outline" size={30} color="green" />
                </View>
                {chatMessages[0] ? (
                    <FlatList
                        data={chatMessages}
                        renderItem={({ item }) => (
                            <MessageComponent item={item} user={user} />
                        )}
                        keyExtractor={(item) => item.id}
                    />
                ) : (
                    ""
                )}
            </View>

            <View style={[styles.messaginginputContainer,{alignItems: 'center', height: 30, backgroundColor:'transparent'}]}>
                <Ionicons name="cash-outline" color={'green'} size={30} />
                <Ionicons name="attach-outline" color={'green'} size={30} style={{marginLeft: 10,}} />
                <TextInput
                    style={[styles.messaginginput,{ backgroundColor:'white',height: 45, borderRadius: 30, marginLeft: 10, borderWidth: 0.5}]}
                    onChangeText={(value) => setMessage(value)}
                />
                <Ionicons name="send" color={'green'} size={30} onPress={handleNewMessage} />
                {/* <Pressable
                    style={styles.messagingbuttonContainer}
                    onPress={handleNewMessage}
                >
                    <View>
                        <Text style={{ color: "#f2f0f1", fontSize: 20 }}>SEND</Text>
                    </View>
                </Pressable> */}
            </View>
        </View>
    );
};

export default Messaging;