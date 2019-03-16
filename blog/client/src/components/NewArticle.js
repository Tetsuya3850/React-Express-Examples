import React, { Component } from "react";
import api from "../api";

class NewArticle extends Component {
  state = {
    title: "",
    text: ""
  };

  handleInputChange = event => {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;
    this.setState({
      [name]: value
    });
  };

  handleFormSubmit = async event => {
    event.preventDefault();
    const { title, text } = this.state;
    if (title && text) {
      const payload = { title, text, author: this.props.authedId };
      try {
        await api.addArticle(payload);
        this.props.history.push("/");
      } catch (error) {
        console.log(error);
      }
    }
  };

  render() {
    const { title, text } = this.state;

    return (
      <form onSubmit={this.handleFormSubmit}>
        <h3>New Article Form</h3>

        <div>
          <div>
            <label>Title</label>
            <span> * </span>
          </div>

          <input
            name="title"
            type="text"
            value={title}
            onChange={this.handleInputChange}
            required
          />
        </div>

        <div>
          <div>
            <label>Text</label>
            <span> * </span>
          </div>

          <textarea
            name="text"
            type="text"
            value={text}
            onChange={this.handleInputChange}
            required
          />
        </div>

        <input type="submit" value="Submit!" />
      </form>
    );
  }
}

export default NewArticle;
