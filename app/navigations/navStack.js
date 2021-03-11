import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import Login from '../screens/Login'
import Setting from '../screens/Setting'
import Home from '../screens/Home'

export default createAppContainer(createStackNavigator(
    {
        Login,
        Setting,
        Home
    },
    {
        defaultNavigationOptions: {
            headerShown: false
        }
    }
))