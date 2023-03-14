import React from 'react';
import {useWindowDimensions, View, Text} from "react-native";
import {Feather, Ionicons} from "@expo/vector-icons";

const TextAndSearch = (props) => {
    const { width, height } = useWindowDimensions();

    return (
        <View
            style={{flexDirection: 'row',
                paddingHorizontal: 20,
                width: width- 30,
                justifyContent: 'space-between',
                alignItems: 'center',
                backgroundColor: '#F7F7F7',
                padding: 20,
                borderRadius: 10,
                elevation: 2,
                alignSelf: 'center',
                borderWidth:2,
                borderColor: '#F7F7F7',
                marginTop: 10,
        }}>
            <Text style={{fontSize: 24, fontWeight: '700', color: 'green'}}>{props.text}</Text>
            <Feather onPress={props?.onPress} name={'search'} size={24} color={'green'} />
        </View>
    );
};

export default TextAndSearch;