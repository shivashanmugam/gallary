/* eslint no-param-reassign : 0, func-names : 0, no-unused-expressions : 0 */
quizApp.controller('quizCtrl', ['$scope', '$cookies', '$window', 'questionService', ($scope, $cookies, $window, questionService) => {
  let _allQuestions = [];
  $scope.filteredQuestions = [];
  $scope.selectedQuestionTitle = '';
  $scope.selectedQuestionIndex = 0;
  $scope.statusMessage;
  $scope.statusClass;
  $scope.previewMode = false;
  $scope.selectedCategory = 'js';
  $scope.categories = ['js', 'angularjs', 'node', 'mongo', 'html', 'css', 'browser'];
  $scope.tags = ['easy', 'advanced'];
  
  if (window.location.pathname === _pageConstants.createOperation.path) {
    $scope.isEdit = false;
  } else {
    $scope.isEdit = true;
  }

  function updateCurrent() {
    $scope.filteredQuestions[$scope.selectedQuestionIndex].title = $scope.selectedQuestionTitle;
    $scope.filteredQuestions[$scope.selectedQuestionIndex].body = editor.getValue();
    _allQuestions[$scope.filteredQuestions[$scope.selectedQuestionIndex].mainIndex] = $scope.filteredQuestions[$scope.selectedQuestionIndex];
  }

  function showStatus(message, type) {
    if (type === 'ERROR') {
      $scope.statusClass = 'alert-danger';
    } else {
      $scope.statusClass = 'alert-success';
    }

    $scope.statusMessage = message;
    setTimeout(() => {
      $scope.statusMessage = false;
      $scope.$apply();
    }, 2000);
  }

  $scope.init = function () {
    // this timeout allows the editor md to load
    setTimeout(() => {
      $scope.setPage();
    }, 1000);
  };

  $scope.setPage = function () {
    questionService.getAll().then((response) => {
      _allQuestions = response;
      $scope.filterQuestionByCategory();
    });
  };
  
  $scope.filterQuestionByCategory = function () {
    if ($scope.isEdit) {
      $scope.filteredQuestions = _.filter(_allQuestions, (question, index) => {
        question.mainIndex = index;
        if (question.category === $scope.selectedCategory) {
          return true;
        }
        return false;
      });
      $scope.selectedQuestionIndex = 0;
      $scope.filteredQuestions.length > 0 ? $scope.setSelectedQuestion() : ($scope.selectedQuestionTitle = '', editor.setValue(''));
      console.log('all question length ' + _allQuestions.length);
      console.log('filtered question length ' + $scope.filteredQuestions.length);
    }
  };

  $scope.setSelectedQuestion = function () {
    $scope.selectedQuestionTitle = $scope.filteredQuestions[$scope.selectedQuestionIndex].title;
    editor.setValue($scope.filteredQuestions[$scope.selectedQuestionIndex].body);
  };
  $scope.openCreateNewPage = function () {
    window.location.href = _pageConstants.protocol.concat('://'.concat(_pageConstants.host.concat(_pageConstants.createOperation.path)));
  };
  $scope.changeQuestion = function ($event) {
    if ($event.keyCode === 121) { // for F10, => editor is in preview mode
      $scope.previewMode = !$scope.previewMode;
      console.log('preview mode ' + $scope.previewMode);
    } else {
      if ($scope.previewMode) { 
        if ($event.keyCode === 37) {
          updateCurrent();
          if ($scope.selectedQuestionIndex > 0) {
            $scope.selectedQuestionIndex--;
            $scope.setSelectedQuestion();
          }
        } else if ($event.keyCode === 39) {
          updateCurrent();
          if ($scope.filteredQuestions.length > $scope.selectedQuestionIndex + 1) {
            $scope.selectedQuestionIndex++;
            $scope.setSelectedQuestion();
          }
        }
      }
    }
  };
  $scope.editorSubmit = function () {
    const updateQuestionData = {
      title: $scope.selectedQuestionTitle,
      body: editor.getValue(),
      active: true,
      category: $scope.selectedCategory
    };

    if ($scope.isEdit) {
      questionService.update(updateQuestionData, $scope.filteredQuestions[$scope.selectedQuestionIndex]._id).then((response) => {
        (response.status && response.status === 200) ? showStatus('Updated') : showStatus('update Failed', 'ERROR');
      });
    } else {
      questionService.add(updateQuestionData).then((response) => {
        (response.status && response.status === 200) ? (showStatus('Created'), setTimeout(() => {
          window.location.href = _pageConstants.protocol.concat('://'.concat(_pageConstants.host.concat(_pageConstants.readOperation.path)));
        }, 1000)) : showStatus('Created Failed', 'ERROR');
      });
    }
  };

}]);