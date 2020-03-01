import React, { useState, useEffect } from "react";
import ReactPaginate from "react-paginate";
import TableComponent from "../../../components/TableComponent";
import AdminPage from "../../../components/Page/AdminPageComponent";
import HeaderBar from "../../../components/Header/HeaderBarComponent";
import AdminSearchBar from "../../../components/SearchBar/AdminSearchBarComponent";
import CommentService from "../../../services/comment.service";

const PanelComment = () => {
    const [listComments, setListComments] = useState([]);
    const [commentPerPage, setCommentPerPage] = useState(10);
    const [commentTotal, setCommentTotal] = useState(0);
    const [currentPage, setCurrentPage] = useState(0);

    const pathEdit = "edit-comment";

    const nameOfColumn = ["id ", "Prénom", "Nom", "Email", "Date Insc.", "Publication", ""];

    const updateListWithCommentFormatting = comments => {
        comments.map(comment => {
            delete comment.content;
        });
        setListComments(comments);
    };

    const loadCommentsPerPage = async page => {
        let response = await CommentService.listCommentsPerPage(page.selected, commentPerPage);
        setCurrentPage(page.selected);
        if (response.ok) {
            let data = await response.json();
            updateListWithCommentFormatting(data.comments);
            setCommentTotal(data.length);
        }
    };

    const search = () => {
        console.log("search");
    };

    useEffect(() => {
        loadCommentsPerPage({ selected: currentPage });
    }, []);

    return (
        <AdminPage id={"panel-comment-admin"} title={"Commentaires"}>
            <HeaderBar textLabel="Liste des commentaires">
                <AdminSearchBar textButton="Rechercher" callBack={search} textPlaceholder="rechercher un commentaire" />
            </HeaderBar>
            <div className="header-table">
                <ReactPaginate
                    previousLabel={"Préc."}
                    nextLabel={"Suiv."}
                    pageCount={commentTotal / commentPerPage}
                    marginPagesDisplayed={2}
                    pageRangeDisplayed={3}
                    onPageChange={loadCommentsPerPage}
                    containerClassName={"pagination"}
                    subContainerClassName={"pages pagination"}
                    activeClassName={"active"}
                />
                <div>
                    <label>Nombre de commentaire par page</label>
                    <input
                        type="number"
                        min="1"
                        value={commentPerPage}
                        onChange={e => setCommentPerPage(e.target.value)}
                        onBlur={loadCommentsPerPage}
                    />
                </div>
            </div>
            <TableComponent items={listComments} nameOfColumn={nameOfColumn} pathEdit={pathEdit} />
        </AdminPage>
    );
};

export default PanelComment;
