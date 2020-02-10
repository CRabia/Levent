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

export class AuthProvider extends Component {
  state = {
    errorMessage: "",
    emailErrorMessage: "",
    firstnameErrorMessage: "",
    lastnameErrorMessage: "",
    passwordErrorMessage: ""
  };

  resetErrorMessage = () => {
    this.setState(modelErrorMessage);
  };

  errorsDisplay = errors => {
    this.resetErrorMessage();
    errors.forEach(element => {
      this.setState({ [element.param + "ErrorMessage"]: element.msg });
    });
  };

  userAuthentication = async body => {
    let response = await AuthService.auth(body);
    let data = await response.json();
    if (response.ok) {
      localStorage.setItem("token", data.token);
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

  submit = async (e, body, request) => {
    e.preventDefault();
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
          ...this.state
        }}
      >
        {this.props.children}
      </AuthContext.Provider>
    );
  }
}

export default AuthContext;
