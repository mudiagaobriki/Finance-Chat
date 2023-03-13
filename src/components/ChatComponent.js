import { View, Text, Pressable } from "react-native";
import React, { useLayoutEffect, useState } from "react";
import {Ionicons} from "@expo/vector-icons";
// import { useNavigation } from "@react-navigation/native";
import { styles } from "../utils/styles";

const ChatComponent = ({ item, onPress }) => {
    // const navigation = useNavigation();
    const [messages, setMessages] = useState({});

    //👇🏻 Retrieves the last message in the array from the item prop
    // useLayoutEffect(() => {
    //     setMessages(item.messages[item.messages.length - 1]);
    // }, []);

    ///👇🏻 Navigates to the Messaging screen
    // const handleNavigation = () => {
    //     navigation.navigate("Messaging", {
    //         id: item.id,
    //         name: item.name,
    //     });
    // };

    return (
        <Pressable style={styles.cchat} 
        onPress={onPress}
        >
            <Ionicons
                name='person-circle-outline'
                size={45}
                color='black'
                style={styles.cavatar}
            />

            <View style={styles.crightContainer}>
                <View>
                    <Text style={styles.cusername}>{item}</Text>

                    <Text style={styles.cmessage}>
                        {"Hi Michael..."}
                    </Text>
                </View>
                <View>
                    <Text style={styles.ctime}>
                        {messages?.time ? messages.time : "now"}
                    </Text>
                </View>
            </View>
        </Pressable>
    );
};

export default ChatComponent;