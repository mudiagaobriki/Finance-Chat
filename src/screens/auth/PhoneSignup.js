import React, {useRef, useState} from 'react';
import { Image, StyleSheet, ScrollView, TextInput, Text, View,
useWindowDimensions, Platform, ActivityIndicator, Alert } from 'react-native';
import { Button } from 'react-native-paper';
import PhoneInput from 'react-native-phone-number-input';
import Icon from '@expo/vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import NavigationNames from '../../navigation/NavigationNames';
import { addPerson, fetchPerson, requestOTP, verifyOTP, doUserSignUp } from '../../utils/users'
// console.log({firebase})

// console.log({useKeyboard})

const PhoneSignup = () => {
    const [checked, setChecked] = React.useState(false);
    const [value, setValue] = useState("");
    const [email, setEmail] = useState("");
    const [formattedValue, setFormattedValue] = useState("");
    const [loading, setLoading] = useState(false)

    const {height, width} = useWindowDimensions()
    const navigation = useNavigation()
    const phoneInput = useRef(null);

    const handleNext = async () => {
        setLoading(true)
        // await addPerson()
        // let p = await fetchPerson()

        // console.log(p)
        // navigation.navigate(NavigationNames.OTPConfirmation)
        // return // comment this out

        let callingCode = phoneInput?.current?.getCallingCode();
		let countryCode = phoneInput?.current?.getCountryCode();
        let fullNumber = "+" + callingCode + value

        console.log("Full number: ", fullNumber)

        let signUp = await doUserSignUp(fullNumber)

        console.log("user: ", signUp?.user)

        if (signUp?.status === 'success'){
            let k = await requestOTP(fullNumber)

            let username = value

            if (k?.status === 'success'){
                setLoading(false)
                setEmail('')
                setValue('')
                navigation.navigate(NavigationNames.OTPConfirmation,{username: username})
            }

            else{
                Alert.alert("Parrot", k?.message)
            }

            console.log({k})
           
        }
        else{
            console.log("Failed: ", {signUp})
            Alert.alert("Parrot", signUp?.message)
        }

        setLoading(false)


        // console.log('Calling code: ', callingCode)
        // console.log('Country code: ', countryCode)
        // console.log("Value: ", value)
        // console.log("Full number: ", fullNumber)


        // firebase.auth()
    }


    return (
        <ScrollView contentContainerStyle={styles.scrollContainer} style={styles.container}>
            <Image style={styles.logo} source={require('../../assets/icon.png')} />
            {/* <TextInput
                style={[styles.textInput, {width: width - 80}]}
                placeholder="Phone Number"
                keyboardType='numeric'
             />
             <TextInput
                style={[styles.textInput, {width: width - 80}]}
                placeholder="Password/OTP"
             /> */}
             <Text style={styles.signupText}>Sign Up</Text>
             {/* <TextInput
                onChangeText={text => setEmail(text)}
                placeholder='Email'
                // keyboardType='email'
                style={[styles.textInput,{width:width-80, height: 55, marginBottom: 30, backgroundColor: '#e0e0e0',}]}
              /> */}
             <PhoneInput
                ref={phoneInput}
                placeholder={'Mobile'}
                keyboardType={'phone-pad'}
                defaultCode="NG"
                layout="first"
                defaultValue={value}
                onChangeText={(text) => {
                    setValue(text);
                  }}
                  onChangeFormattedText={(text) => {
                    setFormattedValue(text);
                  }}
                withDarkTheme
                withShadow
                // autoFocus
                containerStyle={[
                    {
                        // width: dimensions.width - 60,
                        backgroundColor: '#f0f0f0',
                        height: 60,
                        borderRadius: 10,
                    },
                ]}
                textContainerStyle={{
                    borderTopRightRadius: 10,
                    borderBottomRightRadius: 10,
                    backgroundColor: 'e0e0e0',
                    height: 60,
                }}
                flagButtonStyle={{ paddingLeft: Platform.isPad ? 0 : 20 }}
                textInputStyle={{ color: '#000000', height: 55 }}
                codeTextStyle={{ padding: 0, margin: 0 }}
                renderDropdownImage={<Icon name="chevron-down" size={25} color={'#e0e0e0'} />}
                underlineColor="transparent" 
                activeUnderlineColor="transparent"
                textInputProps={{ maxLength: 12, selectionColor: '#000000' }}
            />

            <Button dark mode="contained" onPress={() => handleNext()}
                buttonColor="#000000" contentStyle={[styles.button,{width: width - 80}]}
                style={{marginTop: 50, borderRadius: 10}} labelStyle={styles.buttonLabel}>
                {'Next'}
             </Button>
            
        </ScrollView>
    );
};

export default PhoneSignup;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 20,
    },
    scrollContainer: {
        alignItems: 'center',
        paddingTop: 50,
    },
    logo: {
        width: 150,
        height: 150,
        resizeMode: 'stretch',
        marginBottom: 20,
    },
    textInput: {
        // width: "90%",
        color: '#000000',
        borderRadius: 10,
        height: 60,
        backgroundColor:'#e0e0e0',
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
        marginBottom: 60
    },
    nextText: {
        color: 'white',
        fontSize: 18,
        fontWeight: '700',
    },
    button: {
        height: 55,
    },
    buttonLabel: {
        fontSize: 16,
    },
})