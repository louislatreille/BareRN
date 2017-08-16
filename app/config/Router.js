import React from 'react';
import { StackNavigator } from 'react-navigation';
import SigninScreen from '../screens/SigninScreen';
import MainScreen from '../screens/MainScreen';

export default ScreensStack = StackNavigator({
    Signin: {
        screen: SigninScreen,
        navigationOptions: ({navigation}) => ({
            header: null,
        }),
    },
    Main: {
        screen: MainScreen,
        navigationOptions: ({navigation}) => ({
            header: null,
        }),
    }
});