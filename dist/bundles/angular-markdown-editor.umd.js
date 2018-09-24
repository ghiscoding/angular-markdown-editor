(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
	typeof define === 'function' && define.amd ? define('angular-markdown-editor', ['exports'], factory) :
	(factory((global['angular-markdown-editor'] = {})));
}(this, (function (exports) { 'use strict';

var GlobalEditorOptions = {
    autofocus: false,
    disabledButtons: [],
    dropZoneOptions: null,
    enableDropDataUri: false,
    footer: '',
    height: 'inherit',
    hiddenButtons: [],
    hideable: false,
    iconlibrary: 'glyph',
    initialstate: 'editor',
    language: 'fr',
    additionalButtons: [
        [{
                name: 'groupFont',
                data: [{
                        name: 'cmdStrikethrough',
                        toggle: false,
                        title: 'Strikethrough',
                        icon: {
                            fa: 'fa fa-strikethrough',
                            glyph: 'glyphicon glyphicon-minus'
                        },
                        callback: function (e) {
                            var chunk;
                            var cursor;
                            var selected = e.getSelection();
                            var content = e.getContent();
                            if (selected.length === 0) {
                                chunk = e.__localize('strikethrough');
                            }
                            else {
                                chunk = selected.text;
                            }
                            if (content.substr(selected.start - 2, 2) === '~~' &&
                                content.substr(selected.end, 2) === '~~') {
                                e.setSelection(selected.start - 2, selected.end + 2);
                                e.replaceSelection(chunk);
                                cursor = selected.start - 2;
                            }
                            else {
                                e.replaceSelection('~~' + chunk + '~~');
                                cursor = selected.start + 2;
                            }
                            e.setSelection(cursor, cursor + chunk.length);
                        }
                    }]
            },
            {
                name: 'groupMisc',
                data: [{
                        name: 'cmdTable',
                        toggle: false,
                        title: 'Table',
                        icon: {
                            fa: 'fa fa-table',
                            glyph: 'glyphicon glyphicon-th'
                        },
                        callback: function (e) {
                            var chunk;
                            var cursor;
                            var selected = e.getSelection();
                            chunk = '\n| Tables        | Are           | Cool  | \n'
                                + '| ------------- |:-------------:| -----:| \n'
                                + '| col 3 is      | right-aligned | $1600 | \n'
                                + '| col 2 is      | centered      |   $12 | \n'
                                + '| zebra stripes | are neat      |    $1 |';
                            e.replaceSelection(chunk);
                            cursor = selected.start;
                            e.setSelection(cursor, cursor + chunk.length);
                        }
                    }]
            }]
    ]
};
var MarkdownEditorConfig = /** @class */ (function () {
    function MarkdownEditorConfig() {
        this.options = GlobalEditorOptions;
    }
    return MarkdownEditorConfig;
}());

exports.MarkdownEditorConfig = MarkdownEditorConfig;

Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=angular-markdown-editor.umd.js.map
