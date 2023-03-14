import NavigationNames from "./NavigationNames";
import MessagesList from "../screens/messaging/MessagesList";
import PhoneContacts from "../screens/messaging/PhoneContacts";
import Messaging from "../screens/messaging/Messaging";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import SettingsScreen from "../screens/Profile/SettingsScreen";
import BasicDetails from "../screens/Profile/BasicDetails";
import BackArrow from "../components/BackArrow";
import HeaderTextLarge from "../components/HeaderTextLarge";
import ArrowAndHeader from "../components/ArrowAndHeader";
import Address from "../screens/Profile/Address";
import Account from "../screens/Profile/Account";
import SetPin from "../screens/Profile/SetPin";
import Wallet from "../screens/Profile/Wallet";

const Stack = createNativeStackNavigator();

function ProfileStack(){
    return(
        <Stack.Navigator initialRouteName={NavigationNames.SettingsScreen}>
            <Stack.Screen
                name={NavigationNames.SettingsScreen}
                component={SettingsScreen}
                options={{
                    headerShown: true,
                    headerTitle: () => <HeaderTextLarge value={'My Profile'} />,
                    headerTransparent: true,
                    headerBackVisible: false,
                    // headerLeft: () => <BackArrow />
                }} />
            <Stack.Screen
                name={NavigationNames.BasicDetails}
                component={BasicDetails}
                options={{
                    headerShown: true,
                    headerTitle: () => <ArrowAndHeader value={'Account Settings'} />,
                    headerTransparent: true,
                    headerBackVisible: false,
                    // headerLeft: () => <BackArrow />
                }} />
            <Stack.Screen
                name={NavigationNames.Address}
                component={Address}
                options={{
                    headerShown: true,
                    headerTitle: () => <ArrowAndHeader value={'Address'} />,
                    headerTransparent: true,
                    headerBackVisible: false,
                    // headerLeft: () => <BackArrow />
                }} />
            <Stack.Screen
                name={NavigationNames.Account}
                component={Account}
                options={{
                    headerShown: true,
                    headerTitle: () => <ArrowAndHeader value={'Bank Account'} />,
                    headerTransparent: true,
                    headerBackVisible: false,
                    // headerLeft: () => <BackArrow />
                }} />
            <Stack.Screen
                name={NavigationNames.SetPin}
                component={SetPin}
                options={{
                    headerShown: true,
                    headerTitle: () => <ArrowAndHeader value={'Set Pin'} />,
                    headerTransparent: true,
                    headerBackVisible: false,
                    // headerLeft: () => <BackArrow />
                }} />
            <Stack.Screen
                name={NavigationNames.Wallet}
                component={Wallet}
                options={{
                    headerShown: true,
                    headerTitle: () => <ArrowAndHeader value={'My Wallet'} />,
                    headerTransparent: true,
                    headerBackVisible: false,
                    // headerLeft: () => <BackArrow />
                }} />
        </Stack.Navigator>
    )
}

module.exports = ProfileStack;