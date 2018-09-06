import {
  config, format, createLogger, transports
} from 'winston';

const logger = createLogger({
  level: 'info',
  levels: config.syslog.levels,
  exitOnError: false,
  format: format.combine(
    format((info) => {
      info.message = [].concat(info.message).join(' ');
      return info;
    })(),
    format.simple()
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
