$(document).ready(() => {
  $('button').on('click', evt => {
    console.log(evt)
    var buttonName = $(evt.target).attr('name')
    console.log('Button => ', buttonName)

    var username = $('#username').val()
    var email = $('#email').val()
    console.log(username, email)

    if (username !== '' && email !== '') {
      // send request
      $.ajax({
        url: '/' + buttonName,
        type: 'POST',
        data: {
          username: username,
          email: email
        },
        success: function (resp) {
          console.log(resp.message)
          window.location.replace(resp.redirect)
        },
        error: function (err) {
          if (err.status == 400) alert('Username or email is invalid')
          console.log('Failed', err)
        }
      })
    } else {
      alert('Username or Password is missing')
    }
  })
})
