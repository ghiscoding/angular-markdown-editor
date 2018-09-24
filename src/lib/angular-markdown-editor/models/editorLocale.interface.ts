import { Dictionary } from './dictionary.interface';

export interface EditorLocale {
  language: string;
  dictionary: Dictionary | Dictionary[];
}
