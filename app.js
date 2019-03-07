import express from 'express';
import cookieParser from 'cookie-parser';
import cookieParserMW from './middlewares/cookies';
import queryParser from './middlewares/query';
import router from './routes';

const app = express();

app
    .use(cookieParser())
    .use(cookieParserMW)
    .use(queryParser)
    .use('/', router);

export default app;