import NavigationNames from "./NavigationNames";
import PhoneContacts from "../screens/messaging/PhoneContacts";
import Messaging from "../screens/messaging/Messaging";
import { createNativeStackNavigator} from "@react-navigation/native-stack"
import TextAndSearch from "../components/TextAndSearch";

const Stack = createNativeStackNavigator();

function ContactsStack(){
    return(
        <Stack.Navigator initialRouteName={NavigationNames.PhoneContacts}>
            <Stack.Screen
                name={NavigationNames.PhoneContacts}
                component={PhoneContacts}
                options={{
                    headerShown: true,
                    headerTitle: () => <TextAndSearch text={'Contacts'} />,
                    headerTransparent: true,
                    headerBackVisible: false,
                }} />
            <Stack.Screen
                name={NavigationNames.Messaging}
                component={Messaging}
                options={{
                    headerShown: true,
                    headerTitle: '',
                    headerTransparent: true,
                    headerBackVisible: false,
                }} />
        </Stack.Navigator>
    )
}

module.exports = ContactsStack;