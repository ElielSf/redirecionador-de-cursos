//importando a conexão com o banco de dados
import connection from '../config/database.js';

//função de criação de usuário
export function createUser(name_user, email_user, password_user, callback) {
    const query = `INSERT 
    INTO user(name_user, email_user, password_user) 
    VALUES(?, ?, ?);`;

    connection.query(query, [name_user, email_user, password_user], (err, result) => {
        //verifica se houve ou não um erro e retorna um resultado correspondente
        if (err) {
            callback(err, null);
        } 
        if (result) {
            callback(null, result);
        }
    });
};

//função de comparação de usuário para login
export function compareUser(email_user, password_user , callback) {
    const query = 'SELECT * FROM user WHERE email_user = ? AND password_user = ?;';
    connection.query(query, [email_user, password_user], (err, result) => {
        //verifica se houve um erro e retorna ele
        if (err) {
            callback(err, null);
        }
        //verifica se não tem nenhum usuário cadastrado com o email e a senha
        if (result.length === 0) {
            callback(null, false);
        }
        //verifica se existe um usuário com o email e a senha
        if (result.length > 0) {
            callback(null, true);
        }
    });
};