import express from "express";
import jwt from "jsonwebtoken";
import MoneyChart from "../model/MoneyChart.js";

const router = express.Router();

router.use((req, resp, next) => {
    const authorization = req.get("Authorization");
    if (!authorization || !authorization.startsWith("Bearer")) {
        return resp.status(401).json({ result: false, message: "unauthorized error" });
    };
    const token = authorization.split(" ")[1];
    try {
        const payload = jwt.verify(token, process.env.SECRET_KEY);
        console.log(payload.email);
        req.logonEmail = payload.email;
    } catch (e) {
        return resp.status(401).json({ result: false, message: "Invalid toekn : " + e.message });
    };
    next();
})
router.get("/", (req, resp) => {
    // console.log(req.logonEmail);
    return resp.status(200).json({ result: true, data: [] });
})

router.post("/", async (req, resp) => {
    // console.log(req.body)

    try {
        const email = jwt.verify(req.body.token, process.env.SECRET_KEY).email;
        // console.log(req.body.month)
        // console.log(email);
        const reqDate = req.body.month.split("-");
        const startDt = new Date(req.body.month)
        const endDt = new Date(reqDate[0], reqDate[1], 0)
        const history = await MoneyChart.find({ email: email, date: { $gte: startDt, $lt: endDt } }).sort({"date":-1}).lean();
        // console.log(history)
        // console.log(req.logonEmail);

        // 목록 보내줄것 - 완료
        return resp.status(200).json({ result: true, datas: history });

    } catch (e) {
        console.log(e.message + "초기 히스토리 로딩")
        return resp.status(401).json({ result: false });
    }

})

router.get("/search",async (req,resp)=>{
    const begin = new Date(req.query.begin);    //2022-03-01
    const end = new Date(req.query.end);        //2022-04-07
    end.setDate(end.getDate()+1);
    console.log(req.query)
    console.log(begin,end);
    const sortList = [
        "식비", "주거/통신", "생활용품", "의복/미용", "건강/문화", "교통/차량", "용돈/기타", "미분류"
    ];

        console.log(req.query.sort.split(" "))
    try{
    const email = jwt.verify(req.headers.authorization.slice(7), process.env.SECRET_KEY).email;
        console.group(email)
    const response = await MoneyChart.find({ email: email, date: { $gte: begin, $lt: end } }).lean().sort("date");


    return resp.status(200).json({ result: true, datas: response });

} catch(e){
    console.log(e.message + "기간조회 오류");
    return resp.status(401).json({ result: false });
}
    

})












router.post("/write", async (req, resp) => {


    try {
        console.log(req.body.token);
        const email = jwt.verify(req.body.token, process.env.SECRET_KEY).email;
        const data = await MoneyChart.create({ ...req.body, email: email })

        return resp.status(200).json({ result: true, message: "done!", data: data });
    } catch (e) {
        console.log(e.message)
        console.log("[server] Write error")
        return resp.status(401).json({ result: false });

    }

})



router.post("/delete", async (req, resp) => {
    console.log(req.body);
    try {

        const email = jwt.verify(req.body.token, process.env.SECRET_KEY).email;
        
        if(email){
            const result = await MoneyChart.findByIdAndDelete(req.body._id)
            return resp.status(200).json({ result: true, data:result })
        }else{
        return resp.status(401).json({ result: false, mesasge: "토큰복원실패?" })

        }

    } catch (e) {
        console.log(e.message);

        return resp.status(401).json({ result: false, mesasge: "faild" })
    }
}

)

router.get("/delete", (req, resp) => {
    console.log(req.logonEmail);
    return resp.status(200).json({ result: false });
})

export default router;