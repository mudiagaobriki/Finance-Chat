import React, { useState, useEffect } from 'react';
import { ScrollView, KeyboardAvoidingView, View, Text, StyleSheet, TextInput, useWindowDimensions, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import { useRoute } from '@react-navigation/native';
import countries from '../../data/countries.json'
import DropDownPicker from "react-native-dropdown-picker";


const Address = () => {
	const [city, setCity] = useState('')
	const [address1, setAddress1] = useState('')
	const [address2, setAddress2] = useState('')
    const [country, setCountry] = useState("")
    const [states, setStates] = useState([])
    const [selectedState, setSelectedState] = useState("")
    const [showCountryPicker, setShowCountryPicker] = useState(false)
    const [showSatePicker, setShowStatePicker] = useState(false)

	const {width, height} = useWindowDimensions();
	const route = useRoute();
	const [username, setUsername] = useState(route?.params?.username);
	const [user, setUser] = useState({})
	const [loading, setLoading] = useState(false)

	const onSave = () => {

	}

    useEffect(() => {
        console.log({states})
    },[states])

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
					<Text>Country</Text>
                    <View style={{ marginBottom: 10, minHeight: 30 }}>
                        <DropDownPicker
                            schema={{
                                label: 'name', // required
                                value: 'name', // required
                                icon: 'icon',
                                parent: 'parent',
                                selectable: 'selectable',
                                disabled: 'disabled',
                            }}
                            listMode="MODAL"
                            // listMode="SCROLLVIEW"
                            placeholder="Select a country"
                            searchable={true}
                            placeholderStyle={{ color: 'black' }}
                            labelStyle={{ color: 'black' }}
                            // textStyle={{color: 'black'}}
                            modalTitle={'Account Type'}
                            open={showCountryPicker}
                            value={country}
                            // value={currentGender}
                            mode={'BADGE'}
                            theme={'DARK'}
                            items={countries}
                            setOpen={() => {
                                setShowCountryPicker(true);
                            }}
                            onClose={() => {
                                setShowCountryPicker(false);
                            }}
                            // @ts-ignore
                            setValue={async (val: Function) => {
                                const cc = val();
                                // doHandleNext(cc);
                                // console.log('xsxs', cc);
                                let selectedCountry = countries?.find(el => el?.name === cc)
                                setStates(selectedCountry?.states)

                                setCountry(cc);
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
					<Text>State</Text>
                    <View style={{ marginBottom: 10, minHeight: 30 }}>
                        <DropDownPicker
                            schema={{
                                label: 'name', // required
                                value: 'name', // required
                                icon: 'icon',
                                parent: 'parent',
                                selectable: 'selectable',
                                disabled: 'disabled',
                            }}
                            listMode="MODAL"
                            // listMode="SCROLLVIEW"
                            placeholder="Select a state"
                            searchable={true}
                            placeholderStyle={{ color: 'black' }}
                            labelStyle={{ color: 'black' }}
                            // textStyle={{color: 'black'}}
                            modalTitle={'Account Type'}
                            open={showSatePicker}
                            value={selectedState}
                            // value={currentGender}
                            mode={'BADGE'}
                            theme={'DARK'}
                            items={states}
                            setOpen={() => {
                                setShowStatePicker(true);
                            }}
                            onClose={() => {
                                setShowStatePicker(false);
                            }}
                            // @ts-ignore
                            setValue={async (val: Function) => {
                                const cc = val();
                                // doHandleNext(cc);
                                // console.log('xsxs', cc);
                                // let selectedCountry = countries?.find(el => el?.name === cc)
                                // setStates(selectedCountry?.states)

                                setSelectedState(cc);
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
					<Text>City</Text>
					<TextInput
						style={[styles.textInput, {width: width - 160}]}
						// placeholder="Other names"
						onChangeText={text=>setCity(text)}
						value={city}
						// keyboardType='numeric'
					/>
				</View>
				<View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
					<Text>Address</Text>
					<TextInput
						style={[styles.textInput, {width: width - 160}]}
						// placeholder="Email address"
						// keyboardType='numeric'
						onChangeText={text => setAddress1(text)}
						value={address1}
					/>
				</View>
				 <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
					 <Text>Address 2</Text>
					 <TextInput
						 style={[styles.textInput, {width: width - 160}]}
						 // placeholder="Phone number"
						 keyboardType='numeric'
						 onChangeText={text => setAddress2(text)}
						 value={address2}
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

export default Address;

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