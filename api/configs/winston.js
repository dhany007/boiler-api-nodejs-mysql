import {
  transports,
  createLogger,
  config,
  format,
} from 'winston';
import appRoot from 'app-root-path';

require('winston-daily-rotate-file');

const {
  combine,
  timestamp,
  json,
  colorize,
  metadata,
  simple,
} = format;

// invoice
const bookLogger = createLogger({
  levels: config.syslog.levels,
  format: combine(
    timestamp({
      format: 'YYYY-MM-DD HH:mm:ss',
    }),
    json(),
    simple(),
    metadata({ fillExcept: ['message', 'level', 'timestamp'] }),
  ),
  transports: [
    new transports.DailyRotateFile({
      level: 'info',
      datePattern: 'YYYY-MM',
      filename: `${appRoot}/logs/books-%DATE%.log`,
      format: format.json(),
      json: true,
      colorize: true,
    }),
    new transports.Console({
      level: 'debug',
      format: combine(
        colorize(),
        simple(),
      ),
      colorize: true,
    }),
  ],
});
bookLogger.stream = {
  write(message) {
    bookLogger.info(message);
  },
};

const logger = { bookLogger };

export default logger;
