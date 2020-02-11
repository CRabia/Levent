import React, { useEffect, useState } from "react";
import { Router, Route } from "react-router-dom";
import "./App.scss";
import Home from "./pages/Home";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { AuthProvider } from "./contexts/auth.context";
import { createBrowserHistory } from "history";

const routes = ["/connexion", "/inscription"];
const customHistory = createBrowserHistory();

const App = () => {
  const [renderHeader, setRenderHeader] = useState(true);
  const [renderFooter, setRenderFooter] = useState(true);

  useEffect(() => {
    displayNavigationLayout();
    customHistory.listen(() => displayNavigationLayout());
  }, []);

  const displayNavigationLayout = () => {
    if (!routes.includes(customHistory.location.pathname)) {
      setRenderFooter(true);
      setRenderHeader(true);
    } else {
      setRenderFooter(false);
      setRenderHeader(false);
    }
  };

  return (
    <AuthProvider>
      <Router history={customHistory}>
        {renderHeader && <Header />}
        <Route path="/" exact component={Home} />
        <Route path="/contact" exact component={Contact} />
        <Route path="/inscription" exact component={Login} />
        <Route path="/connexion" exact component={Login} />
        {renderFooter && <Footer />}
      </Router>
    </AuthProvider>
  );
};

export default App;