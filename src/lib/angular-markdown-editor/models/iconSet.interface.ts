import { Icon } from './icon.interface';

export interface IconSet {
  [iconName: string]: {
    name: string,
    icon: Icon;
  };
}
