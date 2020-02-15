import React, { Component } from "react";
import AuthContext from "../contexts/auth.context";
import LoginDto from "../dto/LoginDto";

const modelConnect = {
    title: "Connexion",
    textButton: "Connexion",
    textUnderButton: ["Vous n'êtes pas encore inscrit ? ", "Inscrivez-vous"],
    request: "authenticate"
};

const modelRegister = {
    title: "Inscription",
    textButton: "S'inscrire",
    textUnderButton: ["Vous êtes déjà inscrit ? ", "Connectez-vous"],
    request: "register"
};

export default class Login extends Component {
    state = {
        email: "",
        firstname: "",
        lastname: "",
        password: "",
        request: "authenticate",
        title: "Connexion",
        textButton: "Connexion",
        textUnderButton: ["Vous n'êtes pas encore inscrit ? ", "Inscrivez-vous"]
    };

    componentDidMount() {
        window.location.pathname === "/inscription" && this.changePageLog(null);
    }

    handleChange(e) {
        this.setState({
            [e.target.id]: e.target.value
        });
    }

    changePageLog = resetErrorMessage => {
        resetErrorMessage && resetErrorMessage();
        this.animationForm();
        this.changeTextOfThePage();
    };

    animationForm = () => {
        document.getElementById("container-email-log").classList.toggle("animation-email-register");
        document.getElementById("container-password-log").classList.toggle("animation-password-register");
        document.getElementById("container-name-log").classList.toggle("animation-name-register");
        document.getElementById("title").classList.toggle("animation-title-register");
    };

    changeTextOfThePage = () => {
        if (this.state.title === "Connexion") {
            this.setState(modelRegister);
        } else {
            this.setState(modelConnect);
        }
    };

    render() {
        const dto = Object.assign(new LoginDto(), this.state);

        return (
            <section id="login-page">
                <div className="container-logs">
                    <div className="container-form">
                        <h1 id="title">{this.state.title}</h1>
                        <AuthContext.Consumer>
                            {context => (
                                <form onSubmit={e => context.submit(e, dto, this.state.request)}>
                                    <div id="container-email-log">
                                        <div className="container-label">
                                            <label>Email</label>
                                            <label className="error-log">{context.emailErrorMessage}</label>
                                        </div>
                                        <input type="text" id="email" required onChange={e => this.handleChange(e)} />
                                    </div>

                                    <div id="container-name-log">
                                        <div className="container-label">
                                            <label>Prénom</label>
                                            <label className="error-log">{context.firstnameErrorMessage}</label>
                                        </div>
                                        <input type="text" id="firstname" onChange={e => this.handleChange(e)} />
                                        <div className="container-label">
                                            <label>Nom</label>
                                            <label className="error-log">{context.lastnameErrorMessage}</label>
                                        </div>
                                        <input type="text" id="lastname" onChange={e => this.handleChange(e)} />
                                    </div>

                                    <div id="container-password-log">
                                        <div className="container-label">
                                            <label>Mot de passe</label>
                                            <label className="error-log">{context.passwordErrorMessage}</label>
                                        </div>
                                        <input
                                            type="password"
                                            id="password"
                                            required
                                            onChange={e => this.handleChange(e)}
                                        />
                                        <label className="error-log">{context.errorMessage}</label>
                                        <button type="submit" className="btn">
                                            {this.state.textButton}
                                        </button>
                                        <p id="textConnection" className="underButton">
                                            {this.state.textUnderButton[0]}
                                            <span onClick={() => this.changePageLog(context.resetErrorMessage)}>
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
