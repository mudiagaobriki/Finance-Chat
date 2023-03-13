import React from 'react';
import { Image, StyleSheet, ScrollView, TextInput, Text, View,
useWindowDimensions } from 'react-native';
import { Checkbox, Button } from 'react-native-paper';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import NavigationNames from '../../navigation/NavigationNames';

// console.log({useKeyboard})

const Login = () => {
    const [checked, setChecked] = React.useState(false);

    const {height, width} = useWindowDimensions()
    const navigation = useNavigation()

    const handleLogin = () => {

    }

    const handleSignup = () => {
        // console.log(NavigationNames.PhoneSignup)
        navigation.navigate(NavigationNames.PhoneSignup);
    }

    return (
        <ScrollView contentContainerStyle={styles.scrollContainer} style={styles.container}>
            <Image style={styles.logo} source={require('../../assets/godx_logo.png')} />
            <TextInput
                style={[styles.textInput, {width: width - 80}]}
                placeholder="Phone Number"
                keyboardType='numeric'
             />
             <TextInput
                style={[styles.textInput, {width: width - 80}]}
                placeholder="Password/OTP"
             />
             <View style={{flexDirection: 'row', 
             justifyContent: "space-between",
             width: width-80,
             alignItems: 'center'
             }}>
             <View style={{flexDirection: 'row', 
                            // justifyContent: 'center', 
                            alignItems: 'center',
                            alignSelf: 'flex-start',
                            }}>
             <Checkbox
                status={checked ? 'checked' : 'unchecked'}
                onPress={() => {
                    setChecked(!checked);
                }}
                />
             <Text>Keep me signed in</Text>
             </View>
             <Text style={{textDecorationLine: 'underline'}}>Forgot Password?</Text>
             </View>

             <Button dark mode="contained" onPress={() => console.log('Pressed')}
                buttonColor="#000000" contentStyle={[styles.button,{width: width - 80}]}
                style={{marginTop: 30, borderRadius: 10}} labelStyle={styles.buttonLabel}>
                Login
             </Button>

             <Text style={{marginTop: 100}}>Forgot Password?</Text>
             <Button dark mode="contained" onPress={() => handleSignup()}
                buttonColor="#000000" contentStyle={[styles.button,{width: width - 80}]}
                style={{marginTop: 30, borderRadius: 10}} labelStyle={styles.buttonLabel}>
                Sign Up
             </Button>
            
        </ScrollView>
    );
};

export default Login;

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
        width: 200,
        height: 70,
        resizeMode: 'stretch',
        marginBottom: 70,
    },
    textInput: {
        // width: "90%",
        borderRadius: 10,
        height: 60,
        backgroundColor:'#e0e0e0',
        marginTop: 20,
        paddingHorizontal: 15,
    },
    button: {
        height: 60,
    },
    buttonLabel: {
        fontSize: 16,
    },
})