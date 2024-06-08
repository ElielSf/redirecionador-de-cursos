import express from 'express';
import cors from 'cors';
const PORT = process.env.PORT ?? 6777;

//criando o servidor
const app = express();

//middlewares de nível de aplicação para todas as requisições
app.use(express.json());
app.use(cors());

//rotas de usuário


//rotas de review


//rotas de curso

app.listen(PORT, () => {
    console.log(`Servidor online em localhost:${PORT}.`);
}).on('error', (err) => {
    console.error('Erro ao iniciar o servidor: ', err);
});