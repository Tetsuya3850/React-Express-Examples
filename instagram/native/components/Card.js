import { Image, StyleSheet, View, ActivityIndicator } from "react-native";
import React from "react";
import AuthorRow from "./AuthorRow";

class Card extends React.Component {
  state = {
    loading: true
  };

  handleLoad = () => {
    this.setState({ loading: false });
  };

  render() {
    const { fullname, image } = this.props;
    const { loading } = this.state;

    return (
      <View>
        <AuthorRow fullname={fullname} />
        <View style={styles.image}>
          {loading && (
            <ActivityIndicator style={StyleSheet.absoluteFill} size={"large"} />
          )}
          <Image
            style={StyleSheet.absoluteFill}
            source={image}
            onLoad={this.handleLoad}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  image: {
    aspectRatio: 1,
    backgroundColor: "rgba(0,0,0,0.02)"
  }
});

export default Card;
