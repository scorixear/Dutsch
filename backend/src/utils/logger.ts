import { ILogger, WARNINGLEVEL } from '../interfaces/ILogger';
import { IConsole } from '../interfaces/IConsole';
/**
 * Provides Logging commands
 */
export class Logger implements ILogger {
  private customConsole: IConsole;

  public constructor(customConsole: IConsole = console) {
    this.customConsole = customConsole;
    Logger._instance = this;
  }

  public static _instance: ILogger;
  public static get Instance(): ILogger {
    return this._instance || (this._instance = new this());
  }

  /**
   * Logs the message with the given warning leven and arguments
   * Exists process if warninglevel = {@link WARNINGLEVEL.CRIT} with error-code 1
   * @param message the message to log
   * @param warningLevel the warning level
   * @param args the arguments to add to the loggin (default console.log interpretation)
   */
  public log(message: string, warningLevel: WARNINGLEVEL, ...args: any[]) {
    this.customConsole.log(`[${warningLevel}] ${message}`, ...args);
    if (warningLevel === WARNINGLEVEL.CRIT) {
      process.exit(1);
    }
  }

  /**
   * Logs the message with INFO as preamble
   * @param message the message to log
   * @param args the arguments to add to the logging (default console.log interpretation)
   */
  public info(message: string, ...args: any[]) {
    this.log(message, WARNINGLEVEL.INFO, ...args);
  }

  /**
   * Logs the message with WARNING preamble
   * @param message the message to log
   * @param args the arguments to add to the logging (default console.log interpretation)
   */
  public warn(message: string, ...args: any[]) {
    this.log(message, WARNINGLEVEL.WARN, ...args);
  }

  /**
   * Logs the message with ERROR preamble
   * @param message the message to log
   * @param args the arguments to add to the logging (default console.log interpretation)
   */
  public error(message: string, ...args: any[]) {
    this.log(message, WARNINGLEVEL.ERROR, ...args);
  }

  /**
   * Logs the message with CRITICAL as preamble
   * Then exists the process with error-code 1
   * @param message the message to log
   * @param args the arguments to add to the logging (default console.log interpretation)
   */
  public crit(message: string, ...args: any[]) {
    this.log(message, WARNINGLEVEL.CRIT, ...args);
  }

  /**
   * Logs the message with the given warning leven and argments
   * Adds error message and stack-trace to console.error output
   * Exists process if warningLevel = {@link CRIT}
   * @param message the message to log
   * @param error the error to print
   * @param warningLevel the warninglevel to show
   * @param args the arguments to add to the logging (default console.log interpretation)
   */
  public exception(message: string, error: unknown, warningLevel: WARNINGLEVEL, ...args: any[]) {
    if (error instanceof Error) {
      this.customConsole.error(error.message);
      if (error.stack) {
        this.customConsole.error(error.stack);
      }
    } else if (typeof error === 'string') {
      this.customConsole.error(error);
    }

    this.log(message, warningLevel, ...args);
  }
}
