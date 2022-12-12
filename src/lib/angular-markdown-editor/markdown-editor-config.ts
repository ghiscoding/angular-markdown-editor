import { GlobalEditorOptions } from './global-editor-options';
import { EditorOption } from './models';

export class MarkdownEditorConfig {
  options: Partial<EditorOption>;

  constructor() {
    this.options = GlobalEditorOptions;
  }
}
