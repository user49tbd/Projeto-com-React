import {db} from "../config/db.js"
export const buscarConditions = () => {
    return new Promise((resolve, reject) => {
      /*
      if (!email) {
        return resolve({msg:"O email do usuario é obrigatório."});
      }*/
  
      db.all("SELECT * FROM CONDITIONS", (err, row) => {
        if (err) {
          return resolve({msg:"Erro ao buscar usuario: " + err});
        }
        if (!row) {
          return resolve({msg:"Usuario não encontrado."});
        }
        resolve(row);
      });
    });
  };