class AccountApi {

    constructor(baseURL) {
        this.baseURL = baseURL;
        this.getOption = {
            method: "get"
        };
        this.postOption = {
            method: "post",
            headers: {
                "content-type": "application/json"
            }
        };

    };
    async auth(email, password) {
        const response = await fetch(this.baseURL + "/api/account/auth", {
            ...this.postOption,
            body: JSON.stringify({ email, password })
        });
        return await response.json();
    };
    async register(email, password, name, gender, birth) {
        const response = await fetch(this.baseURL + "/api/account/register", {
            ...this.postOption,
            body: JSON.stringify({ email, password, name, gender, birth })
        });
        return await response.json();
    };
    async valid(token) {
        const response = await fetch(this.baseURL + "/api/account/valid", {
            ...this.postOption,
            body: JSON.stringify({ token })
        });
        return await response.json();
    };

    async getInfo(token){
        console.log(token+"server")
        const response = await fetch(this.baseURL + "/api/account/info", {
            ...this.postOption,
        });
        return await response.json();
    }
};
export default AccountApi;