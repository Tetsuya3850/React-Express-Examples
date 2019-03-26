import {
  createBottomTabNavigator,
  createSwitchNavigator,
  createAppContainer
} from "react-navigation";
import SignupScreen from "./screens/SignupScreen";
import SigninScreen from "./screens/SigninScreen";
import AuthLoadingScreen from "./screens/AuthLoadingScreen";
import HomeScreen from "./screens/HomeScreen";

const AuthStack = createBottomTabNavigator({
  Signup: SignupScreen,
  Signin: SigninScreen
});

const AppStack = createBottomTabNavigator({
  Home: HomeScreen
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
