import React, { Component } from "react";
import CommentService from "../services/comment.service";

let schemaComment = {
    firstname: "",
    lastname: "",
    content: "",
    email: ""
};

export default class FormContactComponent extends Component {
    state = schemaComment;

    handleChange(e) {
        this.setState({
            [e.target.id]: e.target.value
        });
    }

    async submit(e) {
        e.preventDefault();
        let { firstname, lastname, email, content } = this.state;
        let body = {
            firstname,
            lastname,
            email,
            content
        };
        let response = await CommentService.create(body);
        if (response.ok) {
            this.setState(schemaComment);
        }
    }

    render() {
        let { firstname, lastname, email, content } = this.state;
        return (
            <div className="form-contact">
                <form onSubmit={e => this.submit(e)}>
                    <h2>Nous contacter</h2>
                    <label>Email</label>
                    <input type="text" id="email" onChange={e => this.handleChange(e)} value={email} />
                    <div className="container-input">
                        <div>
                            <label>Prénom</label>
                            <input type="text" id="firstname" onChange={e => this.handleChange(e)} value={firstname} />
                        </div>
                        <div>
                            <label>Nom</label>
                            <input type="text" id="lastname" onChange={e => this.handleChange(e)} value={lastname} />
                        </div>
                    </div>
                    <label>Message</label>
                    <textarea id="content" onChange={e => this.handleChange(e)} value={content}></textarea>
                    <button className="btn">Envoyer</button>
                </form>
            </div>
        );
    }
}
