import fs from 'fs';
export default interface IWriteStreamWrapper {
  on(event: 'close', listener: () => void): this;
  on(event: 'error', listener: (err: Error) => void): this;
  writeStream: fs.WriteStream | undefined;
}
