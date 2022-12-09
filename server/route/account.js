import express from "express";
import jwt from "jsonwebtoken";
import Account from "../model/Account.js";
import bcrypt from "../utils/bcrypt.js";

const router = express.Router();

const chkMail = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;

router.post("/auth", async (req, resp) => {
    try{
        if (req.body.email && chkMail.test(req.body.email)) {
            let auth = false;
            const data = await Account.findOne({ email: req.body.email });
            data ? auth = await bcrypt.check(req.body.password, data.password) : auth = false;
            if (auth) {
                console.log(data.email)
                const token = jwt.sign({ email: data.email }, process.env.SECRET_KEY, { expiresIn: 60 * 60 * 12 });
            resp.status(200).json({ result: true, message: data, token });
            //history router에서 token이 없으면 작업ㅇ을 못하게 막는다?>??
        } else {
            resp.json({ result: false });
        }
        // hash가 있으면 auth를 확인하고 auth가 있으면 true false 전송
    } else {
        resp.status(401).json({ result: false });
    };
}catch(e){
    console.log(e.message);
    resp.status(401).json({result:false});
}
});

router.post("/register", async (req, resp) => {
    console.log(req.body)
    try {
        //const {email.password} = req.body 해도됨
        if (req.body.email && chkMail.test(req.body.email)) {
            const hash = await bcrypt.hash(req.body.password);
            const response = await Account.create({ ...req.body, password: hash });
            console.log(response);
            resp.status(201).json({ result: true, message: `${response}` });
        } else {
            resp.json({ result: false, message: "register failed" });
            //throw new Error("invalid request")
        }
    }
    catch (e) {
        console.log(e.message, "error")
        resp.status.json({ result: false, message: "error" });
    };
    // Math.random() > 0.5 ? resp.json({ result: true + " register" }) : resp.json({ result: false + " register" })
});



router.post("/valid", async (req, resp) => {
    try {
        const data = jwt.verify(req.body.token, process.env.SECRET_KEY)
        resp.status(200).json({ result: true, owner: data.email })
    } catch (e) {
        e => console.log(e.message)
        resp.status(401).json({ result: false })
    }
})

router.post("/info" ,async (req,resp)=>{
try{
    const data = jwt.verify(req.body.token, process.env.SECRET_KEY);
    if(data){
        const info = await Account.findOne({email:data.email});
        resp.status(200).json({result:true,userName:info.name})

    }else{
        resp.status(401).json({result:false});
    }

}catch(e){
    e=>console.log(e.message)
    resp.status(401).json({result:false});
}
})

// module.exports = router;
export default router;