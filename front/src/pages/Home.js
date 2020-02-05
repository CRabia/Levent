import React, { Component } from "react";

export default class Home extends Component {
  state = {
    title: "Levent",
    posts: []
  };

  async componentDidMount() {}

  render() {
    return (
      <div className="container">
        <h1>{this.state.title}</h1>
      </div>
    );
  }
}
