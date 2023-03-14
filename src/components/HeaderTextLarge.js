import React from "react";
import {Text, TouchableOpacity, useWindowDimensions, View} from "react-native";
import {useNavigation} from "@react-navigation/native";
import {Ionicons} from "@expo/vector-icons";

const TextHeaderLarge = (props) => {
    const {width, height} = useWindowDimensions()
    const navigation = useNavigation();

    const handleNavigation = () => {
        if (props?.onPress){
            props.onPress()
        }
        else{
            navigation.goBack()
        }
    }

    return (
        <View style={{width: width-40, flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
            {/*<TouchableOpacity style={{alignSelf: 'flex-start'}} onPress={() => handleNavigation()}>*/}
            {/*    <Ionicons name={'arrow-back-outline'} size={30} />*/}
            {/*</TouchableOpacity>*/}
            <Text style={{color: props?.color? props.color : 'black', fontSize: 22, fontWeight: '600'}}>
                {props.value}
            </Text>
        </View>
    );
};

export default TextHeaderLarge;
