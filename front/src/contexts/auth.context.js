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
    isAdmin: false,
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
        isAdmin: false,
        currentUserFirstname: "",
        currentUserRole: 0
    };

    componentDidMount = async () => {
        if (this.state.isAuth === null) {
            this.isLogIn();
        }
    };

    userAuthentication = async body => {
        let response = await AuthService.auth(body);
        let data = await response.json();
        if (response.ok) {
            this.logIn(data);
            this.props.customHistory.push("/");
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

    logIn = data => {
        localStorage.setItem("token", data.token);
        this.setState({
            currentUserFirstname: data.user.firstname,
            currentUserRole: data.user.user_role,
            isAuth: true
        });
        this.isUserAdmin();
    };

    logOut = () => {
        this.setState(modelLogOut);
        localStorage.removeItem("token");
        this.props.customHistory.push("/");
    };

    //Functions to check the user status

    isUserAdmin = () => {
        this.state.currentUserRole === 2 && this.setState({ isAdmin: true });
    };

    isLogIn = async () => {
        let response = await AuthService.isAuthenticated();
        response.ok ? this.logIn(await response.json()) : this.logOut();
        this.isUserAdmin();
    };

    //Functions to display errors when user tries to register/log in

    resetErrorMessage = () => {
        this.setState(modelErrorMessage);
    };

    errorsDisplay = errors => {
        errors.forEach(element => {
            this.setState({ [element.param + "ErrorMessage"]: element.msg });
        });
    };

    //Function to start register/connect user

    submit = async (e, body, request) => {
        e.preventDefault();
        this.resetErrorMessage();
        if (request === "authenticate") {
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
                    isAdmin: this.isAdmin,
                    ...this.state
                }}
            >
                {this.props.children}
            </AuthContext.Provider>
        );
    }
}

export default AuthContext;
