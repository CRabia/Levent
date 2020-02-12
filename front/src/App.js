import React, { useEffect, useState } from "react";
import { Router, Route } from "react-router-dom";
import "./App.scss";
import Home from "./pages/Home";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import AdminDasboard from "./pages/admin/Dashboard";
import Header from "./components/Header";
import Footer from "./components/Footer";
//import { ProtectedRoute } from "./protected.route";
import { AuthProvider } from "./contexts/auth.context";
import { createBrowserHistory } from "history";
import HeaderAdmin from "./components/admin/HeaderAdminComponent";

const routes = ["/connexion", "/inscription"];
const motifRoutesAdmin = "/admin";
const customHistory = createBrowserHistory();

const App = () => {
    const [renderHeader, setRenderHeader] = useState(true);
    const [renderFooter, setRenderFooter] = useState(true);
    const [renderHeaderAdmin, setRenderHeaderAdmin] = useState(false);

    useEffect(() => {
        displayNavigationLayout();
        customHistory.listen(() => displayNavigationLayout());
    }, []);

    const displayNavigationLayout = () => {
        if (
            !routes.includes(customHistory.location.pathname) &&
            !customHistory.location.pathname.includes(motifRoutesAdmin)
        ) {
            setRenderFooter(true);
            setRenderHeader(true);
            setRenderHeaderAdmin(false);
        } else {
            setRenderFooter(false);
            setRenderHeader(false);
            customHistory.location.pathname.includes(motifRoutesAdmin) &&
                setRenderHeaderAdmin(true);
        }
    };

    return (
        <AuthProvider>
            <Router history={customHistory}>
                {renderHeader && <Header />}
                {renderHeaderAdmin && <HeaderAdmin />}
                <Route path="/" exact component={Home} />
                <Route path="/contact" exact component={Contact} />
                <Route path="/inscription" exact component={Login} />
                <Route path="/connexion" exact component={Login} />
                <Route
                    path="/admin/dashboard"
                    exact
                    component={AdminDasboard}
                />
                {/*<ProtectedRoute
                    exact
                    path="/admin/dashboard"
                    component={AdminDasboard}
                />*/}
                {renderFooter && <Footer />}
            </Router>
        </AuthProvider>
    );
};

export default App;
