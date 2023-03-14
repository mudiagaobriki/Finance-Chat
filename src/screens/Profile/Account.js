import React, { useState, useEffect } from 'react';
import { ScrollView, KeyboardAvoidingView, View, Text, StyleSheet, TextInput, useWindowDimensions, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import { useRoute } from '@react-navigation/native';
import countries from '../../data/countries.json'
import banks from '../../data/FinancialInstitutionsDMB13032023.json'
import DropDownPicker from "react-native-dropdown-picker";


const Account = () => {
	const [accountName, setAccountName] = useState('')
    const [bank, setBank] = useState("")
    const [accountNumber, setAccountNumber] = useState('')
    const [showBankPicker, setShowBankPicker] = useState(false)

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
					<Text>Bank</Text>
                    <View style={{ marginBottom: 10, minHeight: 30 }}>
                        <DropDownPicker
                            schema={{
                                label: 'Name', // required
                                value: 'Name', // required
                                icon: 'icon',
                                parent: 'parent',
                                selectable: 'selectable',
                                disabled: 'disabled',
                            }}
                            listMode="MODAL"
                            // listMode="SCROLLVIEW"
                            placeholder="Select a bank"
                            searchable={true}
                            placeholderStyle={{ color: 'black' }}
                            labelStyle={{ color: 'black' }}
                            // textStyle={{color: 'black'}}
                            modalTitle={'Account Type'}
                            open={showBankPicker}
                            value={bank}
                            // value={currentGender}
                            mode={'BADGE'}
                            theme={'DARK'}
                            items={banks}
                            setOpen={() => {
                                setShowBankPicker(true);
                            }}
                            onClose={() => {
                                setShowBankPicker(false);
                            }}
                            // @ts-ignore
                            setValue={async (val: Function) => {
                                const cc = val();
                                // doHandleNext(cc);
                                // console.log('xsxs', cc);
                                // let selectedCountry = countries?.find(el => el?.name === cc)
                                // setStates(selectedCountry?.states)

                                setBank(cc);
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
					<Text>Account Name</Text>
					<TextInput
						style={[styles.textInput, {width: width - 160}]}
						// placeholder="Other names"
						onChangeText={text=>setAccountName(text)}
						value={accountName}
						// keyboardType='numeric'
					/>
				</View>
				<View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
					<Text>Account No.</Text>
					<TextInput
						style={[styles.textInput, {width: width - 160}]}
						// placeholder="Email address"
						// keyboardType='numeric'
						onChangeText={text => setAccountNumber(text)}
						value={accountNumber}
					/>
				</View>
				 {/*r*/}
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

export default Account;

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