angular
  .module('angular-markdown-editor', [])
  .directive('markdownEditor', ['$parse', function(parse) {
    return {
        restrict: 'A',
        require:  'ngModel',
        link: function(scope, element, attrs, ngModel) {
          var options = scope.$eval(attrs.markdownEditor);

            // Only initialize the $.markdown plugin once.
            if (! element.hasClass('processed')) {
                element.addClass('processed');

                // Setup the markdown WYSIWYG.
                element.markdown({
                  autofocus: options.autofocus || false,
                  saveable: options.saveable || false,
                  iconlibrary: options.iconlibrary || 'glyph',
                  hideable: options.hideable || false,
                  width: options.width || 'inherit',
                  height: options.height || 'inherit',
                  resize: options.resize || 'none',
                  language: options.language || 'en',
                  footer: options.footer || '',
                  fullscreen: options.fullscreen || { enable: true, icons: {}},
                  hiddenButtons: options.hiddenButtons || null,
                  disabledButtons: options.disabledButtons || null,
                  initialstate: options.initialstate || 'editor',
                  parser: options.parser || null,
                  dropZoneOptions: options.dropZoneOptions || null,
                  enableDropDataUri: options.enableDropDataUri || false,
                  showButtons: options.showButtons || null,
                  additionalButtons: options.additionalButtons || (options.addExtraButtons ? addNewButtons() : []),
                  onChange: function(event) {
                      // When a change occurs, we need to update scope in case the user clicked one of the plugin buttons
                      // (which isn't the same as a keydown event that angular would listen for).
                      ngModel.$setViewValue(event.getContent());
                  }
                });
            }
        }
    };
}]);

/**
 * Add new extra buttons: Strikethrough & Table
 * @return mixed additionButtons
 */
function addNewButtons() {
  return [[{
        name: "groupFont",
        data: [{
          name: "cmdStrikethrough",
          toggle: false,
          title: "Strikethrough",
          icon: {
            fa: "fa fa-strikethrough",
            glyph: "glyphicon glyphicon-minus"
          },
          callback: function(e) {
            // Give/remove ~~ surround the selection
            var chunk, cursor, selected = e.getSelection(),
              content = e.getContent();

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
        name: "groupMisc",
        data: [{
          name: "cmdTable",
          toggle: false,
          title: "Table",
          icon: {
            fa: "fa fa-table",
            glyph: "glyphicon glyphicon-th"
          },
          callback: function(e) {
            // Replace selection with some drinks
            var chunk, cursor,
                selected = e.getSelection(), content = e.getContent(),
                chunk = "\n| Tables        | Are           | Cool  | \n"
                + "| ------------- |:-------------:| -----:| \n"
                + "| col 3 is      | right-aligned | $1600 | \n"
                + "| col 2 is      | centered      |   $12 | \n"
                + "| zebra stripes | are neat      |    $1 |"

            // transform selection and set the cursor into chunked text
            e.replaceSelection(chunk)
            cursor = selected.start

            // Set the cursor
            e.setSelection(cursor,cursor+chunk.length);
          }
        }]
  }]];
}
