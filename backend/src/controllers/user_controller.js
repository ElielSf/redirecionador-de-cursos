//importando os modelos das consultas
import { createUser, compareUser } from '../models/user_model.js';
//importando middlewares
import { validateEmail } from '../middleware/validate_email_unique.js';

//função asasíncrona que faz o cadastro do usuário
export async function creatingUser(req, res) {
    //requisitando os dados para criação de usuário do corpo da requisição de forma direta
    const { name_user, email_user, password_user } = req.body;
    //regex para validar o formato do email
    const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    //regex para validar os caracteres da senha
    const passwordRegex = /[!@#$%^&*(),.?":{}|<>_]/;
    //regex para verificar se tem pelo menos 1 número na senha
    const numberRegex = /\d/;

    //validando se todos os campos foram preenchidos
    if (!name_user || !email_user || !password_user) {
        return res.status(400).send({ message: 'Todos os campos devem ser preenchidos.' });
    }

    //validando se o nome de usuário tem entre 2 e 300 caracteres
    if (name_user.length < 2 || name_user.length > 300) {
        return res.status(400).send({ message: 'O nome de usuário deve ter entre 2 e 300 caracteres.' });
    }

    //validando se o email tem o formato correto
    if (!emailRegex.test(email_user)) {
        return res.status(400).send({ message: 'Formato de email inválido.' });
    }

    //validando se o email tem mais de 300 caracteres(limite)
    if (email_user.length > 300) {
        return res.status(400).send({ message: 'O endereço de email deve ter no máximo 300 caracteres.' });
    }

    //validando se a senha não é nula e se tem menos de 8 caracteres
    if (password_user.length < 8) {
        return res.status(400).send({ message: 'A senha deve ter no mínimo 8 caracteres.' });
    }

    //validando se a senha não tem um caracter especial e 1 número
    if (!passwordRegex.test(password_user) || !numberRegex.test(password_user)) {
        return res.status(400).send({ message: 'Senha deve conter pelo menos 1 número e 1 caractere especial.' });
    }

    //middleware para validar se o email é único e se já está cadastrado no banco de dados
    validateEmail(email_user, (err, isUnique) => {
        //verifica se aconteceu algum erro
        if (err) {
            return res.status(500).send({ message: 'Erro ao verificar se o email é único.', error: err });
        }
        //verifica se o email já está cadastrado no banco de dados
        if (isUnique === false) {
            return res.status(400).send({ message: 'O email já está cadastrado no sistema.' });
        }

        //função de criar usuário que acontece somente após a validação do 
        //middleware confimar que o email é único e que não está cadastrado no sistema
        createUser(name_user, email_user, password_user, (err, result) => {
            //verifica se aconteceu algum erro
            if (err) {
                return res.status(400).send({ message: 'Erro interno ao criar usuário.', error: err });
            }
            //verifica se houve algum resultado
            if (result) {
                //criando um atributo na sessão para verificar se o usuário está logado
                req.session.loggedUser = email_user;
                return res.status(201).send({ message: 'Usuário cadastrado com sucesso.', result: result });
            }
        });
    });
};

//função assíncrona que faz o login do usuário e cria uma sessão para ele
export async function loginUser(req, res) {
    //requisitando os dados para login do corpo da requisição de forma direta
    const { email_user, password_user } = req.body;
    console.log(email_user, password_user);

    //validando se todos os campos foram preenchidos
    if (!email_user || !password_user) {
        return res.status(400).send({ message: 'Todos os campos devem ser preenchidos.' });
    }

    //função de login
    compareUser(email_user, password_user, (err, result) => {
        //verifica se ocorreu algum erro
        if (err) {
            return res.status(500).send({ message: 'Houve um erro no processo de login.', error: err });
        }
        //verifica se o login foi realizado com sucesso
        if (result === true) {
            //criando um atributo na sessão para verificar se o usuário está logado
            req.session.loggedUser = email_user;
            return res.status(200).send({ message: 'Login realizado com sucesso.', result: result });
        }
        //verifica se o login falhou
        if (result === false) {
            return res.status(404).send({ message: 'Usuário não encontrado, verifique seu email e sua senha.', result });
        }
    });
};
