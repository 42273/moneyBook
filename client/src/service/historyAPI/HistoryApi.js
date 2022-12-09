class HistoryApi {
    constructor(baseURL) {
        const token = localStorage.getItem("token");
        this.baseURL = baseURL;
        this.getOption = {
            method: "get",
            headers: {
                "authorization": "Bearer " + token
            }
        };
        this.postOption = {
            method: "post",
            headers: {
                "content-type": "application/json",
                "authorization": "Bearer " + token
            }
        }
    }

    async history(month, token) {
        console.log(month, "client")
        const response = await fetch(this.baseURL + "/api/history", {
            ...this.postOption,
            body: JSON.stringify({ month, token })
        });
        return await response.json();
    };

    async write(
        ...data
        // itemDate, content, category, payby, cost, tag
        ) {
        const response = await fetch(this.baseURL + "/api/history/write", {
            ...this.postOption,
            body: JSON.stringify(data[0])
        })
        return await response.json();
    }

    async delete(_id){

        const response = await fetch(this.baseURL + "/api/history/delete",{
            ...this.postOption,
            body:JSON.stringify({_id})
        })
        return await response.json();
    }


    async search(begin,end,sort){
        console.log(sort)
        const sortList = [
            "식비", "주거/통신", "생활용품", "의복/미용", "건강/문화", "교통/차량", "용돈/기타", "미분류"
        ];
        let sortIdx = [];
        sort.forEach(e=>sortIdx.push(sortList.indexOf(e)))
        sortIdx = sortIdx.join("+")
        console.log(sortIdx)
        
        const response = await fetch(this.baseURL + `/api/history/search?begin=${begin}&end=${end}&sort=${sortIdx}`,{
            ...this.getOption
        })
        return await response.json();
    }
}

export default HistoryApi;