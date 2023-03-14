import React from "react";
import { TouchableOpacity, Text, View, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useRoute } from '@react-navigation/native'
import {Ionicons} from "@expo/vector-icons";

const BackArrow = (props) => {
    const navigation = useNavigation();
    const route = useRoute()
    const { name } = route

    const handleNavigation = () => {
        navigation.goBack()
    }
    return (

        <View style={{flexDirection: 'row',alignItems:'center'}}>
            <TouchableOpacity onPress={() => handleNavigation()}>
                <Ionicons name={'arrow-back-outline'} size={30} />
            </TouchableOpacity>
        </View>
    );
};

export default BackArrow;
