const baseUrl = "http://localhost:3001";

export default class CommentService {
    static async create(body) {
        let init = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("token")}`
            },
            body: JSON.stringify(body)
        };
        let call = await fetch(`${baseUrl}/comment`, init);
        return call;
    }

    static async list() {
        let init = {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        };
        let call = await fetch(`${baseUrl}/comments`, init);
        return call;
    }

    static async details(id) {
        let init = {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        };
        let call = await fetch(`${baseUrl}/comments/${id}`, init);
        return call;
    }

    static async update(id, body) {
        let init = {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("token")}`
            },
            body: JSON.stringify(body)
        };
        let call = await fetch(`${baseUrl}/comments/${id}`, init);
        return call;
    }

    static async delete(id) {
        let init = {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        };
        let call = await fetch(`${baseUrl}/comments/${id}`, init);
        return call;
    }
}
