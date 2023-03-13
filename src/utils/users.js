import Parse from "parse/react-native.js";
import AsyncStorage from '@react-native-async-storage/async-storage';
import uuid from 'react-native-uuid';

//Initializing the SDK. 
Parse.setAsyncStorage(AsyncStorage);
//You need to copy BOTH the the Application ID and the Javascript Key from: Dashboard->App Settings->Security & Keys 
Parse.initialize('m96pBuCWra4g0n2ZpRa205o8uTM9yJSQMk6fcVRg','jQHTglP8H84r7zB5ebHXMPcWCBFnqdHlYNMSIHVm');
Parse.serverURL = 'https://parseapi.back4app.com/';
// Define Twilio keys and require the library helper
const accountSid = 'ACa56232bccc6496ea26ce30aa813eaa97';
const authToken = '4d6b65ddf186fb09b0efaa74ebf9f3d4';
// const client = require('twilio')(accountSid, authToken);

//This funciton will save a simple Person object
async function addPerson() {
    try {
      //create a new Parse Object instance
      const newPerson = new Parse.Object('Person');
      //define the attributes you want for your Object
      newPerson.set('name', 'John');
      newPerson.set('email', 'john@back4app.com');
      //save it on Back4App Data Store
      let isSaved = await newPerson.save();
      console.log('is svaed: ', isSaved)
      console.log('Saved person: ', newPerson)
    } catch (error) {
      console.log('Error saving new person: ', error);
    }
  }

async function fetchPerson() {
    //create your Parse Query using the Person Class you've created
    let query = new Parse.Query('Person');
    //run the query to retrieve all objects on Person class, optionally you can add your filters
    let queryResult = await query.findAll();
    //pick the first result 
    const currentPerson = queryResult[0];
    //access the Parse Object attributes
    console.log('person id: ', currentPerson.get('id'));
    console.log('person name: ', currentPerson.get('name'));
    console.log('person email: ', currentPerson.get('email'));
    return currentPerson;
  }

async function allUsers(){
  let query = new Parse.Query(Parse.User);
  //run the query to retrieve all objects on Person class, optionally you can add your filters
  let queryResult = await query.findAll();

  let m = []
  queryResult.forEach((el, i) => {
    m.push(el?.get('username'))
  })

  // console.log({m})

  return m
}

async function getUserByUsername(username){
  console.log({username})
  let query = new Parse.Query(Parse.User);
  //run the query to retrieve all objects on Person class, optionally you can add your filters
  let queryResult = await query.findAll()
  let myUser = queryResult.find(el => el?.get('username') === username)
  
  let payload = {

  }

  payload.username = myUser.get('username')
  payload.balance = myUser.get('balance')
  payload.accountType = myUser.get('accountType')
  payload.bank = myUser.get('bank')
  payload.accountName = myUser.get('accountName')
  payload.accountNumber = myUser.get('accountNumber')

  console.log(payload)
  return payload;
}


async function getPartner(username){
  console.log({username})
  let query = new Parse.Query(Parse.User);
  //run the query to retrieve all objects on Person class, optionally you can add your filters
  let queryResult = await query.findAll()
  let myUser = queryResult.find(el => el?.get('partner') === username)
  
  let payload = {

  }

  if  (myUser != undefined && myUser != null){
    payload.username = myUser.get('username')
  }

  console.log(payload)
  return payload;
}

async function updateUser(username, values){
  // console.log({username})
  let query = new Parse.Query(Parse.User);
  //run the query to retrieve all objects on Person class, optionally you can add your filters
  let queryResult = await query.findAll()
  let myUser = queryResult.find(el => el?.get('username') === username)

  // payload.username = myUser.get('username')
  console.log({values})

  if (values?.balance != undefined && values?.balance != null && values?.balance != '' ) myUser.set('balance',values?.balance?.toString())
  if (values?.accountType != undefined && values?.accountType != null  && values?.accountType != '' ) myUser.set('accountType', values?.accountType)
  if (values?.bank != undefined && values?.bank != null && values?.bank != '' ) myUser.set('bank',values?.bank)
  if (values?.partner != undefined && values?.partner != null && values?.partner != '' ) myUser.set('partner',values?.partner)
  if (values?.accountName != undefined && values?.accountName != null && values?.accountName != '' ) myUser.set('accountName',values?.accountName)
  if (values?.accountNumber != undefined && values?.accountNumber != null && values?.accountNumber != '' ) myUser.set('accountNumber',values?.accountNumber?.toString())

  myUser.save()

  console.log(myUser)
  return myUser;
}

// Request OTP
const requestOTP = async function (userData) {
    // Note that this values come from state variables that we've declared before
    const userDataValue = userData;
    // Check if value is an email if it contains @. Note that in a real
    // app you need a much better validator for this field
    const verificationType =
      userDataValue.includes('@') === true ? 'email' : 'sms';
    // We need to call it using await
    console.log('Function called')
    try {
      await Parse.Cloud.run('requestOTP', {
        userData: userDataValue,
        verificationType: verificationType,
      });
      // Show token input field
    //   setTokenRequested(true);
      console.log('Success: ', `Token requested via ${verificationType}!`);
      return {status: 'success'};
    } catch (error) {
      console.log('Error!', error.message);
      return {status: 'error', message: error.message};
    }
  };

  const verifyOTP = async function (userData, userToken) {
    // Note that this values come from state variables that we've declared before
    const userDataValue = userData;
    const userTokenValue = userToken;
    // Check if value is an email if it contains @. Note that in a real
    // app you need a much better validator for this field
    const verificationType =
      userDataValue.includes('@') === true ? 'email' : 'sms';
    // We need the installation id to allow cloud code to create
    // a new session and login user without password
    const parseInstallationId = await Parse._getInstallationId();
    // We need to call it using await
    try {
      // Verify OTP, if successful, returns a sessionId
      let response = await Parse.Cloud.run('verifyOTP', {
        userData: userDataValue,
        verificationType: verificationType,
        userToken: userTokenValue,
        parseInstallationId: parseInstallationId,
      });
      if (response.sessionId !== undefined) {
        // Use generated sessionId to become a user,
        // logging in without needing to inform password and username
        await Parse.User.become(response.sessionId);
        const loggedInUser= await Parse.User.currentAsync();
        console.log(
          'Success: ',
          `User ${loggedInUser.get('username')} has successfully signed in!`,
        );
        // Navigation.navigate takes the user to the home screen
        // navigation.navigate('Home');
        return true;
      } else {
        // throw response;
        console.log("Response: ", response)
        return response;
        
      }
    } catch (error) {
      console.log('Error!', error.message);
      return false;
    }
  };

  const doUserSignUp = async function (value) {
    // Note that this values come from state variables that we've declared before
    const usernameValue = value;
    const passwordValue = value;
    const emailValue = uuid.v4() + '@gmail.com';
    const phoneNumberValue = value;
    try {
      // Since the signUp method returns a Promise, we need to call it using await
      // Note that now you are setting the user email value as well
      let createdUser = await Parse.User.signUp(usernameValue, passwordValue, {
        email: emailValue,
        phoneNumber: phoneNumberValue,
        phoneNumberVerified: false,
        bank: "",
        accountType: "",
        accountName: "",
        accountNumber: "",
        balance: "",
      });

      // Parse.User.signUp returns the already created ParseUser object if successful
     console.log(
        'Success!',
        `User ${createdUser.get(
          'username',
        )} was successfully created! Verify your email to login`,
      );
      // Since email verification is now required, make sure to log out
      // the new user, so any Session created is cleared and the user can
      // safely log in again after verifying
      console.log({createdUser})
      console.log(Parse.User)
      await Parse.User.logOut();
      // Go back to the login page
    //   navigation.dispatch(StackActions.popToTop());
      return {status: 'success', user: createdUser};
    } catch (error) {
      // signUp can fail if any parameter is blank or failed an uniqueness check on the server
      return{status: "error",message:  error.message};
      return false;
    }
  };

module.exports = {
    addPerson,
    fetchPerson,
    requestOTP,
    verifyOTP,
    doUserSignUp,
    allUsers,
    getUserByUsername,
    updateUser,
    getPartner,
}