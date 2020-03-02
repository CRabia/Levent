import React, { Component, useState, useContext } from "react";
import { AuthContext } from "../contexts/auth.context";
import LoginDto from "../dto/LoginDto";
import AuthService from "../services/auth.service";

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

const Login = props => {
    const [email, setEmail] = useState("");
    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [password, setPassword] = useState("");
    const [request, setRequest] = useState("authenticate");
    const [title, setTitle] = useState("Connexion");
    const [textButton, setTextButton] = useState("Connexion");
    const [textUnderButton, setTextUnderButton] = useState(["Vous n'êtes pas encore inscrit ? ", "Inscrivez-vous"]);

    const [errorMessages, setErrorMessages] = useState({
        emailErrorMessage: "",
        firstnameErrorMessage: "",
        lastnameErrorMessage: "",
        passwordErrorMessage: "",
        errorMessage: ""
    });

    const { dispatch, logIn } = useContext(AuthContext);

    const changePageLog = () => {
        resetErrorMessage && resetErrorMessage();
        animationForm();
        changeTextOfThePage();
    };

    const animationForm = () => {
        document.getElementById("container-email-log").classList.toggle("animation-email-register");
        document.getElementById("container-password-log").classList.toggle("animation-password-register");
        document.getElementById("container-name-log").classList.toggle("animation-name-register");
        document.getElementById("title").classList.toggle("animation-title-register");
    };

    const changeTextOfThePage = () => {
        title === "Connexion" ? formatPageToRegister() : formatPageToConnexion();
    };

    const formatPageToConnexion = () => {
        setTitle("Connexion");
        setTextButton("Connexion");
        setTextUnderButton(["Vous n'êtes pas encore inscrit ? ", "Inscrivez-vous"]);
        setRequest("authenticate");
    };

    const formatPageToRegister = () => {
        setTitle("Inscription");
        setTextButton("S'inscrire");
        setTextUnderButton(["Vous êtes déjà inscrit ? ", "Connectez-vous"]);
        setRequest("register");
    };

    const userAuthentication = async body => {
        let response = await AuthService.auth(body);
        let data = await response.json();
        if (response.ok) {
            logIn(data);
            props.history.push("/");
        } else {
            //this.setState({ errorMessage: data.message });
        }
    };

    const userRegistration = async body => {
        let response = await AuthService.register(body);
        let data = await response.json();
        if (response.ok) {
            userAuthentication(body);
        } else {
            errorsDisplay(data.errors);
        }
    };

    //Functions to display errors when user tries to register/log in
    const resetErrorMessage = () => {};

    const errorsDisplay = errors => {
        errors.forEach(element => {
            this.setState({ [element.param + "ErrorMessage"]: element.msg });
        });
    };

    //Function to start register/connect user
    const submit = async e => {
        e.preventDefault();
        let dto = Object.assign(new LoginDto(), { email, firstname, lastname, password });
        resetErrorMessage();
        if (request === "authenticate") {
            userAuthentication(dto);
        } else {
            userRegistration(dto);
        }
    };

    return (
        <section id="login-page">
            <div className="container-logs">
                <div className="container-form">
                    <h1 id="title">{title}</h1>
                    <form onSubmit={e => submit(e)}>
                        <div id="container-email-log">
                            <div className="container-label">
                                <label>Email</label>
                                <label className="error-log">{errorMessages.emailErrorMessage}</label>
                            </div>
                            <input
                                type="text"
                                id="email"
                                value={email}
                                required
                                onChange={e => setEmail(e.target.value)}
                            />
                        </div>

                        <div id="container-name-log">
                            <div className="container-label">
                                <label>Prénom</label>
                                <label className="error-log">{errorMessages.firstnameErrorMessage}</label>
                            </div>
                            <input
                                type="text"
                                id="firstname"
                                value={firstname}
                                onChange={e => setFirstname(e.target.value)}
                            />
                            <div className="container-label">
                                <label>Nom</label>
                                <label className="error-log">{errorMessages.lastnameErrorMessage}</label>
                            </div>
                            <input
                                type="text"
                                id="lastname"
                                value={lastname}
                                onChange={e => setLastname(e.target.value)}
                            />
                        </div>

                        <div id="container-password-log">
                            <div className="container-label">
                                <label>Mot de passe</label>
                                <label className="error-log">{errorMessages.passwordErrorMessage}</label>
                            </div>
                            <input
                                type="password"
                                id="password"
                                value={password}
                                required
                                onChange={e => setPassword(e.target.value)}
                            />
                            <label className="error-log">{errorMessages.errorMessage}</label>
                            <button type="submit" className="btn">
                                {textButton}
                            </button>
                            <p id="textConnection" className="underButton">
                                {textUnderButton[0]}
                                <span onClick={() => changePageLog()}>{textUnderButton[1]}</span>
                            </p>
                        </div>
                    </form>
                </div>
            </div>
            <div className="container-logs-right"></div>
        </section>
    );
};

export default Login;

/*export default class Login extends Component {
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
}*/
