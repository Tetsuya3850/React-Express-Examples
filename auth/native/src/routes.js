import {
  createStackNavigator,
  createSwitchNavigator,
  createAppContainer
} from "react-navigation";
import AuthScreen from "./screens/AuthScreen";
import AuthLoadingScreen from "./screens/AuthLoadingScreen";
import UserScreen from "./screens/UserScreen";

const AppStack = createStackNavigator({ User: UserScreen });
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
