import React, { useState, useEffect } from 'react';
import { Image, ScrollView, KeyboardAvoidingView, View, Text, StyleSheet, TextInput, useWindowDimensions, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
// import { TouchableOpacity } from 'react-native-gesture-handler';
import {Feather,Ionicons} from '@expo/vector-icons';
import DropDownPicker from 'react-native-dropdown-picker';
import { allUsers, getUserByUsername, updateUser } from "../../utils/users"
import { Pressable } from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import { getData } from '../../utils/deviceStorage';
import * as ImagePicker from 'expo-image-picker';
import NavigationNames from "../../navigation/NavigationNames";

const SECTIONS = [
	{
		text: 'My Wallet',
		icon: 'wallet-outline',
		navigatesTo: NavigationNames.Wallet,
	},
	{
		text: 'Basic Details',
		icon: 'people-circle-outline',
		navigatesTo: NavigationNames.BasicDetails,
	},
	{
		text: 'Address',
		icon: 'location-outline',
		navigatesTo: NavigationNames.Address,
	},
	{
		text: 'Bank Account',
		icon: 'cash-outline',
		navigatesTo: NavigationNames.Account,
	},
	{
		text: 'Pin & Security',
		icon: 'lock-closed-outline',
		navigatesTo: NavigationNames.SetPin,
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
	const [image, setImage] = useState(null);
	const navigation = useNavigation();

	const pickImage = async () => {
		// No permissions request is necessary for launching the image library
		let result = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ImagePicker.MediaTypeOptions.All,
			allowsEditing: true,
			aspect: [4, 3],
			quality: 1,
		});

		console.log(result);

		if (!result.canceled) {
			setImage(result.assets[0].uri);
		}
	};

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
        })
    },[])

	return (
		<ScrollView contentContainerStyle={{padding: 30, paddingTop: 120}}>
			<KeyboardAvoidingView behavior='position'>
				{image ? <Image source={{ uri: image }} style={{ width: 130, height: 130, borderRadius: 130, alignSelf: 'center' }} />:
					<Image source={ require('../../assets/user-profile.png') } style={{ width: 130, height: 130, borderRadius: 130, alignSelf: 'center' }} />
				}
				<View style={{alignItems:'center', marginTop: 10}}>
					<Text style={{fontSize: 18, fontWeight:'600'}}>Michael</Text>
					<Text style={{fontSize: 14, fontWeight:'600', marginBottom: 0}}>09012345678</Text>
				</View>
				<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', marginTop: 15, marginBottom: 10 }}>
					<TouchableOpacity
						style={{width: 150,
							height: 40,
							backgroundColor: 'black',
							alignItems: 'center',
							justifyContent: 'center',
							borderRadius: 10,
						}} onPress={pickImage}>
						<Text style={{fontSize: 14, fontWeight: '600', color: 'white'}}>Update Image</Text>
					</TouchableOpacity>
				</View>
			{loading && <View style={{justifyContent: 'center', alignItems: 'center', marginTop: 40}}>
				<ActivityIndicator size={30} color='green' />
				</View>}
			{!loading && <>
				<View style={{marginTop: 20}}></View>
				{
					SECTIONS?.map((item, index) =>
						<View>
							<TouchableOpacity
								onPress={() => navigation.navigate(item.navigatesTo)}
								style={{backgroundColor: 'transparent',
								flexDirection: 'row',
								height: 50,
								width: width-60,
								alignItems: 'center',
								justifyContent: 'space-between',
								paddingHorizontal: 15,
								marginBottom: 10,
							}}>
								<View style={{flexDirection: 'row', alignItems: 'center'}}>
									<Ionicons name={item?.icon} size={28} />
									<Text style={{fontWeight: '600', fontSize: 16, marginLeft: 10}}>{item?.text}</Text>
								</View>
								<Ionicons name={'chevron-forward-outline'} size={28} />
							</TouchableOpacity>
						</View>
					)
				}
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