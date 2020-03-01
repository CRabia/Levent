import React, { useState, useEffect } from "react";
import ReactPaginate from "react-paginate";
import TableComponent from "../../../components/TableComponent";
import AdminPage from "../../../components/Page/AdminPageComponent";
import HeaderBar from "../../../components/Header/HeaderBarComponent";
import AdminSearchBar from "../../../components/SearchBar/AdminSearchBarComponent";
import EventService from "../../../services/event.service";

const PanelEvent = () => {
    const [listEvents, setListEvents] = useState([]);
    const [eventPerPage, setEventPerPage] = useState(10);
    const [eventTotal, setEventTotal] = useState(0);
    const [currentPage, setCurrentPage] = useState(0);

    const pathEdit = "edit-event";

    const nameOfColumn = ["id ", "title", "Date Créat.", "Publication", "Type", ""];

    const updateListWithEventFormatting = events => {
        events.map(event => {
            delete event.description;
            delete event.userId;
            delete event.addresses;
            delete event.date;
            delete event.price;
            delete event.website;
        });

        setListEvents(events);
    };

    const loadEventsPerPage = async page => {
        let response = await EventService.listEventsPerPage(page.selected, eventPerPage);
        setCurrentPage(page.selected);
        if (response.ok) {
            let data = await response.json();
            updateListWithEventFormatting(data.events);
            setEventTotal(data.length);
        }
    };

    const search = () => {
        console.log("search");
    };

    useEffect(() => {
        loadEventsPerPage({ selected: currentPage });
    }, []);

    return (
        <AdminPage id={"panel-event-admin"} title={"Evénements"}>
            <HeaderBar textLabel="Liste des événements">
                <AdminSearchBar textButton="Rechercher" callBack={search} textPlaceholder="rechercher un événement" />
            </HeaderBar>
            <div className="header-table">
                <ReactPaginate
                    previousLabel={"Préc."}
                    nextLabel={"Suiv."}
                    pageCount={eventTotal / eventPerPage}
                    marginPagesDisplayed={2}
                    pageRangeDisplayed={3}
                    onPageChange={loadEventsPerPage}
                    containerClassName={"pagination"}
                    subContainerClassName={"pages pagination"}
                    activeClassName={"active"}
                />
                <div>
                    <label>Nombre de commentaire par page</label>
                    <input
                        type="number"
                        min="1"
                        value={eventPerPage}
                        onChange={e => setEventPerPage(e.target.value)}
                        onBlur={loadEventsPerPage}
                    />
                </div>
            </div>
            <TableComponent items={listEvents} nameOfColumn={nameOfColumn} pathEdit={pathEdit} />
        </AdminPage>
    );
};

export default PanelEvent;
