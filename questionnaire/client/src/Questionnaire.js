import React, { Component } from "react";
import api from "./api";

class Questionnaire extends Component {
  state = {
    errors: {}
  };

  handleFormSubmit = async e => {
    e.preventDefault();
    const checkedCheckboxesValues = this.processCheckbox();
    if (this.validateCheckbox(checkedCheckboxesValues)) {
      return;
    }
    const payLoad = {
      name: this.name.value,
      email: this.email.value,
      gender: this.gender.value,
      colors: checkedCheckboxesValues,
      comments: this.comments.value
    };
    try {
      await api.addResponse(payLoad);
      this.clearForm();
    } catch (e) {
      if (!e.response) {
        console.log(e);
        return;
      }
      this.handleStatus(e.response.data);
    }
  };

  processCheckbox = () => {
    const { colors } = this.form;
    const checkboxArray = Array.prototype.slice.call(colors);
    const checkedCheckboxes = checkboxArray.filter(input => input.checked);
    return checkedCheckboxes.map(input => input.value);
  };

  validateCheckbox = checkedCheckboxesValues => {
    let err = { errors: {} };
    if (checkedCheckboxesValues.length === 0) {
      err.errors["colors.0"] = "Choose a color!";
      this.setState(err);
      return true;
    }
    return false;
  };

  handleStatus = status => {
    let err = { errors: {} };
    if (status.code === 11000) {
      err.errors.email = "Duplicate email!";
    } else {
      Object.keys(status.errors).map(key => {
        err.errors[key] = status.errors[key].message;
      });
    }
    this.setState(err);
  };

  clearForm = () => {
    this.name.value = "";
    this.email.value = "";
    this.gender.value = "";
    this.comments.value = "";
    const ele = document.getElementsByName("colors");
    for (let i = 0; i < ele.length; i++) ele[i].checked = false;
    this.setState({ errors: {} });
  };

  render() {
    const gender_chocies = ["male", "female", "other"];
    const color_choices = ["red", "green", "blue"];

    const allGenderChoices = gender_chocies.map(g_choice => (
      <option key={g_choice} value={g_choice}>
        {g_choice}
      </option>
    ));

    const allColorChoices = color_choices.map(c_choice => (
      <label key={c_choice} style={{ margin: 15 }}>
        <input type="checkbox" name="colors" value={c_choice} />
        {c_choice}
      </label>
    ));

    return (
      <div style={{ margin: "auto", width: 400 }}>
        <form onSubmit={this.handleFormSubmit} ref={form => (this.form = form)}>
          <h2 style={{ textAlign: "center" }}>Questionnaire</h2>
          <hr />

          <label>Full Name</label>
          <input
            type="text"
            style={{ margin: 10 }}
            ref={node => {
              this.name = node;
            }}
            required
            maxLength="100"
            autoFocus
          />
          <span style={{ color: "red" }}>*</span>
          <span style={{ color: "red", marginLeft: 8 }}>
            {this.state.errors.name}
          </span>
          <br />

          <label>Email Address</label>
          <input
            type="email"
            style={{ margin: 10 }}
            ref={node => {
              this.email = node;
            }}
            required
            maxLength="100"
          />
          <span style={{ color: "red" }}>*</span>
          <span style={{ color: "red", marginLeft: 8 }}>
            {this.state.errors.email}
          </span>
          <br />

          <select
            ref={node => {
              this.gender = node;
            }}
            required
          >
            <option value="">What is your gender?</option>
            {allGenderChoices}
          </select>
          <span style={{ color: "red" }}> *</span>
          <span style={{ color: "red", marginLeft: 8 }}>
            {this.state.errors.gender}
          </span>
          <br />

          <label style={{ display: "inline-block", marginTop: 10 }}>
            What colors do you like? <span style={{ color: "red" }}>*</span>
            <span style={{ color: "red", marginLeft: 8 }}>
              {this.state.errors["colors.0"]}
            </span>
          </label>
          <br />
          {allColorChoices}
          <br />

          <label style={{ display: "inline-block", marginTop: 10 }}>
            Any other comments?
            <span style={{ color: "red", marginLeft: 8 }}>
              {this.state.errors.comments}
            </span>
          </label>
          <textarea
            style={{ width: "100%", marginBottom: 10 }}
            rows="4"
            ref={node => {
              this.comments = node;
            }}
            maxLength="1000"
          />

          <input
            type="submit"
            value="Submit!"
            style={{ display: "block", margin: "auto" }}
          />
        </form>
      </div>
    );
  }
}

export default Questionnaire;
