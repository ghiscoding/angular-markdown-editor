import { Component, forwardRef, Inject, Injectable, Input, ViewChild, NgModule } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { CommonModule } from '@angular/common';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
const GlobalEditorOptions = {
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
                        callback: (e) => {
                            // Give/remove ~~ surround the selection
                            let /** @type {?} */ chunk;
                            let /** @type {?} */ cursor;
                            const /** @type {?} */ selected = e.getSelection();
                            const /** @type {?} */ content = e.getContent();
                            if (selected.length === 0) {
                                // Give extra word
                                chunk = e.__localize('strikethrough');
                            }
                            else {
                                chunk = selected.text;
                            }
                            // transform selection and set the cursor into chunked text
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
                            // Set the cursor
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
                        callback: (e) => {
                            // Replace selection with some drinks
                            let /** @type {?} */ chunk;
                            let /** @type {?} */ cursor;
                            const /** @type {?} */ selected = e.getSelection();
                            chunk = '\n| Tables        | Are           | Cool  | \n'
                                + '| ------------- |:-------------:| -----:| \n'
                                + '| col 3 is      | right-aligned | $1600 | \n'
                                + '| col 2 is      | centered      |   $12 | \n'
                                + '| zebra stripes | are neat      |    $1 |';
                            // transform selection and set the cursor into chunked text
                            e.replaceSelection(chunk);
                            cursor = selected.start;
                            // Set the cursor
                            e.setSelection(cursor, cursor + chunk.length);
                        }
                    }]
            }]
    ]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class MarkdownEditorConfig {
    constructor() {
        this.options = GlobalEditorOptions;
    }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
const MARKDOWN_EDITOR_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => AngularMarkdownEditorComponent),
    multi: true
};
class AngularMarkdownEditorComponent {
    /**
     * @param {?} forRootConfig
     */
    constructor(forRootConfig) {
        this.forRootConfig = forRootConfig;
        /**
         * Number of rows for the textarea
         */
        this.rows = 10;
        this.onModelChange = () => { };
        this.onModelTouched = () => { };
    }
    /**
     * Locale set that has a language and dictionary that can be added as an alternative language. Can be 1 or more dictionaries
     * @param {?} locale
     * @return {?}
     */
    set locale(locale) {
        this.addLocaleSet(locale);
    }
    /**
     * @return {?}
     */
    ngAfterViewInit() {
        this.initialization();
    }
    /**
     * @param {?} editorLocale
     * @return {?}
     */
    addLocaleSet(editorLocale) {
        if (!editorLocale) {
            return;
        }
        if (Array.isArray(editorLocale)) {
            editorLocale.forEach((locale) => $.fn.markdown.messages[locale.language] = locale.dictionary);
        }
        else {
            $.fn.markdown.messages[editorLocale.language] = editorLocale.dictionary;
        }
    }
    /**
     * @return {?}
     */
    initialization() {
        // get all default options to get the entire list of onEvent so that we can attach Dispatch Custom Event to them
        // we also merge these with the options, and pass these merged options to the hookToEditorEvents() method to cover all onEvent callbacks
        const /** @type {?} */ markdownDefaultOptions = $.fn.markdown.defaults;
        // re-hook new events that were optionally defined in the options
        // merge the options, the order matters (last options on the right have higher priorities)
        const /** @type {?} */ options = Object.assign({}, markdownDefaultOptions, GlobalEditorOptions, this.forRootConfig, this.options);
        // hook all events to respective callbacks
        // 1- could be coming from a Dispatched Event in the View:: (onX)="do()"
        // 2- or from editor option callback in the Component:: const options = { onX: () => do() }
        this.hookToEditorEvents(options);
        // hook to the onChange event to update our model
        // however we don't want to override the previous callback, so we will run that one to if exists
        const /** @type {?} */ previousOnChange = options.onChange;
        options.onChange = (e) => {
            this.onModelChange(e && e.getContent && e.getContent());
            if (typeof previousOnChange === 'function') {
                previousOnChange(e);
            }
        };
        // finally create the editor
        $(`#${this.textareaId}`).markdown(options);
    }
    /**
     * Hook any of the editor event(s) to Dispatch Custom Event so that we can use them in Angular with (onX)="doSomething($event.detail.eventData)"
     * @param {?} options
     * @return {?}
     */
    hookToEditorEvents(options) {
        for (const /** @type {?} */ prop in options) {
            if (options.hasOwnProperty(prop) && prop.startsWith('on')) {
                const /** @type {?} */ previousEvent = options[prop];
                // on Callback triggered
                options[prop] = (e) => {
                    // Dispatch a Custom Event, so that the (onX)="do()" from the View works
                    this.dispatchCustomEvent(prop, { eventData: e });
                    // if an event was passed through the options (instead of dispatch), and is not empty function, then we need to run it as well
                    // basically we don't want the Dispatch Custom Event (onX)="do()" to override the ones passed directly in the editor option callbacks
                    if (typeof previousEvent === 'function') {
                        previousEvent(e);
                    }
                };
            }
        }
    }
    /**
     * Write value to the native element
     * @param {?} value string
     * @return {?}
     */
    writeValue(value) {
        this.value = value;
        // preset values in the DOM element
        if (this.value) {
            this.elm.nativeElement.value = this.value;
        }
    }
    /**
     * @param {?} fn
     * @return {?}
     */
    registerOnChange(fn) {
        this.onModelChange = fn;
    }
    /**
     * @param {?} fn
     * @return {?}
     */
    registerOnTouched(fn) {
        this.onModelTouched = fn;
    }
    /**
     * Dispatch of Custom Event, which by default will bubble & is cancelable
     * @param {?} eventName
     * @param {?=} data
     * @param {?=} isBubbling
     * @param {?=} isCancelable
     * @return {?}
     */
    dispatchCustomEvent(eventName, data, isBubbling = true, isCancelable = true) {
        const /** @type {?} */ eventInit = { bubbles: isBubbling, cancelable: isCancelable };
        if (data) {
            eventInit.detail = data;
        }
        return this.elm.nativeElement.dispatchEvent(new CustomEvent(eventName, eventInit));
    }
}
AngularMarkdownEditorComponent.decorators = [
    { type: Injectable },
    { type: Component, args: [{
                moduleId: 'angulaMarkdownEditor',
                selector: 'angular-markdown-editor',
                template: '<textarea #markdownEditorElm id="{{textareaId}}" name="{{textareaId}}" data-provide="markdown" rows="{{rows}}"></textarea>',
                providers: [MARKDOWN_EDITOR_VALUE_ACCESSOR]
            },] },
];
/** @nocollapse */
AngularMarkdownEditorComponent.ctorParameters = () => [
    { type: undefined, decorators: [{ type: Inject, args: ['config',] },] },
];
AngularMarkdownEditorComponent.propDecorators = {
    "elm": [{ type: ViewChild, args: ['markdownEditorElm',] },],
    "locale": [{ type: Input },],
    "textareaId": [{ type: Input },],
    "options": [{ type: Input },],
    "rows": [{ type: Input },],
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class AngularMarkdownEditorModule {
    /**
     * @param {?=} config
     * @return {?}
     */
    static forRoot(config = {}) {
        return {
            ngModule: AngularMarkdownEditorModule,
            providers: [
                { provide: 'config', useValue: config }
            ]
        };
    }
}
AngularMarkdownEditorModule.decorators = [
    { type: NgModule, args: [{
                imports: [
                    CommonModule
                ],
                declarations: [AngularMarkdownEditorComponent],
                exports: [AngularMarkdownEditorComponent],
                entryComponents: [AngularMarkdownEditorComponent]
            },] },
];
/** @nocollapse */
AngularMarkdownEditorModule.ctorParameters = () => [];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
// Public classes.

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * Generated bundle index. Do not edit.
 */

export { MarkdownEditorConfig, AngularMarkdownEditorComponent, AngularMarkdownEditorModule, MARKDOWN_EDITOR_VALUE_ACCESSOR as ɵa };
//# sourceMappingURL=angular-markdown-editor.js.map
