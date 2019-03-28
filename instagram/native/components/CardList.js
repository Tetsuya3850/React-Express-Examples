import { FlatList } from "react-native";
import React from "react";
import { getImageFromId } from "../redux/api";
import Card from "./Card";

const keyExtractor = ({ id }) => id.toString();

class CardList extends React.Component {
  renderItem = ({ item: { id, author } }) => {
    return (
      <Card
        fullname={author}
        image={{
          uri: getImageFromId(id)
        }}
      />
    );
  };

  render() {
    const { items } = this.props;

    return (
      <FlatList
        data={items}
        renderItem={this.renderItem}
        keyExtractor={keyExtractor}
      />
    );
  }
}

export default CardList;
