(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/forms'), require('@angular/common')) :
	typeof define === 'function' && define.amd ? define('angular-markdown-editor', ['exports', '@angular/core', '@angular/forms', '@angular/common'], factory) :
	(factory((global['angular-markdown-editor'] = {}),global.ng.core,global.ng.forms,global.ng.common));
}(this, (function (exports,core,forms,common) { 'use strict';

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
var MARKDOWN_EDITOR_VALUE_ACCESSOR = {
    provide: forms.NG_VALUE_ACCESSOR,
    useExisting: core.forwardRef(function () { return AngularMarkdownEditorComponent; }),
    multi: true
};
var AngularMarkdownEditorComponent = /** @class */ (function () {
    function AngularMarkdownEditorComponent(forRootConfig) {
        this.forRootConfig = forRootConfig;
        this.rows = 10;
        this.onModelChange = function () { };
        this.onModelTouched = function () { };
    }
    Object.defineProperty(AngularMarkdownEditorComponent.prototype, "locale", {
        set: function (locale) {
            this.addLocaleSet(locale);
        },
        enumerable: true,
        configurable: true
    });
    AngularMarkdownEditorComponent.prototype.ngAfterViewInit = function () {
        this.initialization();
    };
    AngularMarkdownEditorComponent.prototype.addLocaleSet = function (editorLocale) {
        if (!editorLocale) {
            return;
        }
        if (Array.isArray(editorLocale)) {
            editorLocale.forEach(function (locale) { return $.fn.markdown.messages[locale.language] = locale.dictionary; });
        }
        else {
            $.fn.markdown.messages[editorLocale.language] = editorLocale.dictionary;
        }
    };
    AngularMarkdownEditorComponent.prototype.initialization = function () {
        var _this = this;
        var markdownDefaultOptions = $.fn.markdown.defaults;
        var options = Object.assign({}, markdownDefaultOptions, GlobalEditorOptions, this.forRootConfig, this.options);
        this.hookToEditorEvents(options);
        var previousOnChange = options.onChange;
        options.onChange = function (e) {
            _this.onModelChange(e && e.getContent && e.getContent());
            if (typeof previousOnChange === 'function') {
                previousOnChange(e);
            }
        };
        $("#" + this.textareaId).markdown(options);
    };
    AngularMarkdownEditorComponent.prototype.hookToEditorEvents = function (options) {
        var _this = this;
        var _loop_1 = function (prop) {
            if (options.hasOwnProperty(prop) && prop.startsWith('on')) {
                var previousEvent_1 = options[prop];
                options[prop] = function (e) {
                    _this.dispatchCustomEvent(prop, { eventData: e });
                    if (typeof previousEvent_1 === 'function') {
                        previousEvent_1(e);
                    }
                };
            }
        };
        for (var prop in options) {
            _loop_1(prop);
        }
    };
    AngularMarkdownEditorComponent.prototype.writeValue = function (value) {
        this.value = value;
        if (this.value) {
            this.elm.nativeElement.value = this.value;
        }
    };
    AngularMarkdownEditorComponent.prototype.registerOnChange = function (fn) {
        this.onModelChange = fn;
    };
    AngularMarkdownEditorComponent.prototype.registerOnTouched = function (fn) {
        this.onModelTouched = fn;
    };
    AngularMarkdownEditorComponent.prototype.dispatchCustomEvent = function (eventName, data, isBubbling, isCancelable) {
        if (isBubbling === void 0) { isBubbling = true; }
        if (isCancelable === void 0) { isCancelable = true; }
        var eventInit = { bubbles: isBubbling, cancelable: isCancelable };
        if (data) {
            eventInit.detail = data;
        }
        return this.elm.nativeElement.dispatchEvent(new CustomEvent(eventName, eventInit));
    };
    return AngularMarkdownEditorComponent;
}());
AngularMarkdownEditorComponent.decorators = [
    { type: core.Injectable },
    { type: core.Component, args: [{
                moduleId: 'angulaMarkdownEditor',
                selector: 'angular-markdown-editor',
                template: '<textarea #markdownEditorElm id="{{textareaId}}" name="{{textareaId}}" data-provide="markdown" rows="{{rows}}"></textarea>',
                providers: [MARKDOWN_EDITOR_VALUE_ACCESSOR]
            },] },
];
AngularMarkdownEditorComponent.ctorParameters = function () { return [
    { type: undefined, decorators: [{ type: core.Inject, args: ['config',] },] },
]; };
AngularMarkdownEditorComponent.propDecorators = {
    "elm": [{ type: core.ViewChild, args: ['markdownEditorElm',] },],
    "locale": [{ type: core.Input },],
    "textareaId": [{ type: core.Input },],
    "options": [{ type: core.Input },],
    "rows": [{ type: core.Input },],
};
var AngularMarkdownEditorModule = /** @class */ (function () {
    function AngularMarkdownEditorModule() {
    }
    AngularMarkdownEditorModule.forRoot = function (config) {
        if (config === void 0) { config = {}; }
        return {
            ngModule: AngularMarkdownEditorModule,
            providers: [
                { provide: 'config', useValue: config }
            ]
        };
    };
    return AngularMarkdownEditorModule;
}());
AngularMarkdownEditorModule.decorators = [
    { type: core.NgModule, args: [{
                imports: [common.CommonModule],
                declarations: [AngularMarkdownEditorComponent],
                exports: [AngularMarkdownEditorComponent],
                entryComponents: [AngularMarkdownEditorComponent]
            },] },
];
AngularMarkdownEditorModule.ctorParameters = function () { return []; };

exports.MarkdownEditorConfig = MarkdownEditorConfig;
exports.AngularMarkdownEditorComponent = AngularMarkdownEditorComponent;
exports.AngularMarkdownEditorModule = AngularMarkdownEditorModule;
exports.ɵa = MARKDOWN_EDITOR_VALUE_ACCESSOR;

Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=angular-markdown-editor.umd.js.map
