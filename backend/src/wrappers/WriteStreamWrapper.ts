import IWriteStreamWrapper from '../interfaces/IWriteStreamWrapper';
import fs from 'fs';

export default class WriteStreamWrapper implements IWriteStreamWrapper {
  public writeStream: fs.WriteStream | undefined;
  constructor(writeStream: fs.WriteStream) {
    this.writeStream = writeStream;
  }

  public on(event: 'close', listener: () => void): this;
  on(event: 'error', listener: (err: Error) => void): this;
  on(event: unknown, listener: unknown): this {
    this.writeStream?.on(event as string, listener as () => void);
    return this;
  }
}
