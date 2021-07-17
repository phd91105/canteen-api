import { Request } from 'express';
import winston from 'winston';
import moment from 'moment';
import 'dotenv/config';

const logger = winston.createLogger({
  format: winston.format.combine(
    winston.format.simple(),
    winston.format.timestamp({
      format: 'YYYY/MM/DD HH:mm:ss',
    }),
    winston.format.printf((log) => {
      if (log.stack) return `[${log.timestamp}] [${log.level}] ${log.stack}`;
      return `[${log.timestamp}] [${log.level}] ${log.message}`;
    }),
  ),
  transports: [
    new winston.transports.File({
      filename: `logs/application_${moment().format('YYYYMMDD')}.log`,
    }),
  ],
});

if (process.env.NODE_ENV !== 'production') {
  logger.add(new winston.transports.Console());
}

const infoLog = (req: Request, message: string): void => {
  logger.info(
    `[${req.sessionID}] [${req.session?.user?.id}] [${req.originalUrl}] [${req.method}] ${message}`,
  );
};

const warningLog = (req: Request, message: string): void => {
  logger.warn(
    `[${req.sessionID}] [${req.session?.user?.id}] [${req.originalUrl}] [${req.method}] ${message}`,
  );
};

const errorLog = (req: Request, message: string): void => {
  logger.error(
    `[${req.sessionID}] [${req.session?.user?.id}] [${req.originalUrl}] [${req.method}] ${message}`,
  );
};

export { logger, infoLog, warningLog, errorLog };
