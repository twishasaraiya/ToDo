$(document).ready(() => {
  $('button').on('click', evt => {
    // console.log(evt)
    var buttonName = $(evt.target).attr('name')
    console.log('Button => ', buttonName)

    var username = $('#username').val()
    var pwd = $('#password').val()
    console.log(username, pwd)

    if (username !== '' && pwd !== '') {
      // send request
      $.ajax({
        url: '/' + buttonName,
        type: 'POST',
        dataType: 'json',
        data: {
          username: username,
          password: pwd
        },
        success: function (resp) {
          console.log(resp.message, resp.redirect)
          try {
            window.location.href = resp.redirect
          } catch (err) {
            console.log('error in redirecting ', err)
          }
        },
        error: function (err) {
          if (err.status == 400) alert(err.responseText)
          console.log('Failed', err)
        }
      })
    } else {
      alert('Username or Password is missing')
    }
  })
})
