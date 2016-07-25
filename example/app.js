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
    .controller("MainController", ["$scope", "marked", function MarkdownController($scope, marked) {
      $scope.markdown = "*This* **is** [markdown](https://daringfireball.net/projects/markdown/)\n and `{{ 1 + 2 }}` = {{ 1 + 2 }}";
      $scope.markdownService = marked('#TEST');

      // --
      // normal flow, function call
      $scope.convertMarkdown = function() {
        vm.convertedMarkdown = marked(vm.markdown);
      }

    }]);
