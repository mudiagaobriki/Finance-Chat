import React, { useState, useEffect } from 'react';
import { ScrollView, KeyboardAvoidingView, View, Text, StyleSheet, TextInput, useWindowDimensions, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import { useRoute } from '@react-navigation/native';


const BasicDetails = () => {
	const [firstName, setFirstName] = useState('')
	const [lastName, setLastName] = useState('')
	const [otherNames, setOtherNames] = useState('')
	const [email, setEmail] = useState('')
	const [phoneNumber, setPhoneNumber] = useState('')

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
				 {/*<Text style={{alignSelf: 'center', fontSize: 18, marginBottom: 30}}>Account Settings</Text>*/}
				<View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
					<Text>First Name</Text>
					<TextInput
						style={[styles.textInput, {width: width - 160}]}
						// placeholder="First name"
						onChangeText={text => setFirstName(text)}
						value={firstName}
						// keyboardType='text'
					/>
				</View>
				<View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
					<Text>Last Name</Text>
					<TextInput
						style={[styles.textInput, {width: width - 160}]}
						// placeholder="Last name"
						onChangeText={text => setLastName(text)}
						value={lastName}
						// keyboardType='text'
					/>
					{/* <TextInput
						style={[styles.textInput, {width: width - 160}]}
						placeholder="Account Type"
						// keyboardType='numeric'
					/> */}
					{/* <View style={{ marginBottom: 10, minHeight: 30 }}>
										<DropDownPicker
											schema={{
												label: 'goal', // required
												value: 'key', // required
												icon: 'icon',
												parent: 'parent',
												selectable: 'selectable',
												disabled: 'disabled',
											}}
											listMode="MODAL"
											// listMode="SCROLLVIEW"
											placeholder="Select an answer"
											//searchable={true}
											placeholderStyle={{ color: 'darkgray' }}
											labelStyle={{ color: 'darkgray' }}
											// textStyle={{color: 'black'}}
											modalTitle={'Account Type'}
											open={showAccountPicker}
											value={accountType}
											// value={currentGender}
											mode={'BADGE'}
											theme={'DARK'}
											items={ACCOUNT_TYPE}
											setOpen={() => {
												setShowAccountPicker(true);
											}}
											onClose={() => {
												setShowAccountPicker(false);
											}}
											// @ts-ignore
											setValue={async (val: Function) => {
												const cc = val();
												// doHandleNext(cc);
												// console.log('xsxs', cc);

												setAccountType(cc);
											}}
											style={[styles.textInput, { color:'black', width: width - 160, borderColor: 'transparent' }]}
											dropDownContainerStyle={{
												width: width - 160,
												backgroundColor: '#e0e0e0',
												zIndex: 5000,
												borderWidth: 0,
												borderColor: 'transparent',
												color: 'black'
											}}
										/>
									</View> */}
				</View>
				<View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
					<Text>Other Names</Text>
					<TextInput
						style={[styles.textInput, {width: width - 160}]}
						// placeholder="Other names"
						onChangeText={text=>setOtherNames(text)}
						value={otherNames}
						// keyboardType='numeric'
					/>
				</View>
				{/* <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
					<Text>Acc. No</Text>
					<TextInput
						style={[styles.textInput, {width: width - 160}]}
						placeholder="Account Number"
						onChangeText={text=>setAccountName(text)}
						value={accountName}
						// keyboardType='numeric'
					/>
				</View> */}
				<View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
					<Text>Email</Text>
					<TextInput
						style={[styles.textInput, {width: width - 160}]}
						// placeholder="Email address"
						// keyboardType='numeric'
						onChangeText={text => setEmail(text)}
						value={email}
					/>
				</View>
				 <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
					 <Text>Phone No.</Text>
					 <TextInput
						 style={[styles.textInput, {width: width - 160}]}
						 // placeholder="Phone number"
						 keyboardType='numeric'
						 onChangeText={text => setPhoneNumber(text)}
						 value={phoneNumber}
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

export default BasicDetails;

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