import React, { useEffect, useState } from "react";
import InputFormField from "../../../components/Form/InputFormFieldComponent";
import SelectFormField from "../../../components/Form/SelectFormFieldComponent";
import ConfirmCancelButtons from "../../../components/buttons/ConfirmCancelButtonsComponent";
import Box from "../../../components/Container/BoxComponent";
import AdminPage from "../../../components/Page/AdminPageComponent";
import CommentService from "../../../services/comment.service";
import TextareaFormField from "../../../components/Form/TextareaFormFieldComponent";
import CommentDto from "../../../dto/CommentDto";

const EditUser = props => {
    const commentId = props.match.params.commentId;

    const [email, setEmail] = useState("");
    const [lastname, setLastname] = useState("");
    const [firstname, setFirstname] = useState("");
    const [content, setContent] = useState("");
    const [publication, setPublication] = useState(0);

    const [title, setTitle] = useState("");

    const optionsSelect = [
        { value: false, text: "Non publié" },
        { value: true, text: "Publié" }
    ];

    useEffect(() => {
        const getCommentInDatabase = async () => {
            let response = await CommentService.details(commentId);
            if (response.ok) {
                let data = await response.json();
                initializeForm(data.comment);
            }
        };

        const initializeForm = c => {
            setFirstname(c.firstname);
            setLastname(c.lastname);
            setEmail(c.email);
            setContent(c.content);
            setPublication(c.publicationStatus);
            setTitle("Edition du commentaire de " + c.firstname + " " + c.lastname);
        };

        getCommentInDatabase();
    }, []);

    const updateComment = async () => {
        const dto = Object.assign(new CommentDto(), { firstname, lastname, email, content, publication });
        let response = await CommentService.update(commentId, dto);
        response.ok ? console.log("ok") : console.log("none");
    };

    const submit = async e => {
        e.preventDefault();
        e.target.id === "validated" ? updateComment() : props.history.push("/admin/comment");
    };

    return (
        <AdminPage class={"small"} title={title}>
            <Box class={"inset"} title={"Détail"}>
                <form>
                    <InputFormField type="text" callBack="" value={email} textField={"Email"} />
                    <InputFormField type="text" callBack="" value={firstname} textField={"Prénom"} />
                    <InputFormField type="text" callBack="" value={lastname} textField={"Nom"} />
                    <TextareaFormField callBack="" value={content} textField={"Commentaire"} />
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

export default EditUser;
