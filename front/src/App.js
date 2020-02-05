import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import "./App.scss";
import Home from "./pages/Home";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import Header from "./components/Header";
import Footer from "./components/Footer";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Header />
        <Route path="/" exact component={Home} />
        <Route path="/contact" exact component={Contact} />
        <Route path="/inscription" exact component={Login} />
        <Route path="/connexion" exact component={Login} />
        <Footer />
      </BrowserRouter>
    );
  }
}

export default App;
