import fs, { PathLike, NoParamCallback, PathOrFileDescriptor } from 'fs';
import IFsWrapper from '../interfaces/IFsWrapper';
import IWriteStreamWrapper from '../interfaces/IWriteStreamWrapper';
import WriteStreamWrapper from './WriteStreamWrapper';

export default class FsWrapper implements IFsWrapper {
  readdir(path: PathLike, callback: (err: NodeJS.ErrnoException | null, files: string[]) => void): void {
    fs.readdir(path, callback);
  }
  access(path: PathLike, mode: number | undefined, callback: NoParamCallback): void {
    fs.access(path, mode, callback);
  }
  stat(path: fs.PathLike, callback: (err: NodeJS.ErrnoException | null, stats: fs.Stats) => void): void {
    fs.stat(path, callback);
  }
  readFile(path: PathOrFileDescriptor, callback: (err: NodeJS.ErrnoException | null, data: Buffer) => void): void {
    fs.readFile(path, callback);
  }

  rm_no_options(path: fs.PathLike, callback: fs.NoParamCallback): void {
    fs.rm(path, callback);
  }
  rm(path: fs.PathLike, options: fs.RmOptions, callback: fs.NoParamCallback): void {
    fs.rm(path, options, callback);
  }

  mkdir(path: PathLike, callback: NoParamCallback): void {
    fs.mkdir(path, { recursive: true }, callback);
  }
  writeFile(path: PathOrFileDescriptor, data: string | NodeJS.ArrayBufferView, callback: NoParamCallback): void {
    fs.writeFile(path, data, callback);
  }
  existsSync(path: PathLike): boolean {
    return fs.existsSync(path);
  }
  createWriteStream(path: PathLike, options?: BufferEncoding | undefined): IWriteStreamWrapper {
    return new WriteStreamWrapper(fs.createWriteStream(path, options));
  }
  rename(oldPath: PathLike, newPath: PathLike, callback: NoParamCallback): void {
    fs.rename(oldPath, newPath, callback);
  }
  mv(oldPath: PathLike, newPath: PathLike, callback: NoParamCallback): void {
    fs.rename(oldPath, newPath, callback);
  }

  promisify<T>(
    arg1: any,
    func: (arg1: any, callback: (err: NodeJS.ErrnoException | null, data: T) => void) => void
  ): Promise<T> {
    return new Promise<T>((resolve, reject) => {
      func(arg1, (err: NodeJS.ErrnoException | null, data: T) => (err ? reject(err) : resolve(data)));
    });
  }
}
