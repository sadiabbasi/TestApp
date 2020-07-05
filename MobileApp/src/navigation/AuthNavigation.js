//AuthNavigation.js
import { createStackNavigator } from 'react-navigation-stack'
import Login from '../screens/login'
import Signup from '../screens/signup'

const AuthNavigation = createStackNavigator(
  {
    Login: { screen: Login },
    Signup: { screen: Signup }
  },
  {
    initialRouteName: 'Login',
    headerMode: 'none'
  }
)

export default AuthNavigation
