//middleware para verificar se o usuário está logado(com uma sessão)
export function requireLogin(req, res, next) {
    //testa se o usuário tem uma sessão ativa
    console.log(req.session);
    console.log(req.session.loggedUser);
    if (req.session && req.session.loggedUser) {
        //passa para a proxima função do controller caso
        //o usuário esteja logado
        console.log('a');
        next();
    } else {
        //resposta caso o usuário não esteja logado
        return res.status(401).send({ message: 'Faça login para acessar este recurso.' });
    }
};