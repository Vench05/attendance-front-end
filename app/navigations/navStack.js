import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import Login from '../screens/Login'
import Setting from '../screens/Setting'
import Home from '../screens/Home'
import Task from '../screens/Task'
import AttendanceSubmit from '../screens/AttendanceSubmit'
import { Root } from "native-base";
import React from 'react';

const AppNavigator = createAppContainer(createStackNavigator(
    {
        Login,
        Setting,
        Home,
        AttendanceSubmit,
        Task
    },
    {
        defaultNavigationOptions: {
            headerShown: false
        }
    }
))


export default () =>
    <Root>
        <AppNavigator />
    </Root>;