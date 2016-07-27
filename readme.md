# Angular Markdown Editor (Directive)
`1.0.3`

## What do we have?
I have put together a few libraries and tools to make a convenient "all in one" WYSIWYG Markdown Editor and preview. All of that with a simple AngularJS Directive call. I plan to use this mainly for online documentation but it could be useful for many other reasons. Also planning to add a 1-click button for simple Copy+Paste to email.

[Marked.js](https://github.com/chjj/marked) is awesome for markdown preview and [Highlight.js](https://highlightjs.org/) is a must for easy code viewing with colors highlighting. The [Bootstrap-Markdown](http://www.codingdrama.com/bootstrap-markdown/) is a really great and simplified WYSIWYG editor which was simply missing integration with AngularJS and so I created a Directive to handle that. For all of these great tools, we will use their AngularJS version for easier integration (for example `Marked.js` and `Angular-Marked`)

## Demo
[Live Plunker demo](http://plnkr.co/AFxN7uiwkZlJ9OMZwXey) or take a look at the demo under the folder [example](https://github.com/ghiscoding/angular-markdown-editor/tree/master/example).

## How to use it?
### Installation
##### [NPM](https://www.npmjs.com/package/angular-markdown-editor)
```bash
npm install angular-markdown-editor
```
##### [NuGet](https://www.nuget.org/packages/Angular-Markdown-Editor/)
_Some of the dependencies were added by hand to this package (because they don't all exist on NuGet). For those, you could get latest version and install them yourself as well._
```bash
PM> Install-Package Angular-Markdown-Editor
```

### Include Styles &amp; Scripts
_NOTE: Unfortunately, the "highlight.js" npm module doesn't seem to have proper bundles, so it's easier for us get the minified CSS and JS files directly from CDN where they are bundled correctly. As for the highlight style, if you want to use another style, then you can replace the "...xxx.min.css" by the name you want to use, for example if we want to use "github", that would be "highlight.js/.../github.min.css"_
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
```

### Inside the HTML
Simply create a `<textarea>` with an `ngModel` and a call to the Directive.
At the end, all you need is:
```html
<!-- editor -->
<textarea ng-model="markdown" markdown-editor="" rows="10"></textarea>

<-- preview... be sure to include the "angular-markdown-editor.css" style -->
<!-- use "markdown" or "marked" on your <div> preview to show Tables correctly -->
<div marked="markdown" class="markdown" style="padding: 20px"></div>
```

### Editor extra options
You can use any of the [Bootstrap-Markdown Options](http://www.codingdrama.com/bootstrap-markdown/) by passing them as an object to the `markdown-editor` directive attribute. Like this: `<textarea markdown-editor="{'iconlibrary': 'fa'}"...`

or multiple options
```
<textarea markdown-editor="{'iconlibrary': 'fa', addExtraButtons: true}"...
```

### Editor extra buttons
I really thought that some buttons were missing to go a great job (~~Strikethrough~~ &amp; **Table**). So I added them within the directive as an option. They are not enabled by default, so you will need to enable them manually, that is if you do want to use them. The option argument is `addExtraButtons` to `true`.
```
<textarea markdown-editor="{addExtraButtons: true, 'iconlibrary': 'fa'}"...
```

## Dependencies
* [angular.js](https://www.angularjs.org/)
* [bootstrap](http://getbootstrap.com/) _(we also include bootstrap.js)_
* [bootstrap-markdown](http://www.codingdrama.com/bootstrap-markdown/) _(editor)_
* [marked.js](https://github.com/chjj/marked) _(markdown preview)_
* [angular-marked](https://github.com/Hypercubed/angular-marked)
* [highlight.js](https://highlightjs.org/) _(code syntax highlighting)_
* [angular-highlight](https://github.com/pc035860/angular-highlightjs)
* [jQuery](http://jquery.com/) _(required for Bootstrap-Markdown editor)_

## Preview
![Login Page](https://github.com/ghiscoding/angular-markdown-editor/blob/master/images/scrshot_preview.png)
