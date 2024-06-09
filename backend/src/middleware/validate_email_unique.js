import connection from "../config/database.js";

export function validateEmail(email_user, callback) {
    //query para verificar se já existe um cadastro com esse email
    const query = `SELECT COUNT(*) AS count FROM user WHERE email_user = ?`;
    connection.query(query, [email_user], (err, result) => {
        if (err) {
            callback(err, null);
        } else {
            const emailCount = result[0]['count'];
            if (emailCount > 0) {
                callback(null, false);
            } else {
                callback(null, true);
            }
        }
    });
};