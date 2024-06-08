import { createConnection } from 'mysql2';

const connection = createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'redirect_course_db'
});

connection.connect((err) => {
    if (err) {
        console.log('Erro no banco de dados: ' + err);
        return;
    }
    console.log('Conexão com o Banco de Dados estabelecida.');
});

export default connection;