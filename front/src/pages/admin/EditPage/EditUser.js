import React, { useEffect, useState } from "react";
import UserService from "../../../services/user.service";
import UserDto from "../../../dto/UserDto";
import InputFormField from "../../../components/Form/InputFormFieldComponent";
import SelectFormField from "../../../components/Form/SelectFormFieldComponent";
import ConfirmCancelButtons from "../../../components/buttons/ConfirmCancelButtonsComponent";
import Box from "../../../components/Container/BoxComponent";
import AdminPage from "../../../components/Page/AdminPageComponent";

const EditUser = props => {
    const userId = props.match.params.userId;

    const [email, setEmail] = useState("");
    const [lastname, setLastname] = useState("");
    const [firstname, setFirstname] = useState("");
    const [user_role, setRole] = useState("");

    const [title, setTitle] = useState("");

    const optionsSelect = [
        { value: 1, text: "Utilisateur" },
        { value: 2, text: "Administrateur" }
    ];

    useEffect(() => {
        const getUserInDatabase = async () => {
            let response = await UserService.details(userId);
            if (response.ok) {
                let data = await response.json();
                initializeForm(data.user);
            }
        };

        const initializeForm = u => {
            setFirstname(u.firstname);
            setLastname(u.lastname);
            setEmail(u.email);
            setRole(u.user_role);
            setTitle("Edition du profil de " + u.firstname + " " + u.lastname);
        };

        getUserInDatabase();
    }, []);

    const updateUser = async () => {
        const dto = Object.assign(new UserDto(), { firstname, lastname, email, user_role });
        let response = await UserService.update(userId, dto);
        response.ok ? console.log("ok") : console.log("none");
    };

    const submit = async e => {
        e.preventDefault();
        e.target.id === "validated" ? updateUser() : props.history.push("/admin/user");
    };

    return (
        <AdminPage class={"small"} title={title}>
            <Box class={"inset"} title={"Détail"}>
                <form>
                    <InputFormField type="text" callBack={setEmail} value={email} textField={"Email"} />
                    <InputFormField type="text" callBack={setFirstname} value={firstname} textField={"Prénom"} />
                    <InputFormField type="text" callBack={setLastname} value={lastname} textField={"Nom"} />

                    <SelectFormField callBack={setRole} value={user_role} textField={"Rôle"} options={optionsSelect} />
                    <ConfirmCancelButtons callBack={submit} textValidated={"Enregistrer"} textCanceled={"Annuler"} />
                </form>
            </Box>
        </AdminPage>
    );
};

export default EditUser;
