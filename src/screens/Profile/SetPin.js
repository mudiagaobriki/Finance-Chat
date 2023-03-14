import React, {useRef, useState} from 'react';
import { Image, StyleSheet, ScrollView, TextInput, Text, View,
useWindowDimensions, Platform, TouchableOpacity } from 'react-native';
import OTPTextInput from 'react-native-otp-textinput';
import { requestOTP, verifyOTP } from '../../utils/users'
import { useNavigation, useRoute } from '@react-navigation/native';
import NavigationNames from '../../navigation/NavigationNames';
import { useSelector, useDispatch } from 'react-redux';
import { setSignIn } from '../../redux/slices/authSlice';
import { storeData } from '../../utils/deviceStorage';

// console.log({useKeyboard})

const SetPin = () => {
    const [checked, setChecked] = React.useState(false);
    const [value, setValue] = useState("");

    const {height, width} = useWindowDimensions()
    const navigation = useNavigation();
    const route = useRoute();
    const otpInput = useRef(null);
    const dispatch = useDispatch();

    const username = route?.params?.username;
    // console.log(user)
    // const {username,email} = user;

    const handleNext = async () => {

    }

    return (
        <ScrollView contentContainerStyle={styles.scrollContainer} style={styles.container}>
            {/*<Image style={styles.logo} source={require('../../assets/icon.png')} />*/}
            {/* <Text style={styles.signupText}>Set Transac</Text>*/}

             <OTPTextInput
								ref={otpInput}
								inputCount={4}
								containerStyle={{
									flex: 1,
									justifyContent: 'center',
									width: width - 80,
								}}
								textInputStyle={{
									height: 55,
									width: 40,
									backgroundColor: '#f0f0ef',
									borderColor: '#e0e0e0',
									borderRadius: 10,
									color: 'black',
								}}
								tintColor={'#e0e0e0'}
								offTintColor={'#e0e0e0'}
								// handleTextChange={text => console.log(text)}
								// value={values.otp}
								handleTextChange = {text=>setValue(text)}
								underlineColor="transparent"
								activeUnderlineColor="transparent"
							/>

             <TouchableOpacity 
                onPress={() => handleNext()}
                style={[styles.nextButton, {width: width-80}]}>
                <Text
                onPress={() => handleNext()}
                style={styles.nextText}>Save</Text>
             </TouchableOpacity>
            
        </ScrollView>
    );
};

export default SetPin;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 20,
        paddingVertical: 100,
    },
    scrollContainer: {
        alignItems: 'center',
        paddingTop: 50,
    },
    logo: {
        width: 200,
        height: 200,
        resizeMode: 'stretch',
        marginBottom: 20,
    },
    textInput: {
        // width: "90%",
        color: '#000000',
        borderRadius: 10,
        height: 60,
        backgroundColor:'#f0f0f0',
        marginTop: 20,
        paddingHorizontal: 15,
    },
    nextButton: {
        backgroundColor: 'black',
        height: 60,
        marginTop: 30,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 50,
    },
    signupText: {
        color: 'black',
        fontSize: 18,
        fontWeight: '600',
        marginBottom: 50
    },
    nextText: {
        color: 'white',
        fontSize: 18,
        fontWeight: '700',
    }
})