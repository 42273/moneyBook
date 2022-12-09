
import jwt from "jsonwebtoken"

const secret = "FG103@C5inSc06%plri3EkThZ95Fb8Z3";


const token = jwt.sign({ subject: "backend" }, secret, { expiresIn: 10 });


setTimeout(_=>{
    const r = jwt.verify(token,secret,e=> e.message);
    console.log(r);
},6000)