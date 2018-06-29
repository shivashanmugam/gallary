let settings = {
  async: true,
  crossDomain: true,
  url: 'http://localhost:8080/api/auth/login',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  processData: false,
  data: ''
}

function login() { 
  let loginDetails = {
    'username': $('#login-username').val(),
    'password': $('#login-password').val()
  }
  console.log(loginDetails);
  settings.data = JSON.stringify(loginDetails)
  $.ajax(settings).done(function (response) {
    if (response.status == 200) {
      window.location.href = window.location.host + '/quiz';
    }
  });
}
