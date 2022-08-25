import path from 'path';
import winston from 'winston';

interface ILogMessage {
  timestamp?: string;
  label?: string;
  level: string;
  message: string;
}

const logFormat = winston.format.printf(
  (options: ILogMessage) =>
    `${String(options.timestamp)} [${String(options.label)}]:[APP LOG] ${
      options.level
    }: ${options.message}`,
);

export const logger = winston.createLogger({
  format: winston.format.combine(
    winston.format.label({
      label: `zyndex-server:${String(process.env.NODE_ENV)}`,
    }),
    winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    logFormat,
  ),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({
      filename:
        process.env.NODE_ENV === 'production'
          ? path.resolve(__dirname, 'logs', 'app.log')
          : path.resolve(__dirname, '../../../logs/app.log'),
    }),
  ],
});
