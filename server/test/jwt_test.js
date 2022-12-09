import jwt from "jsonwebtoken"
const data = {id:"아이디",name:"이름",auth:"인증ㅇㅇ"}
//body부분
const secretKey = "KZ48n0CY8rn46G!5o6nV&sWy$b5*toOP"
//시크릿 키 부분
//옵션은 알고리즘 값 바꾸기(암호화)
const token = jwt.sign(data,secretKey)
console.log(token)

console.log(jwt.verify(token,secretKey))
console.log(jwt.decode(token));

const v_token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IuyVhOydtOuUlCIsIm5hbWUiOiLsnbTrpoQiLCJhdXRoIjoi7J247Kad44WH44WHIiwiaWF0IjoxNjYxNDAzNTg0fQ.t3nHkwlS7doFBZQbG7jtP9jQ8wl7OZ_No7YaQYprc11"
console.log(jwt.verify(v_token,secretKey))
