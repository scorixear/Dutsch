import fs from 'fs';
import IWriteStreamWrapper from './IWriteStreamWrapper';

export default interface IFsWrapper {
  readdir(path: fs.PathLike, callback: (err: NodeJS.ErrnoException | null, files: string[]) => void): void;
  access(path: fs.PathLike, mode: number | undefined, callback: fs.NoParamCallback): void;
  stat(path: fs.PathLike, callback: (err: NodeJS.ErrnoException | null, stats: fs.Stats) => void): void;
  readFile(path: fs.PathOrFileDescriptor, callback: (err: NodeJS.ErrnoException | null, data: Buffer) => void): void;
  rm(path: fs.PathLike, options: fs.RmOptions, callback: fs.NoParamCallback): void;
  rm_no_options(path: fs.PathLike, callback: fs.NoParamCallback): void;
  mkdir(path: fs.PathLike, callback: fs.NoParamCallback): void;
  writeFile(path: fs.PathOrFileDescriptor, data: string | NodeJS.ArrayBufferView, callback: fs.NoParamCallback): void;
  existsSync(path: fs.PathLike): boolean;
  createWriteStream(path: fs.PathLike, options?: BufferEncoding | undefined): IWriteStreamWrapper;
  rename(oldPath: fs.PathLike, newPath: fs.PathLike, callback: fs.NoParamCallback): void;
  mv(oldPath: fs.PathLike, newPath: fs.PathLike, callback: fs.NoParamCallback): void;
  promisify<T>(
    arg1: any,
    func: (arg1: any, callback: (err: NodeJS.ErrnoException | null, data: T) => void) => void
  ): Promise<T>;
}
