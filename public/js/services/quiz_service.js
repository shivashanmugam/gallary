/* eslint no-param-reassign : 0  */
quizApp.service('questionService', ['$http', '$cookies', function ($http, $cookies) {
  // get all Questions
  const host = _pageConstants.protocol.concat('://'.concat(_pageConstants.host));
  const authCookie = $cookies.get('Authentication');
  this.getAll = function () { // eslint-disable-line no-unused-vars
    return $http.get(host.concat('/api/questions')).then(response => response.data);
  };
  this.add = function (question) { // eslint-disable-line no-unused-vars
    return $http({
      method: 'POST',
      'Content-Type': 'application/json',
      data: question,
      url: host.concat('/api/questions'),
      headers: {
        Authorization: authCookie,
      }
    });
  };
  this.update = function (question, id) {
    return $http(
      {
        method: 'PATCH',
        'Content-Type': 'application/json',
        data: question,
        url: host.concat('/api/questions/'.concat(id)),
        headers: {
          Authorization: authCookie,
        }
      });
  };
}]);
