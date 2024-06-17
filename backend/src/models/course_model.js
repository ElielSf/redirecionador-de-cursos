//importando a conexão com o banco de dados
import connection from '../config/database.js';

export function createCourse(name_course, objective_course, link_course, tag_course, callback) {
    const query = `INSERT 
    INTO course(name_course, objective_course, link_course, tag_course) 
    VALUES(?, ?, ?, ?);`;
    connection.query(query, [name_course, objective_course, link_course, tag_course], (err, result) => {
        console.log(result)
        if (err) {
            callback(err, null);
        } else if (result === undefined) {
            callback(null, null)
        } else if (result.affectedRows === 0) {
            callback(null, false);
        } else if (result.affectedRows > 0) {
            callback(null, true)
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

export function updateCourse(id_course, name_course, objective_course, link_course, tag_course, callback) {
    const query = `UPDATE course 
    SET name_course = ?, objective_course = ?, link_course = ?, tag_course = ?
    WHERE id_course = ?;`;
    connection.query(query, [name_course, objective_course, link_course, tag_course, id_course], (err, result) => {
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