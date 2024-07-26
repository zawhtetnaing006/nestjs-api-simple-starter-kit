import { ConsoleLogger, Injectable } from '@nestjs/common';
import * as winston from 'winston';
import * as dailyRotateFiles from 'winston-daily-rotate-file';
@Injectable()
export class MyLoggerService extends ConsoleLogger {
  private winstonLogger;
  constructor(protected readonly myLogContext?: string) {
    super();
    const { combine, timestamp, printf } = winston.format;
    const myFormat = printf(({ level, message, label, timestamp }) => {
      return `${level}: ${timestamp} [${label}] ${message}`;
    });
    this.winstonLogger = winston.createLogger({
      format: combine(
        timestamp({
          format: 'YYYY-MM-DD-HH-m-s',
        }),
        myFormat,
      ),
    });

    const errorTransport: winston.transport = new dailyRotateFiles({
      level: 'error',
      filename: 'error-%DATE%.log',
      datePattern: 'YYYY-MM-DD',
      zippedArchive: true,
      maxFiles: '15d',
      dirname: 'logs',
    });

    const infoTransport: winston.transport = new dailyRotateFiles({
      level: 'info',
      filename: 'combined-%DATE%.log',
      datePattern: 'YYYY-MM-DD',
      zippedArchive: true,
      maxFiles: '15d',
      dirname: 'logs',
    });
    this.winstonLogger.add(infoTransport);
    this.winstonLogger.add(errorTransport);
  }

  error(message: any, ...optionalParams: [...any, string?]) {
    this.winstonLogger.error({
      level: 'error',
      message: message,
      label: optionalParams[1],
    });
    super.error(message, ...optionalParams);
  }

  log(message: any, ...optionalParams: [...any, string?]) {
    super.log(message, ...optionalParams);
    this.winstonLogger.info({
      level: 'info',
      message,
      label: optionalParams[0],
    });
  }
}
