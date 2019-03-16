import React, { Component } from "react";
import * as api from "../api";

class EditArticle extends Component {
  state = {
    title: "",
    text: ""
  };

  async componentDidMount() {
    const { data } = await api.getArticle(this.props.match.params.articleId);
    const { _id, title, text, author } = data;
    this.setState({ _id, title, text, author: author._id });
  }

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
      const payload = this.state;
      try {
        await api.editArticle(payload);
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
        <h3>Edit Article Form</h3>

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

export default EditArticle;
