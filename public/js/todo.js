$(document).ready(() => {
  $('.checkbox').on('click', evt => {
    var taskId = $(evt.target)
      .parent()
      .attr('id')
    console.log('TASK ID ', taskId)
    // mark/unmark the task as complete in satabase
    $.ajax({
      type: 'POST',
      url: '/todos/done',
      data: {
        id: taskId,
        complete: $(evt.target).is(':checked') ? 1 : 0
      },
      success: function (resp) {
        console.log('Task Completed')
      },
      error: function (err) {
        console.log('Error!')
      }
    })
  })

  $('.edit').on('click', evt => {
    var taskId = $(evt.target)
      .parent()
      .attr('id')
    var btnText = $(evt.target).text()
    if (btnText === 'Edit') {
      var p = $(evt.target).siblings('p')
      var input = $('<input type="text" value="' + p.text() + '">')
      p.remove()
      $(evt.target).before(input)
      $(evt.target).text('Modify')
    } else {
      var input = $(evt.target).siblings('input[type=text]')
      // send ajax request
      var p,
        text = $(input).val()
      $.ajax({
        type: 'POST',
        url: '/todos/modify',
        data: {
          id: taskId,
          text: text
        },
        success: function (resp) {
          console.log($(input).val())
          p = $('<p>' + text + '</p>')
          input.remove()
          $(evt.target).before(p)
          $(evt.target).text('Edit')
        },
        error: function (err) {
          alert('Could not update the task. Try Again!')
        }
      })
    }
  })
})
