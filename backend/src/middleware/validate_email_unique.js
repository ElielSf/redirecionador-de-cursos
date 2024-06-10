import connection from "../config/database.js";

//middleware para validar o email do usuário
export function validateEmail(email_user, callback) {
    //query para verificar se já existe um cadastro com esse email
    const query = `SELECT COUNT(*) AS count FROM user WHERE email_user = ?`;

    connection.query(query, [email_user], (err, result) => {
        //testa se houve um erro
        if (err) {
            callback(err, null);
        } else {
            //cria uma constante com o valor da consulta 
            const emailCount = result[0]['count'];
            //testa se o email existe no banco de dados
            if (emailCount > 0) {
                callback(null, false);
            } else {
                callback(null, true);
            }
        }
    });
};