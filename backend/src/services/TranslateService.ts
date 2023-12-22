import IFsWrapper from '../interfaces/IFsWrapper';
import ITranslateService from '../interfaces/ITranslateService';

export default class TranslateService implements ITranslateService {
  private fsWrapper: IFsWrapper;
  private deutschToDutsch: Map<string, string> = new Map<string, string>();
  private dutschToDeutsch: Map<string, string> = new Map<string, string>();
  private alphabet: Set<string> = new Set<string>([
    'a',
    'b',
    'c',
    'd',
    'e',
    'f',
    'g',
    'h',
    'i',
    'j',
    'k',
    'l',
    'm',
    'n',
    'o',
    'p',
    'q',
    'r',
    's',
    't',
    'u',
    'v',
    'w',
    'x',
    'y',
    'z',
    'ä',
    'ö',
    'ü',
    'ß'
  ]);
  public constructor(fsWrapper: IFsWrapper) {
    this.fsWrapper = fsWrapper;
  }

  public async init() {
    const deutschToDutsch_file = await this.fsWrapper.promisify('deutschToDutsch.json', this.fsWrapper.readFile);
    const dutschToDeutsch_file = await this.fsWrapper.promisify('dutschToDeutsch.json', this.fsWrapper.readFile);

    for (const [key, value] of Object.entries(JSON.parse(deutschToDutsch_file.toString()))) {
      this.deutschToDutsch.set(key, value as string);
    }
    for (const [key, value] of Object.entries(JSON.parse(dutschToDeutsch_file.toString()))) {
      this.dutschToDeutsch.set(key, value as string);
    }
  }

  public translateToDutsch(text: string): string {
    const words = text.trim().split(' ');
    for (let i = 0; i < words.length; i++) {
      if (this.deutschToDutsch.has(words[i])) {
        let endChars = '';
        while (
          words[i].length > 0 &&
          this.alphabet.has(words[i].charAt(words[i].length - 1).toLocaleLowerCase('de-DE')) == false
        ) {
          endChars = words[i].charAt(words[i].length - 1) + endChars;
          words[i] = words[i].slice(0, -1);
        }
        let startChars = '';
        while (words[i].length > 0 && this.alphabet.has(words[i].charAt(0).toLocaleLowerCase('de-DE')) == false) {
          startChars += words[i].charAt(0);
          words[i] = words[i].slice(1);
        }
        words[i] = this.deutschToDutsch.get(words[i]) as string;
        words[i] = startChars + words[i] + endChars;
      }
    }
    return words.join(' ');
  }

  public translateToDeutsch(text: string): string {
    const words = text.trim().split(' ');
    for (let i = 0; i < words.length; i++) {
      if (this.deutschToDutsch.has(words[i])) {
        let endChars = '';
        while (
          words[i].length > 0 &&
          this.alphabet.has(words[i].charAt(words[i].length - 1).toLocaleLowerCase('de-DE')) == false
        ) {
          endChars = words[i].charAt(words[i].length - 1) + endChars;
          words[i] = words[i].slice(0, -1);
        }
        let startChars = '';
        while (words[i].length > 0 && this.alphabet.has(words[i].charAt(0).toLocaleLowerCase('de-DE')) == false) {
          startChars += words[i].charAt(0);
          words[i] = words[i].slice(1);
        }
        words[i] = this.dutschToDeutsch.get(words[i]) as string;
        words[i] = startChars + words[i] + endChars;
      }
    }
    return words.join(' ');
  }
}
