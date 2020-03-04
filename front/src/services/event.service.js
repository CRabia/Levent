const baseUrl = "http://localhost:3001";

export default class EventService {
    static async create() {
        let init = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("token")}`
            },
            body: JSON.stringify({
                title: "undefined",
                description: "undefined",
                website: "undefined",
                price: 0,
                addresses: [{ addresse: "undefined", city: "undefined" }],
                typeOf: "public"
            })
        };
        let call = await fetch(`${baseUrl}/event`, init);
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
        let call = await fetch(`${baseUrl}/events`, init);
        return call;
    }

    static async listEventPublished() {
        let init = {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        };
        let call = await fetch(`${baseUrl}/events-published`, init);
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
        let call = await fetch(`${baseUrl}/events/${id}`, init);
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
        let call = await fetch(`${baseUrl}/events/${id}`, init);
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
        let call = await fetch(`${baseUrl}/events/${id}`, init);
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
        let call = await fetch(`${baseUrl}/events/${id}`, init);
        return call;
    }

    static async listEventsPerPage(page, eventPerPage) {
        let init = {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        };
        let call = await fetch(`${baseUrl}/events/${eventPerPage}/${page}`, init);
        return call;
    }
}
