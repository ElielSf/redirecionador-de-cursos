//importando a conexão com o banco de dados
import connection from '../config/database.js';

//middleware para verificar o nível do usuário que tentar acessar determinado recurso
export function validateLevel(id_user, callback) {
    //query que retorna o nível do usuário
    const query = 'SELECT level_user FROM user WHERE id_user = ?;';

    connection.query(query, [id_user], (err, result) => {
        //testa se houve erro
        if (err) {
            callback(err, null);
        }

        //verifica se houve algum resultado
        if (result.length === 0) {
            callback(null, null);
        }

        //cria uma constante com o valor do resultado
        const userLevel = result[0].level_user;

        //verifica se o usuário é um criador
        if (userLevel === 2) {
            callback(null, true);
        }

        //verifica se o usuário é um cadastrado
        if (userLevel === 1) {
            callback(null, false);
        }
    });
};