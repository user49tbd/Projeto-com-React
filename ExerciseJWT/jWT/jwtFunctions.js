import jwt from "jsonwebtoken"
import dotenv from "dotenv"
dotenv.config()

export function signJwt(payload){
    let vl = jwt.sign(payload,process.env.SECRET)
    console.log("value "+vl)
    return vl

}
export const check = (req, res, next) => {
    const token = req.headers.authorization && req.headers.authorization.split(' ')[1];
    if (!token) {
        return res.status(401).send("Token não fornecido");
    }
    jwt.verify(token, process.env.SECRET, (err, decoded) => {
        if (err) {
            return res.status(400).send("Token inválido");
        } else {
            req.user = decoded;
            next();
        }
    });
}