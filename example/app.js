'use strict';

angular.module('example-app', ['hc.marked', 'hljs', 'angular-markdown-editor'])
    .config(['markedProvider', 'hljsServiceProvider', function(markedProvider, hljsServiceProvider) {
      // marked config
      markedProvider.setOptions({
        gfm: true,
        tables: true,
        sanitize: true,
        highlight: function (code, lang) {
          if (lang) {
            return hljs.highlight(lang, code, true).value;
          } else {
            return hljs.highlightAuto(code).value;
          }
        }
      });

      // highlight config
      hljsServiceProvider.setOptions({
        // replace tab with 4 spaces
        tabReplace: '    '
      });
    }])
    .controller("MainController", ["$rootScope", "$scope", "marked", function MarkdownController($rootScope, $scope, marked) {
      $scope.editor1 = "*This* **is** [markdown](https://daringfireball.net/projects/markdown/)\n and `{{ 1 + 2 }}` = {{ 1 + 2 }}";
      $scope.markdownService = marked('#TEST');

      // --
      // normal flow, function call
      $scope.convertMarkdown = function() {
        vm.convertedMarkdown = marked(vm.markdown);
      }

      /**
       * For some convenience, Angular-Markdown-Editor Directive also save each Markdown Editor inside $rootScope
       * Each of editor object are available through their $rootScope.markdownEditorObjects[editorName]
       *
       * Example: <textarea name="editor1" markdown-editor="{'iconlibrary': 'fa'}"></textarea>
       * We would then call our object through $rootScope.markdownEditorObjects.editor1
       */
      $scope.fullScreenPreview = function() {
        $rootScope.markdownEditorObjects.editor1.showPreview();
        $rootScope.markdownEditorObjects.editor1.setFullscreen(true);
      }

      /** Markdown event hook onFullscreen, in this example we will automatically show the result preview when going in full screen
       * the argument (e) is the actual Markdown object returned which help call any of API functions defined in Markdown Editor
       * For a list of API functions take a look on official demo site http://www.codingdrama.com/bootstrap-markdown/
       * @param object e: Markdown Editor object
       */
      $scope.onFullScreenCallback = function(e) {
        e.showPreview();
      }

      /** After exiting from full screen, let's go back to editor mode (which mean hide the preview)
       * NOTE: If you want this one to work, you will have to manually download the JS file, not sure why but they haven't released any versions in a while
       *       https://github.com/toopay/bootstrap-markdown/tree/master/js
       */
      $scope.onFullScreenExitCallback = function(e) {
        e.hidePreview();
      }

    }]);
