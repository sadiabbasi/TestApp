
//AppNavigation.js
import { createStackNavigator } from 'react-navigation-stack';
import Dashboard from '../screens/dashboard';
import SellerDetail from "../screens/sellerDetail";
import BookAppointment from "../screens/appointmentForm";
const AppNavigation = createStackNavigator(
  {
    Dashboard: { screen: Dashboard },
    SellerDetail: { screen: SellerDetail },
    BookAppointment: {screen: BookAppointment}
  },
  {
    initialRouteName: 'Dashboard'
  }
)

export default AppNavigation