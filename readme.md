# Angular-Markdown-Editor
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/%3C%2F%3E-TypeScript-%230074c1.svg)](http://www.typescriptlang.org/)
[![npm version](https://badge.fury.io/js/angular-markdown-editor.svg)](//npmjs.com/package/angular-markdown-editor)

In this package we will use a few libraries and tools to make a more convenient "all in one" WYSIWYG Markdown Editor with preview. All of that with a simple Angular Component. This can be useful for online documentation and many other reasons (docs, blog, ...).

#### AngularJS (previous version)
If you still have AngularJS project, you can still get the older version `1.1.5` from [NPM](https://www.npmjs.com/package/angular-markdown-editor/v/1.1.5), however please note that support has stopped and only the new version `2.x` will be supported.

### Dependencies
Here is the list of dependencies, which are required
- [Bootstrap-Markdown](http://www.codingdrama.com/bootstrap-markdown/) (editor) itself
- [jQuery](http://jquery.com/) _(required for Bootstrap-Markdown editor)_
- [Bootstrap 3.x](https://getbootstrap.com/docs/3.3/).
   - If anyone needs `Bootstrap 4` support and has time to add the necessary code, [PR](https://github.com/ghiscoding/angular-markdown-editor/pulls) (Pull Request) are certainly welcome.

### Nice to have Dependencies
It's a "nice to have" but not a deep dependencies, which is the [ngx-markdown](https://github.com/jfcere/ngx-markdown) lib. It is used in the demo of this lib, but technically you could plug any other lib you wish for dealing with the markdown preview.

### Demo page
- [Bootstrap 3 demo](https://ghiscoding.github.io/angular-markdown-editor) / [examples repo](https://github.com/ghiscoding/angular-markdown-editor-demo)


## Installation

### NPM Package
[Angular-Markdown-Editor on NPM](https://www.npmjs.com/package/angular-markdown-editor)

Install through `NPM` or `Yarn`
```bash
npm install angular-markdown-editor

# or with Yarn
yarn add angular-markdown-editor
```

### Modify the `.angular-cli.json` file
You need to add CSS Styles for the Bootstrap, Markdown Editor and Font-Awesome (the latter is optional).

```json
"styles": [
    "../node_modules/bootstrap/dist/css/bootstrap.css",
    "../node_modules/bootstrap-markdown/css/bootstrap-markdown.min.css",
    "../node_modules/font-awesome/css/font-awesome.css"
],
"scripts": [
    "../node_modules/jquery/dist/jquery.js",
    "../node_modules/bootstrap-markdown/js/bootstrap-markdown.js"
],
```

#### When using `ngx-markdown` and/or Prism.js
`Prism.js` uses separate javascript file for each language, so you'll need to add them yourself.
For example, below we are adding the highlight for `C#`, `JavaScript` and `TypeScript`:
```json
"styles": [
    "../node_modules/prismjs/themes/prism.css"
],
"scripts": [
    "../node_modules/prismjs/prism.js",
    "../node_modules/prismjs/components/prism-css.min.js",
    "../node_modules/prismjs/components/prism-javascript.min.js",
    "../node_modules/prismjs/components/prism-typescript.min.js"
],
```

### Import Module
```typescript
import { AngularMarkdownEditorModule } from 'angular-markdown-editor';

@NgModule({
  declarations: [],
  imports: [AngularMarkdownEditorModule]

  // or pre-define global configuration using the forRoot
  // imports: [AngularMarkdownEditorModule.forRoot({ iconlibrary: 'fa' })]
});
```

### Input attributes
You can pass the following input attribute:

| attribute     | type          | required | comments  |
| ------------- | ------------- | -------- | ------- |
| **textareaId**  | string | yes | id of the textarea DOM element used by the lib |
| **rows**    | number | no | number of rows for the textarea, defaults to 10 |
| **options**    | mixed | no | markdown Editor Options to pass to the element |
| **locale**    | EditorLocale | no | locale set that has a language and dictionary that can be added as an alternative language. Can be 1 or more dictionaries |

### Global Options
The library comes with it's own Global Editor Options, these propertoes can be overriden at any by the `options` attribute. Click to see the [Global Options](https://github.com/ghiscoding/angular-markdown-editor/blob/master/src/lib/angular-markdown-editor/global-editor-options.ts) defined.

### Event Hooks
You can hook to any of the [Bootstrap Markdown Editor Events](http://www.codingdrama.com/bootstrap-markdown/) through 2 ways, just choose the one you prefer:

#### 1. Dispatch of Custom Event
Each of the events are available in the View from a Custom Event as `(onX)="doSomething()"`, for example:
```html
<angular-markdown-editor
  textareaId="editor1" rows="12"
  name="markdownText" [(ngModel)]="markdownText"
  (onFullscreenExit)="hidePreview()">
</angular-markdown-editor>
```
```typescript
export class MyComponent {
  hidePreview() { console.log(e.getContent()); }
}
```

You can also pass the Event returned by the Editor via `$event.detail.eventData`

```html
<angular-markdown-editor
  textareaId="editor1" rows="12"
  name="markdownText" [(ngModel)]="markdownText"
  (onChange)="onChange($event.detail.eventData)">
</angular-markdown-editor>
```
```typescript
export class MyComponent {
  ngOnInit() {
    onChange(e) { console.log(e.getContent()); }
  }
}
```

#### 2. Editor Option Callbacks
The second way is to use the callback directly when defining the Editor Options.
```html
<angular-markdown-editor
  textareaId="editor1" rows="12"
  name="markdownText" [(ngModel)]="markdownText"
  [options]="editorOptions">
</angular-markdown-editor>
```
```typescript
import { EditorOption } from 'angular-markdown-editor';
export class MyComponent {
  ngOnInit() {
    this.editorOptions: EditorOption = {
      iconlibrary: 'fa',
      onChange: (e) => console.log(e.getContent()),
      onFullscreenExit: () => this.hidePreview()
    };
  }
}
```

#### List of Event Hooks
- onPreview
- onPreviewEnd
- onSave
- onBlur
- onFocus
- onFullscreen
- onFullscreenExit
- onChange
- onSelect
- onShow

### API - Editor Methods
The editor API is quite dense and I will not list the entire set of methods, but you can see the entire list from the [Editor Method Interface](https://github.com/ghiscoding/angular-markdown-editor/blob/master/src/lib/angular-markdown-editor/models/editorMethod.interface.ts).
To call any of the Editor Methods, you will have to first get a reference to the Editor's instance which you can get from the `onShow` callback.

Get the Editor's instance through the `onShow`, via the Custom Event (from the View) or Editor Option callback (just choose the one you prefer). Below shows how to get it through the latter option.

###### View
```html
<button (click)="showFullScreen()">Show Full Screen</button>
<angular-markdown-editor
  textareaId="editor1" rows="12"
  name="markdownText" [(ngModel)]="markdownText"
  [options]="editorOptions">
</angular-markdown-editor>
```

###### Component
```typescript
import { EditorInstance, EditorOption } from 'angular-markdown-editor';
export class MyComponent {
  bsEditorInstance: EditorInstance;

  ngOnInit() {
    this.editorOptions = {
      iconlibrary: 'fa',
      onShow: (e) => this.bsEditorInstance = e
    };
  }

  showFullScreen() {
    this.bsEditorInstance.setFullscreen(true);
  }
}
```

### Preview Button (need a Parser)
For the "Preview" button to work, you will need to provide a `parser` to the Editor Options. This lib has no deep dependencies to any Markdown Parser (you could use `marked.js` or any other parser). But assuming we are using `ngx-markdown`, we can add the parser this way:

###### Component
```typescript
import { MarkdownService } from 'ngx-markdown';

export class TestComponent implements OnInit {
  constructor(private markdownService: MarkdownService) {}

  ngOnInit() {
    this.editorOptions = {
      parser: (val) => this.markdownService.compile(val.trim())
    };
  }
}
```

### Additional Editor Buttons
I really thought that some buttons were missing to go a great job (~~Strikethrough~~ & **Table**). So I added them directly in the [Global Options](https://github.com/ghiscoding/angular-markdown-editor/blob/master/src/lib/angular-markdown-editor/global-editor-options.ts). If you want to add your own, then just look at how it was done in the [Global Options](https://github.com/ghiscoding/angular-markdown-editor/blob/master/src/lib/angular-markdown-editor/global-editor-options.ts) and read the section `additionalButtons` of [Bootstrap Markdown](http://www.codingdrama.com/bootstrap-markdown/) website.

### Adding Locale
You can add a locale to the editor but passing a `locale` object (and bind it in the View) which contain a `language` and the dictionary of words used by the editor. The entire list of words can be seen in the example below. So for example, if we want to add French locale, we will do the following (you can see [demo code](https://github.com/ghiscoding/angular-markdown-editor/blob/master/src/app/template/template.component.ts)):

###### View
```html
<button (click)="showFullScreen()">Show Full Screen</button>
<angular-markdown-editor
  textareaId="editor1" rows="12"
  name="markdownText" [(ngModel)]="markdownText"
  [locale]="locale"
  [options]="editorOptions">
</angular-markdown-editor>
```

###### Component
```typescript
import { EditorInstance, EditorLocale, EditorOption } from 'angular-markdown-editor';
export class MyComponent {
  locale: EditorLocale = {
    language: 'fr',
    dictionary: {
      'Bold': 'Gras',
      'Italic': 'Italique',
      'Heading': 'Titre',
      'URL/Link': 'Insérer un lien HTTP',
      'Image': 'Insérer une image',
      'List': 'Liste à puces',
      'Ordered List': 'Liste ordonnée',
      'Unordered List': 'Liste non-ordonnée',
      'Code': 'Code',
      'Quote': 'Citation',
      'Preview': 'Prévisualiser',
      'Strikethrough': 'Caractères barrés',
      'Table': 'Table',
      'strong text': 'texte important',
      'emphasized text': 'texte souligné',
      'heading text': 'texte d\'entête',
      'enter link description here': 'entrez la description du lien ici',
      'Insert Hyperlink': 'Insérez le lien hypertexte',
      'enter image description here': 'entrez la description de l\'image ici',
      'Insert Image Hyperlink': 'Insérez le lien hypertexte de l\'image',
      'enter image title here': 'entrez le titre de l\'image ici',
      'list text here': 'texte à puce ici'
    }
  };

  // if you want to pass multiple locales, just pass it as an array
  /*
  locale: EditorLocale[] = [
    { language: 'fr', dictionary: { 'Bold': 'Gras', ...
    { language: 'en', dictionary: { 'Bold': 'Bold', ...
  ];
  */

  ngOnInit() {
    this.editorOptions = {
      language: 'fr', // also set the language option to French
      onShow: (e) => this.bsEditorInstance = e
    };
  }
}
```

**Note** I could not find a way to change the language dynamically, so it seems that we would have to destroy the component and re-create it for switching the language/locale.

### License
[MIT License](LICENSE)

## Use it, like it?
You like and use this great library `Angular-Markdown-Editor`? You can always upvote :star: and/or contribute :)

## Like my work?
If you like my work, you can also support me with caffeine :smile:
[Buy Me a Coffee](https://ko-fi.com/N4N679OT)
