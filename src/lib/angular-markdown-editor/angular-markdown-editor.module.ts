import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AngularMarkdownEditorComponent } from './angular-markdown-editor.component';
import { EditorOption } from './models';


@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    AngularMarkdownEditorComponent
  ],
  exports: [
    AngularMarkdownEditorComponent
  ],
  entryComponents: [AngularMarkdownEditorComponent]
})
export class AngularMarkdownEditorModule {
  static forRoot(config: EditorOption = {}) {
    return {
      ngModule: AngularMarkdownEditorModule,
      providers: [
        { provide: 'config', useValue: config }
      ]
    };
  }
}
