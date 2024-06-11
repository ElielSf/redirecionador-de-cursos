//importando express, cors e o middleware de sessão do express
import express from 'express';
import cors from 'cors';
import session from 'express-session';

//importando as funções assíncronas dos controllers
import { creatingUser, loginUser } from './controllers/user_controller.js';
import { creatingCourse, readingCourse, updatingCourse, deletingCourse, searchingCourse } from './controllers/course_controller.js';

//importando o tempo limite da sessão e a configuração do armazenamento da sessão
import { expireTime, sessionStore } from './config/session.js';

//importando o middleware de verificação de login
import { requireLogin } from './middleware/require_login.js';

/* //importando o Identificador Único Universal Aleatório(UUID) do Crypto
import { randomUUID } from 'crypto'; */

//criando o servidor
const app = express();

//criando a porta do servidor
const PORT = process.env.PORT ?? 6777;

//middlewares de nível de aplicação para todas as requisições
app.use(express.json());
app.use(cors());

//rotas de usuário
//rota de cadastro com um middleware para criar uma sessão
app.post('/registro', session({
    secret: '37b8f84d-df2e-4d49-b262-bcde74f8764f',
    store: sessionStore,
    resave: true,
    saveUninitialized: true,
    cookie: {
      secure: false,
      maxAge: expireTime
    }
}), creatingUser);  
app.post('/login', loginUser);

//rotas de curso
app.post('/cursos', requireLogin, creatingCourse);
app.get('/cursos', readingCourse);
app.put('/cursos/:id', requireLogin, updatingCourse);
app.delete('/cursos/:id', requireLogin, deletingCourse);
app.get('/cursos/busca', searchingCourse);

//escutando o servidor
app.listen(PORT, () => {
    console.log(`Servidor online em localhost:${PORT}.`);
}).on('error', (err) => {
    console.error('Erro ao iniciar o servidor: ', err);
});