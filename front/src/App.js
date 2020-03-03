import React, { useEffect, useState, useContext } from "react";
import { Router, Route } from "react-router-dom";
import "./App.scss";
import Home from "./pages/Home";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import AdminDasboard from "./pages/admin/Dashboard";
import Header from "./components/Header/Header";
import HeaderAdmin from "./components/Header/HeaderAdminComponent";
import Footer from "./components/Footer";

import AuthProvider from "./contexts/auth.context";
import { createBrowserHistory } from "history";

//Routage
import Routes from "./routes/Routes";
import { AdminRoute } from "./routes/admin.route";
import { AuthRoute } from "./routes/auth.route";

//tab of user
import UserDashboard from "./pages/User/UserDasboard";
import Event from "./pages/User/Event";

//tab of admin
import PanelUser from "./pages/admin/PanelPage/PanelUser";
import PanelComment from "./pages/admin/PanelPage/PanelComment";
import PanelEvent from "./pages/admin/PanelPage/PanelEvent";
import PanelCategory from "./pages/admin/PanelPage/PanelCategory";

//eddition of Object
import EditUser from "./pages/admin/EditPage/EditUser";
import EditComment from "./pages/admin/EditPage/EditComment";
import EditCategory from "./pages/admin/EditPage/EditCategory";
import EditEvent from "./pages/admin/EditPage/EditEvent";

const routes = ["/connexion", "/inscription"];
const motifRoutesAdmin = "/admin/";
const motifRoutesUser = "/user/";
export const customHistory = createBrowserHistory();

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
            !customHistory.location.pathname.includes(motifRoutesAdmin) &&
            !customHistory.location.pathname.includes(motifRoutesUser)
        ) {
            setRenderFooter(true);
            setRenderHeader(true);
            setRenderHeaderAdmin(false);
        } else if (customHistory.location.pathname.includes(motifRoutesUser)) {
            setRenderFooter(false);
            setRenderHeader(true);
            customHistory.location.pathname.includes(motifRoutesAdmin) && setRenderHeaderAdmin(false);
        } else {
            setRenderFooter(false);
            setRenderHeader(false);
            customHistory.location.pathname.includes(motifRoutesAdmin) && setRenderHeaderAdmin(true);
        }
    };

    return (
        <AuthProvider>
            <Routes>
                <Router history={customHistory}>
                    {renderHeader && <Header theme="transparent" />}

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
                        <AdminRoute exact path="/admin/edit-event/:eventId" component={EditEvent} />
                    </div>

                    <AuthRoute exact path="/user/dashboard" component={UserDashboard} />
                    <AuthRoute exact path="/user/event/:idEvent" component={Event} />

                    <Route path="/" exact component={Home} />
                    <Route path="/contact" exact component={Contact} />
                    <Route path="/inscription" exact component={Login} />
                    <Route path="/connexion" exact component={Login} />

                    {renderFooter && <Footer />}
                </Router>
            </Routes>
        </AuthProvider>
    );
};

export default App;
