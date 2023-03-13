import React, { useState, useEffect } from 'react';
import { ScrollView, KeyboardAvoidingView, View, Text, StyleSheet, TextInput, useWindowDimensions, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
// import { TouchableOpacity } from 'react-native-gesture-handler';
import {Feather,Ionicons} from '@expo/vector-icons';
import DropDownPicker from 'react-native-dropdown-picker';
import { allUsers, getUserByUsername, updateUser } from "../../utils/users"
import { Pressable } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { getData } from '../../utils/deviceStorage';

const ACCOUNT_TYPE = [
	{
		key: 'savings',
		goal: 'Savings',
	},
	{
		key: 'current',
		goal: 'Current',
	},
];

const SettingsScreen = () => {
	const [active, setActive] = useState('account')
	const [bankName, setBankName] = useState('')
	const [accountType, setAccountType] = useState('savings')
	const [accountName, setAccountName] = useState('')
	const [accountNumber, setAccountNumber] = useState('')
	const [fundingAmount, setFundingAmount] = useState(0)
	const [balance, setBalance] = useState(0)
	const [showAccountPicker, setShowAccountPicker] = useState(false)
	const [appUsers, setAppUsers] = useState([])
	const [transferUser, setTransferUser] = useState('')
	const [transferAmount, setTransferAmount] = useState(0)
	const [withdrawAmount, setWithdrawAmount] = useState(0)
	const [showTransferPicker, setShowTransferPicker] = useState(false)

	const {width, height} = useWindowDimensions();
	const route = useRoute();
	const [username, setUsername] = useState(route?.params?.username);
	const [user, setUser] = useState({})
	const [loading, setLoading] = useState(false)

	// console.log({route})

	useEffect(() => {
        allUsers()
        .then((u) => {
			let uk = [];
			for (let i=0; i<u?.length;i++){
				uk.push({
					key: u[i],
					goal: u[i]
				})
			}
			// console.log({uk})
            setAppUsers(uk)
            // setLoading(false)
        })
    },[])

	// useEffect(() => {
	// 	getUserByUsername(username)
	// 	.then(us => {
	// 		console.log({us})
	// 	})
	// },[])

	useEffect(() => {
        getData('username')
        .then(res => {
            // console.log({res})
            setUsername(`+234${res}`)
				getUserByUsername(`+234${res}`)
				.then(us => {
					console.log({us})
					setUser(us)
					setUsername(us?.username)
					setBankName(us?.bank)
					setAccountName(us?.accountName)
					setAccountType(us?.accountType)
					setAccountNumber(us?.accountNumber)
					setBalance(us?.balance)
					setLoading(false)
				})
				// updateUser(`+234${res}`,{
				// 	balance: 5000,
				// 	bank: 'UBA',
				// 	accountType: 'savings',
				// 	accountName: 'Mudiaga Obriki A.',
				// 	accountNumber: '2058339565'
				// })
				// .then(up => {
				// 	console.log({up})
				// })
				
        })
    },[])

	const onSaveBankDetails = () => {
		let payload = {
			balance: balance,
			bank: bankName,
			accountType: accountType,
			accountName: accountName,
			accountNumber: accountNumber
		}
		updateUser(username,payload)
		.then(up => {
			console.log({up})
			Alert.alert('Parrot', 'Bank Details Updated Successfully');
		})
	}

	const onFundWallet = () => {
		let payload = {
			balance: Number(balance) +  Number(fundingAmount),
		}
		updateUser(username,payload)
		.then(up => {
			console.log({up})
			setBalance(payload?.balance)
			setFundingAmount('')
			Alert.alert('Parrot', 'Wallet funded successfully');
		})
	}

	const onTransfer = () => {
		console.log('Clicked')
		console.log({transferUser})
		let payload = {
			balance: Number(balance) -  Number(transferAmount),
		}
		
		getUserByUsername(transferUser)
		.then(res => {
			let payloadOtherUser = {
				balance: Number(res?.balance) + Number(transferAmount)
			}
			updateUser(transferUser,payloadOtherUser)
			.then(up => {
				// console.log({up})
				// setBalance(payload?.balance)
				// setFundingAmount('')
				// Alert.alert('Parrot', 'Wallet funded successfully');
				updateUser(username,payload)
				.then(up => {
					console.log({up})
					setBalance(payload?.balance)
					setTransferAmount('')
					setTransferUser('')
					Alert.alert('Parrot', 'Transfer completed successfully');
				})
			})
		})
		
	}

	const onWithdrawalRequest = () => {
		setWithdrawAmount('')
		Alert.alert('Parrot', 'Withdrawal request send successfully')
	}

	return (
		<ScrollView contentContainerStyle={{padding: 30}}>
			<KeyboardAvoidingView behavior='position'>
				<Ionicons name='person-circle-outline' size={100} color='black' style={{alignSelf: 'center'}} />
				<View style={{alignItems:'center'}}>
					<Text style={{fontSize: 24, fontWeight:'600'}}>Michael</Text>
					<Text style={{fontSize: 20, fontWeight:'600', marginBottom: 20}}>09012345678</Text>
				</View>
				<View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems:'center'}}>
				<View style={{alignItems: 'center'}}>
					<Ionicons name="arrow-up-circle-outline"
					size={50} color='green' />
					<Text>Fund</Text>
					</View>
					<View style={{backgroundColor: 'transparent', 
					justifyContent: 'center', 
					alignItems: 'center', 
					height: 100,
					width: '50%'}}>
						<Text style={{fontSize: 20, color: 'green', fontWeight: '700'}}>NGN {'50,000'}</Text>
					</View>
					<View style={{alignItems: 'center'}}>
					<Ionicons name="arrow-down-circle-outline"
					size={50} color='green' />
					<Text>Withdraw</Text>
					</View>
				</View>
			
			{/* <View style={{marginTop: 30, flexDirection: 'row', justifyContent: 'space-between'}}>
				<Pressable onPress={() => setActive('account')} style={{alignItems: 'center'}}>
					<Feather name='user' size={26} color='green' />
					<Text>My Account</Text>
				</Pressable>
				<Pressable onPress={() => setActive('funding')} style={{alignItems: 'center'}}>
					<Feather name='upload' size={26} color='green' />
					<Text onPress={() => setActive('funding')}>Funding</Text>
				</Pressable>
				<Pressable onPress={() => setActive('transfer')} style={{alignItems: 'center'}}>
					<Feather name='user' size={26} color='green' />
					<Text>Transfer</Text>
				</Pressable>
				<Pressable onPress={() => setActive('withdrawal')} style={{alignItems: 'center'}}>
					<Feather name='download' size={26} color='green' />
					<Text>Withdrawal</Text>
				</Pressable>
			</View> */}
			{loading && <View style={{justifyContent: 'center', alignItems: 'center', marginTop: 40}}>
				<ActivityIndicator size={30} color='green' />
				</View>}
			{!loading && <>
			{active === 'account' && <View style={{marginTop: 30}}>
				<View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
					<Text>Name</Text>
					<TextInput
						style={[styles.textInput, {width: width - 160}]}
						placeholder="First name and last name"
						onChangeText={text => setBankName(text)}
						value={bankName}
						// keyboardType='text'
					/>
				</View>
				<View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
					<Text>Phone No</Text>
					<TextInput
						style={[styles.textInput, {width: width - 160}]}
						placeholder="First name and last name"
						onChangeText={text => setAccountType(text)}
						value={accountType}
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
					<Text>Acc. Name</Text>
					<TextInput
						style={[styles.textInput, {width: width - 160}]}
						placeholder="Account Name"
						onChangeText={text=>setAccountName(text)}
						value={accountName}
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
					<Text>Pin</Text>
					<TextInput
						style={[styles.textInput, {width: width - 160}]}
						placeholder="Transaction Pin"
						keyboardType='numeric'
						onChangeText={text => setAccountNumber(text)}
						value={accountNumber}
					/>
				</View>
				<TouchableOpacity style={{width: width - 120, 
					alignSelf: 'center', height: 55, backgroundColor: 'black',
					 marginTop: 40, justifyContent: 'center', alignItems: 'center', borderRadius: 10}}>
					<Text style={{color: 'white', fontWeight: '700'}}>Save</Text>
				</TouchableOpacity>
			</View>}
			{active === 'funding' && <View style={{marginTop: 30}}>
				<View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
					<Text>Amount</Text>
					<TextInput
						style={[styles.textInput, {width: width - 160}]}
						placeholder="Amount"
						keyboardType='numeric'
						value={fundingAmount}
						onChangeText={text=>setFundingAmount(text)}
					/>
				</View>
				<TouchableOpacity onPress={() => onFundWallet()} style={{width: width - 120, 
					alignSelf: 'center', height: 55, backgroundColor: 'black',
					 marginTop: 40, justifyContent: 'center', alignItems: 'center', borderRadius: 10}}>
					<Text style={{color: 'white', fontWeight: '700'}}>Add to Wallet</Text>
				</TouchableOpacity>
			</View>}
			{active === 'transfer' && <View style={{marginTop: 30}}>
				{/* <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
					<Text>Bank</Text>
					<TextInput
						style={[styles.textInput, {width: width - 160}]}
						placeholder="Bank Name"
						onChangeText={text => setBankName(text)}
						// keyboardType='text'
					/>
				</View> */}
				<View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
					<Text>User</Text>
					{/* <TextInput
						style={[styles.textInput, {width: width - 160}]}
						placeholder="Account Type"
						// keyboardType='numeric'
					/> */}
					<View style={{ marginBottom: 10, minHeight: 30 }}>
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
											searchable
											// listMode="SCROLLVIEW"
											placeholder="Select a user"
											//searchable={true}
											placeholderStyle={{ color: 'darkgray' }}
											labelStyle={{ color: 'darkgray' }}
											// textStyle={{color: 'black'}}
											modalTitle={'Users'}
											open={showTransferPicker}
											value={transferUser}
											// value={currentGender}
											mode={'BADGE'}
											theme={'DARK'}
											items={appUsers}
											setOpen={() => {
												setShowTransferPicker(true);
											}}
											onClose={() => {
												setShowTransferPicker(false);
											}}
											// @ts-ignore
											setValue={async (val: Function) => {
												const cc = val();
												// doHandleNext(cc);
												// console.log('xsxs', cc);

												setTransferUser(cc);
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
									</View>
				</View>
				<View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
					<Text>Amount</Text>
					<TextInput
						style={[styles.textInput, {width: width - 160}]}
						placeholder="Amount"
						onChangeText={text=>setTransferAmount(text)}
						keyboardType='numeric'
					/>
				</View>
				{/* <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
					<Text>Number</Text>
					<TextInput
						style={[styles.textInput, {width: width - 160}]}
						placeholder="Account Number"
						keyboardType='numeric'
						onChangeText={text => setAccountNumber(text)}
					/>
				</View> */}
				<TouchableOpacity onPress={()=> onTransfer()} style={{width: width - 120, 
					alignSelf: 'center', height: 55, backgroundColor: 'black',
					 marginTop: 40, justifyContent: 'center', alignItems: 'center', borderRadius: 10}}>
					<Text style={{color: 'white', fontWeight: '700'}}>Transfer</Text>
				</TouchableOpacity>
			</View>}
			{active === 'withdrawal' && <View style={{marginTop: 30}}>
				<View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
					<Text>Amount</Text>
					<TextInput
						style={[styles.textInput, {width: width - 160}]}
						placeholder="Amount"
						keyboardType='numeric'
						value={withdrawAmount}
					/>
				</View>
				<TouchableOpacity onPress={() => onWithdrawalRequest()} style={{width: width - 120, 
					alignSelf: 'center', height: 55, backgroundColor: 'black',
					 marginTop: 40, justifyContent: 'center', alignItems: 'center', borderRadius: 10}}>
					<Text style={{color: 'white', fontWeight: '700'}}>Request Withdrawal</Text>
				</TouchableOpacity>
			</View>}
			</>}
			</KeyboardAvoidingView>
		</ScrollView>
	);
};

export default SettingsScreen;

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
        height: 50,
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