import React, { Component } from "react";
import { TabNavigator, StackNavigator } from "react-navigation";
import Auth from "./screens/Auth";
import Feed from "./screens/Feed";
import Profile from "./screens/Profile";
import SweetDetail from "./screens/SweetDetail";

class Root extends Component {
  render() {
    const SweetsStack = StackNavigator({
      feed: { screen: Feed },
      profile: { screen: Profile },
      detail: { screen: SweetDetail }
    });

    const MainNavigator = TabNavigator(
      {
        sweet: { screen: SweetsStack }
      },
      {
        tabBarPosition: "bottom",
        tabBarOptions: {
          labelStyle: { fontSize: 12 }
        }
      }
    );

    const AppNavigator = TabNavigator(
      {
        auth: { screen: Auth },
        main: { screen: MainNavigator }
      },
      {
        navigationOptions: { tabBarVisible: false }
      }
    );

    return <AppNavigator />;
  }
}

export default Root;
