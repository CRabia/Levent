import React, { Component } from "react";
import AuthService from "../services/auth.service";

const AuthContext = React.createContext();

const modelErrorMessage = {
    emailErrorMessage: "",
    firstnameErrorMessage: "",
    lastnameErrorMessage: "",
    passwordErrorMessage: "",
    errorMessage: ""
};

const modelLogOut = {
    isAuth: false,
    currentUserFirstname: "",
    currentUserRole: 0
};

export class AuthProvider extends Component {
    state = {
        errorMessage: "",
        emailErrorMessage: "",
        firstnameErrorMessage: "",
        lastnameErrorMessage: "",
        passwordErrorMessage: "",
        isAuth: null,
        currentUserFirstname: "",
        currentUserRole: 0
    };

    componentDidMount = () => {
        this.state.isAuth === null && this.isLogIn();
    };

    resetErrorMessage = () => {
        this.setState(modelErrorMessage);
    };

    errorsDisplay = errors => {
        errors.forEach(element => {
            this.setState({ [element.param + "ErrorMessage"]: element.msg });
        });
    };

    userAuthentication = async body => {
        let response = await AuthService.auth(body);
        let data = await response.json();
        if (response.ok) {
            this.logIn(data);
        } else {
            this.setState({ errorMessage: data.message });
        }
    };

    userRegistration = async body => {
        let response = await AuthService.register(body);
        let data = await response.json();
        if (response.ok) {
            this.userAuthentication(body);
        } else {
            this.errorsDisplay(data.errors);
        }
    };

    isLogIn = async () => {
        let response = AuthService.isAuthenticated();
        response.ok ? this.logIn(await response.json()) : this.logOut();
    };

    logIn = data => {
        localStorage.setItem("token", data.token);
        this.setState({
            currentUserFirstname: data.user.firstname,
            currentUserRole: data.user.user_role,
            isAuth: true
        });
    };

    logOut = () => {
        this.setState(modelLogOut);
        localStorage.removeItem("token");
    };

    submit = async (e, body, request) => {
        e.preventDefault();
        this.resetErrorMessage();
        if (request === "authentificate") {
            this.userAuthentication(body);
        } else {
            this.userRegistration(body);
        }
    };

    render() {
        return (
            <AuthContext.Provider
                value={{
                    submit: this.submit,
                    resetErrorMessage: this.resetErrorMessage,
                    logOut: this.logOut,
                    ...this.state
                }}
            >
                {this.props.children}
            </AuthContext.Provider>
        );
    }
}

export default AuthContext;
