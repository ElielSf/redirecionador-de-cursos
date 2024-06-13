//importando os modelos das consultas
import { createCourse, readCourse, updateCourse, deleteCourse, searchCourse } from '../models/course_model.js';
//importando middlewares
import { validateLevel } from '../middleware/validate_id_level.js';

//função assíncrona para criar um anúncio de curso
export async function creatingCourse(req, res) {
    console.log('s')
    //requisita os dados do anúncio diretamente pelo body
    const { id_user, name_course, objective_course, photoUrl_course, link_course } = req.body;
    //regex que valida o formato da URL recebida(ftp, http, https)
    const urlValid = /^(ftp|http|https):\/\/[^ "]+$/;

    console.log(id_user, name_course)

    //valida se todos os campos estão preenchidos
    if (!id_user || !name_course || !objective_course || !photoUrl_course || !link_course) {
        return res.status(400).send({ message: 'Preencha todos os campos.' });
    }

    //validando se o id do usuário é um número, após converter a string recebida para Number
    if (!Number.isInteger(Number(id_user))) {
        return res.status(400).send({ message: 'Houve um erro na sua identificação, entre em contato com o suporte.' });
    } 

    //validação do tamanho do nome do curso
    if (name_course.length > 300 || name_course.length < 5) {
        return res.status(400).send({ message: 'O nome do curso deve ter entre 5 e 300 caracteres.' });
    }

    //validação do tamanho do objetivo do curso
    if (objective_course.length > 1000 || objective_course.length < 20) {
        return res.status(400).send({ message: 'O objetivo do curso deve ter entre 20 e 1000 caracteres.' });
    }

    //validação do tamanho da URL da foto
    if (photoUrl_course.length > 1000) {
        return res.status(400).send({ message: 'O link da foto deve deve ter no máximo 1000 caracteres.' });
    }

    //validação do tamanho da URL do site do curso
    if (link_course.length > 1000) {
        return res.status(400).send({ message: 'O link do site deve ter no máximo 1000 caracteres.' });
    }

    //validação do formato da URL do site do curso
    if (!urlValid.test(link_course)) {
        return res.status(400).send({ message: 'Link inválido.' });
    }

    //middleware de validação de permissão
    validateLevel(id_user, (err, result) => {
        //verifica se houve um erro no sistema
        if (err) {
            return res.status(401).send({ message: 'Houve um erro no processo de criação, tente novamente mais tarde.', error: err });
        }

        //verifica se o usuário é um visitante
        if (result === false) {
            return res.status(401).send({ message: 'Você não tem permissão para acessar este recurso.' });
        }

        //função do model para criar um anúncio no banco de dados
        createCourse(id_user, name_course, objective_course, photoUrl_course, link_course, (err, result) => {
            //valida se houve erro no sistema
            if (err) {
                return res.status(500).send({ message: 'Houve um erro na criação do anúncio. Tente novamente mais tarde.', error: err });
            }
            //valida se houve um resultado
            if (result) {
                return res.status(201).send({ message: 'Anúncio criado com sucesso!', result: result });
            }
        });
    });
};

//função assíncrona para ler automáticamente os anúncios armazenados no banco de dados
export async function readingCourse(req, res) {  
    readCourse((err, result) => {
        //valida se houve erro
        if (err) {
            return res.status(500).send({ message: 'Houve um erro na busca dos anúncios. Reinicie a página.', error: err });
        }
        //valida se houve um resultado
        if (result) {
            return res.status(200).send({ result: result });
        }
    });
};

//função assíncrona que atualiza os dados do anúncio com o id enviado
export async function updatingCourse(req, res) {
    //requisitando as informações para atualizar os anúncios do corpo da requisição diretamente
    const id_course = req.params.id;
    const { name_course, objective_course, photoUrl_course, link_course, id_user } = req.body;
    //regex que valida o formato da URL recebida(ftp, http, https)
    console.log(id_user)
    const urlValid = /^(ftp|http|https):\/\/[^ "]+$/;

    //valida se todos os campos escritos pelo usuário estão preenchidos
    if (!name_course || !objective_course || !photoUrl_course || !link_course) {
        return res.status(400).send({ message: 'Preencha todos os campos.' });
    }

    //valida se os campos de identificação foram preenchidos pelo react
    if (!id_user || !id_course) {
        return res.status(400).send({ message: 'Houve um erro na sua identificação, entre em contato com o suporte.' });
    }

    //validando se o id do usuário é um número, após converter a string recebida para Number
    if (!Number.isInteger(Number(id_user))) {
        return res.status(400).send({ message: 'Houve um erro na sua identificação, entre em contato com o suporte.' });
    } 

    //validação do tamanho do nome do curso
    if (name_course.length > 300 || name_course.length < 5) {
        return res.status(400).send({ message: 'O nome do curso deve ter entre 5 e 300 caracteres.' });
    }

    //validação do tamanho do objetivo do curso
    if (objective_course.length > 1000 || objective_course.length < 20) {
        return res.status(400).send({ message: 'O objetivo do curso deve ter entre 20 e 1000 caracteres.' });
    }

    //validação do tamanho da URL da foto
    if (photoUrl_course.length > 1000) {
        return res.status(400).send({ message: 'O link da foto deve deve ter no máximo 1000 caracteres.' });
    }

    //validação do tamanho da URL do site do curso
    if (link_course.length > 1000) {
        return res.status(400).send({ message: 'O link do site deve ter no máximo 1000 caracteres.' });
    }

    //validação do formato da URL do site do curso
    if (!urlValid.test(link_course)) {
        return res.status(400).send({ message: 'Link inválido.' });
    }

    //middleware de validação de permissão
    validateLevel(id_user, (err, result) => {
        //verifica se houve um erro no sistema
        if (err) {
            return res.status(401).send({ message: 'Houve um erro no processo de criação, tente novamente mais tarde.', error: err });
        }

        //verifica se o usuário é um visitante
        if (result === false) {
            return res.status(401).send({ message: 'Você não tem permissão para acessar este recurso.' });
        }

        //função que atualiza o curso no banco de dados
        updateCourse(name_course, objective_course, photoUrl_course, link_course, id_course, id_user, (err, result) => {
            //valida se houve um erro
            if (err) {
                return res.status(500).send({ message: 'Houve um erro na atualização do seu anúncio.', error: err });
            }
            //valida se houve um resultado
            if (result) {
                return res.status(200).send({ message: 'Anúncio atualizado com sucesso.', result: result });
            }
        });
    });
};

//função assíncrona que deleta(desativa) o anúncio no banco de dados
export async function deletingCourse(req, res) {
    //requisitando o id do curso e do usuário diretamente
    const id_course = req.params.id;
    const { id_user } = req.body;

    //testando se o id do curso existe e se é um número, após
    //converter o valor(string) recebido para Number
    if (!id_course || !Number.isInteger(Number(id_course))) {
        return res.status(400).send({ message: 'Selecione um anúncio válido.' });
    } 

    //testa se o id do usuário existe e se é um número, após
    //converter o valor(string) recebido para Number
    if (!id_user || !Number.isInteger(Number(id_user))) {
        return res.status(400).send({ message: 'Houve um erro na sua ação, entre em contato com o suporte.' });
    }

    //middleware de validação de permissão
    validateLevel(id_user, (err, result) => {
        //verifica se houve um erro no sistema
        if (err) {
            return res.status(401).send({ message: 'Houve um erro no processo de criação, tente novamente mais tarde.', error: err });
        }

        //verifica se o usuário é um visitante
        if (result === false) {
            return res.status(401).send({ message: 'Você não tem permissão para acessar este recurso.' });
        }
    
        //função para deletar(inativar) o anúncio no banco de dados
        deleteCourse(id_course, (err, result) => {
            //valida se houve algum erro
            if (err) {
                return res.status(500).send({ message: 'Houve um erro no processo de deletar seu anúncio. Tente novamente mais tarde.', error: err });
            }
            //valida se houve algum resultado
            if (result) {
                return res.status(200).send({ message: 'Anúncio deletado com sucesso.', result: result });
            }
        });
    });
};

//função assíncrona que pesquisa os anúncios de cursos no banco de dados
export async function searchingCourse(req, res) {
    //requisitando o nome do curso através da URL 
    const search = req.query.search;

    //verificando se o nome do curso existe e se ele é maior
    if (!search || search.length < 3) {
        return res.status(400).send({ message: 'Digite no mínimo 3 caracteres.' });
    }

    //função de pesquisa de anúncios usando o nome do curso
    searchCourse(search, (err, result) => {
        //valida se houve erro
        if (err) {
            return res.status(500).send({ message: 'Houve um erro na busca dos anúncios. Reinicie a página.', error: err });
        }
        // valida se houve um resultado ou não
        if (result && result.length > 0) {
            return res.status(200).send({ result: result });
        } else {
            return res.status(404).send({ message: 'Nenhum curso encontrado com o nome especificado.' });
        }
    });
};