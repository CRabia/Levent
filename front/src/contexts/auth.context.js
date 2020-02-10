import React, { Component } from "react";
const AuthContext = React.createContext();

export class MyProvider extends Component {
  submit = event => {
    event.preventDefault();
    console.log("click");
  };

  changePageLog = () => {
    console.log("ici");
  };

  render() {
    return (
      <AuthContext.Provider
        value={{
          changePageLog: this.changePageLog
        }}
      >
        {this.props.children}
      </AuthContext.Provider>
    );
  }
}

export default AuthContext;
