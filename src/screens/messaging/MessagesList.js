import React, { useEffect, useRef, useState } from "react";
import { ActivityIndicator, View, Text, Pressable, SafeAreaView, FlatList, TouchableOpacity, useWindowDimensions } from "react-native";
import {Feather} from '@expo/vector-icons';
import ChatComponent from "../../components/ChatComponent";
import { styles } from "../../utils/styles";
import { FAB } from 'react-native-paper';
import { useNavigation } from "@react-navigation/native";
import NavigationNames from "../../navigation/NavigationNames";
import { getData } from "../../utils/deviceStorage";
import { allUsers, getPartner } from "../../utils/users"
import { Searchbar } from 'react-native-paper';
import io from 'socket.io-client';

// import socket from "../../utils/socket";

const MessagesList = () => {

    const navigation = useNavigation();
    const [username, setUsername] = useState('')
    const [appUsers, setAppUsers] = useState([])
    const [partner, setPartner] = useState([])
    const [loading, setLoading] = useState(true)
    const [searchQuery, setSearchQuery] = useState('');
    const socket = useRef(null)
    const { width, height } = useWindowDimensions()
    
    const onChangeSearch = query => setSearchQuery(query);

    useEffect(() => {
        getData('username')
        .then(res => {
            console.log({res})
            setUsername(`+234${res}`)
        })
    },[])

    useEffect(() => {
        setPartner([
            "Mudiaga",
            "James"
        ])
        setLoading(false)
    },[])

    //uncomment here
    // useEffect(() => {
    //     getPartner(username)
    //     .then((p) => {
    //         console.log({p})
    //         if (Object.keys[p] > 0){
    //             setPartner([p?.username])
    //             setLoading(false)
    //         }
    //         else {
    //             getData('partner')
    //             .then(res2 => {
    //                 console.log({res2})
    //                 if (res2 != null && res2 != undefined){
    //                     setPartner([res2])
    //                 }
    //                 setLoading(false)
    //             })
    //         }
            
    //     })
    // },[username])

    //👇🏻 Dummy list of rooms
    const rooms = [
        // {
        //     id: "1",
        //     name: "Little Bro",
        //     messages: [
        //         {
        //             id: "1a",
        //             text: "Hello guys, welcome!",
        //             time: "07:50",
        //             user: "Tomer",
        //         },
        //         {
        //             id: "1b",
        //             text: "Hello Bro Mudi 😇",
        //             time: "08:50",
        //             user: "David",
        //         },
        //     ],
        // },
        // {
        //     id: "2",
        //     name: "Sweetheart",
        //     messages: [
        //         {
        //             id: "2a",
        //             text: "Guys, who's awake? 🙏🏽",
        //             time: "12:50",
        //             user: "Team Leader",
        //         },
        //         {
        //             id: "2b",
        //             text: "How far na? ",
        //             time: "03:50",
        //             user: "Victoria",
        //         },
        //     ],
        // },
    ];

    useEffect(() => {
        // socket.current = io('http://192.168.43.154:3001')
        socket.current = io('https://chat.tonchrisgroup.com:3001')
    },[])

    const handleShowContacts = () => {
        //👇🏻 sends a message containing the group name to the server
        // socket.emit("createRoom", 'groupName');
        // closeModal();
        // console.log('Clicked')
        // socket.current.emit('message','mudiaga')

        navigation.navigate(NavigationNames.PhoneContacts)
    };

    return (
        <SafeAreaView style={[styles.chatscreen,{paddingTop: 150}]}>
            {/*<View style={[styles.chattopContainer,{borderRadius: 5, marginTop: 20}]}>*/}
            {/*    <Pressable style={styles.chatheader}>*/}
            {/*        <Text onPress={() => navigation.navigate(NavigationNames.SettingsScreen)} style={styles.chatheading}>Chats</Text>*/}

            {/*/!* 👇🏻 Logs "ButtonPressed" to the console when the icon is clicked *!/*/}
            {/*        <TouchableOpacity onPress={() => console.log('Clicked...')}>*/}
            {/*            <Feather name='search' size={26} color='green' onPress={() => console.log('Clicked')} />*/}
            {/*        </TouchableOpacity>*/}
            {/*    </Pressable>*/}
            {/*</View>*/}
            {/* <Searchbar
                placeholder="Search"
                onChangeText={onChangeSearch}
                value={searchQuery}
                style={{marginBottom: 20, 
                    backgroundColor: '#f7f7f7',
                    borderRadius: 10,
                    padding: 0,
                    height: 55}}
                inputStyle={{
                    backgroundColor: 'transparent',
                    borderRadius: 10,
                    height:55,
                }}
                icon={() => null}
                clearIcon={() =>
                        <Feather
                            name="search"
                            size={30}
                            color={'green'}
                            onPress={() => {
                                // getArticleContent(searchQuery, searchCategory)
                                // Alert.alert(searchQuery)
                                davinciSearch(searchQuery);
                            }}
                        />
                }
                /> */}
            {/* <TouchableOpacity style={{alignSelf: 'flex-end', padding: 20}} onPress={() => navigation.navigate(NavigationNames.SettingsScreen)}>
                        <Feather name='settings' size={26} color='green' />
                    </TouchableOpacity> */}
            {
                loading &&
                <View style={{justifyContent: 'center', alignItems: 'center'}}>
                    <ActivityIndicator size={30} color='green' />
                </View>
            }
            <View style={styles.chatlistContainer}>
                {partner?.length > 0 ? (
                    <FlatList
                        data={partner}
                        renderItem={({ item }) => <ChatComponent 
                        item={item} 
                        onPress = {() => navigation.navigate(NavigationNames.Messaging,{username: username})}
                        />
                    }
                        keyExtractor={(item) => item}
                    />
                ) : (
                    <View style={styles.chatemptyContainer}>
                        <Text style={styles.chatemptyText}>No Chat!</Text>
                        <Text>Click the icon below to chat with a Contact</Text>
                    </View>
                )}
            </View>
            
            <FAB
                style={styles.fab}
                small
                icon="message"
                color="white"
                onPress={() => handleShowContacts()}
            />
        </SafeAreaView>
    );
};

export default MessagesList;