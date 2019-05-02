$(document).ready(() => {
  $('.add').on('click', evt => {
    var task = $(evt.target)
      .siblings('input')
      .val()
    console.log('New task', task)
    // add task to database
    $.ajax({
      type: 'POST',
      url: '/todos/done',
      data: {
        text: task
      },
      success: function (resp) {
        console.log('Task Completed')
      },
      error: function (err) {
        console.log('Error!')
      }
    })
  })
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
      var span = $(evt.target).siblings('span')
      var input = $('<input type="text" value="' + span.text() + '">')
      span.remove()
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
          span = $('<span>' + text + '</span>')
          input.remove()
          $(evt.target).before(span)
          $(evt.target).text('Edit')
        },
        error: function (err) {
          alert('Could not update the task. Try Again!')
        }
      })
    }
  })
})
