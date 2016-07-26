# Angular Markdown Editor (Directive)
`1.0.1`

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

### Inside the HTML
Simply create a `<textarea>` with an `ngModel` and a call to the Directive.
At the end, all you need is:
```
<textarea ng-model="markdown" markdown-editor="" rows="10"></textarea>
```

### Editor extra options
You can use any of the [Bootstrap-Markdown Options](http://www.codingdrama.com/bootstrap-markdown/) by passing them as an object to the `markdown-editor` directive attribute. Like this: `<textarea markdown-editor="{'iconlibrary': 'fa'}"...`

or multiple options
```
<textarea markdown-editor="{'iconlibrary': 'fa', addExtraButtons: true}"...
```

### Editor extra buttons
I really thought that some buttons were missing to go a great job (~~Strikethrough~~ &amp; **Table**). So I added them within the directive as an option. They are not enabled by default, so you will need to enable them manually if you do want to use them with the option of `addExtraButtons`.
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
![Login Page](/images/scrshot_preview.png)
