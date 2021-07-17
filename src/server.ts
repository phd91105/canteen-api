import express, { Application } from 'express';
import { connectdb } from './config/db.config';
import { logger } from './utils/logger';
import cors from 'cors';
import session from 'express-session';
import cookieParser from 'cookie-parser';
import expressLayouts from 'express-ejs-layouts';
import appRoutes from './routes';
import 'dotenv/config';

const { PORT = 8080, SESSION_SECRET } = process.env;
const app: Application = express();

app.use(cors({ origin: '*' }));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(expressLayouts);
app.set('view engine', 'ejs');
app.set('views', 'views');
app.set('layout', 'layout/defaultLayout');
app.set('layout extractScripts', true);
app.use(express.static('public'));
app.use(cookieParser());
app.use(
  session({
    secret: <string>SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 1000 * 60 * 60 },
  }),
);
app.set('trust proxy', true);
connectdb
  .then(() => logger.info('Database connected'))
  .catch((err) => logger.error(err));
app.use(appRoutes);
app.listen(PORT, () => console.log(`http://[::1]:${PORT}`));
