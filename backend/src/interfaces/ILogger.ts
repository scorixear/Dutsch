/**
 * Provides warning levels.
 * {@link CRIT} shuts down the process with error-code 1
 */
export enum WARNINGLEVEL {
  INFO = 'INFO',
  WARN = 'WARNING',
  ERROR = 'ERROR',
  CRIT = 'CRITICAL'
}

export interface ILogger {
  log(message: string, warningLevel: WARNINGLEVEL, ...args: any[]): void;
  info(message: string, ...args: any[]): void;
  warn(message: string, ...args: any[]): void;
  error(message: string, ...args: any[]): void;
  crit(message: string, ...args: any[]): void;
  exception(message: string, exception: any, warningLevel: WARNINGLEVEL, ...args: any[]): void;
}
