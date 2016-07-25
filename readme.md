# Angular Markdown Editor (Directive)
`1.0.0`

### What do we have?
I have put together a few libraries and tools to make a convenient all in one WYSIWYG Markdown Editor and preview. All of that with a simple AngularJS Directive call. I plan to use this mainly for online documentation but it could be useful for many other reasons. Also planning to add a 1-click button for simple copy+paste to email.

[Marked.js](https://github.com/chjj/marked) is awesome for markdown preview and [Highlight.js](https://highlightjs.org/) is a must for easy code viewing with colors highlighting. The [Bootstrap-Markdown](http://www.codingdrama.com/bootstrap-markdown/) is a really great and simplified WYSIWYG editor which was simply missing integration with AngularJS and so I created a Directive to handle that. For all of these great tools, we will use their AngularJS version for easier integration (for example `Marked.js` and `Angular-Marked`)

### How to use it?
##### Creation
Simply create a `<textarea>` with an `ngModel` and a call to the Directive.
At the end, all you need is: `<textarea markdown-editor="" rows="10" ng-model="markdown"></textarea>`

##### Extra options
You can also pass any options from the [Bootstrap-Markdown](http://www.codingdrama.com/bootstrap-markdown/) by passing these options as an object to the directive.
Like this: `<textarea markdown-editor="{'iconlibrary': 'fa'}"...` or multiple options `<textarea markdown-editor="{'iconlibrary': 'fa', addExtraButtons: true}"...`

##### Additional extra buttons
I really thought that some buttons were missing to go a great job (Strikethrough &amp; Table). So I added them to the directive, though they are not enabled by default, you need to enable them manually if you want them or not.
Like this: `<textarea markdown-editor="{addExtraButtons: true}"...`

### Dependencies
* angular.js
* bootstrap _(we also include bootstrap.js)_
* bootstrap-markdown _(editor)_
* marked.js _(markdown preview)_
* angular-marked
* highlight.js _(code syntax highlighting)_
* angular-highlight
* jQuery _(required for Bootstrap-Markdown editor)_

### Demo
#### Live demo
[Plunker demo](http://plnkr.co/AFxN7uiwkZlJ9OMZwXey)

#### Code example
You can take a look at the demo under the folder [example](https://github.com/ghiscoding/angular-markdown-editor/example).

**Preview:**

![Login Page](/images/scrshot_preview.png)
