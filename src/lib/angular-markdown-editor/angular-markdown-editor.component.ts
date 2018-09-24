import { AfterViewInit, Component, ElementRef, forwardRef, Inject, Injectable, Input, ViewChild } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { EditorLocale, EditorOption, Dictionary } from './models';
import { GlobalEditorOptions } from './global-editor-options';

declare var $: any;

export const MARKDOWN_EDITOR_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => AngularMarkdownEditorComponent),
  multi: true
};

@Injectable()
@Component({
  moduleId: 'angulaMarkdownEditor',
  selector: 'angular-markdown-editor',
  template: '<textarea #markdownEditorElm id="{{textareaId}}" name="{{textareaId}}" data-provide="markdown" rows="{{rows}}"></textarea>',
  providers: [MARKDOWN_EDITOR_VALUE_ACCESSOR]
})
export class AngularMarkdownEditorComponent implements AfterViewInit {
  @ViewChild('markdownEditorElm') elm: ElementRef;

  /** Locale set that has a language and dictionary that can be added as an alternative language. Can be 1 or more dictionaries */
  @Input()
  set locale(locale: EditorLocale | EditorLocale[]) {
    this.addLocaleSet(locale);
  }

  /** Id of the textarea DOM element used by the lib */
  @Input() textareaId: string;

  /** Markdown Editor Options to pass to the element */
  @Input() options?: EditorOption;

  /** Number of rows for the textarea */
  @Input() rows = 10;

  public value: any | any[];
  public onModelChange: Function = () => {};
  public onModelTouched: Function = () => {};

  constructor(@Inject('config') private forRootConfig: EditorOption) {}

  ngAfterViewInit() {
    this.initialization();
  }

  addLocaleSet(editorLocale: EditorLocale | EditorLocale[]) {
    if (!editorLocale) {
      return;
    }
    if (Array.isArray(editorLocale)) {
      editorLocale.forEach((locale: EditorLocale) => $.fn.markdown.messages[locale.language] = locale.dictionary);
    } else {
      $.fn.markdown.messages[editorLocale.language] = editorLocale.dictionary;
    }
  }

  initialization() {
    // get all default options to get the entire list of onEvent so that we can attach Dispatch Custom Event to them
    // we also merge these with the options, and pass these merged options to the hookToEditorEvents() method to cover all onEvent callbacks
    const markdownDefaultOptions = $.fn.markdown.defaults;

    // re-hook new events that were optionally defined in the options
    // merge the options, the order matters (last options on the right have higher priorities)
    const options = { ...markdownDefaultOptions, ...GlobalEditorOptions, ...this.forRootConfig, ...this.options };

    // hook all events to respective callbacks
    // 1- could be coming from a Dispatched Event in the View:: (onX)="do()"
    // 2- or from editor option callback in the Component:: const options = { onX: () => do() }
    this.hookToEditorEvents(options);

    // hook to the onChange event to update our model
    // however we don't want to override the previous callback, so we will run that one to if exists
    const previousOnChange = options.onChange;
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
   * @param editor options
   */
  hookToEditorEvents(options) {
    for (const prop in options) {
      if (options.hasOwnProperty(prop) && prop.startsWith('on')) {
        const previousEvent = options[prop];

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
   * @param value string
   */
  writeValue(value: string): void {
    this.value = value;

    // preset values in the DOM element
    if (this.value) {
      this.elm.nativeElement.value = this.value;
    }
  }

  registerOnChange(fn: Function): void {
    this.onModelChange = fn;
  }

  registerOnTouched(fn: Function): void {
    this.onModelTouched = fn;
  }

  /** Dispatch of Custom Event, which by default will bubble & is cancelable */
  private dispatchCustomEvent(eventName: string, data?: any, isBubbling: boolean = true, isCancelable: boolean = true) {
    const eventInit: CustomEventInit = { bubbles: isBubbling, cancelable: isCancelable };
    if (data) {
      eventInit.detail = data;
    }
    return this.elm.nativeElement.dispatchEvent(new CustomEvent(eventName, eventInit));
  }
}
