import { EditorMethod } from './editorMethod.interface';
import { EditorOption } from './editorOption.interface';

export interface EditorInstance extends EditorMethod {
  $callback: any[];
  $editable: any;
  $editor: any;
  $element: any;
  $handler: string[];
  $isFullscreen: boolean;
  $isPreview: boolean;
  $nextTab: any[];
  $ns: string;
  $oldContent: string;
  $options: EditorOption;
  $textarea: any;
}
