import { createConnection } from 'mysql';

const connection = createConnection({
    host: 'localhost',
    user: 'root',
    password: '123456789',
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