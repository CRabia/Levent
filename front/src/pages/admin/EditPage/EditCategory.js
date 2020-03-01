import React, { useEffect, useState } from "react";
import InputFormField from "../../../components/Form/InputFormFieldComponent";
import SelectFormField from "../../../components/Form/SelectFormFieldComponent";
import ConfirmCancelButtons from "../../../components/buttons/ConfirmCancelButtonsComponent";
import Box from "../../../components/Container/BoxComponent";
import AdminPage from "../../../components/Page/AdminPageComponent";
import CategoryService from "../../../services/category.service";
import CategoryDto from "../../../dto/CategoryDto";

const EditCategory = props => {
    const categoryId = props.match.params.categoryId;

    const [label, setLabel] = useState("");
    const [description, setDescription] = useState("");
    const [publication, setPublication] = useState(0);

    const [title, setTitle] = useState("");

    const optionsSelect = [
        { value: false, text: "Non publié" },
        { value: true, text: "Publié" }
    ];

    useEffect(() => {
        const getCategoryInDatabase = async () => {
            let response = await CategoryService.details(categoryId);
            if (response.ok) {
                let data = await response.json();
                initializeForm(data.category);
            }
        };

        const initializeForm = c => {
            setLabel(c.label);
            setDescription(c.description);
            setPublication(c.publicationStatus);
            setTitle("Edition de la catégorie " + c.label);
        };

        getCategoryInDatabase();
    }, []);

    const updateCategory = async () => {
        const dto = Object.assign(new CategoryDto(), { label, description, publication });
        let response = await CategoryService.update(categoryId, dto);
        response.ok ? console.log("ok") : console.log("none");
    };

    const submit = async e => {
        e.preventDefault();
        e.target.id === "validated" ? updateCategory() : props.history.push("/admin/category");
    };

    return (
        <AdminPage class={"small"} title={title}>
            <Box class={"inset"} title={"Détail"}>
                <form>
                    <InputFormField callBack={setLabel} value={label} textField={"Label"} />
                    <InputFormField callBack={setDescription} value={description} textField={"Description"} />
                    <SelectFormField
                        callBack={setPublication}
                        value={publication}
                        textField={"Publication"}
                        options={optionsSelect}
                    />

                    <ConfirmCancelButtons callBack={submit} textValidated={"Enregistrer"} textCanceled={"Annuler"} />
                </form>
            </Box>
        </AdminPage>
    );
};

export default EditCategory;
