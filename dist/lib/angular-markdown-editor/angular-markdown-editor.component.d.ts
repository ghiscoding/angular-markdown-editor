import { AfterViewInit, ElementRef } from '@angular/core';
import { EditorLocale, EditorOption } from './models';
export declare const MARKDOWN_EDITOR_VALUE_ACCESSOR: any;
export declare class AngularMarkdownEditorComponent implements AfterViewInit {
    private forRootConfig;
    elm: ElementRef;
    /** Locale set that has a language and dictionary that can be added as an alternative language. Can be 1 or more dictionaries */
    locale: EditorLocale | EditorLocale[];
    /** Id of the textarea DOM element used by the lib */
    textareaId: string;
    /** Markdown Editor Options to pass to the element */
    options?: EditorOption;
    /** Number of rows for the textarea */
    rows: number;
    value: any | any[];
    onModelChange: Function;
    onModelTouched: Function;
    constructor(forRootConfig: EditorOption);
    ngAfterViewInit(): void;
    addLocaleSet(editorLocale: EditorLocale | EditorLocale[]): void;
    initialization(): void;
    /**
     * Hook any of the editor event(s) to Dispatch Custom Event so that we can use them in Angular with (onX)="doSomething($event.detail.eventData)"
     * @param editor options
     */
    hookToEditorEvents(options: any): void;
    /**
     * Write value to the native element
     * @param value string
     */
    writeValue(value: string): void;
    registerOnChange(fn: Function): void;
    registerOnTouched(fn: Function): void;
    /** Dispatch of Custom Event, which by default will bubble & is cancelable */
    private dispatchCustomEvent(eventName, data?, isBubbling?, isCancelable?);
}
