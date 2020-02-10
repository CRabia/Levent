import React, { Component } from "react";
import AuthService from "../services/auth.service";
import AuthContext from "../contexts/auth.context";

const modelConnect = {
    title: "Connexion",
    textButton: "Connexion",
    textUnderButton: ["Vous n'êtes pas encore inscrit ? ", "Inscrivez-vous"],
    request: "authentificate",
    emailErrorMessage: "",
    firstnameErrorMessage: "",
    lastnameErrorMessage: "",
    passwordErrorMessage: "",
    errorMessage: ""
};

const modelRegister = {
    title: "Inscription",
    textButton: "S'inscrire",
    textUnderButton: ["Vous êtes déjà inscrit ? ", "Connectez-vous"],
    request: "register",
    emailErrorMessage: "",
    firstnameErrorMessage: "",
    lastnameErrorMessage: "",
    passwordErrorMessage: "",
    errorMessage: ""
};

const resetErrorMessage = {
    emailErrorMessage: "",
    firstnameErrorMessage: "",
    lastnameErrorMessage: "",
    passwordErrorMessage: "",
    errorMessage: ""
};

export default class Login extends Component {
    state = {
        email: "",
        firstname: "",
        lastname: "",
        password: "",
        errorMessage: "",
        emailErrorMessage: "",
        firstnameErrorMessage: "",
        lastnameErrorMessage: "",
        passwordErrorMessage: "",
        request: "authentificate",
        title: "Connexion",
        textButton: "Connexion",
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

    errorsDisplay = errors => {
        this.setState(resetErrorMessage);
        errors.forEach(element => {
            this.setState({ [element.param + "ErrorMessage"]: element.msg });
        });
    };

    userAuthentification = async () => {
        let response = await AuthService.auth(this.state);
        let data = await response.json();
        if (response.ok) {
            localStorage.setItem("token", data.token);
            this.props.history.push("/");
        } else {
            this.setState({ errorMessage: data.message });
        }
    };

    userRegistration = async () => {
        let response = await AuthService.register(this.state);
        let data = await response.json();
        if (response.ok) {
            this.userAuthentification();
        } else {
            this.errorsDisplay(data.errors);
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
                        <AuthContext.Consumer>
                            {context => (
                                <form onSubmit={e => this.submit(e)}>
                                    <div id="container-email-log">
                                        <div className="container-label">
                                            <label>Email</label>
                                            <label className="error-log">
                                                {this.state.emailErrorMessage}
                                            </label>
                                        </div>
                                        <input
                                            type="text"
                                            id="email"
                                            required
                                            onChange={e => this.handleChange(e)}
                                        />
                                    </div>

                                    <div id="container-name-log">
                                        <div className="container-label">
                                            <label>Prénom</label>
                                            <label className="error-log">
                                                {
                                                    this.state
                                                        .firstnameErrorMessage
                                                }
                                            </label>
                                        </div>
                                        <input
                                            type="text"
                                            id="firstname"
                                            onChange={e => this.handleChange(e)}
                                        />
                                        <div className="container-label">
                                            <label>Nom</label>
                                            <label className="error-log">
                                                {
                                                    this.state
                                                        .lastnameErrorMessage
                                                }
                                            </label>
                                        </div>
                                        <input
                                            type="text"
                                            id="lastname"
                                            onChange={e => this.handleChange(e)}
                                        />
                                    </div>

                                    <div id="container-password-log">
                                        <div className="container-label">
                                            <label>Mot de passe</label>
                                            <label className="error-log">
                                                {
                                                    this.state
                                                        .passwordErrorMessage
                                                }
                                            </label>
                                        </div>
                                        <input
                                            type="password"
                                            id="password"
                                            required
                                            onChange={e => this.handleChange(e)}
                                        />
                                        <label className="error-log">
                                            {this.state.errorMessage}
                                        </label>
                                        <button type="submit" className="btn">
                                            {this.state.textButton}
                                        </button>
                                        <p
                                            id="textConnection"
                                            className="underButton"
                                        >
                                            {this.state.textUnderButton[0]}
                                            <span onClick={this.changePageLog}>
                                                {this.state.textUnderButton[1]}
                                            </span>
                                        </p>
                                    </div>
                                </form>
                            )}
                        </AuthContext.Consumer>
                    </div>
                </div>
                <div className="container-logs-right"></div>
            </section>
        );
    }
}
