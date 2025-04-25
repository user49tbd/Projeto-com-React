import sqlite from "sqlite3";
import path from "path";
import { fileURLToPath } from "url"

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const dbPath = path.join(__dirname, 'database.db');

export const db = new sqlite.Database(dbPath, (err) => {
    if (err) {
        throw new Error("Erro ao conectar com o banco de dados");
    }
    console.log("Conectado ao banco de dados");
});

db.run(`CREATE TABLE IF NOT EXISTS USER(
    ID INTEGER PRIMARY KEY AUTOINCREMENT,
    NOME TEXT NOT NULL,
    EMAIL TEXT NOT NULL UNIQUE,
    SENHA TEXT NOT NULL,
    USRIMG TEXT NOT NULL,
    ROLES TEXT DEFAULT 'user'
)`, (err) => {
    if (err) {
        throw new Error("Erro ao criar tabela de usuário");
    }
    console.log("Tabela criada");
});
/*---------------------------------------------------------------*/
db.run(`CREATE TABLE IF NOT EXISTS USERMED (
    USER_ID INTEGER PRIMARY KEY,
    CRMIMG TEXT NOT NULL,
    FOREIGN KEY (USER_ID) REFERENCES USER(ID) ON DELETE CASCADE
)`, (err) => {
    if (err) {
        throw new Error("Erro ao criar tabela usermed");
    }
    console.log("Tabela usermed criada");
});
db.run(`CREATE TABLE IF NOT EXISTS USERP (
    USER_ID INTEGER PRIMARY KEY,
    NASC DATE NOT NULL,
    FOREIGN KEY (USER_ID) REFERENCES USER(ID) ON DELETE CASCADE
)`, (err) => {
    if (err) {
        throw new Error("Erro ao criar tabela de userp");
    }
    console.log("Tabela userp criada");
});
db.run(`CREATE TABLE IF NOT EXISTS CARDSERVICE (
    ID INTEGER PRIMARY KEY,
    MEDNOME TEXT NOT NULL,
    EMAIL TEXT NOT NULL,
    DESCRICAO TEXT NOT NULL,
    TITLE TEXT NOT NULL,
    CARDIMG TEXT NOT NULL,
    QTD INTEGER DEFAULT 0,
    FOREIGN KEY (EMAIL) REFERENCES USER(EMAIL) ON DELETE CASCADE
)`, (err) => {
    if (err) {
        throw new Error("Erro ao criar tabela de CARDSERVICE");
    }
    console.log("Tabela CARDSERVICE criada");
});

db.run(`CREATE TABLE IF NOT EXISTS PASSSERVICE (
    ID INTEGER PRIMARY KEY AUTOINCREMENT,
    PASS TEXT NOT NULL,
    EMAIL TEXT NOT NULL,
    SERV_ID INTEGER NOT NULL,
    DATAI DATE NOT NULL,
    STATUS INTEGER DEFAULT 1,

    FOREIGN KEY (EMAIL) REFERENCES USER(EMAIL) ON DELETE CASCADE
    FOREIGN KEY (SERV_ID) REFERENCES CARDSERVICE(ID) ON DELETE CASCADE
)`, (err) => {
    if (err) {
        throw new Error("Erro ao criar tabela de PASSSERVICE");
    }
    console.log("Tabela PASSSERVICE criada");
});

db.run("SELECT name FROM sqlite_master WHERE type='table' AND name='CONDITIONS'", [], function (err,row) {
    if (err) {
        console.error(err.message);
    } else {
        console.log("this is what was found")
        console.log(row)
        if (!row) {
            db.run(`CREATE TABLE IF NOT EXISTS CONDITIONS (
                ID INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
                NAME TEXT UNIQUE NOT NULL
            )`, (err) => {
                if (err) {
                    throw new Error("Erro ao criar tabela CONDITIONS");
                }
                console.log("Tabela CONDITIONS criada");

                db.run(`INSERT OR IGNORE INTO CONDITIONS (NAME) VALUES
                    ('Idosos'),
                    ('Obeso'),
                    ('Gestantes'),
                    ('Lactantes'),
                    ('Pessoa com deficiência'),
                    ('TEA')
                `, (err) => {
                    if (err) {
                        throw new Error("Erro ao inserir dados em CONDITIONS");
                    }
                    console.log("Dados inseridos em CONDITIONS");

                    db.run(`CREATE TABLE IF NOT EXISTS USERP_CONDITIONS (
                        ID_USERP INTEGER NOT NULL,
                        ID_CONDITIONS INTEGER NOT NULL,
                        PRIMARY KEY (ID_USERP, ID_CONDITIONS),
                        FOREIGN KEY (ID_USERP) REFERENCES USERP(ID),
                        FOREIGN KEY (ID_CONDITIONS) REFERENCES CONDITIONS(ID)
                    )`, (err) => {
                        if (err) {
                            throw new Error("Erro ao criar tabela USERP_CONDITIONS");
                        }
                        console.log("Tabela USERP_CONDITIONS criada");

                    });
                });
            });
        } else {
            console.log("A tabela já existe.");
        }
    }
});