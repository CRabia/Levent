const baseUrl = "http://localhost:3001";

export default class AuthService {
  static async auth(body) {
    let init = {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(body)
    };
    let call = await fetch(`${baseUrl}/users/authenticate`, init);
    return call;
  }

  static async register(body) {
    let init = {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(body)
    };
    let call = await fetch(`${baseUrl}/user`, init);
    return call;
  }
}
