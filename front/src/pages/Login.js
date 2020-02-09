import React, { Component } from "react";
import AuthService from "../services/auth.service";

const modelConnect = {
  title: "Connexion",
  textButton: "Connexion",
  textUnderButton: ["Vous n'êtes pas encore inscrit ? ", "Inscrivez-vous"],
  messageError: "",
  request: "authentificate"
};

const modelRegister = {
  title: "Inscription",
  textButton: "S'inscrire",
  textUnderButton: ["Vous êtes déjà inscrit ? ", "Connectez-vous"],
  messageError: "",
  request: "register"
};

export default class Login extends Component {
  state = {
    email: "",
    firstname: "",
    lastname: "",
    password: "",
    request: "authentificate",
    title: "Connexion",
    textButton: "Connexion",
    messageError: "",
    textUnderButton: ["Vous n'êtes pas encore inscrit ? ", "Inscrivez-vous"]
  };

  componentDidMount() {
    window.location.pathname === "/inscription" && this.changePageLog();
  }

  handleChange(e) {
    this.setState({
      [e.target.id]: e.target.value
    });
  }

  changePageLog = () => {
    this.animationForm();
    this.changeTextOfThePage();
  };

  animationForm = () => {
    document
      .getElementById("container-email-log")
      .classList.toggle("animation-email-register");
    document
      .getElementById("container-password-log")
      .classList.toggle("animation-password-register");
    document
      .getElementById("container-name-log")
      .classList.toggle("animation-name-register");
    document
      .getElementById("title")
      .classList.toggle("animation-title-register");
  };

  changeTextOfThePage = () => {
    if (this.state.title === "Connexion") {
      this.setState(modelRegister);
    } else {
      this.setState(modelConnect);
    }
  };

  userAuthentification = async () => {
    let response = await AuthService.auth(this.state);
    let data = await response.json();
    if (response.ok) {
      localStorage.setItem("token", data.token);
      this.props.history.push("/");
    } else {
      this.setState({ messageError: data.message });
    }
  };

  userRegistration = async () => {
    let response = await AuthService.register(this.state);
    if (response.ok) {
      this.userAuthentification();
    }
  };

  async submit(e) {
    e.preventDefault();
    if (this.state.request === "authentificate") {
      this.userAuthentification();
    } else {
      this.userRegistration();
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

              <div id="container-name-log">
                <label>Prénom</label>
                <input
                  type="text"
                  id="firstname"
                  onChange={e => this.handleChange(e)}
                />
                <label>Nom</label>
                <input
                  type="text"
                  id="lastname"
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
                <label className="error-log">{this.state.messageError}</label>
                <button type="submit" className="btn">
                  {this.state.textButton}
                </button>
                <p id="textConnection" className="underButton">
                  {this.state.textUnderButton[0]}
                  <span onClick={this.changePageLog}>
                    {this.state.textUnderButton[1]}
                  </span>
                </p>
              </div>
            </form>
          </div>
        </div>
        <div className="container-logs-right"></div>
      </section>
    );
  }
}
