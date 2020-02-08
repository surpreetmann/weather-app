import React, { Component } from "react";
import { Input, Message, Form } from "semantic-ui-react";
import "../css/ButtonSearch.css";


class ButtonSearch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: "",
      warning: false
    };
    this.setChange = this.setChange.bind(this);
    this.parentValue = this.parentValue.bind(this);
  }

  setChange(event) {
    this.setState({ value: event.target.value });
  }

  parentValue(event) {
    event.preventDefault();
    if (this.state.value.trim() === "" || this.state.value.match(/\d+/g) !== null) {
      this.setState({ warning: true });
    } else {
      this.props.callBackFromParent(this.state.value);
      this.setState({ warning: false });
    }
  }

  render() {
    const warMsg = (
      <Message warning header="Kindly enter a valid city" />
    );
    const errMsg= (
      <Message error header="An error occurred" content={this.props.error} />
    );

    return (
      <div className="ButtonSearch">
        {this.props.error && errMsg}
        {this.state.warning && warMsg}
        <Form onSubmit={this.parentValue}>
        <div className="HeaderSearch"><b><h2>Know your current city's weather!</h2></b></div>
        <span class="w3-badge w3-padding"><Input className="ButtonSearch-input" placeholder="Enter City Name" action={{ icon: "search" }} onChange={this.setChange} value={this.state.value} autoFocus />
        </span>
        </Form>
      </div>
    );
  }
}

export default ButtonSearch;
