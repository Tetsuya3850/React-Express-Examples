import {
  ActivityIndicator,
  Text,
  SafeAreaView,
  Platform,
  StyleSheet
} from "react-native";
import React from "react";
import { Constants } from "expo";
import { fetchImages } from "../redux/api";
import CardList from "../components/CardList";

class Feed extends React.Component {
  state = {
    loading: true,
    error: false,
    items: []
  };

  async componentDidMount() {
    try {
      const items = await fetchImages();
      this.setState({ loading: false, items });
    } catch (e) {
      this.setState({ loading: false, error: true });
    }
  }

  render() {
    const { loading, error, items } = this.state;

    if (loading) {
      return <ActivityIndicator size="large" />;
    }
    if (error) {
      return <Text>Error...</Text>;
    }
    return (
      <SafeAreaView style={styles.feed}>
        <CardList items={items} />
      </SafeAreaView>
    );
  }
}

const platformVersion =
  Platform.OS === "ios" ? parseInt(Platform.Version, 10) : Platform.Version;

const styles = StyleSheet.create({
  feed: {
    flex: 1,
    marginTop:
      Platform.OS === "android" || platformVersion < 11
        ? Constants.statusBarHeight
        : 0
  }
});

export default Feed;
