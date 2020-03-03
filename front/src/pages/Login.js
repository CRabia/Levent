import React, { useState, useContext, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { AuthContext } from "../contexts/auth.context";
import AuthDto from "../dto/AuthDto";
import AuthService from "../services/auth.service";
import TYPES from "../store/type";

const Login = props => {
    const [email, setEmail] = useState("");
    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [password, setPassword] = useState("");
    const [request, setRequest] = useState("authenticate");
    const [title, setTitle] = useState("Connexion");
    const [textButton, setTextButton] = useState("Connexion");
    const [textUnderButton, setTextUnderButton] = useState(["Vous n'êtes pas encore inscrit ? ", "Inscrivez-vous"]);

    const [emailErrorMessage, setEmailErrorMessage] = useState("");
    const [firstnameErrorMessage, setFirstnameErrorMessage] = useState("");
    const [lastnameErrorMessage, setLastnameErrorMessage] = useState("");
    const [passwordErrorMessage, setPasswordErrorMessage] = useState("");
    const [errorLoginMessage, setErrorLoginMessage] = useState("");

    const { dispatch } = useContext(AuthContext);
    const location = useLocation();

    //Animation page
    useEffect(() => {
        location.pathname.includes("inscription") && changePageLog();
    }, []);

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

    //function to log or register user
    const userAuthentication = async body => {
        let response = await AuthService.auth(body);
        let data = await response.json();
        if (response.ok) {
            logIn(data);
            props.history.push("/user/dashboard");
        } else {
            setErrorLoginMessage(data.message);
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
    const resetErrorMessage = () => {
        setErrorLoginMessage("");
        setEmailErrorMessage("");
        setLastnameErrorMessage("");
        setFirstnameErrorMessage("");
        setPasswordErrorMessage("");
    };

    const errorsDisplay = errors => {
        errors.map(error => {
            switch (error.param) {
                case "email":
                    setEmailErrorMessage(error.msg);
                    break;
                case "firstname":
                    setFirstnameErrorMessage(error.msg);
                    break;
                case "lastname":
                    setLastnameErrorMessage(error.msg);
                    break;
                case "password":
                    setPasswordErrorMessage(error.msg);
                    break;
            }
        });
    };

    //Function to start register/connect user
    const submit = async e => {
        e.preventDefault();
        let dto = Object.assign(new AuthDto(), { email, firstname, lastname, password });
        resetErrorMessage();
        if (request === "authenticate") {
            userAuthentication(dto);
        } else {
            userRegistration(dto);
        }
    };

    const logIn = data => {
        localStorage.setItem("token", data.token);
        dispatch({ type: TYPES.SET_USER, payload: data.user });
        dispatch({ type: TYPES.SET_IS_ADMIN, payload: data.user });
        dispatch({ type: TYPES.SET_IS_AUTH, payload: true });
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
                                <label className="error-log">{emailErrorMessage}</label>
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
                                <label className="error-log">{firstnameErrorMessage}</label>
                            </div>
                            <input
                                type="text"
                                id="firstname"
                                value={firstname}
                                onChange={e => setFirstname(e.target.value)}
                            />
                            <div className="container-label">
                                <label>Nom</label>
                                <label className="error-log">{lastnameErrorMessage}</label>
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
                                <label className="error-log">{passwordErrorMessage}</label>
                            </div>
                            <input
                                type="password"
                                id="password"
                                value={password}
                                required
                                onChange={e => setPassword(e.target.value)}
                            />
                            <label className="error-log">{errorLoginMessage}</label>
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
