/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
const GlobalEditorOptions = {
    // additionalButtons: [],
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

export { MarkdownEditorConfig };
//# sourceMappingURL=angular-markdown-editor.js.map
