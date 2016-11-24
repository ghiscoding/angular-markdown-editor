# Angular Markdown Editor (Directive)
`1.1.1`

## What do we have?
In this package we will use a few libraries and tools to make a more convenient "all in one" WYSIWYG Markdown Editor with preview. All of that with a simple AngularJS Directive call. I plan to use this mainly for online documentation but it could be useful for many other reasons (docs, blog, etc...).

[Marked.js](https://github.com/chjj/marked) is awesome for markdown preview and [Highlight.js](https://highlightjs.org/) is a must have for easiser code viewing with colors highlighting. The [Bootstrap-Markdown](http://www.codingdrama.com/bootstrap-markdown/) is a really great and minimalist looking as a simplified WYSIWYG editor. This editor was simply missing an AngularJS all-in-one package and so I created a Directive to handle all of that. For all of these great tools, we will use their AngularJS version (as much as possible) for easier integration as for example `Marked.js` AngularJS version is `Angular-Marked`.

## Demo
[Live Plunker demo](http://plnkr.co/AFxN7uiwkZlJ9OMZwXey) or take a look at the demo under the folder [example](https://github.com/ghiscoding/angular-markdown-editor/tree/master/example).

## Dependencies
* [angular.js](https://www.angularjs.org/)
* [bootstrap](http://getbootstrap.com/) _(we also include bootstrap.js)_
* [bootstrap-markdown](http://www.codingdrama.com/bootstrap-markdown/) _(editor)_
* [marked.js](https://github.com/chjj/marked) _(markdown preview)_
* [angular-marked](https://github.com/Hypercubed/angular-marked)
* [highlight.js](https://highlightjs.org/) _(code syntax highlighting)_
* [angular-highlight](https://github.com/pc035860/angular-highlightjs)
* [jQuery](http://jquery.com/) _(required for Bootstrap-Markdown editor)_

## How to use it?
### Installation
##### [Bower](https://bower.io/search/) _(`angular-markdown-editor` already exist on Bower, so I had to use a different name)_
```bash
bower install angular-markdown-editor-ghiscoding
```
##### [NPM](https://www.npmjs.com/package/angular-markdown-editor)
```bash
npm install angular-markdown-editor
```
##### [NuGet](https://www.nuget.org/packages/Angular-Markdown-Editor/)
_Some of the dependencies were added manually to this package (because they don't all exist on NuGet). For these packages, you could get them through Github and add them manually yourself or just use the one included with this package._
```bash
PM> Install-Package Angular-Markdown-Editor
```

### Include Styles &amp; Scripts
_NOTE: Unfortunately, the "highlight.js" npm module doesn't seem to have proper bundles, so it's easier for us to get the minified CSS, JS files directly from CDN where they are bundled correctly. As for the highlight styles, if you want to use another style, then you can replace the "...xxx.min.css" by the name you want to use, for example if we want to use "github", we would get "highlight.js/.../github.min.css"_
```html
<!-- CSS Stylesheet -->
<link rel="stylesheet" href="../node_modules/bootstrap/dist/css/bootstrap.min.css">
<link rel="stylesheet" href="../node_modules/font-awesome/css/font-awesome.min.css">
<link rel="stylesheet" href="../node_modules/bootstrap-markdown/css/bootstrap-markdown.min.css">
<link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/highlight.js/9.5.0/styles/github.min.css">
<link rel="stylesheet" href="../node_modules/angular-markdown-editor/styles/angular-markdown-editor.css">

<!-- Scripts -->
<script type="text/javascript" src="../node_modules/jquery/dist/jquery.min.js"></script>
<script type="text/javascript" src="../node_modules/bootstrap/dist/js/bootstrap.min.js"></script>
<script type="text/javascript" src="../node_modules/angular/angular.min.js"></script>
<script type="text/javascript" src="../node_modules/angular-sanitize/angular-sanitize.min.js"></script>
<script type="text/javascript" src="../node_modules/marked/lib/marked.js"></script>
<script type="text/javascript" src="../node_modules/angular-marked/dist/angular-marked.min.js"></script>
<script type="text/javascript" src="../node_modules/bootstrap-markdown/js/bootstrap-markdown.js"></script>
<script type="text/javascript" src="//cdnjs.cloudflare.com/ajax/libs/highlight.js/9.5.0/highlight.min.js"></script>
<script type="text/javascript" src="../node_modules/angular-highlightjs/src/angular-highlightjs.js"></script>
<script type="text/javascript" src="../node_modules/angular-markdown-editor/src/angular-markdown-editor.js"></script>

<!-- You could also load any available locale, look on their website https://github.com/toopay/bootstrap-markdown/tree/master/locale -->
<script type="text/javascript" src="../node_modules/bootstrap-markdown/locale/bootstrap-markdown.fr.js"></script>
```

### Inside the HTML
Simply create a `<textarea>` with an `ngModel` and a `name` then a call to the Directive.
At the end, all you need is:
```html
<!-- editor -->
<textarea ng-model="editor1" name="editor1" markdown-editor="" rows="10"></textarea>

<-- preview... be sure to include the "angular-markdown-editor.css" style -->
<!-- use "markdown" or "marked" on your <div> preview to show Tables correctly -->
<div marked="editor1" class="markdown" style="padding: 20px"></div>
```

## Editor options
You can use any of the [Bootstrap-Markdown Options](http://www.codingdrama.com/bootstrap-markdown/) by passing them as an object to the `markdown-editor` directive attribute. Like this: `<textarea markdown-editor="{'iconlibrary': 'fa'}"...`

or multiple options
```
<textarea markdown-editor="{'iconlibrary': 'fa', addExtraButtons: true}"...
```

## Editor extra buttons
I really thought that some buttons were missing to go a great job (~~Strikethrough~~ &amp; **Table**). So I added them within the directive as an option. They are not enabled by default, so you will need to enable them manually, that is if you do want to use them. The option argument is `addExtraButtons` to `true`.
```
<textarea markdown-editor="{addExtraButtons: true, 'iconlibrary': 'fa'}"...
```

## Event Hooks
###### starting with Angular-Markdown-Editor version 1.1.0
You have access to all the [Bootstrap Markdown Editor available Events/Hook](http://www.codingdrama.com/bootstrap-markdown/) directly in the directive

_(*) NOTE: It seems that Bootstrap Markdown Editor haven't release any versions in a while now, however there's still lot of commits happening. If you want all the Events/Hooks to work, you will have to manually download the [Bootstrap Markdown Editor.js](https://github.com/toopay/bootstrap-markdown/tree/master/js) file yourself._

- onPreview
- onPreviewEnd (*)
- onSave
- onBlur
- onFocus
- onFullscreen
- onFullscreenExit (*)
- onChange
- onSelect
- onShow

For example HTML
```html
<textarea name="editor1" class="content-box"
		ng-model="editor1"
		markdown-editor="{'iconlibrary': 'fa', addExtraButtons: true, resize: 'vertical'}"
		on-fullscreen="onFullScreenCallback()"
		on-fullscreen-exit="onFullScreenExitCallback()"
		rows="10" >
</textarea>
```
Controller
You can call any API functions defined in Markdown Editor, take a look at their API section [Bootstrap Markdown Editor - API functions](http://www.codingdrama.com/bootstrap-markdown/)

```javascript
/** Markdown event hook onFullscreen, in this example we will automatically show the result preview when going in full screen
 * the argument (e) is the actual Markdown object returned which help call any of API functions defined in Markdown Editor
 * @param object e: Markdown Editor object
 */
$scope.onFullScreenCallback = function(e) {
    e.showPreview();
}
```

## External function calls through $rootScope.markdownEditorObjects
###### starting with Angular-Markdown-Editor version 1.1.0
For conveniencies and for possible external function calls, Angular-Markdown-Editor saves each of the Markdown Editors inside `$rootScope.markdownEditorObjects[editorName]`. This basically means that on any defined editor, we could call some of the [Bootstrap Markdown Editor - API functions](http://www.codingdrama.com/bootstrap-markdown/).

This varies with previous subject of (Event Hooks), since using the `$rootScope.markdownEditorObjects` can be called at any time and makes perfect sense on buttons that are outside of the editor. Take for example an external button for a Full Screen Preview as it is shown in code below.

For example HTML
```html
<button class="btn btn-info" ng-click="fullScreenPreview()">Full Screen Preview</button>
```

Controller
```javascript
/**
 * For some convenience, Angular-Markdown-Editor Directive also save each Markdown Editor inside $rootScope
 * Each of editor object are available through their $rootScope.markdownEditorObjects[editorName]
 *
 * Example: <textarea name="editor1" markdown-editor="{'iconlibrary': 'fa'}"></textarea>
 * We would then call our object through $rootScope.markdownEditorObjects.editor1
 */
$scope.fullScreenPreview = function() {
	$rootScope.markdownEditorObjects.editor1.showPreview();
	$rootScope.markdownEditorObjects.editor1.setFullscreen(true);
}
```

##License
[MIT License](http://www.opensource.org/licenses/mit-license.php)

## Preview
![Login Page](https://raw.githubusercontent.com/ghiscoding/angular-markdown-editor/master/images/scrshot_preview.png)
