import {
  config, format, createLogger, transports
} from 'winston';

const getFormattedMessage = msg => [].concat(msg).map((message) => {
  switch (typeof message) {
    case 'string':
      return message;
    case 'object':
      return Array.isArray(message) ? getFormattedMessage(message) : JSON.stringify(message);
    default:
      return message;
  }
}).join(' ');

const logger = createLogger({
  level: 'info',
  levels: config.syslog.levels,
  exitOnError: false,
  format: format.combine(
    format((info) => {
      info.message = getFormattedMessage(info.message);
      return info;
    })(),
    format.json()
  ),
  transports: [
    new transports.Console()
  ]
});

const logWithLogger = (level, message) => {
  const { DEBUG } = process.env;
  if (DEBUG === 'true') {
    logger.log({ level, message });
  }
};

export const log = (...message) => logWithLogger('info', message);
export const logError = (...message) => logWithLogger('error', message);
