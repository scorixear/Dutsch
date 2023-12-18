import dotenv from 'dotenv';
import ExpressHandler from './handlers/expressHandler';
import CookieHandler from './handlers/cookieHandler';
import JWTHandler from './handlers/jwtHandler';
import FsWrapper from './wrappers/fsWrapper';
import { Logger } from './utils/logger';

dotenv.config();

const cookieHandler = new CookieHandler();
const jwtHandler = new JWTHandler();
const fsWrapper = new FsWrapper();

const expressHandler = new ExpressHandler(jwtHandler, cookieHandler, fsWrapper);
expressHandler.init();
expressHandler.app.listen(process.env.SERVER_PORT, () => {
  Logger.Instance.info('Server running on port ' + process.env.SERVER_PORT);
});
