import React, { useEffect, useState } from "react";
import { View, Text, Pressable, SafeAreaView, FlatList,PermissionsAndroid, useWindowDimensions, ActivityIndicator } from "react-native";
import {Feather} from '@expo/vector-icons';
import ChatComponent from "../../components/ChatComponent";
import { styles } from "../../utils/styles";
import { FAB } from 'react-native-paper';
import { useNavigation } from "@react-navigation/native";
import NavigationNames from "../../navigation/NavigationNames";
import io from "socket.io-client";
// import { allUsers } from "../../utils/users"
import Ionicons from '@expo/vector-icons/Ionicons'
import { getData, storeData } from '../../utils/deviceStorage';
import { allUsers, getUserByUsername, updateUser } from "../../utils/users"

const socket = io.connect('http://loccalhost:4000');

console.log({socket})

// console.log(Contacts)

// import socket from "../../utils/socket";
import ContactsComponent from "../../components/ContactsComponent";
import { ScrollView } from "react-native-gesture-handler";

const PhoneContacts = () => {

    const navigation = useNavigation();
    const [contacts, setContacts] = useState([])
    const [isConnected, setIsConnected] = useState(socket.connected);
    const [lastPong, setLastPong] = useState(null);
    const [appUsers, setAppUsers] = useState([])
    const [loading, setLoading] = useState(true)
    const [username, setUsername] = useState('')

    const {width, height} = useWindowDimensions()

    useEffect(() => {
        // allUsers()
        // .then((u) => {
        //     let k = [u[0]]
        //     console.log("KKKK: ", k)
        //     setAppUsers(k)
        //     setLoading(false)
        // })
        setAppUsers([
            {
                name:  "Abasifreke",
                number: '08012345678'
            },
            {
                name:  "Bella",
                number: '09138475839'
            },
            {
                name:  "Olatunji",
                number: '08138885831'
            },
           
            // "Bella",
            // "Bimbo",
            // "Biodun",
            // "Mike",
            // "Olatunji"
        ])
        setLoading(false)
    },[])

    useEffect(() => {
        console.log(appUsers)
    },[appUsers, loading])

    useEffect(() => {
        getData('username')
        .then(res => {
            setUsername(`+234${res}`)
        })
    },[])

    const handleCreateRoom = () => {
        //👇🏻 sends a message containing the group name to the server
        socket.emit("createRoom", 'groupName');
        // closeModal();
    };

    const handleChat = (partnerId) => {
        console.log({partnerId})
        storeData('partner','+2348036718099')
        .then(res => {
            let payload = {
                partner: partnerId,
            }
            updateUser(username,payload)
            .then(up => {
                console.log({up})
                console.log('Partner Updated Successfully');
                navigation.navigate(NavigationNames.Messaging)
            })

            // let payloadForPartner = {
            //     partner: username
            // }
            // updateUser(partnerId,payloadForPartner)
            // .then(up => {
            //     console.log({up})
            //     console.log('Partner Updated Successfully for partner');
            // })
            // navigation.navigate(NavigationNames.Chat)
        })
    }

    return (
        <SafeAreaView style={{flex: 1}}>
        <ScrollView style={styles.chatscreen}>
            <View style={[styles.chattopContainer,{borderRadius: 5}]}>
                <View style={styles.chatheader}>
                    <Text style={styles.chatheading}>Contacts</Text>

            {/* 👇🏻 Logs "ButtonPressed" to the console when the icon is clicked */}
                    <Pressable onPress={() => console.log("Button Pressed!")}>
                        <Feather name='search' size={24} color='green' />
                    </Pressable>
                </View>
            </View>

           <View style={{display: 'none'}}>
                {contacts.length > 0 ? (
                    <FlatList
                        data={contacts}
                        renderItem={({ item }) => <ContactsComponent 
                        item={item} 
                        onPress = {() => handleCreateRoom()}
                        />
                    }
                        keyExtractor={(item) => item.id}
                    />
                ) : (
                    <View style={styles.chatemptyContainer}>
                        <Text style={styles.chatemptyText}>No contacts joined!</Text>
                        <Text>Click the icon below to invite a contact</Text>
                        {/* <Text>{contacts?.length}</Text> */}
                    </View>
                )}
            </View>
            {loading && <View style={{justifyContent: 'center', alignItems: 'center'}}>
                <ActivityIndicator size={30} color={'black'} />
            </View>}
            {!loading && <View style={styles.chatlistContainer}>
                {/* <Text>{appUsers?.length}</Text> */}
            {
                appUsers?.length > 0 && appUsers?.map((u,i) => <Pressable style={styles.cchat} 
                onPress={() => handleChat(u)} key={i}
                >
                    <Ionicons
                        name='person-circle-outline'
                        size={45}
                        color='black'
                        style={styles.cavatar}
                    />
        
                    <View style={styles.crightContainer}>
                        <View>
                            {/* <Text style={styles.cusername}>{item.displayName}</Text> */}
                            <Text style={styles.cusername}>{u?.name}</Text>
        
                            <Text style={styles.cmessage}>
                                {u?.number}
                            </Text>
                        </View>
                        <View>
                            <Text style={styles.ctime}>
                                {/* {messages?.time ? messages.time : "now"} */}
                            </Text>
                        </View>
                    </View>
                </Pressable>)
            }
            </View>}
        </ScrollView>
        <FAB
                style={[styles.fab]}
                small
                icon="plus"
                color="white"
                onPress={() => handleCreateRoom()}
            />
        </SafeAreaView>
    );
};

export default PhoneContacts;