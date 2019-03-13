import { createStackNavigator, createAppContainer } from "react-navigation";
import AuthScreen from "./src/screens/AuthScreen";
import ProfileScreen from "./src/screens/ProfileScreen";

const AppNavigator = createStackNavigator(
  {
    Auth: AuthScreen,
    Profile: ProfileScreen
  },
  {
    initialRouteName: "Auth"
  }
);

export default createAppContainer(AppNavigator);
