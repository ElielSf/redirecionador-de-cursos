import express from 'express';
import cors from 'cors';

//impotando as funções assíncronas dos controllers
import { creatingUser, loginUser } from './controllers/user_controller.js';
import { creatingCourse, readingCourse, updatingCourse, deletingCourse, searchingCourse } from './controllers/course_controller.js';

//criando o servidor
const app = express();

//criando a porta do servidor
const PORT = process.env.PORT ?? 6777;

//middlewares de nível de aplicação para todas as requisições
app.use(express.json());
app.use(cors());

//rotas de usuário
app.post('/registro', creatingUser);
app.post('/login', loginUser);

//rotas de curso
app.post('/cursos', creatingCourse);
app.get('/cursos', readingCourse);
app.put('/cursos/:id', updatingCourse);
app.delete('/cursos/:id', deletingCourse);
app.get('/cursos', searchingCourse);

//escutando o servidor
app.listen(PORT, () => {
    console.log(`Servidor online em localhost:${PORT}.`);
}).on('error', (err) => {
    console.error('Erro ao iniciar o servidor: ', err);
});