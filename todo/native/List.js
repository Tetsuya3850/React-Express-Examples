import React, { Component } from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";

class List extends Component {
  renderItem = (text, i) => {
    const { onPressItem } = this.props;

    return <Task key={i} onPressItem={() => onPressItem(i)} text={text} />;
  };

  render() {
    const { list } = this.props;

    return <View>{list.map(this.renderItem)}</View>;
  }
}

export default List;
