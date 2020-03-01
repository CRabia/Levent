import React, { useEffect, useState } from "react";
import { Router, Route } from "react-router-dom";
import "./App.scss";
import Home from "./pages/Home";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import AdminDasboard from "./pages/admin/Dashboard";
import Header from "./components/Header/Header";
import HeaderAdmin from "./components/Header/HeaderAdminComponent";
import Footer from "./components/Footer";
import { AdminRoute } from "./admin.route";
import AuthContext, { AuthProvider } from "./contexts/auth.context";
import { createBrowserHistory } from "history";

//tab od admin
import PanelUser from "./pages/admin/PanelPage/PanelUser";
import PanelComment from "./pages/admin/PanelPage/PanelComment";
import PanelEvent from "./pages/admin/PanelPage/PanelEvent";
import PanelCategory from "./pages/admin/PanelPage/PanelCategory";

//eddition of Object
import EditUser from "./pages/admin/EditPage/EditUser";
import EditComment from "./pages/admin/EditPage/EditComment";
import EditCategory from "./pages/admin/EditPage/EditCategory";

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
            customHistory.location.pathname.includes(motifRoutesAdmin) && setRenderHeaderAdmin(true);
        }
    };

    return (
        <AuthProvider customHistory={customHistory}>
            <Router history={customHistory}>
                {renderHeader && <Header theme="transparent" />}

                <AuthContext.Consumer>
                    {context => (
                        <div id="template-admin">
                            {renderHeaderAdmin && <HeaderAdmin theme="vertical" />}
                            <AdminRoute exact path="/admin/dashboard" component={AdminDasboard} />
                            <AdminRoute exact path="/admin/user" component={PanelUser} />
                            <AdminRoute exact path="/admin/comment" component={PanelComment} />
                            <AdminRoute exact path="/admin/event" component={PanelEvent} />
                            <AdminRoute exact path="/admin/category" component={PanelCategory} />

                            <AdminRoute exact path="/admin/edit-user/:userId" component={EditUser} />
                            <AdminRoute exact path="/admin/edit-comment/:commentId" component={EditComment} />
                            <AdminRoute exact path="/admin/edit-category/:categoryId" component={EditCategory} />
                        </div>
                    )}
                </AuthContext.Consumer>

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
