import { db } from "../config/db.js"
export const criar = (nome, email, senha, usrimg, rol) => {
  return new Promise((resolve, reject) => {
    /*
    if (!nome || !email || !senha) {
      return resolve({msg:"Nome, email e senha são campos obrigatórios."});
    }*/
    let op = "INSERT INTO USER (NOME, EMAIL, SENHA, USRIMG) VALUES (?, ?, ?, ?)"
    let attr = [nome, email, senha, usrimg]
    if (rol == "admin") {
      op = "INSERT INTO USER (NOME, EMAIL, SENHA, USRIMG,ROLES) VALUES (?, ?, ?, ?, ?)"
      attr = [nome, email, senha, usrimg, 'admin']
    }
    db.run(
      op,
      attr,
      function (err) {
        if (err) {
          return resolve({ msgE: "Erro ao criar o usuário: " + err });
        }
        resolve({ msg: "Usuario criado com sucesso: " });
      }
    );
  });
};
export const buscar = (email) => {
  return new Promise((resolve, reject) => {
    /*
    if (!email) {
      return resolve({msg:"O email do usuario é obrigatório."});
    }*/

    db.get("SELECT * FROM USER WHERE EMAIL = ?", [email], (err, row) => {
      if (err) {
        return resolve({ msg: "Erro ao buscar usuario: " + err });
      }
      if (!row) {
        return resolve({ msg: "Usuario não encontrado." });
      }
      resolve({ nome: row.NOME, email: row.EMAIL, senha: row.SENHA, role: row.ROLES, id: row.ID, usrimg: row.USRIMG });
    });
  });
};

export const userP = (id, nasc) => {
  return new Promise((resolve, reject) => {
    db.run(
      "INSERT INTO USERP (USER_ID, NASC) VALUES (?, ?)",
      [id, nasc],
      function (err) {
        if (err) {
          return resolve({ msg: "Erro ao criar o usuário p: " + err });
        }
        resolve({ msg: "Usuario p criado com sucesso: " });
      }
    );
  });
}
export const userM = (id, crmimg) => {
  return new Promise((resolve, reject) => {
    db.run(
      "INSERT INTO USERMED (USER_ID, CRMIMG) VALUES (?, ?)",
      [id, crmimg],
      function (err) {
        if (err) {
          return resolve({ msg: "Erro ao criar o usuário m: " + err });
        }
        resolve({ msg: "Usuario m criado com sucesso: " });
      }
    );
  });
}
export const buscAllusrp = (id) => {
  return new Promise((resolve, reject) => {
    db.get("SELECT * FROM USERP WHERE USER_ID = ?", [id], (err, row) => {
      if (err) {
        return resolve({ msg: "Erro ao buscar userp: " + err });
      }
      if (!row) {
        return resolve({ msg: "userp não encontrado." });
      }
      console.log("this is the row")
      console.log(row)
      resolve({ nasc: row.NASC });
    });
  });
};
export const buscAllusrm = (id) => {
  return new Promise((resolve, reject) => {
    db.get("SELECT * FROM USERMED WHERE USER_ID = ?", [id], (err, row) => {
      if (err) {
        return resolve({ msg: "Erro ao buscar usermed: " + err });
      }
      if (!row) {
        return resolve({ msg: "usermed não encontrado." });
      }
      console.log("this is the row")
      console.log(row)
      resolve({ crmimg: row.CRMIMG });
    });
  });
};
export const buscAll = async (email) => {
  let dt1 = await buscar(email)
  if (dt1.role == "user") {
    let dt2 = await buscAllusrp(dt1.id)
    dt1.nasc = dt2.nasc
    let dt3 = await getAllConUsr(dt1.id)
    dt1.conditions = dt3
  } else {
    let dt2 = await buscAllusrm(dt1.id)
    dt1.crmimg = dt2.crmimg
  }
  //dt1.nasc = dt2.nasc
  return dt1
  //let dt2 = await buscAllusrp()
}
/*---------------------------------------------------*/

export const insrtC = (idUsr, idCon) => {
  return new Promise((resolve, reject) => {
    db.run(
      "INSERT INTO USERP_CONDITIONS (ID_USERP, ID_CONDITIONS) VALUES (?, ?)",
      [idUsr, idCon],
      function (err) {
        if (err) {
          return resolve({ msg: "Erro ao criar o conditionUsr: " + err });
        }
        resolve({ msg: "conditionUsr criado com sucesso: " });
      }
    );
  });
}
export const isrCMain = async (idUsr, lstC) => {
  if (lstC && lstC.length > 0) {
    for (const el of lstC) {
      const condition = await buscarC(el);
      if (condition.id) {
        const res = await insrtC(idUsr, condition.id);
        console.log(res.msg);
      } else {
        console.log("Condição não encontrada ou erro: ", condition.msg);
      }
    }
  }
};

export const buscarC = (name) => {
  return new Promise((resolve, reject) => {

    db.get("SELECT * FROM CONDITIONS WHERE NAME = ?", [name], (err, row) => {
      if (err) {
        return resolve({ msg: "Erro ao buscar condition: " + err });
      }
      if (!row) {
        return resolve({ msg: "Condition não encontrado." });
      }
      resolve({ name: row.NAME, id: row.ID });
    });
  });
};
/*--------------------------------------------------*/

export const buscarC2 = (id) => {
  return new Promise((resolve, reject) => {

    db.get("SELECT * FROM CONDITIONS WHERE ID = ?", [id], (err, row) => {
      if (err) {
        return resolve({ msg: "Erro ao buscar condition: " + err });
      }
      if (!row) {
        return resolve({ msg: "Condition não encontrado." });
      }
      resolve({ name: row.NAME, id: row.ID });
    });
  });
};
export const getAllConUsr = async (idUsr) => {
  return new Promise((resolve, reject) => {
    db.all("SELECT * FROM USERP_CONDITIONS WHERE ID_USERP = ?", [idUsr], async (err, rows) => {
      if (err) {
        return resolve({ msg: "Erro ao buscar user condition: " + err });
      }
      console.log(rows)

      const fres = [];
      for (const el of rows) {
        const vals = await buscarC2(el.ID_CONDITIONS);
        fres.push(vals);
      }

      resolve(fres);
    });
  });
};
export const updateUsrModel = async (opt, attr) => {
  return new Promise((resolve, reject) => {
    db.run(opt, attr, async (err) => {
      if (err) {
        return resolve({ msg: "Erro ao atualizar" + err });
      }
      resolve({ msg: "Usuario atualizado com sucesso: " });
    });
  });
};
/*
export const updateUsrModelArr = async (opt,attr) => {
  return new Promise((resolve, reject) => {
    db.run(opt,attr, async (err) => {
      if (err) {
        return resolve({ msg: "Erro ao atualizar" + err });
      }
      resolve({msg:"Usuario atualizado com sucesso: "});
    });
  });
};*/
export const delUpdateArr = async (id, lstDta) => {
  let del = await delArr(id)
  if (!del.msgE) {
    await isrCMain(id, lstDta)
    console.log("inserido com sucesso")
  } else {
    console.log("erro ao inserir")
  }
}
export const delArr = async (usrID) => {
  return new Promise((resolve, reject) => {
    db.run(`DELETE FROM USERP_CONDITIONS WHERE ID_USERP = ?`, [usrID], function (err) {
      if (err) {
        resolve({ msgE: "erro ao remover tabela: " + err });
      } else {
        resolve({ msg: "tabela removida com sucesso" });
      }
    });
  })
}

export const delU = async (email)=>{
  //let dt1 = await buscar(email)
  return new Promise((resolve,reject)=>{
    db.run("DELETE FROM USER WHERE EMAIL = ?",[email],function (err){
      if (err) {
        resolve({ msgE: "erro ao remover tabela: " + err });
      } else {
        resolve({ msg: "tabela removida com sucesso" });
      }
    })
  })
}