import React from "react";
import {Text, TouchableOpacity, useWindowDimensions, View} from "react-native";
import {useNavigation} from "@react-navigation/native";
import {Ionicons} from "@expo/vector-icons";

const ArrowAndHeader = (props) => {
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
        <View style={{width: width, flexDirection: 'row', alignItems: 'center'}}>
            <TouchableOpacity style={{alignSelf: 'flex-start'}} onPress={() => handleNavigation()}>
                <Ionicons name={'arrow-back-outline'} size={30} />
            </TouchableOpacity>
            <Text style={{marginLeft: 50, color: props?.color? props.color : 'black', fontSize: 22, fontWeight: '600'}}>
                {props.value}
            </Text>
        </View>
    );
};

export default ArrowAndHeader;
