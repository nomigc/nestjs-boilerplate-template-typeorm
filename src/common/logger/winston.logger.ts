import * as winston from 'winston';

export const winstonConfig = {
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.colorize({ all: true }),
    winston.format.printf(({ level, message, timestamp, ...meta }) => {
      const metaString = Object.keys(meta).length ? JSON.stringify(meta) : '';
      return `[${timestamp}] ${level}: ${message} ${metaString}`;
    }),
  ),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: 'error.log' }),
  ],
};
