import NavigationNames from "./NavigationNames";
import Chat from "../screens/messaging/Chat";
import MessagesList from "../screens/messaging/MessagesList";
import PhoneContacts from "../screens/messaging/PhoneContacts";
import Messaging from "../screens/messaging/Messaging";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {Ionicons} from "@expo/vector-icons";
import TextAndSearch from "../components/TextAndSearch";

const Stack = createNativeStackNavigator();

function ChatsStack(){
    return(
        <Stack.Navigator initialRouteName={NavigationNames.MessagesList}>
            <Stack.Screen
                name={NavigationNames.Chat}
                component={Chat}
                options={{
                    headerShown: true,
                    headerTitle: '',
                    headerTransparent: true,
                    headerBackVisible: false,
                }} />
            <Stack.Screen
                name={NavigationNames.MessagesList}
                component={MessagesList}
                options={{
                    headerShown: true,
                    headerTitle: () => <TextAndSearch text={'Chats'} />,
                    headerTransparent: true,
                    headerBackVisible: false,
                }} />
            <Stack.Screen
                name={NavigationNames.PhoneContacts}
                component={PhoneContacts}
                options={{
                    headerShown: true,
                    headerTitle: '',
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
                    headerLeft: () => <Ionicons name={'arrow-back'} size={30} />
                }} />
        </Stack.Navigator>
    )
}

module.exports = ChatsStack;