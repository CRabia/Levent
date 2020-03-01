import React, { useState, useEffect } from "react";
import ReactPaginate from "react-paginate";
import TableComponent from "../../../components/TableComponent";
import AdminPage from "../../../components/Page/AdminPageComponent";
import HeaderBar from "../../../components/Header/HeaderBarComponent";
import AdminSearchBar from "../../../components/SearchBar/AdminSearchBarComponent";
import CategoryService from "../../../services/category.service";

const PanelCategory = () => {
    const [listCategories, setListCategories] = useState([]);
    const [categoryPerPage, setCategoryPerPage] = useState(10);
    const [categoryTotal, setCategoryTotal] = useState(0);
    const [currentPage, setCurrentPage] = useState(0);

    const pathEdit = "edit-category";

    const nameOfColumn = ["id ", "Label", "Publication", ""];

    const updateListWithCategoriesFormatting = categories => {
        categories.map(category => {
            delete category.description;
        });
        setListCategories(categories);
    };

    const loadCategoriesPerPage = async page => {
        let response = await CategoryService.listCategoriesPerPage(page.selected, categoryPerPage);
        setCurrentPage(page.selected);
        if (response.ok) {
            let data = await response.json();
            updateListWithCategoriesFormatting(data.categories);
            setCategoryTotal(data.length);
        }
    };

    const search = () => {
        console.log("search");
    };

    useEffect(() => {
        loadCategoriesPerPage({ selected: currentPage });
    }, []);

    return (
        <AdminPage id={"panel-category-admin"} title={"Catégorie"}>
            <HeaderBar textLabel="Liste des catégories">
                <AdminSearchBar textButton="Rechercher" callBack={search} textPlaceholder="rechercher une catégorie" />
            </HeaderBar>
            <div className="header-table">
                <ReactPaginate
                    previousLabel={"Préc."}
                    nextLabel={"Suiv."}
                    pageCount={categoryTotal / categoryPerPage}
                    marginPagesDisplayed={2}
                    pageRangeDisplayed={3}
                    onPageChange={loadCategoriesPerPage}
                    containerClassName={"pagination"}
                    subContainerClassName={"pages pagination"}
                    activeClassName={"active"}
                />
                <div>
                    <label>Nombre de catégories par page</label>
                    <input
                        type="number"
                        min="1"
                        value={categoryPerPage}
                        onChange={e => setCategoryPerPage(e.target.value)}
                        onBlur={loadCategoriesPerPage}
                    />
                </div>
            </div>
            <TableComponent items={listCategories} nameOfColumn={nameOfColumn} pathEdit={pathEdit} />
        </AdminPage>
    );
};

export default PanelCategory;
