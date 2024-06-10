import { createCourse, readCourse, updateCourse, deleteCourse, searchCourse } from '../models/course_model.js';

//função assíncrona para criar um anúncio de curso
export async function creatingCourse(req, res) {
    //requisita os dados do anúncio diretamente pelo body
    const { id_user, name_course, objective_course, photoUrl_course, link_course } = req.body;

    //valida se todos os campos estão preenchidos
    if (!id_user || !name_course || !objective_course || !photoUrl_course || !link_course) {
        return res.status(400).send({ message: 'Preencha todos os campos' });
    }

    //função do model para criar um anúncio no banco de dados
    createCourse(id_user, name_course, objective_course, photoUrl_course, link_course, (err, result) => {
        //valida se houve erro
        if (err) {
            return res.status(500).send({ message: 'Houve um erro na criação do anúncio. Tente novamente mais tarde.', error: err });
        }
        //valida se houve um resultado
        if (result) {
            return res.status(201).send({ message: 'Anúncio criado com sucesso!', result: result });
        }
    });
};

//função assíncrona para ler os anúncios armazenados no banco de dados
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
    //requisitando as informações para atualizar os anúncios do corpo da requisição
    const { name_course, objective_course, photoUrl_course, link_course, id_course, id_user } = req.body;

    //valida se todos os campos foram preenchidos
    if (!name_course || !objective_course || !photoUrl_course || !link_course || !id_course || !id_user) {
        return res.status(400).send({ message: 'Preencha todos os campos' });
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
};

//função assíncrona que deleta(desativa) o anúncio no banco de dados
export async function deletingCourse(req, res) {
    //requisitando o id do curso diretamente
    const { id_course } = req.params;

    //testando se o id não está vazio
    if (!id_course) {
        return res.status(400).send({ message: 'Preencha o campo de ID do anúncio' });
    }

    //função para deletar(inativar) o anúncio no banco de dados
    deleteCourse(id_course, (err, result) => {
        //valida se houve algum erro
        if (err) {
            return res.status(500).send({ message: 'Houve um erro no processo de deletar seu anúncio. Tente novamente mais tarde', error: err });
        }
        //valida se houve algum resultado
        if (result) {
            return res.status(200).send({ message: 'Anúncio deletado com sucesso.', result: result });
        }
    });
};

//função assíncrona que pesquisa os anúncios de cursos no banco de dados
export async function searchingCourse(req, res) {
    //requisitando o nome do curso através da URL 
    const { name_course } = req.query;

    //verificando se o nome do curso existe e se ele é maior
    if (!name_course || name_course.length < 3) {
        return res.status(400).send({ message: 'Digite no mínimo 3 caracteres' });
    }

    //função de pesquisa de anúncios usando o nome do curso
    searchCourse(name_course, (err, result) => {
        //valida se houve erro
        if (err) {
            return res.status(500).send({ message: 'Houve um erro na busca dos anúncios. Reinicie a página.', error: err });
        }
        // valida se houve um resultado
        if (result && result.length > 0) {
            return res.status(200).send({ result: result });
        } else {
            return res.status(404).send({ message: 'Nenhum curso encontrado com o nome especificado.' });
        }
    });
};