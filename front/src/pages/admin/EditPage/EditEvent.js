import React, { useState, useEffect } from "react";
import InputFormField from "../../../components/Form/InputFormFieldComponent";
import SelectFormField from "../../../components/Form/SelectFormFieldComponent";
import ConfirmCancelButtons from "../../../components/buttons/ConfirmCancelButtonsComponent";
import Box from "../../../components/Container/BoxComponent";
import AdminPage from "../../../components/Page/AdminPageComponent";
import EventService from "../../../services/event.service";
//import UploadService from "../../../services/upload.service";
import EventDto from "../../../dto/EventDto";
import TextareaFormField from "../../../components/Form/TextareaFormFieldComponent";
import Axios from "axios";
import CategoryService from "../../../services/category.service";

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
    const [file, setFile] = useState({});
    const [pathImage, setPathImage] = useState("");
    const [categoryId, setCategoryId] = useState("");

    //const [city, setCity] = useState("");
    //const [address, setAddress] = useState("");

    const [titlePage, setTitlePage] = useState("");

    const [optionsSelectCategory, setOptionsSelectCategory] = useState([]);

    const optionsSelectPublication = [
        { value: false, text: "Non publié" },
        { value: true, text: "Publié" }
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
                if (data.event) initializeForm(data.event);
                else props.history.push("/admin/event");
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
            setPathImage(e.pathImage);
            setPathImage(e.pathImage);
            setCategoryId(e.categoryId);
            setTitlePage("Edition de l'événement " + e.title);
        };

        const setFormatCategoryOptionSelect = categories => {
            let result = [];
            categories.forEach(category => {
                let obj = { value: category._id, text: category.label };
                result.push(obj);
            });
            setOptionsSelectCategory(result);
        };

        const getCategoryPublished = async () => {
            let response = await CategoryService.listCategoryPublished();
            if (response.ok) {
                let data = await response.json();
                setFormatCategoryOptionSelect(data.categories);
            }
        };

        getEventInDatabase();
        getCategoryPublished();
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
            date,
            pathImage,
            categoryId
        });
        let response = await EventService.update(eventId, dto);
        response.ok ? console.log("ok") : console.log("none");
    };

    const submit = async e => {
        e.preventDefault();
        e.target.id === "validated" ? updateEvent() : props.history.push("/admin/event");
    };

    const fileChangedHandler = event => {
        setFile(event.target.files[0]);
    };

    const deleteEvent = async () => {
        await EventService.delete(eventId);
    };

    const uploadImage = async e => {
        e.preventDefault();
        if (file !== "") {
            const formData = new FormData();
            formData.append("file", file, file.name);

            let response = await Axios.post("http://localhost:3001/upload", formData);
            if (response) {
                setPathImage(response.data.filename);
                updateEvent();
            }
        }
    };

    return (
        <AdminPage class={"small"} title={titlePage}>
            <Box class={"inset"} title={"Détail"}>
                <form>
                    <InputFormField type="text" callBack={setTitle} value={title} textField={"Titre"} />
                    <TextareaFormField callBack={setDescription} value={description} textField={"Description"} />
                    <InputFormField type="text" callBack={setWebsite} value={website} textField={"Site"} />
                    <InputFormField type="number" callBack={setPrice} value={price} textField={"Prix (€)"} />
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

                    <SelectFormField
                        callBack={setCategoryId}
                        value={categoryId}
                        textField={"Catégorie"}
                        options={optionsSelectCategory}
                    />
                    <div className="upload-img">
                        <input type="file" name="avatar" onChange={fileChangedHandler} />
                        <button className="btn-classic" onClick={uploadImage}>
                            Upload l'image
                        </button>
                        {pathImage && (
                            <img
                                src={`http://localhost:3001/public/${pathImage}`}
                                width="45"
                                height="auto"
                                alt="image de l'event"
                            />
                        )}
                    </div>

                    <ConfirmCancelButtons
                        callBack={submit}
                        textValidated={"Enregistrer"}
                        textCanceled={"Annuler"}
                        pathDelete={deleteEvent}
                    />
                </form>
            </Box>
        </AdminPage>
    );
};

export default EditEvent;
