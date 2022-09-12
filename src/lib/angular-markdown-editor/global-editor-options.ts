import { EditorOption } from './models/editorOption.interface';

export const GlobalEditorOptions: EditorOption = {
  autofocus: false,
  disabledButtons: [],
  dropZoneOptions: null,
  enableDropDataUri: false,
  footer: '',
  height: 'inherit',
  hiddenButtons: [],
  hideable: false,
  iconlibrary: 'fa',
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
          fa: 'fa fa-strikethrough'
        },
        callback: (e: any) => {
          // Give/remove ~~ surround the selection
          let chunk;
          let cursor;
          const selected = e.getSelection();
          const content = e.getContent();

          if (selected.length === 0) {
            // Give extra word
            chunk = e.__localize('strikethrough');
          } else {
            chunk = selected.text;
          }

          // transform selection and set the cursor into chunked text
          if (content.substr(selected.start - 2, 2) === '~~' &&
            content.substr(selected.end, 2) === '~~') {
            e.setSelection(selected.start - 2, selected.end + 2);
            e.replaceSelection(chunk);
            cursor = selected.start - 2;
          } else {
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
          fa: 'fa fa-table'
        },
        callback: (e: any) => {
          // Replace selection with some drinks
          let chunk;
          let cursor;
          const selected = e.getSelection();

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
