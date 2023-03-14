import React, { useState, useEffect } from 'react';
import { ScrollView, KeyboardAvoidingView, View, Text, StyleSheet, TextInput, useWindowDimensions, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import { useRoute } from '@react-navigation/native';
import {Ionicons} from "@expo/vector-icons";


const Wallet = () => {
	const [firstName, setFirstName] = useState('')
	const [lastName, setLastName] = useState('')
	const [otherNames, setOtherNames] = useState('')
	const [email, setEmail] = useState('')
	const [phoneNumber, setPhoneNumber] = useState('')
    const [balance, setBalance] = useState('5000')
    const [active, setActive] = useState('')
    const [fundAmount, setFundAmount] = useState('')
    const [withdrawAmount, setWithdrawAmount] = useState('')

	const {width, height} = useWindowDimensions();
	const route = useRoute();
	const [username, setUsername] = useState(route?.params?.username);
	const [user, setUser] = useState({})
	const [loading, setLoading] = useState(false)

	const onSave = () => {

	}

	return (
		<ScrollView contentContainerStyle={{padding: 30}}>
			<KeyboardAvoidingView behavior='position'>
			{loading && <View style={{justifyContent: 'center', alignItems: 'center', marginTop: 40}}>
				<ActivityIndicator size={30} color='green' />
				</View>}
			{!loading && <>
			 <View style={{marginTop: 100}}>
                 <View
                     style={{width: width-100,
                         height: 100,
                         backgroundColor: 'green',
                         alignItems: 'center',
                         justifyContent: 'center',
                         alignSelf: 'center'
                     }}>
                    <Text style={{color: "white", fontSize: 20, fontWeight: '600'}}>NGN {balance}</Text>
                 </View>
                 <View style={{flexDirection: 'row', width: width-100, justifyContent: 'space-between', marginTop: 10, alignSelf: 'center'}}>
                     <TouchableOpacity
                         style={{backgroundColor: 'transparent', width: (width-100)/2.2, height: 70,
                             alignItems: 'center', justifyContent: 'center'}}>
                            <Ionicons name={'arrow-up-circle-outline'} size={40} color={'green'} />
                         <Text style={{color: 'green', fontSize: 16, fontWeight: '600'}}>Fund</Text>
                     </TouchableOpacity>
                     <TouchableOpacity
                         style={{backgroundColor: 'transparent', width: (width-100)/2.2, height: 70,
                             alignItems: 'center', justifyContent: 'center'}}>
                         <Ionicons name={'arrow-down-circle-outline'} size={40} color={'green'} />
                         <Text style={{color: 'green', fontSize: 16, fontWeight: '600'}}>Withdraw</Text>
                     </TouchableOpacity>
                 </View>
				 {/*<Text style={{alignSelf: 'center', fontSize: 18, marginBottom: 30}}>Account Settings</Text>*/}
				<View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 20}}>
					<Text>Amount</Text>
					<TextInput
						style={[styles.textInput, {width: width - 160}]}
						// placeholder="First name"
						onChangeText={text => setFundAmount(text)}
						value={fundAmount}
						// keyboardType='text'
					/>
				</View>
				<TouchableOpacity onPress={onSave} style={{width: width - 120,
					alignSelf: 'center', height: 55, backgroundColor: 'black',
					 marginTop: 70, justifyContent: 'center', alignItems: 'center', borderRadius: 10}}>
					<Text style={{color: 'white', fontWeight: '700'}}>Save</Text>
				</TouchableOpacity>
			</View>
			</>}
			</KeyboardAvoidingView>
		</ScrollView>
	);
};

export default Wallet;

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
        height: 0,
        resizeMode: 'stretch',
        marginBottom: 70,
    },
    textInput: {
        // width: "90%",
        borderRadius: 10,
        height: 45,
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