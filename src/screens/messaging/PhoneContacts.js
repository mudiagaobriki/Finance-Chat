import React, {useEffect, useRef, useState} from "react";
import {
    View,
    Text,
    Pressable,
    SafeAreaView,
    FlatList,
    PermissionsAndroid,
    useWindowDimensions,
    ActivityIndicator,
    TouchableOpacity
} from "react-native";
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
import * as Contacts from 'expo-contacts';
// import * as uuid from "react-native-uuid";

// const socket = io.connect('http://localhost:4000');

// console.log({socket})

// console.log(Contacts)

// import socket from "../../utils/socket";
import ContactsComponent from "../../components/ContactsComponent";
import { ScrollView } from "react-native-gesture-handler";

const PhoneContacts = () => {

    const navigation = useNavigation();
    const [contacts, setContacts] = useState([])
    // const [isConnected, setIsConnected] = useState(socket.connected);
    const [lastPong, setLastPong] = useState(null);
    const [appUsers, setAppUsers] = useState([])
    const [loading, setLoading] = useState(true)
    const [username, setUsername] = useState('')
    const [arrangedContacts, setArrangedContacts] = useState([])
    const socket = useRef(null)

    let myPhoneContacts = []

    const {width, height} = useWindowDimensions()

    useEffect(() => {
        allUsers()
        .then((u) => {
            let k = u
            // console.log("KKKK: ", k)
            setAppUsers(k)
            // setLoading(false)
        })
    },[])

    useEffect(() => {
        // socket.current = io('http://192.168.43.154:3001')
        socket.current = io('https://chat.tonchrisgroup.com:3001')
    },[])

    // useEffect to rearrange contacts based on who has joined the app and who has not
    useEffect(() => {
        const intersection = contacts.filter(element => appUsers.indexOf(element) !== -1);
        let joinedContacts = [];
        for (let i=0; i<contacts?.length; i++){
            if (appUsers?.includes(contacts[i][1]) || appUsers?.includes(contacts[i][1]?.replaceAll(' ','')) ||
                appUsers?.includes(contacts[i][1]?.replaceAll('-','')) ||
                appUsers?.includes(contacts[i][1]?.replace('0','+234')) ||
                appUsers?.includes(contacts[i][1]?.replace('0','+2340')) ||
                appUsers?.includes(contacts[i][1]?.replaceAll(' ','').replace('0','+234')) ||
                appUsers?.includes(contacts[i][1]?.replaceAll(' ','').replace('0','+2340')) ||
                appUsers?.includes(contacts[i][1]?.replaceAll('-','').replace('0','+234')) ||
                appUsers?.includes(contacts[i][1]?.replaceAll('-','').replace('0','+2340')) ||
                appUsers?.includes(contacts[i][1]?.trim())){
                let cnt = contacts[i];
                let oldContacts = contacts
                oldContacts.splice(i, 1)
                oldContacts.unshift(cnt)
                joinedContacts.push(contacts[i])
                setArrangedContacts(oldContacts)
                setLoading(false)
            }
        }
        // console.log({intersection})
        // console.log({joinedContacts})
    },[appUsers, contacts])

    useEffect(() => {
        console.log({arrangedContacts})
    },[arrangedContacts])

    useEffect(() => {
        // console.log(appUsers)
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

    useEffect(() => {
        (async () => {
            const contactsData = await getData('myContacts') // todo optimize with redux data

            if (contactsData){
                setContacts(JSON.parse(contactsData))
                // console.log(JSON.parse(contactsData));
                setLoading(false)
            }
            else{
                const { status } = await Contacts.requestPermissionsAsync();
                // console.log("Use effect ran");
                if (status === 'granted') {
                    const { data } = await Contacts.getContactsAsync({
                        fields: [Contacts.Fields.Name, Contacts.Fields.PhoneNumbers],
                    });

                    if (data.length > 0) {
                        let phoneContacts = data?.map(({name, phoneNumbers}) => ({name, phoneNumbers}) )

                        // remove contacts without a phone number
                        phoneContacts = phoneContacts?.filter(el => el?.phoneNumbers?.length > 0)
                        phoneContacts = phoneContacts?.filter(el => el)
                        let mmm = []
                        for (let i=0; i<phoneContacts?.length; i++){
                            phoneContacts[i]['phoneNumbers'] = phoneContacts[i]?.phoneNumbers[0]?.number
                            mmm?.push([phoneContacts[i]['name'],phoneContacts[i]['phoneNumbers']])
                        }
                        setContacts(mmm)
                        storeData('myContacts', JSON.stringify(mmm))
                            .then(() => {
                                // setLoading(false)
                                console.log('contacts fetched')
                            })
                        // myPhoneContacts = phoneContacts;

                        // console.log(mmm);
                    }
                    else{
                        setLoading(false)
                    }
                }
            }
        })();
    }, []);

    useState(() => {
        // console.log("Contacts: ", contacts)
    },[contacts])

    const handleChat = (partnerId) => {
        // console.log({partnerId})
        storeData('partner','+2348036718099')
        .then(res => {
            let payload = {
                partner: partnerId,
            }
            updateUser(username,payload)
            .then(up => {
                // console.log({up})
                // console.log('Partner Updated Successfully');
                navigation.navigate(NavigationNames.Messaging)
            })
        })
    }

    return (
        <SafeAreaView style={{flex: 1, paddingTop: 130}}>
        <View style={styles.chatscreen}>
            {/*<View style={[styles.chattopContainer,{borderRadius: 5, marginTop: 20}]}>*/}
            {/*    <View style={styles.chatheader}>*/}
            {/*        <Text style={styles.chatheading}>Contacts</Text>*/}

            {/*/!* 👇🏻 Logs "ButtonPressed" to the console when the icon is clicked *!/*/}
            {/*        <Pressable onPress={() => console.log("Button Pressed!")}>*/}
            {/*            <Feather name='search' size={24} color='green' />*/}
            {/*        </Pressable>*/}
            {/*    </View>*/}
            {/*</View>*/}
            {/*<TouchableOpacity onPress={() => console.log('Pressed')}>*/}
            {/*    <Text>Mudi</Text>*/}
            {/*</TouchableOpacity>*/}

            {!loading && <View>
                {/*<Text>{contacts?.length}</Text>*/}
                {arrangedContacts?.length > 0 ? (
                    <FlatList
                        data={arrangedContacts}
                        renderItem={({ item, index }) => <ContactsComponent
                        item={item}
                        key={index}
                        // onPress = {() => handleCreateRoom()}
                        />
                    }
                        // keyExtractor={(item) => item[0]}
                    />
                ) : (
                    <View style={styles.chatemptyContainer}>
                        <Text style={styles.chatemptyText}>No contacts joined!</Text>
                        <Text>Click the icon below to invite a contact</Text>
                        {/* <Text>{contacts?.length}</Text> */}
                    </View>
                )}
            </View>}
            {loading && <View style={{justifyContent: 'center', alignItems: 'center'}}>
                <ActivityIndicator size={30} color={'black'} />
            </View>}
            {!loading && <View style={styles.chatlistContainer}>

            </View>}
        </View>
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