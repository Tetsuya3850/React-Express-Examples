import {
  createStackNavigator,
  createSwitchNavigator,
  createAppContainer
} from "react-navigation";
import AuthScreen from "./src/screens/AuthScreen";
import AuthLoadingScreen from "./src/screens/AuthLoadingScreen";
import ProfileScreen from "./src/screens/ProfileScreen";

const AppStack = createStackNavigator({ Profile: ProfileScreen });
const AuthStack = createStackNavigator({ Auth: AuthScreen });

export default createAppContainer(
  createSwitchNavigator(
    {
      AuthLoading: AuthLoadingScreen,
      App: AppStack,
      Auth: AuthStack
    },
    {
      initialRouteName: "AuthLoading"
    }
  )
);
