import React, { useState, useEffect } from "react";
import UserService from "../../../services/user.service";
import ReactPaginate from "react-paginate";
import TableComponent from "../../../components/TableComponent";
import AdminPage from "../../../components/Page/AdminPageComponent";
import HeaderBar from "../../../components/Header/HeaderBarComponent";
import AdminSearchBar from "../../../components/SearchBar/AdminSearchBarComponent";

const PanelUser = () => {
    const [listUsers, setListUsers] = useState([]);
    const [userPerPage, setUserPerPage] = useState(10);
    const [userTotal, setUserTotal] = useState(0);
    const [currentPage, setCurrentPage] = useState(0);
    const pathEdit = "edit-user";

    const nameOfColumn = ["id ", "Prénom", "Nom", "Email", "Date Insc.", ""];

    const updateListWithUserFormatting = users => {
        users.map(user => {
            delete user.password;
            delete user.__v;
            delete user.user_role;
        });
        setListUsers(users);
    };

    const loadUsersPerPage = async page => {
        let response = await UserService.listUsersPerPage(page.selected, userPerPage);
        setCurrentPage(page.selected);
        if (response.ok) {
            let data = await response.json();
            updateListWithUserFormatting(data.users);
            setUserTotal(data.length);
        }
    };

    const search = () => {
        console.log("search");
    };

    useEffect(() => {
        loadUsersPerPage({ selected: currentPage });
    }, []);

    return (
        <AdminPage id={"panel-user-admin"} title={"Utilisateurs"}>
            <HeaderBar textLabel="Liste des utilisateurs">
                <AdminSearchBar textButton="Rechercher" callBack={search} textPlaceholder="rechercher un utilisateur" />
            </HeaderBar>

            <div className="header-table">
                <ReactPaginate
                    previousLabel={"Préc."}
                    nextLabel={"Suiv."}
                    pageCount={userTotal / userPerPage}
                    marginPagesDisplayed={2}
                    pageRangeDisplayed={3}
                    onPageChange={loadUsersPerPage}
                    containerClassName={"pagination"}
                    subContainerClassName={"pages pagination"}
                    activeClassName={"active"}
                />
                <div>
                    <label>Nombre d'utilisateur par page</label>
                    <input
                        type="number"
                        min="1"
                        id="UserPerPage"
                        value={userPerPage}
                        onChange={e => setUserPerPage(e.target.value)}
                        onBlur={loadUsersPerPage}
                    />
                </div>
            </div>
            <TableComponent items={listUsers} nameOfColumn={nameOfColumn} pathEdit={pathEdit} />
        </AdminPage>
    );
};

export default PanelUser;
