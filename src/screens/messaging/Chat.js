import React, { useState, useCallback, useEffect, useRef, useLayoutEffect } from 'react'
import { GiftedChat } from 'react-native-gifted-chat'
import io from 'socket.io-client';
import { useRoute } from '@react-navigation/native';
import uuid from 'react-native-uuid';
import { getData, storeData } from "../../utils/deviceStorage";

const Chat = () => {
    const [messages, setMessages] = useState([]);
    const [currentMsg, setCurrentMsg] = useState({})
    const socket = useRef(null)
    const route = useRoute();

    const username = route?.params?.username
    console.log({username})

    useEffect(() => {
      socket.current = io('http://192.168.43.154:3001')
      socket.current.on('message', msg => {
        console.log(msg)
        setMessages(previousMessages => GiftedChat.append(previousMessages, msg))
      })
    },[])

    useEffect(() => {
      getData('chats')
      .then(res => {
        console.log('Chat: ', JSON.parse(res))
        setMessages(JSON.parse(res))
      })
    },[])

    // useLayoutEffect(() => {
    //     // setMessages([
    //     //   {
    //     //     _id: 1,
    //     //     text: 'Hello developer',
    //     //     createdAt: new Date(),
    //     //     user: {
    //     //       _id: 2,
    //     //       name: 'React Native',
    //     //       avatar: 'https://placeimg.com/140/140/any',
    //     //     },
    //     //   },
    //     // ])
    //     setMessages(previousMessages => GiftedChat.append(previousMessages, currentMsg))
    //   }, [currentMsg])

      // const onSend = useCallback((messages = []) => {
      //   socket.current.emit('message',messages)
      //   socket.current.on('message', msg => {
      //     setMessages(previousMessages => GiftedChat.append(previousMessages, msg))
      //   })
        
      // }, [])

      const sendMessage = (message) => {
        const msgTemplate = {
          _id: uuid.v4(),
          text: 'Hello developer',
          sent: true,
          received: true,
          isTyping: true,
          createdAt: new Date(),
          user: {
            _id: username,
            name: username,
            avatar: 'https://placeimg.com/140/140/any',
          },
        }
        msgTemplate.text = message
        setCurrentMsg(msgTemplate)
        socket.current.emit('message',msgTemplate)
        console.log({messages})
        storeData('chats',JSON.stringify([msgTemplate, ...messages]))
        setMessages([msgTemplate, ...messages])
        socket.current.on('message', msg => {
          console.log('Mudi msg:', msg)
          // if (!JSON.stringify(messages).includes(msg))
            // setMessages(previousMessages => GiftedChat.append(previousMessages, msg))
        })

      }

    return (
        <GiftedChat
            messages={messages}
            onSend={msgs => sendMessage(Array.from(msgs)[0]?.text)}
            user={{
                _id: username,
            }}
    />
    );
};

export default Chat;