const baseUrl = "http://localhost:3001";

export default class ParticipateService {
    static async listByUser(userId) {
        let init = {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        };
        let call = await fetch(`${baseUrl}/participations/${userId}`, init);
        return call;
    }

    static async findParticipation(userId, eventId) {
        let init = {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        };
        let call = await fetch(`${baseUrl}/participations/${userId}/${eventId}`, init);
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
        let call = await fetch(`${baseUrl}/participate/${id}`, init);
        return call;
    }

    static async create(userId, eventId) {
        let init = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("token")}`
            },
            body: JSON.stringify({ userId: userId, eventId: eventId })
        };
        let call = await fetch(`${baseUrl}/participate`, init);
        return call;
    }
}
