import React, { Component } from "react";
import { sendInquiry } from "./api";

class InquiryForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      errors: {}
    };
  }

  handleFormSubmit = async e => {
    e.preventDefault();
    const payLoad = {
      email: this.email.value,
      subject: this.subject.value,
      text: this.text.value
    };
    const status = await sendInquiry(payLoad);
    // this.handleStatus(status);
  };

  handleStatus = status => {
    if (status !== "Response Added!") {
      let err = { errors: {} };
      if (status.code === 11000) {
        err.errors.email = "Duplicate email!";
      } else {
        Object.keys(status.errors).map(key => {
          err.errors[key] = status.errors[key].message;
        });
      }
      this.setState(err);
    } else {
      this.clearForm();
    }
  };

  clearForm = () => {
    this.email.value = "";
    this.subject.value = "";
    this.inquiry.value = "";
  };

  render() {
    return (
      <div style={{ margin: "auto", width: 400 }}>
        <form onSubmit={this.handleFormSubmit} ref={form => (this.form = form)}>
          <h2 style={{ textAlign: "center" }}>Questionnaire</h2>
          <hr />

          <label>Your Email</label>
          <input
            type="email"
            ref={node => {
              this.email = node;
            }}
            autoFocus
            required
            maxLength="100"
            style={{ margin: 10 }}
          />
          <span style={{ color: "red" }}>*</span>
          <span style={{ color: "red", marginLeft: 8 }}>
            {this.state.errors.email}
          </span>
          <br />

          <label>Subject</label>
          <input
            type="text"
            ref={node => {
              this.subject = node;
            }}
            required
            maxLength="100"
            style={{ margin: 10 }}
          />
          <span style={{ color: "red" }}>*</span>
          <span style={{ color: "red", marginLeft: 8 }}>
            {this.state.errors.subject}
          </span>
          <br />

          <label
            style={{ display: "inline-block", marginTop: 10, marginBottom: 10 }}
          >
            Inquiry message here
            <span style={{ color: "red", marginLeft: 8 }}>
              {this.state.errors.comments}
            </span>
          </label>
          <span style={{ color: "red" }}>*</span>
          <span style={{ color: "red", marginLeft: 8 }}>
            {this.state.errors.text}
          </span>
          <textarea
            rows="8"
            ref={node => {
              this.text = node;
            }}
            required
            maxLength="1000"
            style={{ width: "100%", marginBottom: 10 }}
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

export default InquiryForm;
