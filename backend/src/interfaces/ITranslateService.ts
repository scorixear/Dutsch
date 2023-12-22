export default interface ITranslateService {
  init(): Promise<void>;
  translateToDutsch(text: string): string;
  translateToDeutsch(text: string): string;
}
