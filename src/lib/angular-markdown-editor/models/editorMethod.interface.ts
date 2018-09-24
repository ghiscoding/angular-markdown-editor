import { EditorOption } from './editorOption.interface';

export interface EditorMethod {
  /** add a list bullet "-" at a given index position */
  addBullet: (index: number) => void;

  /** add a list number nullet "1." at a given index position */
  addNumberedBullet: (index: number, num: number) => void;

  /** Trigger a blur event */
  blur: (event: any) => EditorOption;

  /** Trigger a change event */
  change: (event: any) => EditorOption;

  /**	Disabled a button by name that described in buttons or additionalButtons arrays. Passing all will disabled all buttons. */
  disableButtons: (name: string) => EditorOption;

  /**	Enabled a button by name that described in buttons or additionalButtons arrays. Passing all will enabled all buttons. */
  enableButtons: (name: string) => EditorOption;

  /** Check if the Event Name is supported by the Editor */
  eventSupported: (eventName: string) => boolean;

  /** Trigger a focus event */
  focus: (event: any) => EditorOption;

  /**	Find some words/sentence within the editor and returned selection object (containing word position and other useful information). */
  findSelection: (words: string) => string;

  /** Get the list bullet "-" at a given start index position */
  getBulletNumber: (startIndex: number) => number | string;

  /**	Get the editor content */
  getContent: () => string;

  /**	Get the next tab memory. Returned selection object (containing word position and other useful information) */
  getNextTab: () => any;

  /**	Get the current selected chunk of words within the editor. */
  getSelection: () => string;

  /**	Hide a button by name that described in buttons or additionalButtons arrays. */
  hideButtons: (name: string) => EditorOption;

  /**	Toggle off the editor visibility */
  hidePreview: () => EditorOption;

  /** Insert text content to an index position in the textarea element */
  insertContent: (index: number, content: string) => void;

  /**	Check the editor content state, return true if the original content was changed */
  isDirty: () => boolean;

  /** Event triggered by the keyboard up (when releasing the key) */
  keyup: (e: any) => void;

  /**	Get the parsed editor content */
  parseContent: (val: string) => string;

  /**	Replace the current selected chunk of words within the editor with any content. */
  replaceSelection: (content: string) => EditorOption;

  /** Trigger a select event */
  select: (event: any) => EditorOption;

  /**	Set the editor content */
  setContent: (content: string) => EditorOption;

  /** Set the editor to full screen mode */
  setFullscreen: (mode: boolean) => void;

  /**	Tell the editor to select a span of words from start to end at next tab keypress event. */
  setNextTab: (start: number, end: number) => any;

  /**	Tell the editor to select a span of words from start to end. */
  setSelection: (start: number, end: number) => string;

  /**	Show a button by name that described in buttons or additionalButtons arrays. */
  showButtons: (name: string) => EditorOption;

  /**	Toggle on the editor visibility */
  showEditor: () => void;

  /**	Toggle on the preview visibility */
  showPreview: () => EditorOption;
}
