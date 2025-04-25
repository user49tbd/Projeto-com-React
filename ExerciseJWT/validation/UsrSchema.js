import { checkSchema } from "express-validator"
export const validUsrData =  checkSchema({
    nome:{
        notEmpty:{
            errorMessage:"Nome não pode ser nulo"
        }
    },
    email:{
        notEmpty:{
            errorMessage:"Email não pode ser nulo"
        },
        isEmail: {
            errorMessage: "Email inválido"
        }
    },
    senha:{
        notEmpty:{
            errorMessage:"Senha não pode ser nulo"
        },
        isLength: {
            options: { min: 8 },
            errorMessage: "A senha deve ter no mínimo 8 caracteres"
        },
        matches: {
            options: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).+$/,
            errorMessage: "A senha deve conter letra maiúscula, minúscula, número e caractere especial"
        }
    }
})
export const validUsrUpdate =  checkSchema({
    email:{
        notEmpty:{
            errorMessage:"Email não pode ser nulo"
        },
        isEmail: {
            errorMessage: "Email inválido"
        }
    },
})