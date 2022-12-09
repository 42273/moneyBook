import bcrypt from "bcrypt"

!async function () {
    const plain = "1q2w3e43r";

    bcrypt.hash(plain, 10, (err, data) => {
        console.log("err = ", err)
        console.log("data = ", data)
    });

    const result = await bcrypt.hash(plain, 10)
    console.log("result = ", result)

    const check = await bcrypt.compare(plain,result);
    console.log(check)

}()

