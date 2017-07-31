import express from 'express';
import bodyParser from 'body-parser';
import config from './config/config';
import datasource from './config/datasource';
import booksRouter from './src/routes/books';

const app = express();
app.config = config;
app.datasource = datasource(app);

app.set('port', process.env.app_port);
app.use(bodyParser.json());
booksRouter(app);

export default app;
