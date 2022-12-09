import bcrypt  from "bcrypt"


class Encode {


    async hash(plain){
        const result = await bcrypt.hash(plain,10)
        return result;
    }

    async check(plain,hash){
        const result = await bcrypt.compare(plain,hash);
        return result
    }
}


export default new Encode();
