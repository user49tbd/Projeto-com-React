import { db } from "../config/db.js"

export const insrtCard = (mednome, email, descricao, title, cardimg) => {
    return new Promise((resolve, reject) => {
        db.run(
            "INSERT INTO CARDSERVICE (MEDNOME,EMAIL,DESCRICAO,TITLE,CARDIMG) VALUES (?, ?, ?, ?, ?)",
            [mednome, email, descricao, title, cardimg],
            function (err) {
                if (err) {
                    return resolve({ msgE: "Erro ao criar o cardservice: " + err });
                }
                resolve({ msg: "cardservice criado com sucesso: " });
            }
        );
    });
}
export const findAllCard = (email) => {
    return new Promise((resolve, reject) => {
        db.all("SELECT * FROM CARDSERVICE WHERE EMAIL = ?", [email], (err, rows) => {
            if (err) {
                return resolve({ msg: "Erro ao buscar servicos: " + err });
            }
            if (!rows) {
                return resolve({ msg: "servico não encontrado." });
            }
            console.log(rows)
            let obj = []
            rows.forEach(el => {
                let obje = {
                    id: el.ID, mednome: el.MEDNOME, email: el.EMAIL, descricao: el.DESCRICAO,
                    title: el.TITLE, cardimg: el.CARDIMG, qtd: el.QTD
                }
                obj.push(obje)
            });
            resolve(obj);
        });
    });
};
export const findCardByID = (id) => {
    return new Promise((resolve, reject) => {
        db.get("SELECT * FROM CARDSERVICE WHERE ID = ?", [id], (err, row) => {
            if (err) {
                return resolve({ msg: "Erro ao buscar servicos: " + err });
            }
            if (!row) {
                return resolve({ msg: "servico não encontrado." });
            }
            console.log(row)
            return resolve({id: row.ID, mednome: row.MEDNOME, email: row.EMAIL, descricao: row.DESCRICAO,
                title: row.TITLE, cardimg: row.CARDIMG, qtd: row.QTD});
        });
    });
};
export const findAll = () => {
    return new Promise((resolve, reject) => {
        db.all("SELECT * FROM CARDSERVICE", (err, rows) => {
            if (err) {
                return resolve({ msg: "Erro ao buscar servicos: " + err });
            }
            if (!rows) {
                return resolve({ msg: "servico não encontrado." });
            }
            console.log(rows)
            let obj = []
            rows.forEach(el => {
                let obje = {
                    id: el.ID, mednome: el.MEDNOME, email: el.EMAIL, descricao: el.DESCRICAO,
                    title: el.TITLE, cardimg: el.CARDIMG, qtd: el.QTD
                }
                obj.push(obje)
            });
            resolve(obj);
        });
    });
};
export const updateMedCard = async (opt, attr) => {
    return new Promise((resolve, reject) => {
        db.run(opt, attr, async (err) => {
            if (err) {
                return resolve({ msgE: "Erro ao atualizar" + err });
            }
            resolve({ msg: "Service atualizado com sucesso: " });
        });
    });
};
export const delServ = async (id) => {
    return new Promise((resolve, reject) => {
      db.run(`DELETE FROM CARDSERVICE WHERE ID = ?`, [id], function (err) {
        if (err) {
          resolve({ msgE: "erro ao remover tabela "});
        } else {
          resolve({ msg: "tabela removida com sucesso" });
        }
      });
    })
  }