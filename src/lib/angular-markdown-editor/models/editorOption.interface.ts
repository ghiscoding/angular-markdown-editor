import { IconSet } from './iconSet.interface';

export interface EditorOption {
  /** Indicates that editor will focused after instantiated. Default to false */
  autofocus?:	boolean;

  /** Array or additional icon set that can be added to the editor as new icon set family. Default is empty string */
  customIcons?: any;

  /** Enabling the use of DropZone data URI, Defaults to false */
  enableDropDataUri?: boolean;

  /** What is the initial state of the editor ('preview', 'editor', 'fullscreen') */
  initialstate?: 'preview' | 'editor' | 'fullscreen';

  /** Indicates that editor will have save button and action. Default to false */
  savable?:	boolean;

  /** If set to true then the editor will be hidden on blur event. Default to false */
  hideable?: boolean;

  /** The editor width. Default to inherit. You could supply any numerical value (that will be set as css), or supply valid Bootstrap class (something like span2) */
  width?: number | string;

  /** The editor height. Default to inherit */
  height?: number | string;

  /**
   * Option to disable or change the resize property, possible values none,both,horizontal,vertical. Default none
   * if this option is enabled, the user will be able to resize the editor and preview screen.
   */
  resize?: string;

  /** The icon library to use. Glyphicons (glyph), Font Awesome (fa) and Octicons (octicons) are supported. In order to use Font Awesome properly, you'll need to include Font Awesome stylesheet yourself. Also for use Octicons, follow instructions here. Default to glyph */
  iconlibrary?: string;

  /** Localization setting. Default to en */
  language?: string;

  /** Footer dom. Can be string or callback. Default is empty string */
  footer?: any;

  /** Contains enable (bool) and icons (object) keys. */
  fullscreen?: {
    enable: boolean;
    icons: IconSet;
  };

  /** Array or additional buttons that can be added to the editor. Default is empty string */
  additionalButtons?: any[];

  /** Array or string of button names to be hidden. Default is empty string */
  hiddenButtons?: any[];

  /** Array or string of button names to be disabled. Default is empty string */
  disabledButtons?: any[];

  /** Enables integration with DropZone for allowing file upload/linking via drag&drop. The options are directly passed to the DropZone library. Valid options are described here */
  dropZoneOptions?: any;

  // methods
  parser?: (val: string) => void;

  // --
  // Event Callbacks

  /** Triggered when the editor shows up */
  onShow?: (e: any) => void;

  /** Triggered when the "Preview" button or "showPreview" method are called */
  onPreview?: (e: any) => void;

  /** Triggered when the editor goes out of Preview mode */
  onPreviewEnd?: (e: any) => void;

  /** Triggered when the "Save" button is clicked (requires the flag "savable: true") */
  onSave?: (e: any) => void;

  /** Triggered after the editor window (textarea) loses the focus */
  onBlur?: (e: any) => void;

  /** Triggered after the editor window (textarea) gains the focus */
  onFocus?: (e: any) => void;

  /** Triggered after any characters are typed in th editor or any buttons are clicked */
  onChange?: (e: any) => void;

  /** Triggered when the "Full Screen" icon or "setFullscreen" method are called */
  onFullscreen?: (e: any) => void;

  /** Triggered when the editor goes out of Full Screen mode */
  onFullscreenExit?: (e: any) => void;

  /** Triggered when a selection (word select) is made in the editor. It can also be triggered by a button which changes text */
  onSelect?: (e: any) => void;
}
