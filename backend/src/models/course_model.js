//importando a conexão com o banco de dados
import connection from '../config/database.js';

export function createCourse(id_user, name_course, objective_course, photoUrl_course, link_course, callback) {
    const query = `INSERT 
    INTO course(name_course, objective_course, photoUrl_course, link_course, user_id_user) 
    VALUES(?, ?, ?, ?, ?);`;
    connection.query(query, [name_course, objective_course, photoUrl_course, link_course, id_user], (err, result) => {
        if (err) {
            callback(err, null);
        } else {
            callback(null, result);
        }
    });
};

export function readCourse(callback) {
    const query = `SELECT * FROM course WHERE status_course = 1;`;
    connection.query(query, (err, result) => {
        if (err) {
            callback(err, null);
        } else {
            callback(null, result);
        }
    });
};

export function updateCourse(name_course, objective_course, photoUrl_course, link_course, id_course, id_user, callback) {
    const query = `UPDATE course 
    SET name_course = ?, objective_course = ?, photoUrl_course = ?, link_course = ? 
    WHERE id_course = ? and user_id_user = (
        SELECT id_user FROM user WHERE id_user = ? AND user_level = 2 OR user_level = 3
    );`;
    connection.query(query, [name_course, objective_course, photoUrl_course, link_course, id_course, id_user], (err, result) => {
        if (err) {
            callback(err, null);
        } else {
            callback(null, result);
        }
    });
};

export function deleteCourse(id_course, callback) {
    const query = `UPDATE course 
    SET status_course = 0 
    WHERE id_course = ?;`;
    connection.query(query, [id_course], (err, result) => {
        if (err) {
            callback(err, null);
        } else {
            callback(null, result);
        }
    });
};

export function searchCourse(name_course, callback) {
    const search_value = `%${name_course}%`;

    const query = `SELECT * FROM course WHERE name_course LIKE ?;`;
    connection.query(query, [search_value], (err, result) => {
        if (err) {
            callback(err, null);
        } else {
            callback(null, result);
        }
    });
};