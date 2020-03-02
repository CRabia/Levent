import React, { useState, useEffect } from "react";
import InputFormField from "../../../components/Form/InputFormFieldComponent";
import SelectFormField from "../../../components/Form/SelectFormFieldComponent";
import ConfirmCancelButtons from "../../../components/buttons/ConfirmCancelButtonsComponent";
import Box from "../../../components/Container/BoxComponent";
import AdminPage from "../../../components/Page/AdminPageComponent";
import EventService from "../../../services/event.service";
import EventDto from "../../../dto/EventDto";
import TextareaFormField from "../../../components/Form/TextareaFormFieldComponent";

const EditEvent = props => {
    const eventId = props.match.params.eventId;

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [website, setWebsite] = useState("");
    const [price, setPrice] = useState(0);
    const [created_on, setCreatedOn] = useState("");
    const [date, setDate] = useState("");
    const [publication, setPublication] = useState(0);
    const [typeOf, setTypeOf] = useState("");
    //const [city, setCity] = useState("");
    //const [address, setAddress] = useState("");

    const [titlePage, setTitlePage] = useState("");

    const optionsSelectPublication = [
        { value: 0, text: "Non publié" },
        { value: 1, text: "Publié" }
    ];

    const optionsSelectType = [
        { value: "public", text: "Public" },
        { value: "private", text: "Privé" }
    ];

    useEffect(() => {
        const getEventInDatabase = async () => {
            let response = await EventService.details(eventId);
            if (response.ok) {
                let data = await response.json();
                initializeForm(data.event);
            }
        };

        const initializeForm = e => {
            setTitle(e.title);
            setDescription(e.description);
            setWebsite(e.website);
            setPrice(e.price);
            setDate(new Date(e.date).toISOString().substr(0, 10));
            setCreatedOn(new Date(e.created_on).toISOString().substr(0, 10));
            setTypeOf(e.typeOf);
            setPublication(e.publicationStatus);
            setTitlePage("Edition de l'événement " + e.title);
        };

        getEventInDatabase();
    }, []);

    const updateEvent = async () => {
        const dto = Object.assign(new EventDto(), {
            title,
            description,
            typeOf,
            price,
            website,
            publication,
            created_on,
            date
        });
        let response = await EventService.update(eventId, dto);
        response.ok ? console.log("ok") : console.log("none");
    };

    const submit = async e => {
        e.preventDefault();
        e.target.id === "validated" ? updateEvent() : props.history.push("/admin/event");
    };

    return (
        <AdminPage class={"small"} title={titlePage}>
            <Box class={"inset"} title={"Détail"}>
                <form>
                    <InputFormField type="text" callBack={setTitle} value={title} textField={"Titre"} />
                    <TextareaFormField callBack={setDescription} value={description} textField={"Description"} />
                    <InputFormField type="text" callBack={setWebsite} value={website} textField={"Site"} />
                    <InputFormField type="date" callBack={setCreatedOn} value={created_on} textField={"Date créat."} />
                    <InputFormField type="date" callBack={setDate} value={date} textField={"Date"} />
                    <SelectFormField
                        callBack={setPublication}
                        value={publication}
                        textField={"Publication"}
                        options={optionsSelectPublication}
                    />
                    <SelectFormField
                        callBack={setTypeOf}
                        value={typeOf}
                        textField={"Type"}
                        options={optionsSelectType}
                    />
                    <ConfirmCancelButtons callBack={submit} textValidated={"Enregistrer"} textCanceled={"Annuler"} />
                </form>
            </Box>
        </AdminPage>
    );
};

export default EditEvent;
