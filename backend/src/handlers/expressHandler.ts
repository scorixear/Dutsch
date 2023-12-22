import express from 'express';
import cors from 'cors';

import IJWTHandler from '../interfaces/IJWTHandler';
import ICookieHandler from '../interfaces/ICookieHandler';
import ITranslateService from '../interfaces/ITranslateService';
import { Logger } from '../utils/logger';

export default class ExpressHandler {
  public app: express.Application;
  private jwtHandler: IJWTHandler;
  private cookieHandler: ICookieHandler;
  private translateService: ITranslateService;

  constructor(
    jwtHandler: IJWTHandler,
    cookieHandler: ICookieHandler,
    translateService: ITranslateService,
    useCors = true
  ) {
    this.jwtHandler = jwtHandler;
    this.cookieHandler = cookieHandler;
    this.translateService = translateService;
    this.app = express();

    const corsOptions = {
      origin: process.env.FRONTEND_URL ?? 'http://127.0.0.1',
      optionsSuccessStatus: 200,
      credentials: true
    };

    if (useCors) {
      this.app.use(cors(corsOptions));
    }
    this.app.disable('x-powered-by');
    this.app.use(express.json());
  }

  private authorizeUser = async (req: any, res: any, next: any) => {
    const decoded = await this.jwtHandler.verifyToken(this.cookieHandler.getSession(req.headers.cookie));
    if (decoded !== undefined) {
      res.locals.auth = decoded;
      next();
    } else {
      res.status(401).send();
    }
  };

  private asyncHandler = (fn: any) => (req: any, res: any, next: any) => {
    fn(req, res, next).catch(next);
  };

  public init() {
    this.app.get('/', async (req, res) => {
      res.send('Hello World!');
    });

    this.app.post('/api/auth', async (req, res) => {
      Logger.Instance.info('Authenticating User');
      const token = await this.jwtHandler.generateToken(req.body['password']);
      if (token !== undefined) {
        Logger.Instance.info('User Authenticated');
        res.send({ cookie: token });
      } else {
        res.status(401).send();
      }
    });
    this.app.get('/api/translate/dutsch', this.authorizeUser, async (req, res) => {
      const text = req.body['text'];
      if (text !== undefined) {
        try {
          const result = await this.translateService.translateToDutsch(text);
          res.send({ translated: result });
        } catch (error) {
          res.status(500).send({ error: 'Error while processing' });
        }
      } else {
        res.status(400).send({ error: 'No text provided' });
      }
    });

    this.app.get('/api/translate/deutsch', this.authorizeUser, async (req, res) => {
      const text = req.body['text'];
      if (text !== undefined) {
        try {
          const result = await this.translateService.translateToDeutsch(text);
          res.send({ translated: result });
        } catch (error) {
          res.status(500).send({ error: 'Error while processing' });
        }
      } else {
        res.status(400).send({ error: 'No text provided' });
      }
    });

    this.app.get('/api/translate/deutsch', this.authorizeUser, async (req, res) => {
      res.send('Hello World!');
    });
  }
}
