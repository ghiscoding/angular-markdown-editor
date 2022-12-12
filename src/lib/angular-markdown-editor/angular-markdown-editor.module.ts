import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { AngularMarkdownEditorComponent } from './angular-markdown-editor.component';
import { EditorOption } from './models';


@NgModule({
  imports: [CommonModule],
  declarations: [AngularMarkdownEditorComponent],
  exports: [AngularMarkdownEditorComponent],
})
export class AngularMarkdownEditorModule {
  static forRoot(config: EditorOption = {}): ModuleWithProviders<AngularMarkdownEditorModule> {
    return {
      ngModule: AngularMarkdownEditorModule,
      providers: [
        { provide: 'config', useValue: config }
      ]
    };
  }
}
