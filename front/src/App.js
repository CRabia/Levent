import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import "./App.scss";
import Home from "./pages/Home";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import Header from "./components/Header";
import Footer from "./components/Footer";
import AuthContext from "./contexts/auth.context";

export default class App extends Component {
  state = {
    renderHender: true,
    renderFooter: true
  };

  componentDidMount() {
    let routes = ["/connexion", "/inscription"];
    !routes.includes(window.location.pathname)
      ? this.setState({ renderFooter: true, renderHender: true })
      : this.setState({ renderFooter: false, renderHender: false });
  }

  render() {
    return (
      <AuthContext.Provider>
        <BrowserRouter>
          {this.state.renderHender && <Header />}

          <Route path="/" exact component={Home} />
          <Route path="/contact" exact component={Contact} />
          <Route path="/inscription" exact component={Login} />
          <Route path="/connexion" exact component={Login} />

          {this.state.renderFooter && <Footer />}
        </BrowserRouter>
      </AuthContext.Provider>
    );
  }
}
