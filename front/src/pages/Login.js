import React, { Component } from "react";
import AuthService from "../services/auth.service";

export default class Login extends Component {
  state = {
    email: "",
    firstname: "",
    name: "",
    password: "",
    pageLog: "login",
    animationContainerEmail: "",
    animationContainerPassword: "",
    title: "Connexion"
  };

  componentDidMount() {
    if (window.location.pathname == "/inscription") this.changePageLog();
  }

  handleChange(e) {
    this.setState({
      [e.target.id]: e.target.value
    });
  }

  changePageLog = async () => {
    this.setState({ pageLog: "register" });
    document
      .getElementById("container-email-log")
      .classList.toggle("animation-email-register");
    document
      .getElementById("container-password-log")
      .classList.toggle("animation-password-register");
    document
      .getElementById("container-name-log")
      .classList.toggle("animation-name-register");

    this.changeTitleOfThePage();
  };

  changeTitleOfThePage = () => {
    this.state.title == "Connexion"
      ? this.setState({ title: "Inscription" })
      : this.setState({ title: "Connexion" });
    document
      .getElementById("title")
      .classList.toggle("animation-title-register");
  };

  async submit(e) {
    e.preventDefault();
    let response = await AuthService.auth(this.state);
    if (response.ok) {
      let data = await response.json();
      localStorage.setItem("token", data.token);
      this.props.history.push("/");
    } else {
    }
  }

  render() {
    return (
      <section id="login-page">
        <div className="container-logs">
          <div className="container-form">
            <h1 id="title">{this.state.title}</h1>
            <form onSubmit={e => this.submit(e)}>
              <div id="container-email-log">
                <label>Email</label>
                <input
                  type="text"
                  id="email"
                  required
                  onChange={e => this.handleChange(e)}
                />
              </div>
              <div id="container-password-log">
                <label>Password</label>
                <input
                  type="password"
                  id="password"
                  required
                  onChange={e => this.handleChange(e)}
                />
                <button type="submit" className="btn">
                  Connexion
                </button>
                <p id="textConnection" className="underButton">
                  Vous n'êtes pas encore inscrit ?{" "}
                  <span onClick={this.changePageLog}>Inscrivez-vous</span>
                </p>
              </div>
            </form>
          </div>
        </div>
        <div className="container-logs-right">
          <div className="container-form">
            <div id="container-name-log">
              <label>Prénom</label>
              <input
                type="text"
                id="firtname"
                required
                onChange={e => this.handleChange(e)}
              />
              <label>Nom</label>
              <input
                type="text"
                id="name"
                required
                onChange={e => this.handleChange(e)}
              />
            </div>
          </div>
        </div>
      </section>
    );
  }
}
