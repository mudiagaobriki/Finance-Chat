import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import MainStack from './MainStack';
import AuthStack from './AuthStack'
import { useSelector, useDispatch } from 'react-redux';
import { selectIsLoggedIn } from '../redux/slices/authSlice';
import { getData } from '../utils/deviceStorage';
import AsyncStorage from '@react-native-async-storage/async-storage';

console.log({selectIsLoggedIn})

const AppRoute = () => {
    const [userLoggedIn, setUserLoggedIn] = React.useState(false)

    React.useEffect(() => {
        // AsyncStorage.clear()
        // .then(() => {
        //     console.log('Async storage cleared')
        // })
        getData("isLoggedIn")
        .then(res => {
            if (res?.toString()?.toLowerCase() === 'yes'){
                setUserLoggedIn(true)
            }
        })
    },[])

    const isLoggedIn = useSelector(selectIsLoggedIn)

    // console.log(useSelector(selectIsLoggedIn))

    return (
        <>
            {/* Conditional stack navigator renderin  based on login state */}

            {
                isLoggedIn || userLoggedIn ? <MainStack /> : <AuthStack />
            }
        </>
    )
}

export default AppRoute