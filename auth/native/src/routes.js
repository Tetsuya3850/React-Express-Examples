import {
  createTabNavigator,
  createSwitchNavigator,
  createAppContainer
} from "react-navigation";
import AuthScreen from "./screens/AuthScreen";
import AuthLoadingScreen from "./screens/AuthLoadingScreen";
import UserScreen from "./screens/UserScreen";
import HomeScreen from "./screens/HomeScreen";

const AuthStack = createTabNavigator({ Auth: AuthScreen });
const AppStack = createTabNavigator({
  Home: HomeScreen,
  User: UserScreen
});

export default createAppContainer(
  createSwitchNavigator(
    {
      AuthLoading: AuthLoadingScreen,
      Auth: AuthStack,
      App: AppStack
    },
    {
      initialRouteName: "AuthLoading"
    }
  )
);
