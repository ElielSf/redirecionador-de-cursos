//importando a conexão com o banco de dados
import connection from './database.js';
//importando o adaptador para armazenar sessões no MySQL
import MySQLStore from 'express-mysql-session';

//constante com o tempo até expirar a sessão em milissegundos (3 horas)
export const expireTime = 10800000;
//constante que configura o armazenamento de sessões no MySQL
export const sessionStore = new MySQLStore({
    createDatabaseTable: false,
    checkExpirationInterval: 900000,
    expiration: expireTime,
    database: 'redirect_course_db',
    schema: {
        tableName: 'session',
		columnNames: {
			session_id: 'id_session',
			expires: 'expire_session',
			data: 'data_session'
		}
    }
}, connection);