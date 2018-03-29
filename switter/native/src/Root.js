import React, { Component } from "react";
import { TabNavigator, StackNavigator } from "react-navigation";
import Auth from "./screens/Auth";
import Feed from "./screens/Feed";
import Profile from "./screens/Profile";
import SweetDetail from "./screens/SweetDetail";
import { FontAwesome, Feather } from "@expo/vector-icons";

const createTabBarIconWrapper = (
  TabBarIconComponent,
  defaultProps
) => props => <TabBarIconComponent {...defaultProps} color={props.tintColor} />;

class Root extends Component {
  render() {
    const SweetsStack = StackNavigator(
      {
        feed: { screen: Feed },
        userProfile: { screen: Profile },
        detail: { screen: SweetDetail }
      },
      {
        navigationOptions: {
          tabBarIcon: createTabBarIconWrapper(FontAwesome, {
            name: "twitter",
            size: 30
          })
        }
      }
    );

    const ProfileStack = StackNavigator(
      {
        profileHome: { screen: Profile }
      },
      {
        navigationOptions: {
          tabBarIcon: createTabBarIconWrapper(Feather, {
            name: "user",
            size: 30
          })
        }
      }
    );

    const MainNavigator = TabNavigator(
      {
        sweet: { screen: SweetsStack },
        profile: { screen: ProfileStack }
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
