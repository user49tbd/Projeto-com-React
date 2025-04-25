import { db } from "../config/db.js"

export const insrtPass = (pass,email,servId,data) => {
    return new Promise((resolve, reject) => {
        db.run(
            "INSERT INTO PASSSERVICE (PASS,EMAIL,SERV_ID,DATAI) VALUES (?, ?, ?, ?)",
            [pass,email,servId,data],
            function (err) {
                if (err) {
                    return resolve({ msgE: "Erro ao criar senha: " + err });
                }
                resolve({ msg: "senha criada com sucesso: " });
            }
        );
    });
}
export const changeStatusPass = (id) => {
    return new Promise((resolve, reject) => {
        db.run(
            "UPDATE PASSSERVICE SET STATUS = 0 WHERE ID = ?",
            [id],
            function (err) {
                if (err) {
                    return resolve({ msgE: "Erro ao alterar status da senha: " + err });
                }
                resolve({ msg: "status alterado com sucesso: " });
            }
        );
    });
}
export const selectAllPassFromService = (id,status) => {
    return new Promise((resolve, reject) => {
        db.all(
            "SELECT * FROM PASSSERVICE WHERE SERV_ID = ? AND STATUS = ?",
            [id,status],
            function (err,rows) {
                if (err) {
                    return resolve({ msgE: "Erro ao buscar senhas: " + err });
                }
                let obj = []
                rows.forEach(el => {
                    let obje = {
                        id: el.ID,pass: el.PASS,email: el.EMAIL,
                        serv_id: el.SERV_ID,datai: el.DATAI,
                        status: el.STATUS
                    }
                    obj.push(obje)
                });
                resolve(obj);
            }
        );
    });
}
export const checkSign = (status,email) => {
    return new Promise((resolve, reject) => {
        db.get(
            //"SELECT * FROM PASSSERVICE WHERE SERV_ID = ? AND STATUS = ? AND EMAIL = ?",
            //[id,status,email],
            "SELECT * FROM PASSSERVICE WHERE STATUS = ? AND EMAIL = ?",
            [status,email],
            function (err,row) {
                if (err) {
                    return resolve({ msgE: "Erro ao buscar senhas: " + err });
                }
                /*
                let obj = []
                rows.forEach(el => {
                    let obje = {
                        id: el.ID,pass: el.PASS,email: el.EMAIL,
                        serv_id: el.SERV_ID,datai: el.DATAI,
                        status: el.STATUS
                    }
                    obj.push(obje)
                });*/
                let obj = {}
                if(row){
                    obj = {id: row.ID,pass: row.PASS,email: row.EMAIL,
                        serv_id: row.SERV_ID,datai: row.DATAI,
                        status: row.STATUS}
                }
                resolve(obj);
            }
        );
    });
}