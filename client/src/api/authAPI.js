class AuthAPI {
    constructor() {
        this.baseURL = "http://127.0.0.1:8080"
    }

    async login(email, password) {
        const response = await fetch(`${this.baseURL}/api/login`, {
            method: "POST",
            headers: {
                "content-type": "application/json" 
            },
            body: JSON.stringify({ email, password })
        });
        const rst = await response.json();
        return rst;
    }
}

export default new AuthAPI();