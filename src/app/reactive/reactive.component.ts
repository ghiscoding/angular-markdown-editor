import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MarkdownService } from 'ngx-markdown';
import { EditorOption } from '../../lib/angular-markdown-editor';

@Component({
  templateUrl: './reactive.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./reactive.component.scss']
})
export class ReactiveComponent implements OnInit {
  bsEditorInstance: any;
  markdownText: string;
  showEditor = true;
  templateForm: FormGroup;
  editorOptions: EditorOption;

  constructor(
    private fb: FormBuilder,
    private markdownService: MarkdownService
  ) {}

  ngOnInit() {
    this.editorOptions = {
      autofocus: false,
      iconlibrary: 'fa',
      savable: false,
      onFullscreenExit: (e) => this.hidePreview(e),
      onShow: (e) => this.bsEditorInstance = e,
      parser: (val) => this.parse(val)
    };

    // put the text completely on the left to avoid extra white spaces
    this.markdownText =
`### Markdown example
---
This is an **example** where we bind a variable to the \`markdown\` component that is also bind to the editor.
#### example.component.ts
\`\`\`javascript
function hello() {
  alert('Hello World');
}
\`\`\`
#### example.component.html
\`\`\`html
<textarea [(ngModel)]="markdown"></textarea>
<markdown [data]="markdown"></markdown>
\`\`\``;

    this.buildForm(this.markdownText);
    this.onFormChanges();
  }


  buildForm(markdownText) {
    this.templateForm = this.fb.group({
      body: [markdownText],
      isPreview: [true]
    });
  }

  /** highlight all code found, needs to be wrapped in timer to work properly */
  highlight() {
    setTimeout(() => {
      this.markdownService.highlight();
    });
  }

  hidePreview(e) {
    if (this.bsEditorInstance && this.bsEditorInstance.hidePreview) {
      this.bsEditorInstance.hidePreview();
    }
  }

  showFullScreen(isFullScreen: boolean) {
    if (this.bsEditorInstance && this.bsEditorInstance.setFullscreen) {
      this.bsEditorInstance.showPreview();
      this.bsEditorInstance.setFullscreen(isFullScreen);
    }
  }

  parse(inputValue: string) {
    const markedOutput = this.markdownService.compile(inputValue.trim());
    this.highlight();

    return markedOutput;
  }

  onFormChanges(): void {
    this.templateForm.valueChanges.subscribe(formData => {
      if (formData) {
        this.markdownText = formData.body;
      }
    });
  }
}
